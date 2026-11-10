import { ArrowDown, ArrowUpRight, Check, PhoneIncoming, CalendarDays, FileText } from "lucide-react"

const stages = ["Incoming call", "AI assistant", "Lead captured", "Appointment requested", "Owner notified"]

export function OperationsStage() {
  return (
    <figure className="signal-console" aria-label="Illustrative call-to-booking sequence">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-4 text-[0.65rem] tracking-[0.17em] uppercase sm:px-6">
        <span className="text-silver">VONTE / Inquiry</span>
        <span className="flex items-center gap-2 text-gold"><span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />Illustrative</span>
      </figcaption>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10"><PhoneIncoming className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" /></span>
          <div><p className="text-sm text-ivory">An incoming inquiry</p><p className="mt-1 text-xs text-mist">Example · Home services</p></div>
          <span className="ml-auto shrink-0 text-xs whitespace-nowrap text-gold">01 / 05</span>
        </div>
        <div className="signal-field relative mt-4 overflow-hidden border border-white/10 px-4 py-4 sm:mt-6 sm:px-5 sm:py-9">
          <span className="signal-orbit" aria-hidden="true" />
          <p className="relative text-[0.65rem] tracking-[0.18em] text-mist uppercase">The customer asks</p>
          <p className="signal-quote relative mt-3 max-w-xs font-heading text-[1.75rem] leading-tight tracking-[-0.04em] text-ivory sm:text-[2rem]">“Can someone come tomorrow?”</p>
          <div className="relative mt-4 flex items-center gap-3 sm:mt-6">
            <div className="hidden h-6 items-center gap-[3px] sm:flex" aria-hidden="true">
              {Array.from({length: 18}, (_, i) => <span key={i} className="wave-bar w-[2px] bg-gold" style={{height: `${5 + ((i * 13) % 20)}px`,animationDelay:`${i * 0.05}s`}} />)}
            </div>
            <span className="text-xs text-silver">AI response · Scripted example</span>
          </div>
        </div>
        <div className="flex justify-center py-3 text-gold/70" aria-hidden="true"><ArrowDown className="size-4" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-white/15 bg-white/[0.02] p-4">
            <FileText className="size-4 text-gold" aria-hidden="true" /><p className="mt-3 text-xs text-mist">Lead captured</p><p className="mt-1 text-sm text-ivory">Cooling repair</p>
          </div>
          <div className="border border-gold/30 bg-gold/[0.06] p-4">
            <CalendarDays className="size-4 text-gold" aria-hidden="true" /><p className="mt-3 text-xs text-mist">Window requested</p><p className="mt-1 text-sm text-ivory">Tomorrow, PM</p>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-silver"><Check className="size-3.5 text-gold" aria-hidden="true" />A useful summary for the owner.</p>
      </div>
      <ol className="sr-only" aria-label="Illustrative workflow stages">{stages.map(stage=><li key={stage}>{stage}</li>)}</ol>
      <div className="flex items-start gap-3 border-t border-white/15 px-5 py-4 sm:px-6">
        <p className="text-xs leading-5 text-mist">Scripted example. No call, message, or calendar event is created.</p>
        <ArrowUpRight className="ml-auto size-4 shrink-0 text-gold" aria-hidden="true" />
      </div>
    </figure>
  )
}
