import { defineConfig } from "@playwright/test"
import { existsSync } from "node:fs"
import path from "node:path"

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 2,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["json", {outputFile: "test-results/browser-results.json"}]],
  use: {
    baseURL: "http://127.0.0.1:3850",
    browserName: "chromium",
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined), args: ["--no-sandbox"] },
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npx next start --hostname 127.0.0.1 --port 3850",
    url: "http://127.0.0.1:3850",
    reuseExistingServer: false,
    env: { INQUIRY_DATA_DIR: path.resolve("test-results/inquiries"), INQUIRY_WEBHOOK_URL: "", INQUIRY_WEBHOOK_SECRET: "", RESEND_API_KEY: "", INQUIRY_FROM_EMAIL: "", INQUIRY_NOTIFY_EMAIL: "" },
  },
})
