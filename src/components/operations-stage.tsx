import { ArrowUpRight, CalendarDays, PhoneIncoming } from "lucide-react"

const stages = ["Incoming call", "Intelligent response", "Lead qualification", "Booking request", "Team notification"]

export function OperationsStage() {
  return <figure className="inquiry-rail" aria-label="Illustrative call-to-booking sequence">
    <figcaption className="rail-meta">
      <span className="section-label">VONTE / Inquiry flow</span>
      <span className="section-label">Scripted example</span>
    </figcaption>
    <div className="rail-flow">
      <div className="rail-endpoint">
        <span className="rail-icon"><PhoneIncoming className="size-4" strokeWidth={1.5} aria-hidden="true" /></span>
        <div><p className="rail-title">An incoming call.</p><p className="rail-detail">Home services · Cooling repair</p></div>
      </div>
      <span className="rail-connector" aria-hidden="true" />
      <div className="rail-endpoint">
        <span className="rail-icon is-request"><CalendarDays className="size-4" strokeWidth={1.5} aria-hidden="true" /></span>
        <div><p className="rail-title">A booking request.</p><p className="rail-detail">Tomorrow afternoon · For review</p></div>
      </div>
    </div>
    <ol className="sr-only" aria-label="Illustrative workflow stages">{stages.map(stage => <li key={stage}>{stage}</li>)}</ol>
    <div className="rail-caption">
      <p>Respond. Qualify. Give the team context. <ArrowUpRight className="ml-1 inline size-3" aria-hidden="true" /></p>
      <p>Scripted example. No call, message, or calendar event is created.</p>
    </div>
  </figure>
}
