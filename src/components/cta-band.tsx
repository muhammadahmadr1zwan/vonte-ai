import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { strategyCallHref } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="cta-section relative overflow-hidden bg-background py-20 text-foreground sm:py-28">
      <Container className="relative">
        <h2 className="display max-w-5xl text-[2.8rem] sm:text-6xl lg:text-[5.4rem]">
          Spend less time chasing inquiries.
          <span className="serif-em mt-2 block text-accent">Start with a conversation.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Tell us where calls or follow-up get stuck. We&apos;ll discuss which service fits your business.
        </p>
        <div className="mt-10">
          <CtaLink href={strategyCallHref()} primary>Book a Strategy Call</CtaLink>
        </div>
        <p className="mt-6 text-sm text-subtle">
          A consultation request does not reserve a meeting or create a service agreement.
        </p>
      </Container>
    </section>
  )
}
