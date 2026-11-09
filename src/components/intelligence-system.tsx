"use client"

import { useState, type KeyboardEvent } from "react"
import { ArrowRight, Bell, CalendarDays, Check, FileText, MessageSquare, PhoneIncoming } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"

const stages = [
  {
    id: "inquiry", title: "Incoming Inquiry", icon: PhoneIncoming,
    short: "A customer reaches out.",
    body: "A call, form, or message is captured so your team has a request to work with.",
    detail: "Inquiries can come through the dedicated receptionist number or your website. Follow-up workflows can also reopen approved past-lead conversations.",
  },
  {
    id: "response", title: "Intelligent Response", icon: MessageSquare,
    short: "Approved answers, promptly.",
    body: "The assistant answers approved business questions and asks what the customer needs.",
    detail: "Services, hours, and wording are agreed with you. Questions outside that scope are handed to your team. The assistant does not invent offers.",
  },
  {
    id: "qualify", title: "Lead Qualification", icon: FileText,
    short: "Need, timing, and urgency.",
    body: "The request is organized by need, timing, and whether a person should take over.",
    detail: "Urgency and follow-up rules are set before launch, including consent, opt-outs, and stopping messages on a reply. The assistant does not diagnose or give professional advice.",
  },
  {
    id: "booking", title: "Booking Request", icon: CalendarDays,
    short: "A time for the team to review.",
    body: "A suitable appointment window is requested through the calendar connection agreed in scope.",
    detail: "Your booking rules decide what can be confirmed and what needs staff review. This illustration does not reserve a time or write to a calendar.",
  },
  {
    id: "notify", title: "Team Notification", icon: Bell,
    short: "Context for a human handoff.",
    body: "Your team receives a summary of the request, preferred timing, and action needed.",
    detail: "You choose who receives notifications and which urgent situations need a human handoff. VONTE is not a replacement for emergency services.",
  },
] as const

export function IntelligenceSystem({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0)

  function selectStage(index: number, focus = false) {
    setActive(index)
    requestAnimationFrame(() => {
      const button = document.getElementById(`stage-tab-${stages[index].id}`)
      if (focus) button?.focus({ preventScroll: true })
      if (window.matchMedia("(max-width: 639px)").matches) {
        button?.scrollIntoView({ block: "start", behavior: "instant" })
      }
    })
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLElement) || !event.target.matches("[data-workflow-step]")) return
    const index = Number(event.target.dataset.workflowStep)
    let next: number
    if (event.key === "Home") next = 0
    else if (event.key === "End") next = stages.length - 1
    else if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % stages.length
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + stages.length) % stages.length
    else return
    event.preventDefault()
    selectStage(next, true)
  }

  return (
    <section id="system" className="bg-navy py-16 text-ivory sm:py-20">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.18em] text-gold uppercase">One connected system</p>
            <h2 className="display mt-5 text-4xl sm:text-5xl">From the first inquiry<span className="serif-em mt-2 block text-gold">to an informed team.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-silver lg:col-span-4 lg:col-start-9">Five stages. Select one to see how it helps a customer request move forward.</p>
        </div>
        <p id="system-instructions" className="sr-only">Use the arrow keys or Home and End to explore the stages. Press Tab to enter the selected explanation.</p>
        <div className="workflow-steps mt-8" role="group" aria-label="System stages" aria-describedby="system-instructions" onKeyDown={handleKeys}>
          {stages.map((item, index) => {
            const selected = active === index
            const Icon = item.icon
            return (
              <div key={item.id} className="workflow-step-group">
                <button type="button" data-workflow-step={index} id={`stage-tab-${item.id}`} aria-expanded={selected}
                  aria-controls={selected ? "stage-panel" : undefined} aria-label={item.title}
                  tabIndex={selected ? 0 : -1} onClick={() => selectStage(index)}
                  className={`workflow-step ${selected ? "is-selected" : ""}`}>
                  <span className="workflow-node" aria-hidden="true">{index < active ? <Check className="size-4" /> : <Icon className="size-4" />}</span>
                  <span className="min-w-0">
                    <span className="text-[0.65rem] tracking-wider text-gold" aria-hidden="true">0{index + 1}</span>
                    <span className="mt-1 block text-sm font-medium leading-5">{item.title}</span>
                    {!compact ? <span className="mt-1 block text-xs leading-5 text-mist">{item.short}</span> : null}
                  </span>
                  <ArrowRight className="workflow-arrow size-3.5" aria-hidden="true" />
                </button>
                {selected ? <StagePanel active={active} compact={compact} onNext={() => selectStage((active + 1) % stages.length, true)} /> : null}
              </div>
            )
          })}
        </div>
        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="max-w-lg text-xs leading-5 text-mist">Illustrative workflow. No live customer data, calls, messages, or bookings are created.</p>
          {compact ? <Link href="/how-it-works#system" className="inline-flex min-h-11 items-center text-sm text-silver underline decoration-gold underline-offset-4 hover:text-ivory">Explore the full workflow →</Link> : null}
        </div>
      </Container>
    </section>
  )
}

