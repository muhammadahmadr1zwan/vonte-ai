import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { OperationsStage } from "@/components/operations-stage"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
        <div className="rise lg:col-span-7">
          <p className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.2em] text-gold uppercase sm:text-xs">
            <span className="h-px w-6 shrink-0 bg-gold" aria-hidden="true" />Intelligence in motion
          </p>
          <h1 className="display hero-title mt-7 text-ivory">
            Turn missed inquiries{" "}<span className="serif-em mt-2 block text-gold">into booked opportunities.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-silver sm:text-lg sm:leading-8">
            VONTE helps service businesses answer calls, follow up with leads, and guide website visitors toward the next step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={strategyCallHref()} primary>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <Link href="/how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm text-silver underline decoration-white/30 underline-offset-4 transition-colors hover:text-ivory">See How It Works <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-mist">For home services, dental, legal, med spas, and other appointment-based businesses.</p>
        </div>
        <div className="rise min-w-0 lg:col-span-5" style={{animationDelay:"100ms"}}><OperationsStage /></div>
      </Container>
    </section>
  )
}
