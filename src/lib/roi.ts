export const roiDefaults = {
  callsPerMonth: 200,
  missedPercent: 30,
  bookingPercent: 25,
  averageJobValue: 400,
} as const

export type RoiInput = {
  callsPerMonth: number
  missedPercent: number
  bookingPercent: number
  averageJobValue: number
}

export type RoiResult = {
  missedCalls: number
  potentialBookings: number
  illustrativeRevenue: number
}

const limits = {
  callsPerMonth: 100_000,
  missedPercent: 100,
  bookingPercent: 100,
  averageJobValue: 1_000_000,
} as const

function clamp(value: number, max: number) {
  if (!Number.isFinite(value)) return 0
  return Math.min(max, Math.max(0, value))
}

export function sanitizeRoi(input: RoiInput): RoiInput {
  return {
    callsPerMonth: Math.round(clamp(input.callsPerMonth, limits.callsPerMonth)),
    missedPercent: clamp(input.missedPercent, limits.missedPercent),
    bookingPercent: clamp(input.bookingPercent, limits.bookingPercent),
    averageJobValue: Math.round(
      clamp(input.averageJobValue, limits.averageJobValue),
    ),
  }
}

export function calculateRoi(input: RoiInput): RoiResult {
  const safe = sanitizeRoi(input)
  const missedCalls = (safe.callsPerMonth * safe.missedPercent) / 100
  const potentialBookings = (missedCalls * safe.bookingPercent) / 100
  const illustrativeRevenue = potentialBookings * safe.averageJobValue
  return { missedCalls, potentialBookings, illustrativeRevenue }
}

export const roiDisclaimer =
  "Illustrative estimate only. Actual results depend on call volume, customer behavior, conversion rates, and implementation. This is not a promise that the calculated revenue will be recovered."
