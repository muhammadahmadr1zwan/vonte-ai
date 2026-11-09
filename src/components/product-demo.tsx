"use client"

import { useState } from "react"

import { Container } from "@/components/container"
import { siteConfig } from "@/lib/site"

const scenarios = [
  {
    id: "appointment",
    title: "New appointment inquiry",
    kicker: "During the day",
    messages: [
      { from: "caller", text: "The upstairs unit stopped cooling this morning." },
      {
        from: "assistant",
        text: "I can take a service request. Is this a home, and is anyone unsafe without cooling?",
      },
      { from: "caller", text: "It's a house. Warm, but it can wait until tomorrow." },
      {
        from: "assistant",
        text: "I'll record a cooling-repair request and an afternoon window for the team to confirm.",
      },
    ],
    captured: [
      ["Need", "Cooling repair"],
      ["Property", "Residence"],
      ["Timing", "Next day, afternoon"],
    ],
    route: "Booking request prepared for staff. No calendar event is created by this demo.",
  },
  {
    id: "after-hours",
    title: "After-hours question",
    kicker: "Office closed",
    messages: [
      { from: "caller", text: "Are you open tomorrow? There is a slow leak under the kitchen sink." },
      {
        from: "assistant",
        text: "The office is closed. I can record the request so the team sees it in the morning.",
      },
      { from: "caller", text: "Yes. Please have someone call about a morning visit." },
      {
        from: "assistant",
        text: "Recorded. A person reviews the morning request when the office opens.",
      },
    ],
    captured: [
      ["Need", "Plumbing visit"],
      ["Timing", "Morning, next open day"],
      ["Queue", "After hours"],
    ],
    route: "Held for the next business morning. This demo does not send a text or email.",
  },
  {
    id: "urgent",
    title: "Urgent request",
    kicker: "Human handoff",
    messages: [
      { from: "caller", text: "Water is coming through the ceiling right now." },
      {
        from: "assistant",
        text: "That needs a person. I'm marking this urgent and preparing a summary for the on-call contact.",
      },
      { from: "caller", text: "Please. The kitchen ceiling is actively leaking." },
      {
        from: "assistant",
        text: "The summary is ready for human follow-up. I won't book this as a routine visit.",
      },
    ],
    captured: [
      ["Need", "Active leak"],
      ["Urgency", "Immediate"],
      ["Route", "Human handoff"],
    ],
    route: "Designed to reach a person you designate. This screen does not place a live call.",
  },
] as const

export function ProductDemo() {
  const [active, setActive] = useState(0)
  const scenario = scenarios[active]

  return (
    <section id="experience" className="bg-navy py-20 text-ivory sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
              Interactive demo
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.3rem]">
              See Intelligence
              <span className="serif-em mt-2 block text-gold">in Action.</span>
            </h2>
          </div>
          <p className="text-sm leading-6 text-silver lg:col-span-4 lg:col-start-9">
            Choose a situation. The exchange is scripted. It is not a phone connection,
            and it does not book a real appointment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-4" role="tablist" aria-label="Demo scenarios">
            {scenarios.map((item, index) => {
              const selected = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`demo-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="demo-panel"
                  onClick={() => setActive(index)}
                  className={`border px-4 py-4 text-left ${
                    selected ? "border-gold bg-gold text-navy" : "border-white/15 text-ivory hover:border-gold"
                  }`}
                >
                  <span className={`text-[0.68rem] tracking-[0.16em] uppercase ${selected ? "text-navy/70" : "text-gold"}`}>
                    {item.kicker}
                  </span>
                  <span className="mt-1 block font-heading text-xl tracking-[-0.03em]">
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id="demo-panel"
            role="tabpanel"
            aria-labelledby={`demo-tab-${scenario.id}`}
            className="border border-white/10 bg-[#0c1830] lg:col-span-8"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-mist uppercase">
                {scenario.title}
              </p>
              <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">Illustrative</p>
            </div>
            <div className="space-y-3 px-5 py-5" aria-live="polite">
              {scenario.messages.map((message, index) => (
                <p
                  key={`${scenario.id}-${index}`}
                  className={`max-w-md px-3 py-2.5 text-sm leading-6 ${
                    message.from === "assistant"
                      ? "ml-auto border border-gold/40 bg-gold/10"
                      : "border border-white/10"
                  }`}
                >
                  <span className="mb-1 block text-[0.65rem] tracking-[0.14em] text-mist uppercase">
                    {message.from === "assistant" ? "Assistant" : "Caller"}
                  </span>
                  {message.text}
                </p>
              ))}
            </div>
            <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3">
              {scenario.captured.map(([term, value]) => (
                <div key={term} className="bg-[#0c1830] px-5 py-4">
                  <p className="text-[0.68rem] tracking-[0.14em] text-mist uppercase">{term}</p>
                  <p className="mt-1 text-sm text-ivory">{value}</p>
                </div>
              ))}
            </div>
            <p className="px-5 py-4 text-sm leading-6 text-silver">{scenario.route}</p>
          </div>
        </div>

        {siteConfig.voiceDemoNumber ? (
          <p className="mt-6 text-sm leading-6 text-silver">
            A separate voice sample is available at{" "}
            <a className="text-gold underline-offset-4 hover:underline" href={`tel:${siteConfig.voiceDemoNumber}`}>
              {siteConfig.voiceDemoNumber}
            </a>
            . The on-screen example stays a scripted walkthrough.
          </p>
        ) : null}
      </Container>
    </section>
  )
}
