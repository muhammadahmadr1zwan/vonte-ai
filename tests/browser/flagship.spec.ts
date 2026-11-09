import { test, expect } from "@playwright/test"
import { packages, completeSavings } from "../../src/lib/pricing"

for (const width of [375, 390, 768, 1024, 1440]) {
  test(`complete navigation and direct System link at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on("pageerror", error => errors.push(error.message))
    await page.goto("/#system")
    await page.reload()
    const header = page.locator("header")
    await expect(header).toBeInViewport()
    await expect.poll(async () => (await page.locator("#system").boundingBox())!.y).toBeGreaterThanOrEqual(81)
    expect((await page.locator("#system").boundingBox())!.y).toBeLessThan(160)
    const nav = page.getByRole("navigation", { name: width < 1024 ? "Mobile" : "Primary", exact: true })
    if (width < 1024) {
      const trigger = page.getByRole("button", { name: "Open menu" })
      await trigger.click()
      await expect(trigger).toHaveAttribute("aria-expanded", "true")
      await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused()
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden")
      await page.keyboard.press("Escape")
      await expect(trigger).toHaveAttribute("aria-expanded", "false")
      await expect(trigger).toBeFocused()
      await trigger.click()
    }
    for (const label of ["Home", "Services", "The System", "How It Works", "Pricing", "Contact"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible()
    }
    await nav.getByRole("link", { name: "The System", exact: true }).click()
    if (width < 1024) {
      await expect(page.getByRole("dialog", { name: "Menu" })).not.toBeVisible()
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
    }
    // Cross-route anchors must work as well as an initial browser request.
    await page.goto("/contact")
    if (width < 1024) await page.getByRole("button", { name: "Open menu" }).click()
    await nav.getByRole("link", { name: "The System", exact: true }).click()
    await expect(page).toHaveURL(/\/#system$/)
    await expect(page.locator("#system h2")).toBeInViewport()
    expect((await header.boundingBox())!.y).toBe(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(errors).toEqual([])
  })
}

for (const width of [390, 1440]) {
  test(`all six workflow stages reveal the correct example at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/#system")
    const steps = page.getByRole("group", { name: "System stages" }).locator("[data-workflow-step]")
    const names = ["Incoming Inquiry", "Intelligent Response", "Lead Qualification", "Automated Follow-Up", "Booking Request", "Business Notification"]
    const evidence = ["Sample conversation", "Scripted reply", "Routine · No immediate danger", "The sequence pauses", "Awaiting confirmation", "Owner summary"]
    for (let i = 0; i < names.length; i++) {
      await steps.nth(i).click()
      await expect(steps.nth(i)).toHaveAttribute("aria-expanded", "true")
      await expect(page.locator("#stage-panel h3")).toHaveText(names[i])
      await expect(page.locator("#stage-panel")).toContainText(evidence[i])
      if (width < 640) {
        const button = (await steps.nth(i).boundingBox())!
        const panel = (await page.locator("#stage-panel").boundingBox())!
        expect(panel.y - button.y - button.height).toBeLessThan(20)
      }
    }
    await steps.last().focus()
    await page.keyboard.press("Home")
    await expect(steps.first()).toBeFocused()
    await page.keyboard.press("ArrowDown")
    await expect(steps.nth(1)).toBeFocused()
    await expect(steps.nth(1)).toHaveAttribute("aria-expanded", "true")
    await page.keyboard.press("End")
    await page.getByRole("button", { name: "Back to the beginning" }).click()
    await expect(steps.first()).toHaveAttribute("aria-expanded", "true")
    await page.locator("#system").getByRole("link", { name: "Map your workflow" }).click()
    await expect(page).toHaveURL(/\/contact$/)
  })

  test(`every published price and package CTA agrees at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const item of packages) {
      await page.goto("/pricing")
      const card = page.locator(`#pricing article#${item.id}`)
      await expect(card).toContainText(`$${item.setup.toLocaleString("en-US")} one-time setup`)
      await expect(card).toContainText(`$${item.monthly.toLocaleString("en-US")}`)
      if (item.featured) await expect(card).toContainText("Complete Solution")
      await card.getByRole("link", { name: "Discuss package" }).click()
      await expect(page.getByLabel("Interested package")).toHaveValue(item.id)
      await expect(page.locator("aside")).toContainText(`$${item.monthly.toLocaleString("en-US")} per month`)
    }
    expect(completeSavings).toEqual({ setup: 2000, monthly: 294 })
    await page.goto("/services#solution-vonte-complete")
    await page.getByRole("link", { name: "Discuss Vonte Complete" }).click()
    await expect(page.getByLabel("Interested package")).toHaveValue("vonte-complete")
  })
}
