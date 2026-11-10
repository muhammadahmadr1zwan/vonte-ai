import { test, expect, type Page } from "@playwright/test"
import { readFile } from "node:fs/promises"
import path from "node:path"

async function fillRequest(page: Page) {
  for (const [name, value] of [["Full name", "Pending Audit Visitor"], ["Business name", "Audit example business"], ["Business email", "qa@example.test"], ["Phone number", "2025550123"], ["Main challenge or goal", "Help capture calls when the team is with a customer."]]) {
    await page.getByLabel(name, { exact: true }).fill(value)
  }
  await page.getByLabel("Industry", { exact: true }).selectOption("home-services")
  await page.getByRole("checkbox").check()
  await page.waitForTimeout(1300)
}

test("pending submissions freeze the snapshot and failure restores editable details for a real retry", async ({ page }) => {
  await page.goto("/contact?package=vonte-complete")
  await fillRequest(page)
  const id = await page.locator('input[name="submissionId"]').inputValue()
  await page.route("**/contact*", async route => {
    if (route.request().method() !== "POST") return route.continue()
    await new Promise(resolve => setTimeout(resolve, 1500))
    await route.abort("failed")
  })
  await page.getByRole("button", { name: "Request a consultation" }).click()
  await expect(page.getByRole("button", { name: "Sending request…" })).toBeDisabled()
  for (const label of ["Full name", "Business email", "Interested package", "Main challenge or goal"]) await expect(page.getByLabel(label, { exact: true })).toBeDisabled()
  await expect(page.getByRole("checkbox")).toBeDisabled()
  await expect(page.locator("form [role=alert]")).toContainText("couldn't confirm delivery")
  await expect(page.getByLabel("Full name", { exact: true })).toBeEnabled()
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Pending Audit Visitor")
  await expect(page.getByRole("checkbox")).toBeChecked()
  await page.unroute("**/contact*")
  await page.getByRole("button", { name: "Request a consultation" }).click()
  await expect(page.getByText(/^Reference VN-/)).toBeVisible()
  const saved = JSON.parse(await readFile(path.resolve(`test-results/inquiries/${id}.json`), "utf8"))
  expect(saved).toMatchObject({ fullName: "Pending Audit Visitor", packageId: "vonte-complete", consent: "yes" })
})

test("navigation and conversion work without IntersectionObserver", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "IntersectionObserver", { value: undefined, configurable: true }))
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()
  await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Pricing", exact: true }).click()
  await expect(page).toHaveURL(/\/pricing$/)
  await page.getByLabel("Incoming calls per month", { exact: true }).fill("400")
  await expect(page.getByLabel("Illustrative monthly revenue")).toHaveText("$12,000")
  await page.getByRole("link", { name: "Discuss your assumptions" }).click()
  await expect(page.getByLabel("Interested package")).toHaveValue("ai-receptionist")
  expect(errors).toEqual([])
})

test("System gets a location state and route navigation restores page states", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/#system")
  const nav = page.getByRole("navigation", { name: "Primary", exact: true })
  await expect(nav.getByRole("link", { name: "The System", exact: true })).toHaveAttribute("aria-current", "location")
  await expect(nav.getByRole("link", { name: "Home", exact: true })).not.toHaveAttribute("aria-current")
  await page.locator("h1").scrollIntoViewIfNeeded()
  await expect(nav.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page")
  await nav.getByRole("link", { name: "The System", exact: true }).click()
  await expect(nav.getByRole("link", { name: "The System", exact: true })).toHaveAttribute("aria-current", "location")
  await nav.getByRole("link", { name: "Pricing", exact: true }).click()
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.getByRole("heading", { name: "A clear investment. A connected business." })).toBeVisible()
  await expect(nav.getByRole("link", { name: "Pricing", exact: true })).toHaveAttribute("aria-current", "page")
  await page.goBack()
  await expect(page).toHaveURL(/\/#system$/)
  await expect(page.locator("#system:visible h2")).toBeInViewport()
  await expect(nav.getByRole("link", { name: "The System", exact: true })).toHaveAttribute("aria-current", "location")
  await page.locator("footer").getByRole("link", { name: "The System", exact: true }).click()
  await expect(page.locator("#system:visible h2")).toBeInViewport()
})

