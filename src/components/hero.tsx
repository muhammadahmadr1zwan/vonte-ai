import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { OperationsStage } from "@/components/operations-stage"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="hero-shell">
      <Container className="hero-layout">
        <div className="hero-copy rise">
          <p className="hero-eyebrow section-label">VONTE / AI for service businesses</p>
          <h1 className="hero-title text-foreground">
            <span>Every Opportunity.</span>{" "}<span className="hero-answered">Answered.</span>
          </h1>
          <p className="hero-support">
            Answer calls, follow up with leads, and help website visitors request an appointment.
          </p>
          <div className="hero-actions">
            <CtaLink href={strategyCallHref()} primary>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <Link href="/#system" className="hero-secondary">Explore VONTE <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <p className="hero-audience">For home services, dental, legal, med spas, and other appointment-based businesses.</p>
        </div>
        <div className="hero-visual"><OperationsStage /></div>
      </Container>
    </section>
  )
}
