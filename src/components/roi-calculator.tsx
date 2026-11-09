"use client"

import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
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
  {
    key: "callsPerMonth",
    label: "Incoming calls per month",
    sliderMax: 2000,
    step: 1,
  },
  {
    key: "missedPercent",
    label: "Percentage of calls missed",
    suffix: "%",
    sliderMax: 100,
    step: 1,
  },
  {
    key: "bookingPercent",
    label: "Percentage of missed callers who could become booked jobs",
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
      const progress = Math.min(1, (now - started) / 480)
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

  function update(key: keyof RoiInput, raw: string) {
    const numeric = raw.trim() === "" ? 0 : Number(raw)
    setInput((current) => sanitizeRoi({ ...current, [key]: numeric }))
  }

  return (
    <section id="calculator" className="bg-ivory py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow on="light">Illustrative estimate</Eyebrow>
            <h2 className="mt-5 font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-navy sm:text-5xl">
              What Could Missed Calls Be Costing Your Business?
            </h2>
            <p className="mt-5 text-lg leading-8 text-quiet">
              Use your own call volume and job value. The starting numbers are
              an example: 200 calls, 30% missed, a 25% potential booking rate,
              and a $400 average job.
            </p>
            <p className="mt-5 text-sm leading-6 text-quiet">{roiDisclaimer}</p>
          </div>
          <div className="rounded-[1.6rem] border border-navy/10 bg-white p-5 shadow-[0_30px_70px_-48px_rgba(9,22,41,0.8)] sm:p-7">
            <div className="grid gap-5">
              {fields.map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="text-sm font-medium text-ink">
                    {field.label}
                  </label>
                  <div className="mt-2 grid grid-cols-[1fr_7.5rem] items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={field.sliderMax}
                      step={field.step}
                      value={Math.min(input[field.key], field.sliderMax)}
                      onChange={(event) => update(field.key, event.target.value)}
                      aria-label={`${field.label} slider`}
                      className="accent-[#CCA629]"
                    />
                    <span className="flex h-11 items-center rounded-xl border border-navy/15 bg-ivory px-2">
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
                        className="w-full bg-transparent text-right text-sm font-medium text-navy outline-none"
                      />
                      {field.suffix ? (
                        <span className="pl-1 text-sm text-quiet">{field.suffix}</span>
                      ) : null}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 rounded-2xl bg-navy p-5 text-ivory"
              aria-live="polite"
            >
              <dl className="grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-mist uppercase">
                    Missed calls
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold text-gold">
                    {formatCount(missed)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-mist uppercase">
                    Potential bookings
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold text-ivory">
                    {formatCount(bookings)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-mist uppercase">
                    Illustrative monthly revenue
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold text-ivory">
                    {formatMoney(Math.round(revenue))}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-silver">
                The AI Receptionist retainer is {formatMoney(receptionist.monthly)}{" "}
                per month. Place that figure beside the estimate and decide what
                it means for your business. The calculator does not predict
                recovered revenue.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 text-sm font-semibold text-gold-ink underline-offset-4 hover:underline"
              onClick={() => setInput({ ...roiDefaults })}
            >
              Reset to the sample figures
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