test("mobile industry selection puts the explanation beneath one native control", async ({ page }) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/services")
    const select = page.getByLabel("Explore an industry", { exact: true })
    await select.selectOption({ label: "Dental" })
    await expect(page.locator("#industry-detail h3")).toHaveText("Dental")
    await expect(page.locator("#industry-detail")).toContainText("prospective patients")
    await expect(page.locator("#industry-detail")).toContainText("does not provide medical or dental advice")
    expect((await select.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    const control = await select.boundingBox(), detail = await page.locator("#industry-detail").boundingBox()
    expect(detail!.y - control!.y - control!.height).toBeLessThan(30)
  }
})

test("completed demo scenarios lead to the correct receptionist inquiry", async ({ page }) => {
  for (const name of ["New appointment inquiry", "After-hours question", "Urgent request"]) {
    await page.goto("/#experience")
    await page.getByRole("tab", { name: new RegExp(name) }).click()
    await page.getByRole("button", { name: "Show full exchange" }).click()
    await expect(page.locator("#demo-panel")).toContainText("Summary ready")
    await page.getByRole("link", { name: "Discuss this receptionist workflow" }).click()
    await expect(page.getByLabel("Interested package")).toHaveValue("ai-receptionist")
  }
})

test("mobile package summary stays above the form and footer links have comfortable targets", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/contact?package=vonte-complete")
  const summary = page.locator("[data-package-summary]:visible")
  await expect(summary).toContainText("$5,500 setup · $1,497 per month")
  const form = await page.locator("form").boundingBox()
  const bounds = await summary.boundingBox()
  expect(bounds!.y + bounds!.height).toBeLessThan(form!.y)
  await page.getByLabel("Interested package").selectOption("lead-follow-up")
  await expect(summary).toContainText("$1,500 setup · $497 per month")
  for (const link of await page.locator("footer a").all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  await page.goto("/")
  expect(await page.locator(".rise").first().evaluate(el => getComputedStyle(el).animationName)).toBe("none")
})

test("touch menu works in portrait and landscape without leaving the page locked", async ({ browser }) => {
  const context = await browser.newContext({ isMobile: true, hasTouch: true, viewport: { width: 375, height: 812 } })
  const page = await context.newPage()
  for (const size of [{ width: 375, height: 812 }, { width: 430, height: 320 }]) {
    await page.setViewportSize(size)
    await page.goto("http://127.0.0.1:3850/")
    await page.getByRole("button", { name: "Open menu" }).tap()
    const action = page.getByRole("dialog").getByRole("link", { name: "Book a Strategy Call" })
    await action.scrollIntoViewIfNeeded()
    await action.tap()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByRole("dialog")).not.toBeVisible()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
  }
  await context.close()
})

test("every follow-up step responds to the keyboard without sending messages", async ({ page }) => {
  await page.goto("/services#lead-follow-up")
  const posts: string[] = []
  page.on("request", request => { if (request.method() === "POST") posts.push(request.url()) })
  const sequence = page.getByRole("list", { name: "Follow-up sequence" })
  const buttons = sequence.getByRole("button")
  const states = ["Captured", "Acknowledged", "Continuing", "Qualified", "Requested"]
  for (let i = 0; i < states.length; i++) {
    await buttons.nth(i).focus()
    await page.keyboard.press("Enter")
    await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true")
    await expect(page.locator("#lead-follow-up").getByText(states[i], { exact: true })).toBeVisible()
  }
  await expect(page.locator("#lead-follow-up")).toContainText("does not write to a calendar")
  expect(posts).toEqual([])
})
