"use client"

import { useId, useRef, useState } from "react"
import Link from "next/link"
import { Container } from "@/components/container"
import { useMotionPulse } from "@/components/motion-system"
import { steps } from "@/lib/content"

const processViews = [
  { title: "Map the inquiry", items: ["Calls", "Website", "Past leads"], outcome: "Understand where requests stall." },
  { title: "Agree the rules", items: ["Approved answers", "Routing rules", "Human handoff"], outcome: "A plan your team can approve." },
  { title: "Connect and verify", items: ["Configure", "Connect", "Test"], outcome: "Review the wording and handoff before launch." },
  { title: "Review and refine", items: ["Observe", "Refine", "Verify"], outcome: "Improvements follow the package and agreed scope." },
] as const

export function Process({ detailed = false }: { detailed?: boolean }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const visualRef = useRef<HTMLDivElement>(null)
  useMotionPulse(visualRef, active)
  return <section className="bg-background py-16 text-foreground sm:py-20">
    <Container>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-motion="section">
        <div className="lg:col-span-7">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">How VONTE works</p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">From first conversation<span className="serif-em mt-2 block">to a tested launch.</span></h2>
        </div>
        <p className="text-base leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">VONTE learns the workflow, plans the automation, implements the connections that are in scope, and reviews the system after launch. A date is confirmed with the work, not assumed.</p>
      </div>
      {detailed ? <div className="process-layout mt-10">
        <ol className="process-steps" aria-label="Engagement process">
          {steps.map((step,index)=><li key={step.number}>
            <details className="process-step" name={`${id}-engagement`} data-active={active===index} open={active===index}
              onToggle={event=>{
                if(event.currentTarget.open) setActive(index)
                else if(active===index && !event.currentTarget.closest("ol")?.querySelector("details[open]")) setActive(-1)
              }}>
              <summary id={`${id}-${index}`}><span className="process-number">{step.number}</span><h3>{step.title}</h3><span className="process-toggle" aria-hidden="true">+</span></summary>
              <p className="process-body">{step.body}</p>
              <div className="process-explanation"><p>{step.detail}</p><div className="process-mini-route" aria-hidden="true">{processViews[index].items.map(item=><span key={item}>{item}</span>)}</div></div>
            </details>
          </li>)}
        </ol>
        <div ref={visualRef} className="process-visual" role="region" aria-label="Process preview" aria-live="polite">
          {active>=0 ? <>
            <p className="section-label">Step {steps[active].number} / {steps[active].title}</p>
            <p className="process-visual-title">{processViews[active].title}</p>
            <div className="process-visual-route" key={active}>
              <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><path pathLength={1} d={active===0 ? "M30 20H120Q150 20 150 50V110Q150 140 180 140H270M30 80H150M30 140H120Q150 140 150 110" : active===1 ? "M25 30H110V80H190V130H275M110 30H275M25 130H190" : active===2 ? "M25 80H275M55 80V35M150 80V125M245 80V35" : "M70 30H230V130H70V30M70 80H230"} /><circle cx="30" cy="80" r="4"/><circle cx="150" cy="80" r="4"/><circle cx="270" cy="80" r="4"/></svg>
              <ul>{processViews[active].items.map(item=><li key={item}>{item}</li>)}</ul>
            </div>
            <p className="mt-6 text-sm leading-6 text-foreground">{processViews[active].outcome}</p>
          </> : <><p className="section-label">Discover / Design / Implement / Optimize</p><p className="process-visual-title">Explore a step.</p><p className="text-sm leading-6 text-muted-foreground">Choose a stage to see how the engagement moves forward.</p></>}
          <p className="mt-5 text-xs leading-5 text-subtle">Illustrative process view. Connections, timing and scope are confirmed with your team.</p>
        </div>
      </div> : <>
        <ol className="mt-9 grid gap-6 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4">{steps.map(step=><li key={step.number} className="grid content-start gap-3"><p className="text-xs tracking-wider text-accent">{step.number}</p><h3 className="font-heading text-2xl tracking-[-0.03em]">{step.title}</h3><p className="text-sm leading-6 text-foreground">{step.body}</p></li>)}</ol>
        <Link href="/how-it-works" className="mt-6 inline-flex min-h-11 items-center text-sm underline decoration-accent underline-offset-4">See the process and launch requirements →</Link>
      </>}
    </Container>
  </section>
}
