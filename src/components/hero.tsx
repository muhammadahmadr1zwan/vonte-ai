import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { OperationsStage } from "@/components/operations-stage"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="hero-shell">
      <Container className="hero-layout">
        <div className="hero-copy rise">
          <p className="hero-eyebrow section-label">Intelligence in motion</p>
          <h1 className="hero-title text-foreground">
            <span>Every Opportunity.</span>{" "}<span className="hero-answered">Answered.</span>
          </h1>
          <p className="hero-support">
            AI-powered calls, lead follow-up, and websites that help businesses capture more opportunities.
          </p>
          <div className="hero-actions">
            <CtaLink href={strategyCallHref()} primary>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <CtaLink href="/#system" variant="inverse">Explore VONTE <ArrowRight aria-hidden="true" /></CtaLink>
          </div>
          <p className="hero-audience">For home services, dental, legal, med spas, and other appointment-based businesses.</p>
        </div>
        <div className="hero-visual"><OperationsStage /></div>
      </Container>
    </section>
  )
}
