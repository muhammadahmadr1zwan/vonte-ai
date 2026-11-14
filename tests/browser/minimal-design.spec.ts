import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { DEFAULT_DIRECTION } from "../../src/lib/visual-directions"

test("design comparisons and palette query overrides are unavailable in production", async ({ page, request }) => {
  expect((await request.get("/design-lab")).status()).toBe(404)
  const otherDirection = DEFAULT_DIRECTION === "obsidian" ? "ice" : "obsidian"
  await page.goto(`/?direction=${otherDirection}`)
  await expect(page.locator("html")).toHaveAttribute("data-theme", DEFAULT_DIRECTION)
  await expect(page.locator("html")).not.toHaveAttribute("data-design-ready")
  await expect(page.locator("[data-design-lab], iframe")).toHaveCount(0)
  await expect(page.getByRole("link", { name: /design study/i })).toHaveCount(0)
  await expect(page.locator("h1")).toHaveText("Every Opportunity. Answered.")
})

test("the redesigned hero keeps its primary action visible and the secondary action reaches the workflow", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 812 })
    await page.goto("/")
    const hero = page.locator(".hero-shell")
    const action = hero.getByRole("link", { name: "Book a Strategy Call" })
    await expect(action).toBeInViewport()
    await expect(hero.getByText("Scripted example. No call, message, or calendar event is created.")).toBeVisible()
    await hero.getByRole("link", { name: "Explore VONTE" }).click()
    await expect(page).toHaveURL(/\/#system$/)
    await expect(page.locator("#system h2")).toBeInViewport()
  }
})

test("invalid inquiry feedback remains accessible on the dark form", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/contact?package=vonte-complete")
  await page.getByRole("button", { name: "Request a consultation" }).click()
  await expect(page.locator("#email-error")).toBeVisible()
  await expect(page.getByLabel("Business email")).toHaveAttribute("aria-invalid", "true")
  const results = await new AxeBuilder({ page }).include("form").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()
  expect(results.violations).toEqual([])
})
