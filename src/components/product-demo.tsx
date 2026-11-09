"use client"

import { useState } from "react"

import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
import { siteConfig } from "@/lib/site"

const services = [
  { id: "cooling", label: "Cooling repair" },
  { id: "plumbing", label: "Plumbing visit" },
  { id: "estimate", label: "System estimate" },
]

const windows = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
]

export function ProductDemo() {
  const [service, setService] = useState<string | null>(null)
  const [timeWindow, setTimeWindow] = useState<string | null>(null)
  const serviceLabel = services.find((item) => item.id === service)?.label
  const windowLabel = windows.find((item) => item.id === timeWindow)?.label

  function reset() {
    setService(null)
    setTimeWindow(null)
  }

  return (
    <section id="experience" className="bg-navy py-20 text-ivory sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Eyebrow>Product example</Eyebrow>
            <h2 className="mt-5 font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
              See the Experience.
            </h2>
            <p className="mt-5 text-lg leading-8 text-silver">
              Walk through a scripted receptionist conversation. It shows how a
              request can be captured, prepared, and summarized.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
              Interactive product example — not a live phone call
            </p>
            {siteConfig.voiceDemoNumber ? (
              <p className="mt-5 text-sm leading-6 text-silver">
                A separate voice sample is available at{" "}
                <a className="text-gold underline-offset-4 hover:underline" href={`tel:${siteConfig.voiceDemoNumber}`}>
                  {siteConfig.voiceDemoNumber}
                </a>
                . The on-screen example stays a scripted walkthrough.
              </p>
            ) : null}
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-[#0e1c33] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] tracking-[0.16em] text-mist uppercase">
                Sample business
              </p>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-semibold text-gold hover:text-[#e0c15a]"
              >
                Start over
              </button>
            </div>
            <div className="mt-5 space-y-3" aria-live="polite">
              <p className="ml-8 rounded-2xl rounded-tr-md bg-white/8 px-4 py-3 text-sm leading-6">
                Hi, I&apos;d like to schedule an appointment.
              </p>
              <p className="mr-6 rounded-2xl rounded-tl-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6">
                Absolutely. What service are you looking for?
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {services.map((item) => {
                  const selected = service === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setService(item.id)
                        setTimeWindow(null)
                      }}
                      className={`rounded-full border px-3 py-2 text-sm ${
                        selected
                          ? "border-gold bg-gold text-navy"
                          : "border-white/15 text-ivory hover:border-gold"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
              {serviceLabel ? (
                <>
                  <p className="ml-8 rounded-2xl rounded-tr-md bg-white/8 px-4 py-3 text-sm leading-6">
                    {serviceLabel}.
                  </p>
                  <p className="mr-6 rounded-2xl rounded-tl-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6">
                    Thank you. Which part of the day should the request use?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {windows.map((item) => {
                      const selected = timeWindow === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setTimeWindow(item.id)}
                          className={`rounded-full border px-3 py-2 text-sm ${
                            selected
                              ? "border-gold bg-gold text-navy"
                              : "border-white/15 text-ivory hover:border-gold"
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : null}
              {serviceLabel && windowLabel ? (
                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  <article className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.68rem] tracking-[0.14em] text-gold uppercase">
                      Captured
                    </p>
                    <p className="mt-2 text-sm leading-6 text-silver">
                      Sample caller. Service: {serviceLabel}.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.68rem] tracking-[0.14em] text-gold uppercase">
                      Request
                    </p>
                    <p className="mt-2 text-sm leading-6 text-silver">
                      Booking request prepared for the {windowLabel.toLowerCase()}.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.68rem] tracking-[0.14em] text-gold uppercase">
                      Owner note
                    </p>
                    <p className="mt-2 text-sm leading-6 text-silver">
                      Notification prepared. Not sent. Nobody was contacted.
                    </p>
                  </article>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
