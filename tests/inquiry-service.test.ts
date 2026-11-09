import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { mkdtemp, readFile, readdir, rm, stat } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterEach, beforeEach, describe, it, mock } from "node:test"
import { processInquiry } from "../src/lib/inquiry-service"
import { resetRateLimit } from "../src/lib/inquiries"

const valid = { fullName: "Test Visitor", businessName: "Example Service", email: "visitor@example.test", phone: "2025550123", industry: "home-services", website: "", packageId: "ai-receptionist", challenge: "Help answer calls during jobs.", contactMethod: "email", consent: "yes" }
function form(overrides: Record<string, string> = {}) {
  const data = new FormData()
  Object.entries({ ...valid, submissionId: randomUUID(), ...overrides }).forEach(([key, value]) => data.set(key, value))
  return data
}
const envNames = ["INQUIRY_STORAGE", "INQUIRY_DATA_DIR", "INQUIRY_WEBHOOK_URL", "INQUIRY_WEBHOOK_SECRET", "RESEND_API_KEY", "INQUIRY_FROM_EMAIL", "INQUIRY_NOTIFY_EMAIL"]
let dir: string
let savedEnv: Record<string, string | undefined>
beforeEach(async () => {
  savedEnv = Object.fromEntries(envNames.map(key => [key, process.env[key]]))
  envNames.forEach(key => delete process.env[key])
  dir = await mkdtemp(path.join(tmpdir(), "vonte-service-"))
  process.env.INQUIRY_DATA_DIR = dir
  resetRateLimit()
})
afterEach(async () => {
  mock.restoreAll()
  for (const key of envNames) { if (savedEnv[key] === undefined) delete process.env[key]; else process.env[key] = savedEnv[key] }
  await rm(dir, { recursive: true, force: true })
})

describe("inquiry delivery", () => {
  it("persists a validated request with private permissions before returning success", async () => {
    const result = await processInquiry(form(), "visitor")
    assert.equal(result.status, "success")
    const files = await readdir(dir)
    assert.equal(files.length, 1)
    const record = JSON.parse(await readFile(path.join(dir, files[0]), "utf8"))
    assert.equal(record.packageName, "AI Receptionist")
    assert.equal(record.reference, result.reference)
    assert.equal((await stat(path.join(dir, files[0]))).mode & 0o777, 0o600)
  })
  it("atomically deduplicates concurrent retries and sends one notification", async () => {
    process.env.INQUIRY_WEBHOOK_URL = "https://webhook.example.test/inquiry"
    const fetch = mock.method(globalThis, "fetch", async () => new Response(null, {status: 200}))
    const id = randomUUID()
    const results = await Promise.all(Array.from({length: 5}, () => processInquiry(form({submissionId: id}), "visitor")))
    assert.equal(new Set(results.map(r => r.reference)).size, 1)
    assert.ok(results.every(r => r.status === "success"))
    assert.equal((await readdir(dir)).length, 1)
    assert.equal(fetch.mock.callCount(), 1)
  })
  it("does not overwrite an existing record when a token is reused with different details", async () => {
    const id = randomUUID()
    await processInquiry(form({submissionId: id}), "visitor")
    const result = await processInquiry(form({submissionId: id, businessName: "Changed business"}), "visitor")
    assert.equal(result.status, "saved-notify-failed")
    assert.ok(result.reference)
    const record = JSON.parse(await readFile(path.join(dir, `${id}.json`), "utf8"))
    assert.equal(record.businessName, valid.businessName)
  })
  it("rejects invalid data on the server without writing a record", async () => {
    const result = await processInquiry(form({email: "wrong", consent: ""}), "visitor")
    assert.equal(result.status, "error")
    assert.ok(result.fieldErrors.email)
    assert.ok(result.fieldErrors.consent)
    assert.equal((await readdir(dir)).length, 0)
  })
  it("rejects honeypot and implausibly fast submissions", async () => {
    assert.equal((await processInquiry(form({company_fax: "bot"}), "visitor")).status, "error")
    assert.equal((await processInquiry(form({formStarted: String(Date.now())}), "visitor")).status, "error")
    assert.equal((await readdir(dir)).length, 0)
  })
  it("does not confirm a save failure", async () => {
    process.env.INQUIRY_DATA_DIR = "/dev/null/unwritable"
    const result = await processInquiry(form(), "visitor")
    assert.equal(result.status, "error")
    assert.equal(result.reference, undefined)
    assert.match(result.message, /not confirmed/)
  })
  it("keeps the record and reports a webhook failure honestly", async () => {
    process.env.INQUIRY_WEBHOOK_URL = "https://webhook.example.test/inquiry"
    mock.method(globalThis, "fetch", async () => new Response(null, {status: 503}))
    const result = await processInquiry(form(), "visitor")
    assert.equal(result.status, "saved-notify-failed")
    assert.ok(result.reference)
    assert.equal((await readdir(dir)).length, 1)
  })
  it("reports network timeouts without losing the inquiry", async () => {
    process.env.INQUIRY_WEBHOOK_URL = "https://webhook.example.test/inquiry"
    mock.method(globalThis, "fetch", async () => { throw new DOMException("Timed out", "TimeoutError") })
    assert.equal((await processInquiry(form(), "visitor")).status, "saved-notify-failed")
    assert.equal((await readdir(dir)).length, 1)
  })
  it("reports partial email configuration without sending email", async () => {
    process.env.INQUIRY_NOTIFY_EMAIL = "owner@example.test"
    const fetch = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected external request") })
    assert.equal((await processInquiry(form(), "visitor")).status, "saved-notify-failed")
    assert.equal(fetch.mock.callCount(), 0)
  })
  it("rate limits repeated valid submissions", async () => {
    for (let i = 0; i < 30; i++) await processInquiry(form(), "visitor")
    const result = await processInquiry(form(), "visitor")
    assert.equal(result.status, "error")
    assert.match(result.message, /Too many/)
    assert.equal((await readdir(dir)).length, 30)
  })
})
