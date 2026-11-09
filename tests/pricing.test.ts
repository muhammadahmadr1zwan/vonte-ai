import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  completePackage,
  completeSavings,
  getPackage,
  packages,
  separatePurchase,
} from "../src/lib/pricing"

describe("pricing", () => {
  it("matches the published package prices", () => {
    assert.deepEqual(
      packages.map((item) => [item.id, item.setup, item.monthly]),
      [
        ["ai-receptionist", 2500, 997],
        ["lead-follow-up", 1500, 497],
        ["website-chatbot", 3500, 297],
        ["vonte-complete", 5500, 1497],
      ],
    )
  })

  it("prices Vonte Complete from the three separate packages", () => {
    assert.equal(separatePurchase.setup, 7500)
    assert.equal(separatePurchase.monthly, 1791)
    assert.equal(completeSavings.setup, 2000)
    assert.equal(completeSavings.monthly, 294)
    assert.equal(completePackage.setup, separatePurchase.setup - 2000)
    assert.equal(completePackage.monthly, separatePurchase.monthly - 294)
  })

  it("looks up a package by id", () => {
    assert.equal(getPackage("ai-receptionist")?.monthly, 997)
    assert.equal(getPackage("missing"), undefined)
  })
})
