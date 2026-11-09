import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { describe, it } from "node:test"

import { parseInquiry } from "../src/lib/inquiry-schema"
import {
  createInquiryRecord,
  rateLimit,
  resetRateLimit,
  saveInquiry,
} from "../src/lib/inquiries"

function form(values: Record<string, string>) {
  const data = new FormData()
  for (const [key, value] of Object.entries(values)) data.set(key, value)
  return data
}

const valid = {
  fullName: "Amina Cole",
  businessName: "Cole Heating",
  email: "amina@coleheating.example",
  phone: "(404) 555-0134",
  industry: "home-services",
  website: "coleheating.example",
  packageId: "ai-receptionist",
  challenge: "We miss calls while the crew is on a job.",
  contactMethod: "email",
  consent: "yes",
}

describe("inquiry validation", () => {
  it("accepts a complete request", () => {
    const parsed = parseInquiry(form(valid))
    assert.equal(parsed.success, true)
    if (parsed.success) {
      assert.equal(parsed.data.packageId, "ai-receptionist")
    }
  })

  it("rejects a missing consent and a bad email", () => {
    const parsed = parseInquiry(
      form({ ...valid, email: "not-an-email", consent: "" }),
    )
    assert.equal(parsed.success, false)
    if (!parsed.success) {
      assert.match(parsed.fieldErrors.email ?? "", /email/i)
      assert.match(parsed.fieldErrors.consent ?? "", /consent/i)
    }
  })
})

describe("inquiry storage", () => {
  it("writes a private json record", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "vonte-inquiries-"))
    process.env.INQUIRY_DATA_DIR = dir
    const parsed = parseInquiry(form(valid))
    assert.equal(parsed.success, true)
    if (!parsed.success) return
    const record = createInquiryRecord(parsed.data)
    await saveInquiry(record)
    const raw = await readFile(path.join(dir, `${record.id}.json`), "utf8")
    const stored = JSON.parse(raw) as { reference: string; packageName: string }
    assert.equal(stored.packageName, "AI Receptionist")
    assert.match(stored.reference, /^VN-/)
    await rm(dir, { recursive: true, force: true })
  })
})

describe("rate limit", () => {
  it("blocks once the window is full", () => {
    resetRateLimit()
    assert.equal(rateLimit("test-key", 2, 1000), true)
    assert.equal(rateLimit("test-key", 2, 1000), true)
    assert.equal(rateLimit("test-key", 2, 1000), false)
    resetRateLimit()
  })
})
