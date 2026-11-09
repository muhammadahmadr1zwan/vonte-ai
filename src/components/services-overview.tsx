import Link from "next/link"
import { ArrowUpRight, PhoneIncoming, MessageSquare, Globe, Check } from "lucide-react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { FollowUpSequence } from "@/components/follow-up-sequence"
import { services } from "@/lib/content"
import { getPackage } from "@/lib/pricing"
import { formatMoney } from "@/lib/format"

export function ServicesOverview({ detailed = false }: { detailed?: boolean }) {
  if (!detailed) return <ServiceCards />
  const receptionist = services[0]
  const followUp = services[1]
  const website = services[2]

  return (
    <div id="solutions">
      <Receptionist detailed={detailed} service={receptionist} />
      <FollowUp detailed={detailed} service={followUp} />
      <Website detailed={detailed} service={website} />
      <CompleteSolution />
    </div>
  )
}

function ServiceCards() {
  const summaries = [
    { id: "ai-receptionist", audience: "For teams busy serving customers.", problem: "Answer incoming calls and capture the details your team needs.", features: [2, 3, 7, 8], icon: PhoneIncoming },
    { id: "lead-follow-up", audience: "For businesses with new or unconverted leads.", problem: "Keep follow-up moving without relying on manual reminders.", features: [0, 1, 2, 4], icon: MessageSquare },
    { id: "website-chatbot", audience: "For businesses that need a stronger website.", problem: "Help visitors find answers and request an appointment.", features: [0, 2, 3, 6], icon: Globe },
  ] as const

  return (
    <section id="solutions" className="bg-navy-deep py-16 text-ivory sm:py-20">
      <Container>
        <p className="text-xs tracking-[0.18em] text-gold uppercase">Three services</p>
        <h2 className="display mt-5 max-w-2xl text-4xl sm:text-5xl">Start where your business<span className="serif-em mt-2 block text-gold">needs support.</span></h2>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {summaries.map(({ id, audience, problem, features, icon: Icon }) => {
            const pkg = getPackage(id)!
            return (
              <article key={id} className="flex min-w-0 flex-col border border-white/15 bg-navy p-5 sm:p-6">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-heading text-2xl leading-tight tracking-[-0.03em]">{pkg.name}</h3>
                <p className="mt-3 text-xs leading-5 text-gold">{audience}</p>
                <p className="mt-4 text-sm leading-6 text-silver">{problem}</p>
                <ul className="mt-5 space-y-2 border-t border-white/15 pt-5">
                  {features.map(index => <li key={index} className="flex gap-2 text-sm leading-6 text-silver"><Check className="mt-1 size-3.5 shrink-0 text-gold" aria-hidden="true" />{pkg.included[index]}</li>)}
                </ul>
                <div className="mt-auto pt-6">
                  <PackageCost id={id} dark />
                  <Link href={`/services#${id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-ivory underline decoration-gold underline-offset-4 hover:text-gold">Explore service<span className="sr-only">: {pkg.name}</span><ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Receptionist({
  detailed,
  service,
}: {
  detailed: boolean
  service: (typeof services)[number]
}) {
  const pkg = getPackage(service.id)!
  return (
    <section
      id={detailed ? service.id : `solution-${service.id}`}
      className="bg-[#07111f] py-20 text-ivory sm:py-28"
    >
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
            AI Receptionist
          </p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
            Your front desk.
            <span className="serif-em mt-2 block text-gold">Always ready.</span>
          </h2>
          <p className="mt-6 text-base leading-7 text-silver sm:text-lg">{service.lede}</p>
          <PackageCost id={service.id} dark />
          {detailed ? (
            <details className="mt-6 border-y border-white/15 py-4">
              <summary className="cursor-pointer py-2 text-sm text-gold">Service details and scope</summary>
              <div className="space-y-4 pt-3">
                {service.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-silver">{paragraph}</p>)}
              </div>
            </details>
          ) : null}
          <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} light />
          {detailed ? <p className="mt-6 text-sm leading-6 text-mist">{service.note}</p> : null}
          <Actions
            detailed={detailed}
            serviceId={service.id}
            exploreHref={`/services#${service.id}`}
            exploreLabel="Explore AI Receptionist"
            dark
          />
        </div>
        <CallConsole />
      </Container>
    </section>
  )
}

function CallConsole() {
  return (
    <figure className="border border-white/10 bg-[#0c1830] lg:sticky lg:top-28 lg:col-span-7" aria-label="Illustrative receptionist conversation">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 text-[0.68rem] tracking-[0.18em] text-mist uppercase">
        <span>Dedicated line</span>
        <span className="text-gold">Illustrative</span>
      </figcaption>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3 border-white/10 px-5 py-5 lg:border-r">
          <p className="max-w-[16rem] border border-white/10 px-3 py-2.5 text-sm leading-6">
            The upstairs unit stopped cooling. Can someone come tomorrow?
          </p>
          <p className="ml-6 border border-gold/40 bg-gold/10 px-3 py-2.5 text-sm leading-6">
            I can take a cooling-repair request. Is anyone unsafe without cooling right now?
          </p>
          <p className="max-w-[16rem] border border-white/10 px-3 py-2.5 text-sm leading-6">
            No. Afternoon tomorrow is fine.
          </p>
          <p className="ml-6 border border-gold/40 bg-gold/10 px-3 py-2.5 text-sm leading-6">
            I&apos;ll prepare that window and send your team the summary.
          </p>
        </div>
        <div className="px-5 py-5">
          <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">Captured</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Need", "Cooling repair"],
              ["Urgency", "Routine"],
              ["Window", "Next day, afternoon"],
              ["Route", "Booking request"],
            ].map(([term, value]) => (
              <div key={term} className="border-b border-white/10 pb-3">
                <dt className="text-mist">{term}</dt>
                <dd className="mt-1 text-ivory">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-3 text-xs leading-5 text-mist">
        Urgent calls are designed to hand off to a person you choose. This is a scripted screen, not a live call.
      </p>
    </figure>
  )
}

function FollowUp({
  detailed,
  service,
}: {
  detailed: boolean
  service: (typeof services)[number]
}) {
  const pkg = getPackage(service.id)!
  return (
    <section
      id={detailed ? service.id : `solution-${service.id}`}
      className="bg-paper py-20 text-navy sm:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
              Lead follow-up
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
              The right <span className="whitespace-nowrap">follow-up.</span>
              <span className="serif-em mt-2 block">At the right time.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-quiet lg:col-span-4 lg:col-start-9">
            {service.lede}
            <PackageCost id={service.id} />
          </p>
        </div>
        {detailed ? (
          <div className="mt-6 max-w-3xl space-y-4">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-quiet">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mt-12">
          <FollowUpSequence />
        </div>
        <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} />
        {detailed ? <p className="mt-6 text-sm leading-6 text-quiet">{service.note}</p> : null}
        <Actions
          detailed={detailed}
          serviceId={service.id}
          exploreHref={`/services#${service.id}`}
          exploreLabel="Explore Follow-Up"
        />
      </Container>
    </section>
  )
}

function Website({
  detailed,
  service,
}: {
  detailed: boolean
  service: (typeof services)[number]
}) {
  const pkg = getPackage(service.id)!
  return (
    <section
      id={detailed ? service.id : `solution-${service.id}`}
      className="bg-ivory py-20 text-navy sm:py-28"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
            Website and chatbot
          </p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
            An online presence
            <span className="serif-em mt-2 block">that works harder.</span>
          </h2>
          <p className="mt-6 text-base leading-7 text-quiet sm:text-lg">{service.lede}</p>
          <PackageCost id={service.id} />
        </div>
        {detailed ? (
          <div className="mt-6 max-w-3xl space-y-4">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-quiet">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <figure className="mt-12 grid overflow-hidden border border-navy/10 bg-paper lg:grid-cols-[1.25fr_0.75fr]" aria-label="Illustrated website with an AI chatbot">
          <div className="border-b border-navy/10 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3">
              <span className="font-heading text-[0.72rem] tracking-[0.28em] uppercase">Sample site</span>
              <span className="text-[0.68rem] tracking-[0.16em] text-gold-ink uppercase">Illustrated</span>
            </div>
            <div className="px-5 py-8 sm:px-8">
              <p className="text-[0.68rem] tracking-[0.18em] text-gold-ink uppercase">Service business</p>
              <p className="display mt-4 max-w-sm text-4xl sm:text-5xl">
                Service, on your schedule.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-quiet">
                A composed page for services, hours, and a request. Not a client website.
              </p>
              <ul className="mt-8 divide-y divide-navy/10 border-y border-navy/10 text-sm">
                {["Repair visits", "Maintenance", "Estimates"].map((item) => (
                  <li key={item} className="flex items-center justify-between py-3">
                    <span>{item}</span>
                    <span className="text-gold-ink">Request</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-navy px-5 py-6 text-ivory">
            <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">Assistant</p>
            <div className="mt-5 space-y-3 text-sm leading-6">
              <p className="border border-white/15 px-3 py-2.5">Do you take afternoon requests?</p>
              <p className="border border-gold/40 bg-gold/10 px-3 py-2.5">
                I can record an afternoon request and pass it to the team.
              </p>
              <p className="border border-white/15 px-3 py-2.5">Thursday afternoon, please.</p>
              <p className="border border-gold/40 bg-gold/10 px-3 py-2.5">
                Thursday afternoon is noted as a booking request.
              </p>
            </div>
            <dl className="mt-6 border-t border-white/10 pt-4 text-sm">
              <dt className="text-mist">Captured intent</dt>
              <dd className="mt-1">Appointment · Thursday afternoon</dd>
            </dl>
          </div>
          <figcaption className="col-span-full border-t border-navy/10 px-5 py-3 text-xs leading-5 text-quiet">
            Scripted preview. The assistant on a real site stays inside the business information you approve.
          </figcaption>
        </figure>

        <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} />
        {detailed ? <p className="mt-6 text-sm leading-6 text-quiet">{service.note}</p> : null}
        <Actions
          detailed={detailed}
          serviceId={service.id}
          exploreHref={`/services#${service.id}`}
          exploreLabel="Explore the Website"
        />
        {detailed ? null : (
          <p className="mt-6 text-sm text-quiet">
            <Link href="/services" className="underline decoration-gold underline-offset-4">
              Read the service details
            </Link>
          </p>
        )}
      </Container>
    </section>
  )
}

function PackageCost({id, dark = false}: {id: string; dark?: boolean}) {
  const pkg = getPackage(id)!
  return <span className={`mt-5 block text-sm ${dark ? "text-silver" : "text-quiet"}`}>
    <span className={dark ? "text-gold" : "text-navy"}>{formatMoney(pkg.setup)} setup</span>
    <span className="mx-2" aria-hidden="true">/</span>
    {formatMoney(pkg.monthly)} per month
  </span>
}

function CompleteSolution() {
  const pkg = getPackage("vonte-complete")!
  const connections = [
    {label:"AI Receptionist", detail:"Answer the call", icon:PhoneIncoming},
    {label:"Lead Follow-Up", detail:"Continue the conversation", icon:MessageSquare},
    {label:"Website & Chatbot", detail:"Connect the next visitor", icon:Globe},
  ]
  return <section id="solution-vonte-complete" className="border-y border-navy/10 bg-paper py-20 text-navy sm:py-24">
    <Container>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] text-gold-ink uppercase">Vonte Complete / Complete Solution</p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">Built together.<span className="serif-em mt-2 block">Better connected.</span></h2>
          <p className="mt-6 text-base leading-7 text-quiet">One coordinated front office: the receptionist, follow-up, and website packages, with monthly reporting and strategy review, priority support, and quarterly optimization.</p>
          <PackageCost id={pkg.id}/>
          <div className="mt-7"><CtaLink href={`/contact?package=${pkg.id}`} variant="navy" primary>Discuss Vonte Complete <ArrowUpRight aria-hidden="true"/></CtaLink></div>
        </div>
        <div className="border border-navy/15 bg-ivory p-5 sm:p-8 lg:col-span-7">
          <p className="text-[0.65rem] tracking-[0.18em] text-gold-ink uppercase">Three services. One connected approach.</p>
          <div className="relative mt-7 space-y-3">
            <span className="absolute inset-y-5 left-[25px] w-px bg-navy/20" aria-hidden="true"/>
            {connections.map(({label,detail,icon:Icon})=><div key={label} className="relative flex items-center gap-4 border border-navy/10 bg-paper p-3 sm:p-4"><span className="flex size-10 shrink-0 items-center justify-center border border-navy/15 bg-ivory"><Icon className="size-4" aria-hidden="true"/></span><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-quiet">{detail}</p></div><Check className="ml-auto size-4 shrink-0 text-gold-ink" aria-hidden="true"/></div>)}
          </div>
          <div className="mt-5 border-t border-navy/15 pt-5"><p className="font-heading text-xl tracking-[-0.03em]">Your team stays in control.</p><p className="mt-2 text-sm leading-6 text-quiet">Business-approved answers, agreed handoffs, and a clear scope before launch.</p></div>
        </div>
      </div>
    </Container>
  </section>
}

function Actions({
  detailed,
  serviceId,
  exploreHref,
  exploreLabel,
  dark = false,
}: {
  detailed: boolean
  serviceId: string
  exploreHref: string
  exploreLabel: string
  dark?: boolean
}) {
  if (detailed) {
    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CtaLink href={`/contact?package=${serviceId}`} variant={dark ? "gold" : "navy"} primary>
          Discuss This Package
        </CtaLink>
        <CtaLink href={`/pricing#${serviceId}`} variant={dark ? "inverse" : "quiet"}>
          See pricing
        </CtaLink>
      </div>
    )
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <CtaLink href={exploreHref} variant={dark ? "gold" : "navy"}>
        {exploreLabel}
      </CtaLink>
      <CtaLink href={`/contact?package=${serviceId}`} variant={dark ? "inverse" : "quiet"}>
        Discuss This Package
      </CtaLink>
    </div>
  )
}

function CapabilityList({
  items,
  light = false,
}: {
  items: readonly string[]
  light?: boolean
}) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-sm leading-6">
          <span className={light ? "text-gold" : "text-gold-ink"}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={light ? "text-ivory" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
