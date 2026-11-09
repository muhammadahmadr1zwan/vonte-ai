import { ArrowDown, ArrowUpRight, Check, PhoneIncoming } from "lucide-react"

const stages = ["Incoming call", "AI response", "Lead captured", "Booking requested", "Owner notified"]

export function OperationsStage() {
  return (
    <figure className="signal-console" aria-label="Illustrative call-to-booking sequence">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-4 text-[0.65rem] tracking-[0.17em] uppercase sm:px-7">
        <span className="text-silver">VONTE / Signal flow</span>
        <span className="flex items-center gap-2 text-gold"><span className="size-1.5 bg-gold" aria-hidden="true" />Illustrative</span>
      </figcaption>
      <div className="signal-field relative flex flex-col items-center px-5 pt-8 pb-7 sm:px-7 sm:pt-10">
        <svg viewBox="0 0 420 300" fill="none" className="pointer-events-none absolute inset-x-0 top-0 h-full w-full" aria-hidden="true">
          <path d="M-30 160H70Q110 160 110 120V70Q110 40 150 40H270Q310 40 310 80V200Q310 240 350 240H450" className="signal-track" pathLength="1" />
          <path d="M-30 160H70Q110 160 110 120V70Q110 40 150 40H270Q310 40 310 80V200Q310 240 350 240H450" className="signal-flow" pathLength="1" />
          <circle cx="210" cy="150" r="97" stroke="currentColor" className="text-white/[0.06]" />
          <circle cx="210" cy="150" r="127" stroke="currentColor" className="text-white/[0.04]" />
        </svg>
        <div className="signal-icon relative flex size-14 items-center justify-center rounded-full border border-gold/40 bg-navy sm:size-16"><PhoneIncoming className="size-6 text-gold" strokeWidth={1.3} aria-hidden="true" /></div>
        <p className="signal-kicker relative mt-5 text-xs tracking-[0.2em] text-mist uppercase">An opportunity enters</p>
        <p className="signal-quote relative mt-2 font-heading text-2xl tracking-[-0.04em] text-ivory sm:text-3xl">“Can someone come tomorrow?”</p>
        <div className="signal-wave relative mt-5 flex h-8 items-center gap-[4px]" aria-hidden="true">
          {Array.from({length: 35}, (_, i) => <span key={i} className="wave-bar w-[2px] bg-gold" style={{height: `${6 + ((i * 17) % 25)}px`,animationDelay:`${i * 0.05}s`}} />)}
        </div>
        <span className="relative mt-5 flex items-center gap-2 text-sm text-silver"><Check className="size-4 text-gold" aria-hidden="true" />Need, timing, urgency captured</span>
      </div>
      <div className="mx-5 border-t border-white/15 sm:mx-7" />
      <ol className="signal-steps grid grid-cols-5 gap-2 px-5 py-5 sm:px-7" aria-label="Illustrative workflow stages">
        {stages.map((stage, i) => <li key={stage} className="relative">
          <span className="text-[0.65rem] tracking-widest text-gold">0{i+1}</span>
          <span className="mt-2 block text-xs leading-5 text-silver">{stage}</span>
        </li>)}
      </ol>
      <div className="flex items-start gap-3 border-t border-gold/25 bg-gold/[0.07] px-5 py-4 sm:px-7">
        <ArrowDown className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
        <div><p className="text-sm text-ivory">A clear next step for your team.</p><p className="mt-1 text-xs leading-5 text-mist">Scripted example. No call, message, or calendar event is created.</p></div>
        <ArrowUpRight className="ml-auto size-4 shrink-0 text-gold" aria-hidden="true" />
      </div>
    </figure>
  )
}
