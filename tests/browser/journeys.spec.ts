import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const routes = ["/", "/services", "/pricing", "/how-it-works", "/contact"]
async function fillInquiry(page: Page, name = "Browser Test Visitor") {
  await page.getByLabel("Full name").fill(name)
  await page.getByLabel("Business name", {exact: true}).fill("Example Heating")
  await page.getByLabel("Business email").fill("visitor@example.test")
  await page.getByLabel("Phone number").fill("2025550123")
  await page.getByLabel("Industry", {exact: true}).selectOption("home-services")
  await page.getByLabel("Main challenge or goal").fill("We need help answering calls while working.")
  await page.getByRole("checkbox").check()
  // The anti-bot interval is deliberately part of the real submission path.
  await page.waitForTimeout(1300)
}

test("desktop pricing journey preserves choice and persists a real inquiry", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("navigation", {name: "Primary", exact: true}).getByRole("link", {name: "Pricing"}).click()
  await expect(page).toHaveURL("/pricing")
  await expect(page.getByRole("heading",{name:"A clear investment. A connected business."})).toBeVisible()
  await page.locator("#vonte-complete:visible").getByRole("link", {name: "Discuss package"}).click()
  await expect(page.getByLabel("Interested package")).toHaveValue("vonte-complete")
  await page.getByLabel("Interested package").selectOption("lead-follow-up")
  await expect(page.locator("aside")).toContainText("$497 per month")
  await fillInquiry(page)
  await page.getByRole("button", {name: "Request a consultation"}).click()
  await expect(page.getByRole("heading", {name: "We'll follow up from here."})).toBeFocused()
  const ref = (await page.getByText(/^Reference VN-/).innerText()).replace("Reference ", "")
  const dir = path.resolve("test-results/inquiries")
  const records = await Promise.all((await readdir(dir)).filter(f=>f.endsWith(".json")).map(async f => JSON.parse(await readFile(path.join(dir,f), "utf8"))))
  expect(records.find(r => r.reference === ref)).toMatchObject({packageId:"lead-follow-up", fullName:"Browser Test Visitor"})
})

test("mobile menu covers viewport, traps focus, closes on escape, same-route link and resize", async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  await page.goto("/services")
  const trigger = page.getByRole("button", {name:"Open menu"})
  await trigger.click()
  const dialog = page.getByRole("dialog", {name:"Menu"})
  expect(await dialog.boundingBox()).toEqual({x:0,y:0,width:390,height:844})
  await expect(page.getByRole("button",{name:"Close menu"})).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(dialog.getByRole("link", {name:"Book a Strategy Call"})).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(page.getByRole("button",{name:"Close menu"})).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await dialog.getByRole("link",{name:"Services"}).click()
  await expect(dialog).not.toBeVisible()
  await trigger.click()
  await page.setViewportSize({width:1280,height:900})
  await expect(dialog).not.toBeVisible()
  expect(await page.evaluate(()=>document.body.style.overflow)).toBe("")
})

test("mobile service-to-inquiry journey validates and submits", async ({page}) => {
  await page.setViewportSize({width:375,height:812})
  await page.goto("/")
  await page.getByRole("button",{name:"Open menu"}).click()
  await page.getByRole("navigation",{name:"Mobile",exact:true}).getByRole("link",{name:"Services"}).click()
  await page.locator("#ai-receptionist").getByRole("link",{name:"Discuss This Package"}).click()
  await page.getByRole("button",{name:"Request a consultation"}).click()
  await expect(page.getByLabel("Full name")).toBeFocused()
  await expect(page.locator("#email-error")).toContainText("valid business email")
  await fillInquiry(page, "Mobile Test Visitor")
  await page.getByRole("button",{name:"Request a consultation"}).click()
  await expect(page.getByText(/^Reference VN-/)).toBeVisible()
})

test("ROI sample, changed assumptions, bounds, reset and consultation path", async ({page}) => {
  await page.goto("/pricing#calculator")
  const result = page.getByLabel("Illustrative monthly revenue")
  await expect(result).toHaveText("$6,000")
  await expect(page.locator("#calculator")).toContainText("60")
  await page.getByLabel("Incoming calls per month",{exact:true}).fill("400")
  await expect(result).toHaveText("$12,000")
  await page.getByLabel("Percentage of calls missed",{exact:true}).fill("-2")
  await expect(result).toHaveText("$0")
  await page.getByRole("button",{name:"Reset to the sample figures"}).click()
  await expect(result).toHaveText("$6,000")
  await page.getByRole("link",{name:"Discuss your assumptions"}).click()
  await expect(page.getByLabel("Interested package")).toHaveValue("ai-receptionist")
})

