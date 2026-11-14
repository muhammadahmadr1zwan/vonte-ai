import { test, expect } from "@playwright/test"

test.describe("purposeful motion", () => {
  test.use({ reducedMotion: "no-preference", viewport: { width: 1440, height: 1000 } })

  test("hero sequence initializes, completes once, and remains inspectable", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("html")).toHaveAttribute("data-motion-allowed", "true")
    const scene = page.getByRole("figure", { name: "Illustrative call-to-booking sequence" })
    await expect(scene).toHaveAttribute("data-playing", "true")
    await expect(scene).toHaveAttribute("data-stage", "4")
    await expect(scene).toHaveAttribute("data-playing", "false")
    await expect(scene.getByRole("status")).toContainText("Owner notified")
    for (const name of ["Incoming call", "AI response", "Lead captured", "Appointment requested", "Owner notified"]) {
      await scene.getByRole("button", { name: `Inspect ${name}`, exact: true }).click()
      await expect(scene.getByRole("status")).toContainText(name)
      await expect(scene).toHaveAttribute("data-playing", "false")
    }
    expect(await page.locator("[data-hero-step]").evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).opacity) === 1))).toBe(true)
    await expect(page.locator("header")).toBeInViewport()
  })

  test("hero entrance never blocks its consultation link", async ({ page }) => {
    await page.goto("/")
    const cta = page.locator(".hero-actions").getByRole("link", { name: "Book a Strategy Call" })
    await cta.click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByLabel("Full name")).toBeVisible()
    await expect(page.locator("header")).toBeVisible()
  })

  test("playback pauses outside the viewport and resumes on return", async ({ page }) => {
    await page.goto("/")
    const scene = page.locator(".inquiry-artboard")
    await expect(scene).toHaveAttribute("data-playing", "true")
    await page.locator("footer").scrollIntoViewIfNeeded()
    await expect(scene).toHaveAttribute("data-playing", "false")
    const stage = await scene.getAttribute("data-stage")
    await page.waitForTimeout(1100)
    await expect(scene).toHaveAttribute("data-stage", stage!)
    await scene.scrollIntoViewIfNeeded()
    await expect(scene).toHaveAttribute("data-playing", "true")
    await scene.getByRole("button", { name: "Pause workflow animation", exact: true }).click()
    const paused = await scene.getAttribute("data-stage")
    await page.waitForTimeout(1000)
    await expect(scene).toHaveAttribute("data-stage", paused!)
  })

  test("service stories play, stop, and never send business transactions", async ({ page }) => {
    const writes: string[] = []
    page.on("request", request => { if (request.method() !== "GET" && request.method() !== "HEAD") writes.push(request.url()) })
    await page.goto("/services")
    for (const kind of ["call", "chat"]) {
      const scene = page.locator(`.${kind}-conversation`)
      await scene.scrollIntoViewIfNeeded()
      await scene.getByRole("button", { name: `Play ${kind} conversation preview`, exact: true }).click()
      await expect(scene).toHaveAttribute("data-stage", "3")
      await expect(scene).toHaveAttribute("data-playing", "false")
      await expect(scene.locator(".service-conversation-line")).toHaveCount(4)
      await scene.getByRole("button", { name: `Next ${kind} conversation preview stage`, exact: true }).click()
      await expect(scene).toHaveAttribute("data-stage", "0")
    }
    const sequence = page.locator(".motion-scene").filter({ has: page.getByRole("group", { name: "follow-up sequence controls" }) })
    await sequence.scrollIntoViewIfNeeded()
    await sequence.getByRole("button", { name: "Play follow-up sequence", exact: true }).click()
    await expect(sequence.getByRole("status")).toContainText("5/5")
    await expect(sequence).toHaveAttribute("data-playing", "false")
    await sequence.getByRole("button", { name: /01 New inquiry/ }).click()
    await expect(sequence.getByRole("status")).toContainText("1/5")
    expect(writes).toEqual([])
  })

  test("process disclosures update the visual and remain keyboard operable", async ({ page }) => {
    await page.goto("/how-it-works")
    const expected = ["Map the inquiry", "Agree the rules", "Connect and verify", "Review and refine"]
    const steps = page.locator(".process-step")
    for (let i = 0; i < 4; i++) {
      const summary = steps.nth(i).locator("summary")
      if (await steps.nth(i).getAttribute("open") === null) {
        await summary.focus()
        await page.keyboard.press("Enter")
      }
      await expect(steps.nth(i)).toHaveAttribute("open", "")
      await expect(page.locator(".process-step[open]")).toHaveCount(1)
      await expect(page.getByRole("region", { name: "Process preview" })).toContainText(expected[i])
      await expect(steps.nth(i).locator(".process-explanation")).toBeVisible()
    }
    await page.setViewportSize({ width: 320, height: 812 })
    await expect(page.locator(".process-visual")).not.toBeVisible()
    await expect(steps.last().locator(".process-explanation")).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })

  test("calculator updates real numbers immediately while visual motion runs", async ({ page }) => {
    await page.goto("/pricing#calculator")
    await page.getByLabel("Incoming calls per month", { exact: true }).fill("400")
    expect(await page.getByLabel("Illustrative monthly revenue").textContent()).toContain("$12,000")
    await page.getByLabel("Percentage of calls missed", { exact: true }).fill("50")
    expect(await page.getByLabel("Illustrative monthly revenue").textContent()).toContain("$20,000")
    expect(await page.locator(".roi-indicator").evaluate(node => (node as HTMLElement).style.transform)).toBe("scaleX(0.5)")
    await page.getByRole("button", { name: "Reset to the sample figures" }).click()
    await expect(page.getByLabel("Illustrative monthly revenue")).toHaveText("$6,000")
  })

  test("scroll reveals and FAQ transitions leave readable content", async ({ page }) => {
    await page.goto("/pricing")
    await page.locator(".pricing-package").last().scrollIntoViewIfNeeded()
    await expect.poll(() => page.locator(".pricing-package").last().evaluate(node => getComputedStyle(node).opacity)).toBe("1")
    await page.goto("/how-it-works")
    const details = page.locator(".faq-details").first()
    await details.locator("summary").focus()
    await page.keyboard.press("Enter")
    await expect(details).toHaveAttribute("open", "")
    await expect(details.locator("p")).toBeVisible()
    await page.keyboard.press("Enter")
    await expect(details).not.toHaveAttribute("open")
  })
})

