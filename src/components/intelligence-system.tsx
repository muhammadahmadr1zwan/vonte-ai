"use client"

import { useState } from "react"
import { navigateTabs } from "@/components/ui/tab-navigation"

import { Container } from "@/components/container"

const stages = [
  {
    id: "inquiry",
    number: "01",
    title: "Incoming Inquiry",
    body: "A call, form, or message enters as a new opportunity instead of waiting on whoever is free.",
    detail: "The entry can be the dedicated receptionist number, a website request, or a lead that still needs a reply.",
  },
  {
    id: "response",
    number: "02",
    title: "Intelligent Response",
    body: "The system answers from information you approved and asks the next useful question.",
    detail: "Wording is limited to services, hours, and answers you have signed off. It does not invent offers.",
  },
  {
    id: "qualify",
    number: "03",
    title: "Lead Qualification",
    body: "The request is sorted by need, timing, and whether a person should take over.",
    detail: "Urgent situations are marked for human attention. Routine requests stay in the booking path.",
  },
  {
    id: "booking",
    number: "04",
    title: "Booking Request",
    body: "A suitable window can be requested in the calendar that is in scope.",
    detail: "A connection is confirmed before launch. This diagram does not write to a live calendar.",
  },
  {
    id: "notify",
    number: "05",
    title: "Business Notification",
    body: "The owner receives a summary. Urgent calls are routed for a person to handle.",
    detail: "Who is notified, and what counts as urgent, is defined with you before anything goes live.",
  },
] as const

export function IntelligenceSystem() {
  const [active, setActive] = useState(0)
  const stage = stages[active]


  return (
    <section id="system" className="bg-navy py-20 text-ivory sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
              The system
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.4rem]">
              One connected system.
              <span className="serif-em mt-2 block text-gold">
                From inquiry to action.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-silver lg:col-span-4 lg:col-start-9">
            Five stages, one path. Select a stage to see what it is for. Nothing
            here is live customer activity.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            className="lg:col-span-5"
            role="tablist"
            aria-orientation="vertical"
            aria-label="System stages"
            onKeyDown={(event) => navigateTabs(event, active, stages.length, setActive)}
          >
            <div className="relative border-l border-white/15">
              {stages.map((item, index) => {
                const selected = index === active
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`stage-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="stage-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`relative block w-full border-b border-white/10 py-4 pr-4 pl-6 text-left transition-colors ${
                      selected ? "text-ivory" : "text-mist hover:text-ivory"
                    }`}
                  >
                    <span
                      className={`absolute inset-y-0 -left-px w-px ${
                        selected ? "bg-gold" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">
                      {item.number}
                    </span>
                    <span className="mt-1 block font-heading text-2xl tracking-[-0.03em]">
                      {item.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id="stage-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`stage-tab-${stage.id}`}
            className="border border-white/10 bg-[#0c1830] p-6 sm:p-8 lg:col-span-7"
          >
            <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">
              Stage {stage.number}
            </p>
            <h3 className="display mt-4 text-4xl sm:text-5xl">{stage.title}</h3>
            <p className="mt-5 max-w-lg text-base leading-7 text-silver">{stage.body}</p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-mist">{stage.detail}</p>
            <ol className="mt-8 flex flex-wrap gap-2" aria-hidden="true">
              {stages.map((item, index) => (
                <li
                  key={item.id}
                  className={`px-2.5 py-1 text-[0.68rem] tracking-[0.14em] uppercase ${
                    index === active
                      ? "bg-gold text-navy"
                      : index < active
                        ? "border border-gold/40 text-gold"
                        : "border border-white/10 text-mist"
                  }`}
                >
                  {item.number}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
