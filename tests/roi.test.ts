import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { calculateRoi, roiDefaults, sanitizeRoi } from "../src/lib/roi"

describe("roi calculator", () => {
  it("matches the executive-plan sample", () => {
    const result = calculateRoi({ ...roiDefaults })
    assert.equal(result.missedCalls, 60)
    assert.equal(result.potentialBookings, 15)
    assert.equal(result.illustrativeRevenue, 6000)
  })

  it("rejects negative and non-numeric values", () => {
    const safe = sanitizeRoi({
      callsPerMonth: -20,
      missedPercent: Number.NaN,
      bookingPercent: 140,
      averageJobValue: -5,
    })
    assert.deepEqual(safe, {
      callsPerMonth: 0,
      missedPercent: 0,
      bookingPercent: 100,
      averageJobValue: 0,
    })
    assert.deepEqual(calculateRoi(safe), {
      missedCalls: 0,
      potentialBookings: 0,
      illustrativeRevenue: 0,
    })
  })
})
