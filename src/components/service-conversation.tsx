"use client"

import { useRef } from "react"

import { SequenceControls, useSequencePlayer } from "@/components/motion-system"

const examples = {
  call: [
    "The upstairs unit stopped cooling. Can someone come tomorrow?",
    "I can take a cooling-repair request. Is anyone unsafe without cooling right now?",
    "No. Afternoon tomorrow is fine.",
    "I'll prepare that window and send your team the summary.",
  ],
  chat: [
    "Do you take afternoon requests?",
    "I can record an afternoon request and pass it to the team.",
    "Thursday afternoon, please.",
    "Thursday afternoon is noted as a booking request.",
  ],
} as const

export function ServiceConversation({ kind }: { kind: keyof typeof examples }) {
  const messages = examples[kind]
  const sceneRef = useRef<HTMLDivElement>(null)
  const player = useSequencePlayer(sceneRef, messages.length)
  return <div ref={sceneRef} className={`service-conversation motion-scene ${kind === "call" ? "call-conversation" : "chat-conversation"}`}
    data-motion-scene data-playing={player.playing} data-stage={player.active}>
    <div className="service-conversation-lines">
      {messages.map((text,index)=><p key={text} className="service-conversation-line" data-current={player.active===index} data-assistant={index%2===1}>
        <span className="sr-only">{index%2===1 ? "Assistant: " : "Customer: "}</span>{text}
      </p>)}
    </div>
    <SequenceControls player={player} name={`${kind} conversation preview`} status={`Reply ${player.active+1}/4`} />
  </div>
}