test("all illustrative scenarios complete and tabs support keyboard navigation", async ({page}) => {
  await page.goto("/#experience")
  const demo=page.getByRole("tablist",{name:"Demo scenarios"})
  for (const name of ["New appointment inquiry", "After-hours question", "Urgent request"]) {
    await demo.getByRole("tab",{name:new RegExp(name)}).click()
    await expect(page.locator("#demo-panel").getByRole("status")).toHaveText("Exchange 1 of 4")
    for (let i=0;i<3;i++) await page.getByRole("button",{name:"Next response"}).click()
    await expect(page.locator("#demo-panel").getByRole("status")).toContainText("Summary ready")
    await page.getByRole("button",{name:"Replay scenario"}).click()
  }
  await demo.getByRole("tab").last().focus()
  await page.keyboard.press("Home")
  await expect(demo.getByRole("tab").first()).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(demo.getByRole("tab").nth(1)).toHaveAttribute("aria-selected","true")
  const system=page.getByRole("group",{name:"System stages"})
  const stages=system.locator("[data-workflow-step]")
  await stages.first().focus()
  await page.keyboard.press("End")
  await expect(stages.last()).toBeFocused()
  await expect(page.locator("#stage-panel")).toContainText("Team Notification")
})

test("network failure retains entries; slow retries disable duplicate clicks", async ({page}) => {
  await page.goto("/contact")
  await fillInquiry(page)
  await page.route("**/contact", async route => {
    if (route.request().method() === "POST") return route.abort("failed")
    return route.continue()
  })
  await page.getByRole("button",{name:"Request a consultation"}).click()
  await expect(page.locator("form [role=alert]")).toContainText("couldn't confirm delivery")
  await expect(page.getByLabel("Full name")).toHaveValue("Browser Test Visitor")
  await expect(page.getByRole("checkbox")).toBeChecked()
  await page.unroute("**/contact")
  await page.route("**/contact", async route => {
    if (route.request().method() === "POST") await new Promise(resolve=>setTimeout(resolve,1000))
    await route.continue()
  })
  await page.getByRole("button",{name:"Request a consultation"}).click()
  await expect(page.getByRole("button",{name:"Sending request…"})).toBeDisabled()
  await expect(page.getByText(/^Reference VN-/)).toBeVisible()
})

test("secondary routes, deep links, browser back, FAQ and industry selections", async ({page}) => {
  await page.goto("/services#website-chatbot")
  await expect(page.locator("#website-chatbot")).toBeInViewport()
  await page.getByRole("navigation",{name:"Primary",exact:true}).getByRole("link",{name:"Pricing"}).click()
  await expect(page).toHaveURL("/pricing")
  await page.goBack()
  await expect(page).toHaveURL(/\/services#website-chatbot$/)
  await page.goto("/services")
  await page.getByRole("button",{name:"Dental",exact:false}).click()
  await expect(page.locator("#industry-detail")).toContainText("prospective patients")
  await page.goto("/how-it-works")
  await page.locator("summary").filter({hasText:"What does VONTE actually do?"}).focus()
  await page.keyboard.press("Enter")
  await expect(page.getByText(/VONTE sets up automation for appointment-driven/)).toBeVisible()
  const response = await page.goto("/does-not-exist")
  expect(response?.status()).toBe(404)
  await page.getByRole("link",{name:"Back to the homepage"}).click()
  await expect(page).toHaveURL("/")
})

for (const width of [320,375,390,430,768,1024,1440]) {
  test(`all pages fit ${width}px without horizontal overflow`,async ({page}) => {
    await page.setViewportSize({width,height:900})
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator("h1")).toBeVisible()
      expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
    }
    await page.goto("/pricing#calculator")
    await page.getByLabel("Incoming calls per month",{exact:true}).fill("100000")
    await page.getByLabel("Average revenue per booked job",{exact:true}).fill("1000000")
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

for (const width of [390,1440]) {
  test(`WCAG automated checks on all pages at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900})
    for (const route of routes) {
      await page.goto(route)
      const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze()
      expect(result.violations, `${route}: ${JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`).toEqual([])
    }
  })
}

test("touch controls, reduced motion, and a browser without randomUUID", async ({browser}) => {
  const context = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, reducedMotion:"reduce" })
  const page = await context.newPage()
  await page.addInitScript(() => { Object.defineProperty(Crypto.prototype,"randomUUID",{value:undefined,configurable:true}) })
  await page.goto("http://127.0.0.1:3850/")
  await page.getByRole("button",{name:"Open menu"}).tap()
  await page.getByRole("navigation",{name:"Mobile",exact:true}).getByRole("link",{name:"Pricing"}).tap()
  await expect(page).toHaveURL(/\/pricing$/)
  const slider = page.getByRole("slider",{name:"Incoming calls per month slider"})
  await slider.scrollIntoViewIfNeeded()
  const bounds = await slider.boundingBox()
  expect(bounds!.height).toBeGreaterThanOrEqual(44)
  await slider.tap({position:{x:Math.floor(bounds!.width*.7),y:22}})
  expect(Number(await page.getByLabel("Incoming calls per month",{exact:true}).inputValue())).toBeGreaterThan(200)
  await page.getByRole("link",{name:"Discuss your assumptions"}).tap()
  await expect(page.getByLabel("Interested package")).toHaveValue("ai-receptionist")
  await expect(page.locator('input[name="submissionId"]')).toHaveValue(/^[0-9a-f-]{36}$/)
  await page.goto("http://127.0.0.1:3850/")
  expect(await page.locator(".rise").first().evaluate(el=>getComputedStyle(el).animationName)).toBe("none")
  expect(await page.locator("html").evaluate(el=>getComputedStyle(el).scrollBehavior)).toBe("auto")
  expect(await page.locator(".hero-actions a").first().evaluate(el=>parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThanOrEqual(0.00002)
  await context.close()
})
