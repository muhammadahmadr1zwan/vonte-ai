"use client"

import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { formatCount, formatMoney } from "@/lib/format"
import { getPackage } from "@/lib/pricing"
import {
  calculateRoi,
  roiDefaults,
  roiDisclaimer,
  sanitizeRoi,
  type RoiInput,
} from "@/lib/roi"

const receptionist = getPackage("ai-receptionist")!

const fields: {
  key: keyof RoiInput
  label: string
  prefix?: string
  suffix?: string
  sliderMax: number
  step: number
}[] = [
  { key: "callsPerMonth", label: "Incoming calls per month", sliderMax: 2000, step: 1 },
  { key: "missedPercent", label: "Percentage of calls missed", suffix: "%", sliderMax: 100, step: 1 },
  {
    key: "bookingPercent",
    label: "Missed callers who could become booked jobs",
    suffix: "%",
    sliderMax: 100,
    step: 1,
  },
  {
    key: "averageJobValue",
    label: "Average revenue per booked job",
    prefix: "$",
    sliderMax: 5000,
    step: 25,
  },
]

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value)
  const current = useRef(value)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const from = current.current
    if (reduce || from === value) {
      current.current = value
      setDisplay(value)
      return
    }
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 520)
      const eased = 1 - (1 - progress) ** 3
      const next = from + (value - from) * eased
      current.current = next
      setDisplay(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return display
}

export function RoiCalculator() {
  const [input, setInput] = useState<RoiInput>({ ...roiDefaults })
  const result = calculateRoi(input)
  const missed = useAnimatedNumber(result.missedCalls)
  const bookings = useAnimatedNumber(result.potentialBookings)
  const revenue = useAnimatedNumber(result.illustrativeRevenue)
  const missedShare = Math.min(100, input.missedPercent)

  function update(key: keyof RoiInput, raw: string) {
    const numeric = raw.trim() === "" ? 0 : Number(raw)
    setInput((current) => sanitizeRoi({ ...current, [key]: numeric }))
  }

  return (
    <section id="calculator" className="bg-paper py-20 text-navy sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
            Illustrative model
          </p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
            What Is an Unanswered
            <span className="serif-em mt-2 block">Opportunity Worth?</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="border border-navy/10 bg-ivory p-5 sm:p-7 lg:col-span-6">
            <div className="grid gap-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="text-sm text-ink">
                    {field.label}
                  </label>
                  <div className="mt-3 grid grid-cols-[1fr_6.5rem] items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={field.sliderMax}
                      step={field.step}
                      value={Math.min(input[field.key], field.sliderMax)}
                      onChange={(event) => update(field.key, event.target.value)}
                      aria-label={`${field.label} slider`}
                      className="roi-range"
                    />
                    <span className="flex h-11 items-center border border-navy/15 bg-paper px-2">
                      {field.prefix ? (
                        <span className="pr-1 text-sm text-quiet">{field.prefix}</span>
                      ) : null}
                      <input
                        id={field.key}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={
                          field.key === "callsPerMonth"
                            ? 100000
                            : field.key === "averageJobValue"
                              ? 1000000
                              : 100
                        }
                        step={field.key === "averageJobValue" ? 1 : field.step}
                        value={input[field.key]}
                        onChange={(event) => update(field.key, event.target.value)}
                        className="w-full bg-transparent text-right text-sm text-navy outline-none"
                      />
                      {field.suffix ? (
                        <span className="pl-1 text-sm text-quiet">{field.suffix}</span>
                      ) : null}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 text-sm text-gold-ink underline decoration-gold underline-offset-4"
              onClick={() => setInput({ ...roiDefaults })}
            >
              Reset to the sample figures
            </button>
          </div>

          <div className="bg-navy p-6 text-ivory sm:p-8 lg:col-span-6" aria-live="polite">
            <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">
              Illustrative monthly opportunity
            </p>
            <p className="display mt-4 text-6xl text-gold sm:text-7xl">
              {formatMoney(Math.round(revenue))}
            </p>
            <div className="mt-8" aria-hidden="true">
              <div className="h-px w-full bg-white/15">
                <div className="h-px bg-gold" style={{ width: `${missedShare}%` }} />
              </div>
              <p className="mt-2 text-xs tracking-[0.14em] text-mist uppercase">
                {missedShare}% of calls missed in this scenario
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] text-mist uppercase">Missed calls</dt>
                <dd className="mt-2 font-heading text-4xl tracking-[-0.04em]">{formatCount(missed)}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] text-mist uppercase">Potential bookings</dt>
                <dd className="mt-2 font-heading text-4xl tracking-[-0.04em]">{formatCount(bookings)}</dd>
              </div>
            </dl>
            <p className="mt-8 text-sm leading-6 text-silver">{roiDisclaimer}</p>
            <p className="mt-3 text-sm leading-6 text-mist">
              The AI Receptionist retainer is {formatMoney(receptionist.monthly)} per
              month. Place that figure beside the scenario. The calculator does
              not predict recovered revenue.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
