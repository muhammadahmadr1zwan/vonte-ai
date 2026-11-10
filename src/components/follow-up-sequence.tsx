"use client"

import { useState } from "react"

const sequence = [
  {
    id: "new",
    label: "New inquiry",
    when: "Arrives",
    status: "Captured",
    detail:
      "A service request comes in from the website or from a call the team could not take.",
  },
  {
    id: "initial",
    label: "Initial response",
    when: "Soon after",
    status: "Acknowledged",
    detail:
      "An approved text or email confirms the request and asks one useful question. This preview does not send a message.",
  },
  {
    id: "sequence",
    label: "Follow-up sequence",
    when: "If quiet",
    status: "Continuing",
    detail:
      "A short series keeps the conversation moving. Volume, timing, and consent are set in the agreement.",
  },
  {
    id: "interest",
    label: "Qualified interest",
    when: "On reply",
    status: "Qualified",
    detail:
      "The person shows interest. The record moves forward for someone on your team to review.",
  },
  {
    id: "request",
    label: "Appointment request",
    when: "Next step",
    status: "Requested",
    detail:
      "A booking request is prepared. This demonstration does not write to a calendar or send a reminder.",
  },
] as const

export function FollowUpSequence() {
  const [active, setActive] = useState(0)
  const current = sequence[active]

  return (
    <div>
      <ol className="grid gap-px bg-background/10 grid-cols-5" aria-label="Follow-up sequence">
        {sequence.map((step, index) => {
          const selected = index === active
          return (
            <li key={step.id}>
              <button
                type="button"
                aria-pressed={selected}
                aria-label={`0${index + 1} ${step.label} — ${step.when}`}
                onClick={() => setActive(index)}
                className={`flex h-full w-full flex-col items-start px-3 py-4 text-left ${
                  selected ? "bg-raised text-foreground shadow-[inset_0_2px_var(--v-accent)]" : "bg-surface text-muted-foreground hover:bg-raised"
                }`}
              >
                <span className="text-[0.68rem] tracking-[0.16em] uppercase">
                  0{index + 1}
                </span>
                <span className="mt-2 hidden font-heading text-base leading-snug tracking-[-0.03em] sm:block sm:text-lg">
                  {step.label}
                </span>
                <span className="mt-2 hidden text-xs text-muted-foreground sm:block">
                  {step.when}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="mt-px grid gap-px bg-background/10 lg:grid-cols-[1.1fr_0.9fr]" aria-live="polite">
        <div className="bg-background px-5 py-6 sm:px-7">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            {current.label} / Illustrative sequence
          </p>
          <p className="mt-4 max-w-xl font-heading text-2xl leading-snug tracking-[-0.03em] text-foreground">
            {current.detail}
          </p>
        </div>
        <div className="bg-surface px-5 py-6 sm:px-7">
          <p className="text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">Status</p>
          <p className="mt-3 font-heading text-3xl tracking-[-0.04em] text-foreground">
            {current.status}
          </p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Sample sequence only. No SMS or email is sent from this page.
          </p>
        </div>
      </div>
    </div>
  )
}
