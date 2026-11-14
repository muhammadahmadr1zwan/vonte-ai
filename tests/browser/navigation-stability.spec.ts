import { test, expect } from "@playwright/test"

const routes = ["/", "/services", "/how-it-works", "/pricing", "/contact"]
const links = ["Home", "Services", "The System", "How It Works", "Pricing", "Contact"]

for (const width of [390, 1440]) for (const route of routes) {
  test(`shared navigation survives reload and route/back navigation: ${route} at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(route)
    await page.reload()
    await expect(page.locator("[data-site-header]")).toBeVisible()
    const nav = page.getByRole("navigation", { name: width < 1024 ? "Mobile" : "Primary", exact: true })
    if (width < 1024) await page.getByRole("button", { name: "Open menu" }).click()
    for (const name of links) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible()
    const target = route === "/pricing" ? "Services" : "Pricing"
    await nav.getByRole("link", { name: target, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(target === "Services" ? "/services$" : "/pricing$"))
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator("header")).toBeVisible()
    await expect(page.getByRole("dialog", { name: "Menu" })).not.toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(new RegExp(route === "/" ? "/$" : `${route}$`))
    await expect(page.locator("header")).toBeVisible()
    await page.locator("footer").scrollIntoViewIfNeeded()
    await expect(page.locator("header")).toBeInViewport()
    if (width < 1024) {
      await page.getByRole("button", { name: "Open menu" }).click()
      await expect(nav.getByRole("link", { name: "Contact", exact: true })).toBeVisible()
      await page.keyboard.press("Escape")
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused()
    }
  })
}

test("a retained, hidden design-lab node cannot hide shared site navigation", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => {
    const retained = document.createElement("div")
    retained.hidden = true
    retained.dataset.designLab = ""
    document.querySelector("main")!.append(retained)
  })
  await expect(page.locator("header")).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Primary", exact: true })).toBeVisible()
  await expect(page.locator("footer")).toBeVisible()
})

test("native mobile navigation works when JavaScript is unavailable", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 375, height: 812 } })
  const page = await context.newPage()
  await page.goto("/services")
  await page.getByRole("button", { name: "Open menu" }).click()
  const nav = page.getByRole("navigation", { name: "Mobile fallback", exact: true })
  for (const name of links) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible()
  await nav.getByRole("link", { name: "Pricing", exact: true }).click()
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.locator("header")).toBeVisible()
  await page.getByRole("button", { name: "Open menu" }).click()
  await page.getByRole("button", { name: "Close menu" }).click()
  await expect(nav).not.toBeVisible()
  await context.close()
})

test("legacy media-query subscriptions do not unmount the header", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(MediaQueryList.prototype, "addEventListener", { value: undefined, configurable: true }))
  const errors: string[] = []
  page.on("pageerror", e => errors.push(e.message))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.locator("header")).toBeVisible()
  expect(errors).toEqual([])
})

test("browsers without modal dialog support retain a working native menu", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(HTMLDialogElement.prototype, "showModal", { value: undefined, configurable: true }))
  await page.setViewportSize({ width: 430, height: 320 })
  await page.goto("/contact")
  await page.getByRole("button", { name: "Open menu" }).click()
  const nav = page.getByRole("navigation", { name: "Mobile fallback", exact: true })
  await nav.getByRole("link", { name: "Services", exact: true }).click()
  await expect(page).toHaveURL(/\/services$/)
  await expect(page.locator("header")).toBeVisible()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
})


test("the keyboard skip link stays above the sticky header", async ({ page }) => {
  await page.goto("/")
  await page.keyboard.press("Tab")
  const skip = page.getByRole("link", { name: "Skip to content" })
  await expect(skip).toBeFocused()
  expect(await skip.evaluate(node => {
    const rect = node.getBoundingClientRect()
    return node.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2))
  })).toBe(true)
  await page.keyboard.press("Enter")
  await expect(page).toHaveURL(/#main$/)
})


test("a menu opened before hydration keeps correct state and closes after scripts arrive", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()) })
  let release!: () => void
  const scripts = new Promise<void>(resolve => { release = resolve })
  await page.route("**/_next/static/**", async route => {
    if (route.request().resourceType() === "script") await scripts
    await route.continue()
  })
  await page.goto("/", { waitUntil: "commit" })
  await page.getByRole("button", { name: "Open menu" }).click()
  const fallback = page.getByRole("navigation", { name: "Mobile fallback", exact: true })
  await expect(fallback).toBeVisible()
  release()
  await expect(page.locator("html")).toHaveAttribute("data-ui-ready", "true")
  await expect(page.locator(".mobile-menu-trigger")).toHaveAttribute("aria-expanded", "true")
  expect(errors).toEqual([])
  await page.getByRole("button", { name: "Close menu" }).click()
  await expect(fallback).not.toBeVisible()
  await expect(page.getByRole("dialog", { name: "Menu" })).not.toBeVisible()
  await page.getByRole("button", { name: "Open menu" }).click()
  await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Pricing", exact: true }).click()
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.locator("header")).toBeVisible()
})
