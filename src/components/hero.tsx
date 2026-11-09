import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { OperationsStage } from "@/components/operations-stage"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-10 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:min-h-[690px] lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div className="rise lg:col-span-7">
          <p className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.2em] text-gold uppercase sm:text-xs">
            <span className="h-px w-6 shrink-0 bg-gold" aria-hidden="true" />Intelligence in motion
          </p>
          <h1 className="display hero-title mt-7 text-ivory">
            Never let an<br />opportunity<span className="serif-em mt-2 block text-gold">go unanswered.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-silver sm:text-lg sm:leading-8">
            AI receptionists, intelligent follow-up, and websites that help service businesses turn inquiries into appointment requests.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={strategyCallHref()}>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <CtaLink href="#system" variant="inverse">Explore the System <ArrowDown aria-hidden="true" /></CtaLink>
          </div>
          <p className="mt-6 flex items-center gap-2.5 text-sm text-mist"><span className="h-px w-5 shrink-0 bg-gold/60" aria-hidden="true" />Built around your business. Ready for the next inquiry.</p>
        </div>
        <div className="rise min-w-0 lg:col-span-5" style={{animationDelay:"100ms"}}><OperationsStage /></div>
      </Container>
      <Container className="relative">
        <nav aria-label="Explore solutions" className="grid grid-cols-3 border-t border-white/15">
          {[
            ["ai-receptionist", "Calls, answered.", "AI Receptionist"],
            ["lead-follow-up", "Conversations, continued.", "Lead follow-up"],
            ["website-chatbot", "Visitors, connected.", "Website & chatbot"],
          ].map(([id, title, label], i) => (
            <Link key={id} href={`/services#${id}`} className="group py-5 pr-3 sm:py-7">
              <span className="text-[0.65rem] tracking-widest text-gold">0{i+1}</span>
              <span className="mt-2 hidden font-heading text-lg tracking-[-0.02em] transition-colors group-hover:text-gold sm:block">{title}</span>
              <span className="mt-2 flex items-center gap-2 text-xs leading-5 text-silver">{label}<ArrowUpRight className="hidden size-3 sm:block" aria-hidden="true" /></span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  )
}