function StagePanel({ active, compact, onNext }: { active: number; compact: boolean; onNext: () => void }) {
  const stage = stages[active]
  const nextButton = <button type="button" onClick={onNext} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-gold underline-offset-4 hover:underline">{active === stages.length - 1 ? "Back to the beginning" : "Next stage"}<ArrowRight className="size-4" aria-hidden="true" /></button>

  return (
    <div id="stage-panel" role="region" tabIndex={0} aria-labelledby={`stage-tab-${stage.id}`}
      className={`workflow-panel border border-white/15 bg-slate ${compact ? "p-5 sm:p-6" : "grid overflow-hidden lg:grid-cols-2"}`}>
      {compact ? (
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-8">
          <div><h3 className="font-heading text-lg tracking-[-0.02em]">{stage.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-silver">{stage.body}</p></div>
          {nextButton}
        </div>
      ) : (
        <>
          <div className="border-b border-white/10 p-5 sm:p-8 lg:border-r lg:border-b-0">
            <div className="mb-5 flex items-center justify-between gap-3 text-[0.65rem] tracking-wider uppercase"><span className="text-silver">VONTE / Workflow preview</span><span className="text-gold">Illustrative</span></div>
            <WorkflowPreview active={active} />
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <p className="text-xs text-gold">Stage 0{active + 1} / 0{stages.length}</p>
            <h3 className="mt-4 font-heading text-3xl tracking-[-0.035em]">{stage.title}</h3>
            <p className="mt-4 text-base leading-7 text-ivory">{stage.body}</p>
            <p className="mt-4 text-sm leading-6 text-silver">{stage.detail}</p>
            <div className="mt-auto flex justify-end pt-5">{nextButton}</div>
          </div>
        </>
      )}
    </div>
  )
}

function WorkflowPreview({ active }: { active: number }) {
  if (active <= 1) return (
    <div className="workflow-artifact">
      <p className="text-sm">Home services inquiry</p><p className="mt-1 text-xs text-mist">Sample conversation</p>
      <p className="mt-6 text-xs text-mist">Customer</p>
      <p className="mt-2 font-heading text-2xl leading-tight tracking-[-0.03em]">“Can someone come tomorrow? The upstairs unit stopped cooling.”</p>
      {active === 1 ? <div className="mt-5 border-l-2 border-gold bg-gold/[0.06] p-4"><p className="text-xs text-gold">AI assistant · Scripted reply</p><p className="mt-2 text-sm leading-6">I can help request a visit. Is anyone unsafe without cooling right now?</p></div> : <p className="mt-6 text-xs text-gold">Ready for a response.</p>}
    </div>
  )
  if (active === 3) return (
    <div className="workflow-artifact">
      <p className="text-xs text-mist">Appointment request</p>
      <div className="mt-5 flex gap-4 border border-gold/30 bg-gold/[0.04] p-4"><CalendarDays className="mt-1 size-6 shrink-0 text-gold" aria-hidden="true" /><div><p className="font-heading text-2xl">Tomorrow</p><p className="mt-2 text-sm text-silver">Afternoon window</p><p className="mt-4 text-xs text-gold">Requested · Awaiting confirmation</p></div></div>
      <p className="mt-5 text-sm leading-6 text-silver">Cooling repair. The team reviews availability before confirming a visit.</p><p className="mt-5 text-xs text-mist">Illustration only. No appointment is booked.</p>
    </div>
  )
  return (
    <div className="workflow-artifact">
      <p className="border-b border-white/10 pb-4 text-sm">{active === 2 ? "Lead details" : "Team summary"}</p>
      <dl className="mt-2">{[["Service needed", "Cooling repair"], ["Urgency", "Routine · No immediate danger"], ["Preferred window", "Tomorrow afternoon"], ["Next action", active === 2 ? "Continue the conversation" : "Review request and confirm availability"]].map(([label, value]) => <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-white/10 py-3 last:border-0"><dt className="text-xs leading-5 text-mist">{label}</dt><dd className="text-sm leading-5 text-ivory">{value}</dd></div>)}</dl>
    </div>
  )
}
