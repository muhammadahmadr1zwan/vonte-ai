import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"
import { HeroVisual } from "@/components/service-visuals"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-24">
        <div className="rise">
          <Eyebrow>AI Automation Agency</Eyebrow>
          <h1 className="mt-6 max-w-xl font-heading text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-[4.15rem] lg:leading-[0.98]">
            Never Let Another Opportunity Go Unanswered.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-gold sm:text-lg">
            AI-powered calls, lead follow-up, and websites built to help your
            business grow.
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            Your business doesn&apos;t stop when you&apos;re busy. VONTE builds
            intelligent systems that handle incoming calls, follow up with leads,
            and help turn interest into appointments.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={strategyCallHref()}>Book a Strategy Call</CtaLink>
            <CtaLink href="/services" variant="inverse">
              Explore Our Solutions
            </CtaLink>
          </div>
          <ul className="mt-10 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li>Setup fee plus monthly retainer</li>
            <li>Four fixed packages</li>
            <li>For appointment-driven businesses</li>
          </ul>
        </div>
        <HeroVisual />
      </Container>
    </section>
  )
}
