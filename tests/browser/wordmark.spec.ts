import { test, expect } from "@playwright/test"

const routes = ["/", "/services", "/how-it-works", "/pricing", "/contact"]

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`official wordmark, links and navigation remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    const failedAssets: string[] = []
    page.on("pageerror", error => errors.push(error.message))
    page.on("response", response => {
      if (response.status() >= 400 && /\.(png|webp|svg)(\?|$)/.test(response.url())) failedAssets.push(response.url())
    })
    for (const route of routes) {
      await page.goto(route)
      const header = page.locator("[data-site-header]")
      const logo = header.locator("img[data-vonte-wordmark]").first()
      await expect(logo).toBeVisible()
      await expect(logo).toHaveAccessibleName("VONTE")
      await expect(header.getByRole("link", { name: "VONTE home", exact: true })).toHaveAttribute("href", "/")
      await expect.poll(() => logo.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true)
      const geometry = await logo.evaluate((node: HTMLImageElement) => {
        const r = node.getBoundingClientRect()
        return { x: r.x, right: r.right, width: r.width, height: r.height, ratio: node.naturalWidth / node.naturalHeight }
      })
      expect(geometry.width / geometry.height).toBeCloseTo(geometry.ratio, 1)
      expect(geometry.x).toBeGreaterThanOrEqual(0)
      expect(geometry.right).toBeLessThanOrEqual(width)
      expect(await header.evaluate(node => node.getBoundingClientRect().height)).toBe(81)
      if (width < 1024) {
        const trigger = page.getByRole("button", { name: "Open menu", exact: true })
        await expect(trigger).toBeVisible()
        expect(geometry.right).toBeLessThan((await trigger.boundingBox())!.x)
        await trigger.click()
        const dialog = page.getByRole("dialog", { name: "Menu", exact: true })
        await expect(dialog.getByRole("img", { name: "VONTE", exact: true })).toBeVisible()
        await expect(dialog.getByRole("link", { name: "Contact", exact: true })).toBeVisible()
        await page.keyboard.press("Escape")
        await expect(dialog).not.toBeVisible()
        await expect(trigger).toBeFocused()
      } else {
        await expect(page.getByRole("navigation", { name: "Primary", exact: true })).toBeVisible()
      }
      const footer = page.locator("footer")
      const footerLogo = footer.getByRole("img", { name: "VONTE", exact: true })
      await footer.scrollIntoViewIfNeeded()
      await expect(footerLogo).toBeVisible()
      await expect(footer.getByRole("link", { name: "VONTE home", exact: true })).toHaveAttribute("href", "/")
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.locator("footer").getByRole("link", { name: "VONTE home", exact: true }).click()
    await expect(page).toHaveURL("/")
    expect(errors).toEqual([])
    expect(failedAssets).toEqual([])
  })
}

test("official source artwork has transparent padding, white lettering and the registered mark", async ({ page }) => {
  await page.goto("/")
  const image = page.locator("header img[data-vonte-wordmark]").first()
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true)
  const pixels = await image.evaluate((node: HTMLImageElement) => {
    const canvas = document.createElement("canvas")
    canvas.width = node.naturalWidth; canvas.height = node.naturalHeight
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(node, 0, 0)
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0, dark = 0, registered = 0
    for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4
      if (data[i + 3] === 0) clear++
      if (data[i + 3] > 200 && Math.min(data[i], data[i + 1], data[i + 2]) < 230) dark++
      if (x >= 904 && x < 944 && y >= 29 && y < 69 && data[i + 3] > 128) registered++
    }
    return { width: canvas.width, height: canvas.height, clearFraction: clear / (canvas.width * canvas.height), dark, registered, cornerAlpha: data[3] }
  })
  expect(pixels.width).toBe(956)
  expect(pixels.height).toBe(96)
  expect(pixels.clearFraction).toBeGreaterThan(0.8)
  expect(pixels.dark).toBe(0)
  expect(pixels.cornerAlpha).toBe(0)
  expect(pixels.registered).toBeGreaterThan(200)
})

test("social artwork and existing square icons still resolve as images", async ({ request }) => {
  for (const route of ["/opengraph-image", "/icon", "/apple-icon"]) {
    const response = await request.get(route)
    expect(response.ok(), route).toBe(true)
    expect(response.headers()["content-type"]).toContain("image/png")
    expect((await response.body()).length).toBeGreaterThan(100)
  }
})
