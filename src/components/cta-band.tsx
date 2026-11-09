import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { strategyCallHref } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="bg-navy py-20 text-ivory sm:py-24">
      <Container className="grid items-end gap-8 lg:grid-cols-[1.4fr_auto]">
        <div>
          <div className="h-px w-10 bg-gold" />
          <h2 className="mt-5 max-w-2xl font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
            Let&apos;s Build a Smarter Business.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-silver">
            Tell us where your business is losing time or missing opportunities.
            We&apos;ll explore which VONTE solution fits.
          </p>
        </div>
        <CtaLink href={strategyCallHref()}>Book a Strategy Call</CtaLink>
      </Container>
    </section>
  )
}
