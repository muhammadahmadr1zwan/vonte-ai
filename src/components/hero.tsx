import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { OperationsStage } from "@/components/operations-stage"
import { strategyCallHref } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <Container className="relative grid items-center gap-14 py-14 sm:py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-10 lg:py-12">
        <div className="rise lg:col-span-7">
          <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.24em] text-gold uppercase">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            The intelligence behind your growth
          </p>
          <h1 className="display mt-6 text-[3.15rem] text-ivory sm:text-[4.15rem] lg:text-[3.85rem] xl:text-[5.05rem]">
            <span className="block">Every Opportunity.</span>
            <span className="serif-em mt-1 block text-gold">Answered.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-silver sm:text-lg sm:leading-8">
            AI-powered calls, lead follow-up, and websites that help service
            businesses turn more inquiries into real opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={strategyCallHref()}>Book a Strategy Call</CtaLink>
            <CtaLink href="#system" variant="inverse">
              Explore the System
            </CtaLink>
          </div>
          <p className="mt-8 max-w-md text-sm leading-6 text-mist">
            Built for businesses that can&apos;t afford to miss the next call.
          </p>
        </div>
        <div className="rise lg:col-span-5" style={{ animationDelay: "120ms" }}>
          <OperationsStage />
        </div>
      </Container>
    </section>
  )
}
