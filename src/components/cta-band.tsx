import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { strategyCallHref } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="cta-section relative overflow-hidden bg-background py-20 text-foreground sm:py-28">
      <Container className="closing-layout relative">
        <div data-motion="closing"><p className="section-label">A conversation before a commitment</p>
        <h2 className="display mt-5 max-w-3xl text-[2.8rem] sm:text-6xl lg:text-[4.6rem]">
          Your business.
          <span className="serif-em mt-2 block text-accent">A better front office.</span>
        </h2>
        </div>
        <div className="closing-action" data-motion="closing"><span className="closing-signal" aria-hidden="true" /><p className="max-w-md text-base leading-7 text-muted-foreground">
          Tell us where inquiries get stuck. We&apos;ll help you work out which service fits, what it includes, and what happens next.
        </p>
        <div className="mt-10">
          <CtaLink href={strategyCallHref()} primary>Book a Strategy Call</CtaLink>
        </div>
        <p className="mt-6 text-sm text-subtle">
          A consultation request does not reserve a meeting or create a service agreement.
        </p>
        </div>
      </Container>
    </section>
  )
}
