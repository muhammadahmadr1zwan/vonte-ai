"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { navigateTabs } from "@/components/ui/tab-navigation"

import { useMotionPulse } from "@/components/motion-system"
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
  const [visible, setVisible] = useState(1)
  const panelRef = useRef<HTMLDivElement>(null)
  useMotionPulse(panelRef, `${active}-${visible}`)
  const scenario = scenarios[active]
  const complete = visible === scenario.messages.length
  function select(index: number) { setActive(index); setVisible(1) }

  return (
    <section id="experience" className="bg-background py-16 text-foreground sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-motion="section">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
              Interactive demo
            </p>
            <h2 className="display mt-5 text-4xl sm:text-5xl">
              See a sample<span className="serif-em mt-2 block text-accent">conversation.</span>
            </h2>
          </div>
          <p className="text-sm leading-6 text-muted-foreground lg:col-span-4 lg:col-start-9">
            Choose a situation. This scripted demo creates no real calls, messages, or bookings.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
          <div className="demo-scenarios flex flex-col gap-2" role="tablist" aria-label="Demo scenarios" aria-orientation="vertical" onKeyDown={(event) => navigateTabs(event, active, scenarios.length, select)}>
            {scenarios.map((item, index) => {
              const selected = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`demo-tab-${item.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  aria-controls="demo-panel"
                  onClick={() => select(index)}
                  className={`demo-scenario border px-4 py-4 text-left ${
                    selected ? "border-accent bg-accent/10 text-foreground" : "border-line text-foreground hover:border-accent"
                  }`}
                >
                  <span className={`text-[0.68rem] tracking-[0.16em] uppercase ${selected ? "text-foreground" : "text-accent"}`}>
                    {item.kicker}
                  </span>
                  <span className="mt-1 block font-heading text-xl tracking-[-0.03em]">
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
            <p className="mt-3 text-xs leading-5 text-subtle">Step through a reply, or show the full exchange. Requests still need the review described in the example.</p>
          </div>

          <div
            ref={panelRef}
            id="demo-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`demo-tab-${scenario.id}`}
            className="border border-line bg-surface lg:col-span-8"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-subtle uppercase">
                {scenario.title}
              </p>
              <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">Illustrative</p>
            </div>
            <div className="space-y-3 px-5 py-5" aria-live="polite" aria-relevant="additions">
              {scenario.messages.slice(0, visible).map((message, index) => (
                <p
                  key={`${scenario.id}-${index}`}
                  className={`demo-message max-w-md px-3 py-2.5 text-sm leading-6 ${
                    message.from === "assistant"
                      ? "ml-auto border border-accent/40 bg-accent/10"
                      : "border border-line"
                  }`}
                >
                  <span className="mb-1 block text-[0.65rem] tracking-[0.14em] text-subtle uppercase">
                    {message.from === "assistant" ? "Assistant" : "Caller"}
                  </span>
                  {message.text}
                </p>
              ))}
            </div>
            {complete ? <><div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
              {scenario.captured.map(([term, value]) => (
                <div key={term} className="bg-surface px-5 py-4">
                  <p className="text-[0.68rem] tracking-[0.14em] text-subtle uppercase">{term}</p>
                  <p className="mt-1 text-sm text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="px-5 pt-4 text-sm leading-6 text-muted-foreground">{scenario.route}</p>
            <Link href="/contact?package=ai-receptionist" className="mx-5 mb-4 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4 hover:text-foreground">Discuss this receptionist workflow →</Link></> : null}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <p className="text-xs text-subtle" role="status">Exchange {visible} of {scenario.messages.length}{complete ? " · Summary ready" : ""}</p>
              <div className="flex flex-wrap gap-3">
                {!complete ? <button type="button" onClick={() => setVisible(scenario.messages.length)} className="min-h-11 text-sm text-muted-foreground underline underline-offset-4">Show full exchange</button> : null}
                <button type="button" onClick={() => setVisible(complete ? 1 : visible + 1)} className="min-h-11 border border-accent px-4 text-sm text-accent hover:bg-accent/10">{complete ? "Replay scenario" : "Next response →"}</button>
              </div>
            </div>
          </div>
        </div>

        {siteConfig.voiceDemoNumber ? (
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            A separate voice sample is available at{" "}
            <a className="text-accent underline-offset-4 hover:underline" href={`tel:${siteConfig.voiceDemoNumber}`}>
              {siteConfig.voiceDemoNumber}
            </a>
            . The on-screen example stays a scripted walkthrough.
          </p>
        ) : null}
      </Container>
    </section>
  )
}
