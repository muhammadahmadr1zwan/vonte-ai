"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight, Bell, CalendarDays, Check, FileText, MessageSquare, PhoneIncoming } from "lucide-react"
import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { strategyCallHref } from "@/lib/site"

const stages = [
  {id:"inquiry", title:"Incoming Inquiry", short:"A customer reaches out.", icon:PhoneIncoming, body:"A call, form, or message becomes the start of an organized conversation.", detail:"The entry can be a dedicated receptionist number, a website request, or a lead that still needs a reply.", service:"Calls & website"},
  {id:"response", title:"Intelligent Response", short:"An answer, with direction.", icon:MessageSquare, body:"The assistant answers from information you approved and asks the next useful question.", detail:"Services, hours, and wording are agreed with you. Questions outside that scope are handed to your team.", service:"AI Receptionist & chatbot"},
  {id:"qualify", title:"Lead Qualification", short:"The useful details, captured.", icon:FileText, body:"The request is organized by need, timing, and whether a person should take over.", detail:"Urgency rules are defined before launch. The assistant collects the request; it does not diagnose equipment or give professional advice.", service:"AI Receptionist & lead capture"},
  {id:"follow-up", title:"Automated Follow-Up", short:"The conversation continues.", icon:MessageSquare, body:"A timely text or email can keep a new inquiry moving when a conversation pauses.", detail:"Timing, consent, opt-outs, and stopping on a reply are defined in the workflow. Nothing in this example sends a message.", service:"Lead Follow-Up & Reactivation"},
  {id:"booking", title:"Booking Request", short:"A clear next step.", icon:CalendarDays, body:"A suitable appointment window is requested through the calendar connection agreed in scope.", detail:"Your business's booking rules decide what can be confirmed and what needs staff review. This illustration does not reserve a time.", service:"Receptionist & website booking"},
  {id:"notify", title:"Business Notification", short:"Your team has the context.", icon:Bell, body:"A concise summary gives the owner the request, timing, and next action in one place.", detail:"You choose who receives notifications and which urgent situations need a human handoff before the system goes live.", service:"The connected VONTE system"},
] as const

export function IntelligenceSystem() {
  const [active, setActive] = useState(0)
  function selectStage(index: number, focus = false) {
    setActive(index)
    requestAnimationFrame(() => {
      const button = document.getElementById(`stage-tab-${stages[index].id}`)
      if (focus) button?.focus({preventScroll: true})
      if (window.matchMedia("(max-width: 639px)").matches) button?.scrollIntoView({block: "start", behavior: "instant"})
    })
  }
  return (
    <section id="system" className="bg-navy py-20 text-ivory sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">The system / A connected front office</p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.4rem]">One inquiry.<span className="serif-em mt-2 block text-gold">A connected journey.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-silver lg:col-span-4">Calls, follow-up, and your website working toward the same next step. Select a stage to explore this illustrative workflow.</p>
        </div>
        <p id="system-instructions" className="sr-only">Use the arrow keys or Home and End to explore the stages. Press Tab to enter the selected explanation.</p>
        <div className="workflow-steps mt-10 sm:mt-14" role="group" aria-label="System stages" aria-describedby="system-instructions"
          onKeyDown={event=>{
            if (!(event.target instanceof HTMLElement) || !event.target.matches("[data-workflow-step]")) return
            const index=Number(event.target.dataset.workflowStep)
            const next=event.key==="Home"?0:event.key==="End"?stages.length-1:["ArrowRight","ArrowDown"].includes(event.key)?(index+1)%stages.length:["ArrowLeft","ArrowUp"].includes(event.key)?(index-1+stages.length)%stages.length:-1
            if(next<0)return
            event.preventDefault();selectStage(next,true)
          }}>
          {stages.map((item,index)=>{
            const selected=active===index;const Icon=item.icon
            return <div key={item.id} className="workflow-step-group"><button type="button" data-workflow-step={index} id={`stage-tab-${item.id}`} aria-expanded={selected} aria-controls={selected?"stage-panel":undefined} aria-label={item.title} tabIndex={selected?0:-1} onClick={()=>selectStage(index)} className={`workflow-step ${selected?"is-selected":""}`}>
              <span className="workflow-node" aria-hidden="true">{index<active?<Check className="size-4"/>:<Icon className="size-4"/>}</span>
              <span className="min-w-0"><span className="text-[0.65rem] tracking-[0.16em] text-gold" aria-hidden="true">0{index+1}</span><span className="mt-1 block text-sm font-medium leading-5">{item.title}</span><span className="mt-1 block text-xs leading-5 text-mist">{item.short}</span></span>
              <ArrowRight className="workflow-arrow size-3.5" aria-hidden="true"/>
            </button>
            {selected?<StagePanel active={active} onNext={()=>selectStage((active+1)%stages.length,true)}/>:null}
            </div>
          })}
        </div>
        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-lg text-xs leading-5 text-mist">An example of the connected services. No live customer data, messages, or calendar events are used.</p>
          <CtaLink href={strategyCallHref()} variant="inverse">Map your workflow <ArrowUpRight aria-hidden="true"/></CtaLink>
        </div>
      </Container>
    </section>
  )
}

