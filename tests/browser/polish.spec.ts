import { test, expect } from "@playwright/test"
import { packages } from "../../src/lib/pricing"

for (const width of [320, 1440]) {
  test(`short homepage retains service and package journeys at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/")
    await expect(page.locator("h1")).toHaveText("Every Opportunity. Answered.")
    const cards = page.locator("#solutions article")
    await expect(cards).toHaveCount(3)
    for (let i = 0; i < 3; i++) {
      await page.goto("/")
      const item = packages[i]
      const card = page.locator("#solutions article").nth(i)
      await expect(card.getByRole("listitem")).toHaveCount(4)
      await card.getByRole("link").click()
      await expect(page).toHaveURL(new RegExp(`/services#${item.id}$`))
      await expect(page.locator(`section#${item.id}:visible`)).toBeInViewport()
    }
    for (const item of packages) {
      await page.goto("/")
      await page.locator(`#pricing article#${item.id}`).getByRole("link", { name: "Discuss package" }).click()
      await expect(page.getByLabel("Interested package")).toHaveValue(item.id)
    }
    await page.goto("/")
    await expect(page.locator("#calculator")).toHaveCount(0)
    await expect(page.getByRole("button", { name: "Dental", exact: false })).toHaveCount(0)
    await expect(page.locator("#service-boundaries")).toContainText("Not a replacement for emergency services")
    await expect(page.locator("#service-boundaries")).toContainText("Does not diagnose, quote")
    const steps = page.getByRole("group", { name: "System stages" }).locator("[data-workflow-step]")
    await expect(steps).toHaveCount(5)
    await steps.last().click()
    await expect(page.locator("#stage-panel")).toContainText("Team Notification")
    await steps.first().focus()
    await page.keyboard.press("ArrowRight")
    await expect(steps.nth(1)).toBeFocused()
    await expect(steps.nth(1)).toHaveAttribute("aria-expanded", "true")
    await page.locator("#system").getByRole("link", { name: "Explore the full workflow" }).click()
    await expect(page).toHaveURL(/\/how-it-works#system$/)
  })
}

test("header consultation action yields to the visible page action", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  const headerCall = page.locator("header").getByRole("link", { name: "Book a Strategy Call" })
  await expect(page.locator("main").getByRole("link", { name: "Book a Strategy Call" }).first()).toBeInViewport()
  await expect(headerCall).not.toBeVisible()
  await page.locator("#system h2").scrollIntoViewIfNeeded()
  await expect(headerCall).toBeVisible()
  await headerCall.focus()
  const finalCall = page.locator("main").getByRole("link", { name: "Book a Strategy Call", exact: true }).last()
  await finalCall.scrollIntoViewIfNeeded()
  await expect(headerCall).toBeVisible()
  await finalCall.focus()
  await expect(headerCall).not.toBeVisible()
  await page.setViewportSize({ width: 320, height: 812 })
  await page.goto("/")
  await expect(page.locator("header").getByRole("link", { name: "Book a Strategy Call" })).toHaveCount(0)
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.getByRole("dialog").getByRole("link", { name: "Book a Strategy Call" })).toBeVisible()
})

test("all routes have aligned social metadata, semantic headings and valid internal links", async ({ page, request }) => {
  const links = new Set<string>()
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()) })
  for (const route of ["/", "/services", "/how-it-works", "/pricing", "/contact"]) {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.locator("main h1")).toHaveCount(1)
    const title = await page.title()
    expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBe(title)
    expect(await page.locator('meta[property="og:description"]').getAttribute("content")).toBe(await page.locator('meta[name="description"]').getAttribute("content"))
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/)
    const levels = await page.locator("main h1, main h2, main h3, main h4").evaluateAll(headings => headings.map(h => Number(h.tagName[1])))
    for (let i = 1; i < levels.length; i++) expect(levels[i], `${route} heading sequence ${levels}`).toBeLessThanOrEqual(levels[i - 1] + 1)
    const hrefs = await page.locator("a[href]").evaluateAll(anchors => anchors.map(a => a.getAttribute("href")!).filter(href => href.startsWith("/") || href.startsWith("#")))
    hrefs.forEach(href => links.add(href.startsWith("#") ? route + href : href))
  }
  for (const href of links) {
    const [target, hash] = href.split("#")
    const response = await request.get(target || "/")
    expect(response.status(), href).toBe(200)
    if (hash) expect(await response.text(), href).toContain(`id="${hash}"`)
  }
  expect(errors).toEqual([])
})
