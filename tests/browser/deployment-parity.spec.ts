import { test, expect } from "@playwright/test"

for (const width of [390, 768, 1440]) {
  test(`restored workflow boundaries and all service disclosures work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto("/")
    const scene = page.getByRole("figure", { name: "Illustrative call-to-booking sequence" })
    const previous = scene.getByRole("button", { name: "Previous workflow animation stage", exact: true })
    const next = scene.getByRole("button", { name: "Next workflow animation stage", exact: true })
    await expect(previous).toBeDisabled()
    await next.click()
    await expect(scene.getByRole("status")).toContainText("checks the need")
    await previous.click()
    await expect(scene).toHaveAttribute("data-stage", "0")
    await scene.getByRole("button", { name: "Inspect Owner notified", exact: true }).click()
    await expect(next).toBeDisabled()
    await expect(scene.getByRole("status")).toContainText("owner to review")
    await page.goto("/services")
    for (const name of ["AI Receptionist", "Lead Follow-Up & Reactivation", "Website & AI Chatbot"]) {
      const summary = page.locator("summary").filter({ hasText: name })
      const details = page.locator("details.service-details").filter({ has: summary })
      await expect(details).not.toHaveAttribute("open")
      await summary.focus()
      await page.keyboard.press("Enter")
      await expect(details).toHaveAttribute("open", "")
      await expect(details.locator("p").first()).toBeVisible()
      await summary.click()
      await expect(details).not.toHaveAttribute("open")
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test("build identity is served without caching or unexpected fields", async ({ request }) => {
  const response = await request.get("/build-info.json")
  expect(response.ok()).toBe(true)
  expect(response.headers()["cache-control"]).toContain("no-store")
  const info = await response.json()
  expect(Object.keys(info).sort()).toEqual(["builtAt", "commit", "context", "environment", "sourceDirty", "version"])
  expect(info.commit).toMatch(/^[0-9a-f]{40,64}$/)
  expect(Number.isNaN(Date.parse(info.builtAt))).toBe(false)
})