function StagePanel({active,onNext}:{active:number;onNext:()=>void}) {
  const stage=stages[active]
  return <div id="stage-panel" role="region" tabIndex={0} aria-labelledby={`stage-tab-${stage.id}`} className="workflow-panel grid overflow-hidden border border-white/15 bg-slate lg:grid-cols-2">
          <div className="border-b border-white/10 p-5 sm:p-8 lg:border-r lg:border-b-0">
            <div className="mb-5 flex items-center justify-between gap-3 text-[0.65rem] tracking-[0.15em] uppercase"><span className="text-silver">VONTE / Workflow preview</span><span className="text-gold">Illustrative</span></div>
            <WorkflowPreview active={active}/>
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <p className="text-[0.65rem] tracking-[0.18em] text-gold uppercase">Stage 0{active+1} / {stage.service}</p>
            <h3 className="mt-4 font-heading text-3xl tracking-[-0.035em] sm:text-4xl">{stage.title}</h3>
            <p className="mt-4 text-base leading-7 text-ivory">{stage.body}</p>
            <p className="mt-4 text-sm leading-6 text-silver">{stage.detail}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-7">
              <p className="text-xs text-mist">0{active+1} <span className="mx-1">/</span> 06</p>
              <button type="button" onClick={onNext} className="inline-flex min-h-11 items-center gap-2 text-sm text-gold underline-offset-4 hover:underline">{active===stages.length-1?"Back to the beginning":"Next stage"}<ArrowRight className="size-4" aria-hidden="true"/></button>
            </div>
          </div>
        </div>
}

function WorkflowPreview({active}:{active:number}) {
  if(active===0||active===1) return <div className="workflow-artifact">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4"><span className="flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold"><PhoneIncoming className="size-4" aria-hidden="true"/></span><div><p className="text-sm">Home services inquiry</p><p className="mt-1 text-xs text-mist">Sample conversation</p></div></div>
    <p className="mt-5 text-xs text-mist">Customer</p><p className="mt-2 max-w-sm font-heading text-2xl leading-tight tracking-[-0.03em]">“Can someone come tomorrow? The upstairs unit stopped cooling.”</p>
    {active===1?<div className="mt-5 border-l-2 border-gold bg-gold/[0.06] p-4"><p className="text-xs text-gold">AI assistant · Scripted reply</p><p className="mt-2 text-sm leading-6">I can help request a visit. Is anyone unsafe without cooling right now?</p></div>:<p className="mt-7 flex items-center gap-2 text-xs text-gold"><span className="size-1.5 rounded-full bg-gold" aria-hidden="true"/>Ready for a useful response</p>}
  </div>
  if(active===3) return <div className="workflow-artifact"><p className="text-xs text-mist">A conversation, continued</p><ol className="mt-5 space-y-5 border-l border-gold/30 pl-5">{[["After the inquiry","Text acknowledgement","Thanks for reaching out. Your repair request is with the team."],["If no reply","A helpful reminder","Would you still like help finding a suitable time?"],["When they reply","The sequence pauses","The next step follows the customer's response."]].map(([time,title,body])=><li key={time}><p className="text-[0.65rem] tracking-wider text-gold uppercase">{time}</p><p className="mt-1 text-sm">{title}</p><p className="mt-1 text-xs leading-5 text-silver">{body}</p></li>)}</ol></div>
  if(active===4) return <div className="workflow-artifact"><p className="text-xs text-mist">Appointment request</p><div className="mt-5 flex gap-5 border border-gold/30 bg-gold/[0.04] p-5"><CalendarDays className="mt-1 size-8 shrink-0 text-gold" strokeWidth={1.2} aria-hidden="true"/><div><p className="font-heading text-3xl tracking-[-0.03em]">Tomorrow</p><p className="mt-2 text-sm text-silver">Afternoon window</p><p className="mt-4 text-xs text-gold">Requested · Awaiting confirmation</p></div></div><p className="mt-5 text-sm leading-6 text-silver">Cooling repair. The team reviews availability before confirming a visit.</p><p className="mt-5 text-xs text-mist">Illustration only. No appointment is booked.</p></div>
  return <div className="workflow-artifact"><div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4"><p className="text-sm">{active===2?"Lead details":"Owner summary"}</p>{active===2?<FileText className="size-4 text-gold" aria-hidden="true"/>:<Bell className="size-4 text-gold" aria-hidden="true"/>}</div><dl className="mt-2">{[["Service needed","Cooling repair"],["Urgency","Routine · No immediate danger"],["Preferred window","Tomorrow afternoon"],["Next action",active===2?"Continue the conversation":"Review request and confirm availability"]].map(([label,value])=><div className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-white/10 py-3 last:border-0" key={label}><dt className="text-xs leading-5 text-mist">{label}</dt><dd className="text-sm leading-5 text-ivory">{value}</dd></div>)}</dl><p className="mt-5 text-xs text-gold">{active===2?"Useful context, ready for the next step.":"A person has the context to take over."}</p></div>
}
