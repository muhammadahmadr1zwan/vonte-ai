const beats = [
  {
    kicker: "01  Incoming",
    title: "New service inquiry",
    body: "A call reaches the dedicated line while the team is occupied.",
    wave: true,
  },
  {
    kicker: "02  Response",
    title: "Recognized as a new opportunity",
    body: "The assistant answers from approved information and asks the next useful question.",
  },
  {
    kicker: "03  Qualified",
    title: "Lead record prepared",
    body: "Need, timing, and urgency are captured for a person to review.",
  },
] as const

export function OperationsStage() {
  return (
    <figure className="relative" aria-label="Illustrative call-to-booking sequence">
      <figcaption className="mb-4 flex items-center justify-between gap-4 text-[0.68rem] font-medium tracking-[0.22em] text-mist uppercase">
        <span>Call to booking</span>
        <span className="text-gold">Illustrative demo</span>
      </figcaption>
      <div className="relative border border-white/12 bg-[#0c1830] p-4 sm:p-5">
        <svg
          className="pointer-events-none absolute top-7 bottom-7 left-[1.35rem] hidden w-3 sm:block"
          viewBox="0 0 12 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="signal-track" pathLength={1} d="M6 0 V100" />
          <path className="signal-flow" pathLength={1} d="M6 0 V100" />
        </svg>
        <ol className="relative space-y-3 sm:pl-8">
          {beats.map((beat, index) => (
            <li
              key={beat.kicker}
              className="ops-card relative border border-white/10 bg-white/[0.03] px-4 py-3.5"
              style={{ animationDelay: `${160 + index * 180}ms` }}
            >
              <span
                className="absolute top-5 -left-[1.85rem] hidden size-1.5 bg-gold sm:block"
                aria-hidden="true"
              />
              <p className="text-[0.68rem] font-medium tracking-[0.18em] text-gold uppercase">
                {beat.kicker}
              </p>
              <p className="mt-1.5 font-heading text-lg leading-tight tracking-[-0.03em] text-ivory">
                {beat.title}
              </p>
              {"wave" in beat ? <Waveform /> : null}
              <p className="mt-1.5 text-sm leading-6 text-silver">{beat.body}</p>
            </li>
          ))}
          <li
            className="ops-card grid gap-3 sm:grid-cols-2"
            style={{ animationDelay: "700ms" }}
          >
            <div className="relative border border-gold/40 bg-gold/10 px-4 py-3.5">
              <p className="text-[0.68rem] font-medium tracking-[0.18em] text-gold uppercase">
                04  Booking
              </p>
              <p className="mt-1.5 font-heading text-lg leading-tight tracking-[-0.03em]">
                Window requested
              </p>
              <p className="mt-1.5 text-sm leading-6 text-silver">
                An afternoon opening is prepared. Nothing is written to a calendar here.
              </p>
            </div>
            <div className="relative border border-white/10 px-4 py-3.5">
              <p className="text-[0.68rem] font-medium tracking-[0.18em] text-mist uppercase">
                05  Owner
              </p>
              <p className="mt-1.5 font-heading text-lg leading-tight tracking-[-0.03em]">
                Summary ready
              </p>
              <p className="mt-1.5 text-sm leading-6 text-silver">
                The business gets the record. Urgent calls are routed to a person.
              </p>
            </div>
          </li>
        </ol>
        <p className="mt-4 text-xs leading-5 text-mist">
          Scripted product concept. Not a live phone line, and not a customer record.
        </p>
      </div>
    </figure>
  )
}

function Waveform() {
  return (
    <span className="mt-3 flex h-7 items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 16 }, (_, index) => (
        <span
          key={index}
          className="wave-bar w-[3px] bg-gold/90"
          style={{
            height: `${8 + ((index * 13) % 16)}px`,
            animationDelay: `${index * 0.07}s`,
          }}
        />
      ))}
    </span>
  )
}
