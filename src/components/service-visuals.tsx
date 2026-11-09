import { cn } from "cn"

function SampleLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
      {children}
    </p>
  )
}

export function ReceptionistVisual({ className }: { className?: string }) {
  return (
    <figure className={cn("mx-auto w-full max-w-[340px]", className)}>
      <div className="rounded-[2rem] border border-navy/10 bg-navy p-3 shadow-[0_30px_70px_-40px_rgba(9,22,41,0.85)]">
        <div className="rounded-[1.4rem] bg-[#0e1c33] px-4 pt-5 pb-4">
          <div className="mb-5 flex items-center justify-between">
            <SampleLabel>Sample call</SampleLabel>
            <span className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.14em] text-silver uppercase">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              Illustrative
            </span>
          </div>
          <div className="space-y-3">
            <div className="ml-6 rounded-2xl rounded-tr-md bg-white/8 px-3.5 py-3 text-sm leading-6 text-ivory">
              Hi, my AC stopped cooling. Can someone come out today?
            </div>
            <div className="mr-4 rounded-2xl rounded-tl-md border border-gold/30 bg-gold/12 px-3.5 py-3 text-sm leading-6 text-ivory">
              I can help request a cooling repair. This afternoon still has an
              open window. Should I prepare that?
            </div>
            <div className="ml-8 rounded-2xl rounded-tr-md bg-white/8 px-3.5 py-3 text-sm leading-6 text-ivory">
              Yes, afternoon works.
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-slate px-3.5 py-3">
            <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
              Booking request prepared
            </p>
            <p className="mt-1 text-sm text-silver">
              Cooling repair · Afternoon · Sample only
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-quiet">
        Illustrative conversation. Not a live call.
      </figcaption>
    </figure>
  )
}

const followSteps = [
  { label: "Inquiry", detail: "New request received" },
  { label: "Text", detail: "First follow-up queued" },
  { label: "Email", detail: "Next step in the sequence" },
  { label: "Request", detail: "Appointment conversation opened" },
]

export function FollowUpVisual({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-[1.5rem] border p-5 sm:p-6",
          dark ? "border-white/10 bg-slate/70" : "border-navy/10 bg-white",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <SampleLabel>Sample sequence</SampleLabel>
          <p className={cn("text-xs", dark ? "text-mist" : "text-quiet")}>
            Inquiry #1048 · Example
          </p>
        </div>
        <ol className="relative mt-6 grid gap-4 sm:grid-cols-4">
          <div
            className="absolute top-4 right-[12%] left-[12%] hidden h-px bg-gold/50 sm:block"
            aria-hidden="true"
          />
          {followSteps.map((step, index) => (
            <li key={step.label} className="relative">
              <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-gold bg-navy font-heading text-xs text-gold">
                  {index + 1}
                </span>
                <div>
                  <p className={cn("font-heading text-lg font-semibold", dark ? "text-ivory" : "text-navy")}>
                    {step.label}
                  </p>
                  <p className={cn("mt-1 text-sm leading-6", dark ? "text-silver" : "text-quiet")}>
                    {step.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className={cn("mt-3 text-xs", dark ? "text-mist" : "text-quiet")}>
        A sample lead moving through follow-up. Not a real client.
      </figcaption>
    </figure>
  )
}

export function WebsiteVisual({ className }: { className?: string }) {
  return (
    <figure className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-[1.4rem] border border-navy/10 bg-white shadow-[0_30px_70px_-42px_rgba(9,22,41,0.8)]">
        <div className="flex items-center gap-2 border-b border-navy/10 bg-ivory px-4 py-3">
          <span className="size-2.5 rounded-full bg-navy/15" />
          <span className="size-2.5 rounded-full bg-navy/15" />
          <span className="size-2.5 rounded-full bg-navy/15" />
          <span className="ml-3 text-xs text-quiet">sample-business.example</span>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-6">
          <div>
            <p className="text-[0.68rem] tracking-[0.18em] text-gold-ink uppercase">
              Sample homepage
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-navy">
              Request a visit without waiting on hold.
            </p>
            <div className="mt-4 h-2 w-24 rounded-full bg-gold" />
            <div className="mt-5 space-y-2">
              <div className="h-2.5 w-full rounded-full bg-navy/8" />
              <div className="h-2.5 w-4/5 rounded-full bg-navy/8" />
            </div>
            <div className="mt-5 inline-flex rounded-full bg-navy px-4 py-2 text-xs font-semibold text-ivory">
              Request a time
            </div>
          </div>
          <div className="rounded-2xl bg-navy p-4 text-ivory">
            <SampleLabel>Illustrative chat</SampleLabel>
            <div className="mt-3 space-y-2 text-sm leading-6">
              <p className="rounded-xl bg-white/8 px-3 py-2">
                Do you service my area this week?
              </p>
              <p className="rounded-xl border border-gold/30 bg-gold/12 px-3 py-2">
                I can check that from the business information on file and help
                you request a visit. What is your ZIP code?
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-quiet">
        Product illustration. Not a live assistant.
      </figcaption>
    </figure>
  )
}

export function HeroVisual() {
  const cards = [
    {
      kicker: "Incoming call",
      title: "Sample caller · service request",
      body: "“Hi, I’d like to schedule an appointment.”",
      meta: "AI receptionist · Active",
    },
    {
      kicker: "Lead qualified",
      title: "Details captured",
      body: "Service, timing, and a way to reach the caller are on the card.",
      meta: "Sample inquiry · Not a client",
    },
    {
      kicker: "Appointment requested",
      title: "Window prepared",
      body: "A booking request is ready for the calendar connection in scope.",
      meta: "Status · Prepared",
    },
    {
      kicker: "Owner notified",
      title: "Summary ready for review",
      body: "The owner card shows the request. Nothing here is a live alert.",
      meta: "Demo activity",
    },
  ]

  return (
    <figure className="relative">
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(204,166,41,0.16),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0d1b30]/90 shadow-[0_40px_90px_-46px_rgba(0,0,0,0.85)] backdrop-blur">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-gold uppercase">
            Sample workflow
          </p>
          <p className="text-[0.68rem] tracking-[0.12em] text-mist uppercase">
            Not live customer data
          </p>
        </div>
        <ol className="relative space-y-3 p-4 sm:p-5">
          <div
            className="absolute top-8 bottom-8 left-[1.65rem] w-px bg-gold/35 sm:left-[1.85rem]"
            aria-hidden="true"
          />
          {cards.map((card, index) => (
            <li
              key={card.kicker}
              className="rise relative grid grid-cols-[auto_1fr] gap-3"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="relative z-10 mt-3 flex size-7 items-center justify-center rounded-full border border-gold/70 bg-navy font-heading text-[0.7rem] text-gold">
                {index + 1}
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                  {card.kicker}
                </p>
                <p className="mt-1 font-heading text-base font-semibold text-ivory">
                  {card.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-silver">{card.body}</p>
                <p className="mt-2 text-xs text-mist">{card.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="sr-only">
        Illustrative workflow: an incoming call, an active AI receptionist, a
        qualified sample lead, an appointment request, and an owner notification.
        This is a demonstration, not live customer activity.
      </figcaption>
    </figure>
  )
}