test("reduced motion disables autoplay without hiding content or manual steps", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("html")).toHaveAttribute("data-motion-allowed", "false")
  const scene = page.locator(".inquiry-artboard")
  await page.waitForTimeout(1000)
  await expect(scene).toHaveAttribute("data-stage", "0")
  await expect(scene).toHaveAttribute("data-playing", "false")
  await expect(scene.getByRole("button", { name: "Play workflow animation", exact: true })).toBeDisabled()
  await scene.getByRole("button", { name: "Inspect Owner notified", exact: true }).click()
  await expect(scene.getByRole("status")).toContainText("Owner notified")
  expect(await page.locator("[data-hero-step]").evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).opacity) === 1))).toBe(true)
  expect(await page.locator(".sequence-wave span").first().evaluate(node => getComputedStyle(node).animationName)).toBe("none")
})

test("motion preference changes stop running sequences and preserve navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.goto("/")
  await expect(page.locator(".inquiry-artboard")).toHaveAttribute("data-playing", "true")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(page.locator(".inquiry-artboard")).toHaveAttribute("data-playing", "false")
  await expect(page.locator("header")).toBeVisible()
  await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Pricing", exact: true }).click()
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})

test("missing Web Animations support leaves readable, usable routes", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(Element.prototype, "animate", { value: undefined, configurable: true }))
  await page.emulateMedia({ reducedMotion: "no-preference" })
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  for (const route of ["/", "/services", "/how-it-works", "/pricing", "/contact"]) {
    await page.goto(route)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator("header")).toBeVisible()
  }
  expect(errors).toEqual([])
})
