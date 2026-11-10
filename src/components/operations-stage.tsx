"use client"

import { useRef } from "react"

import { ArrowDownRight, FileText, PhoneIncoming } from "lucide-react"
import { SequenceControls, useSequencePlayer } from "@/components/motion-system"

const stages = ["Incoming call", "AI response", "Lead captured", "Appointment requested", "Owner notified"]

/** An original vector and type composition. All business activity is illustrative. */
export function OperationsStage() {
  const sceneRef = useRef<HTMLElement>(null)
  const player = useSequencePlayer(sceneRef, stages.length, { auto: true })
  return <figure ref={sceneRef} className="inquiry-artboard motion-scene" data-motion-scene data-playing={player.playing} data-stage={player.active}
    aria-label="Illustrative call-to-booking sequence">
    <figcaption className="inquiry-artboard-meta">
      <span>Intelligence in motion</span><span>Scripted example</span>
    </figcaption>
    <div className="inquiry-artboard-body">
      <div className="inquiry-origin">
        <span className="inquiry-origin-icon"><PhoneIncoming className="size-4" strokeWidth={1.5} aria-hidden="true" /></span>
        <div><p className="inquiry-label">01 / An incoming call</p><p className="inquiry-origin-detail">Home services</p></div>
        <span className="sequence-wave" aria-hidden="true">{[7,13,9,16,11,6].map((height,index)=><span key={index} style={{height,animationDelay:`${index*70}ms`}} />)}</span>
      </div>
      <blockquote className="inquiry-question">“Can someone<br className="hidden sm:block" /> come tomorrow?”</blockquote>
      <div className="inquiry-routing" aria-hidden="true">
        <div><span data-active={player.active===1}>Respond</span><span data-active={player.active===2}>Qualify</span><span data-active={player.active>=3}>Route</span></div>
        <svg viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
          <path key={player.active} pathLength={1} d="M12 12H86C100 12 108 20 108 34V44C108 58 116 66 130 66H270C284 66 292 58 292 44V34C292 20 300 12 314 12H388" className="inquiry-route-path" />
          <circle cx="12" cy="12" r="3" /><circle cx="200" cy="66" r="3" /><circle cx="388" cy="12" r="3" />
          <path d="m382 6 6 6-6 6" className="inquiry-route-arrow" />
        </svg>
      </div>
      <div className="inquiry-phase-controls" data-motion-controls role="group" aria-label="Inspect illustrative workflow stages">
        {stages.map((stage,index)=><button type="button" key={stage} aria-label={`Inspect ${stage}`} aria-pressed={player.active===index} onClick={()=>player.select(index)}>0{index+1}</button>)}
      </div>
      <SequenceControls player={player} name="workflow animation" status={`${player.active+1}/5 · ${stages[player.active]}`} />
      <div className="inquiry-record">
        <p className="inquiry-record-title"><FileText className="size-4" strokeWidth={1.5} aria-hidden="true" />02 / The request, organized<ArrowDownRight className="ml-auto size-4" aria-hidden="true" /></p>
        <dl><div><dt>Service</dt><dd>Cooling repair</dd></div><div><dt>Preferred time</dt><dd>Tomorrow afternoon</dd></div></dl>
        <p className="inquiry-record-status"><span aria-hidden="true" />Prepared for your team to review</p>
      </div>
    </div>
    <ol className="sr-only" aria-label="Illustrative workflow stages">{stages.map(stage => <li key={stage}>{stage}</li>)}</ol>
    <p className="inquiry-artboard-note">Scripted example. No call, message, or calendar event is created.</p>
  </figure>
}
