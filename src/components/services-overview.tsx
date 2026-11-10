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
    <section id="solutions" className="services-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
          <div><p className="section-label">Three services. Built around your business.</p>
          <h2 className="display services-heading mt-5">The work between an inquiry and an appointment.</h2></div>
          <p className="services-intro">An unanswered call. A lead waiting for a reply. A visitor with a question. Start with the gap your team needs to close.</p>
        </div>
        <div className="service-list">
          {summaries.map(({ id, audience, problem, features }, index) => {
            const pkg = getPackage(id)!
            return (
              <article key={id} className="service-row">
                <div><p className="service-number">0{index + 1}</p><h3 className="service-name">{pkg.name}</h3><p className="service-audience">{audience}</p></div>
                <div><p className="text-sm leading-7 text-muted-foreground">{problem}</p>
                  <ul className="service-scope">{features.map(feature => <li key={feature}>{pkg.included[feature]}</li>)}</ul>
                </div>
                <div className="service-commercial">
                  <PackageCost id={id} dark />
                  <Link href={`/services#${id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-foreground underline decoration-accent underline-offset-4 hover:text-accent">Explore service<span className="sr-only">: {pkg.name}</span><ArrowUpRight className="size-4" aria-hidden="true" /></Link>
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
      className="bg-background py-20 text-foreground sm:py-28"
    >
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
            AI Receptionist
          </p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
            Your front desk.
            <span className="serif-em mt-2 block text-accent">Always ready.</span>
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">{service.lede}</p>
          <PackageCost id={service.id} dark />
          {detailed ? (
            <details className="mt-6 border-y border-line py-4">
              <summary className="cursor-pointer py-2 text-sm text-accent">Service details and scope</summary>
              <div className="space-y-4 pt-3">
                {service.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
              </div>
            </details>
          ) : null}
          <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} />
          {detailed ? <p className="mt-6 text-sm leading-6 text-subtle">{service.note}</p> : null}
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
    <figure className="border border-line bg-surface lg:sticky lg:top-28 lg:col-span-7" aria-label="Illustrative receptionist conversation">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 text-[0.68rem] tracking-[0.18em] text-subtle uppercase">
        <span>Dedicated line</span>
        <span className="text-accent">Illustrative</span>
      </figcaption>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3 border-line px-5 py-5 lg:border-r">
          <p className="max-w-[16rem] border border-line px-3 py-2.5 text-sm leading-6">
            The upstairs unit stopped cooling. Can someone come tomorrow?
          </p>
          <p className="ml-6 border border-accent/40 bg-accent/10 px-3 py-2.5 text-sm leading-6">
            I can take a cooling-repair request. Is anyone unsafe without cooling right now?
          </p>
          <p className="max-w-[16rem] border border-line px-3 py-2.5 text-sm leading-6">
            No. Afternoon tomorrow is fine.
          </p>
          <p className="ml-6 border border-accent/40 bg-accent/10 px-3 py-2.5 text-sm leading-6">
            I&apos;ll prepare that window and send your team the summary.
          </p>
        </div>
        <div className="px-5 py-5">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">Captured</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Need", "Cooling repair"],
              ["Urgency", "Routine"],
              ["Window", "Next day, afternoon"],
              ["Route", "Booking request"],
            ].map(([term, value]) => (
              <div key={term} className="border-b border-line pb-3">
                <dt className="text-subtle">{term}</dt>
                <dd className="mt-1 text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs leading-5 text-subtle">
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
      className="bg-surface py-20 text-foreground sm:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
              Lead follow-up
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
              The right <span className="whitespace-nowrap">follow-up.</span>
              <span className="serif-em mt-2 block">At the right time.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
            {service.lede}
            <PackageCost id={service.id} />
          </p>
        </div>
        {detailed ? (
          <div className="mt-6 max-w-3xl space-y-4">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mt-12">
          <FollowUpSequence />
        </div>
        <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} />
        {detailed ? <p className="mt-6 text-sm leading-6 text-muted-foreground">{service.note}</p> : null}
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
      className="bg-background py-20 text-foreground sm:py-28"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
            Website and chatbot
          </p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
            An online presence
            <span className="serif-em mt-2 block">that works harder.</span>
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">{service.lede}</p>
          <PackageCost id={service.id} />
        </div>
        {detailed ? (
          <div className="mt-6 max-w-3xl space-y-4">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <figure className="mt-12 grid overflow-hidden border border-line bg-surface lg:grid-cols-[1.25fr_0.75fr]" aria-label="Illustrated website with an AI chatbot">
          <div className="border-b border-line lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-heading text-[0.72rem] tracking-[0.28em] uppercase">Sample site</span>
              <span className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">Illustrated</span>
            </div>
            <div className="px-5 py-8 sm:px-8">
              <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">Service business</p>
              <p className="display mt-4 max-w-sm text-4xl sm:text-5xl">
                Service, on your schedule.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                A composed page for services, hours, and a request. Not a client website.
              </p>
              <ul className="mt-8 divide-y divide-line border-y border-line text-sm">
                {["Repair visits", "Maintenance", "Estimates"].map((item) => (
                  <li key={item} className="flex items-center justify-between py-3">
                    <span>{item}</span>
                    <span className="text-accent">Request</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-background px-5 py-6 text-foreground">
            <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">Assistant</p>
            <div className="mt-5 space-y-3 text-sm leading-6">
              <p className="border border-line px-3 py-2.5">Do you take afternoon requests?</p>
              <p className="border border-accent/40 bg-accent/10 px-3 py-2.5">
                I can record an afternoon request and pass it to the team.
              </p>
              <p className="border border-line px-3 py-2.5">Thursday afternoon, please.</p>
              <p className="border border-accent/40 bg-accent/10 px-3 py-2.5">
                Thursday afternoon is noted as a booking request.
              </p>
            </div>
            <dl className="mt-6 border-t border-line pt-4 text-sm">
              <dt className="text-subtle">Captured intent</dt>
              <dd className="mt-1">Appointment · Thursday afternoon</dd>
            </dl>
          </div>
          <figcaption className="col-span-full border-t border-line px-5 py-3 text-xs leading-5 text-muted-foreground">
            Scripted preview. The assistant on a real site stays inside the business information you approve.
          </figcaption>
        </figure>

        <CapabilityList items={pkg.included.slice(0, detailed ? pkg.included.length : 5)} />
        {detailed ? <p className="mt-6 text-sm leading-6 text-muted-foreground">{service.note}</p> : null}
        <Actions
          detailed={detailed}
          serviceId={service.id}
          exploreHref={`/services#${service.id}`}
          exploreLabel="Explore the Website"
        />
        {detailed ? null : (
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/services" className="underline decoration-accent underline-offset-4">
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
  return <span className="package-cost mt-5 block text-sm text-muted-foreground">
    <span className={dark ? "text-accent" : "text-foreground"}>{formatMoney(pkg.setup)} setup</span>
    <span className="cost-separator mx-2" aria-hidden="true">/</span>
    <span className="cost-monthly">{formatMoney(pkg.monthly)} per month</span>
  </span>
}

function CompleteSolution() {
  const pkg = getPackage("vonte-complete")!
  const connections = [
    {label:"AI Receptionist", detail:"Answer the call", icon:PhoneIncoming},
    {label:"Lead Follow-Up", detail:"Continue the conversation", icon:MessageSquare},
    {label:"Website & Chatbot", detail:"Connect the next visitor", icon:Globe},
  ]
  return <section id="solution-vonte-complete" className="border-y border-line bg-surface py-20 text-foreground sm:py-24">
    <Container>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase">Vonte Complete / Complete Solution</p>
          <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">Built together.<span className="serif-em mt-2 block">Better connected.</span></h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">One coordinated front office: the receptionist, follow-up, and website packages, with monthly reporting and strategy review, priority support, and quarterly optimization.</p>
          <PackageCost id={pkg.id}/>
          <div className="mt-7"><CtaLink href={`/contact?package=${pkg.id}`} variant="navy" primary>Discuss Vonte Complete <ArrowUpRight aria-hidden="true"/></CtaLink></div>
        </div>
        <div className="border border-line bg-background p-5 sm:p-8 lg:col-span-7">
          <p className="text-[0.65rem] tracking-[0.18em] text-accent uppercase">Three services. One connected approach.</p>
          <div className="relative mt-7 space-y-3">
            <span className="absolute inset-y-5 left-[25px] w-px bg-line" aria-hidden="true"/>
            {connections.map(({label,detail,icon:Icon})=><div key={label} className="relative flex items-center gap-4 border border-line bg-surface p-3 sm:p-4"><span className="flex size-10 shrink-0 items-center justify-center border border-line bg-background"><Icon className="size-4" aria-hidden="true"/></span><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div><Check className="ml-auto size-4 shrink-0 text-accent" aria-hidden="true"/></div>)}
          </div>
          <div className="mt-5 border-t border-line pt-5"><p className="font-heading text-xl tracking-[-0.03em]">Your team stays in control.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Business-approved answers, agreed handoffs, and a clear scope before launch.</p></div>
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
}: {
  items: readonly string[]
}) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-sm leading-6">
          <span className="text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}
