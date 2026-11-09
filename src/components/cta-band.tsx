import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { strategyCallHref } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-32">
      <svg
        className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-80"
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
      >
        <path className="signal-track" pathLength={1} d="M20 160 C 120 160, 140 40, 380 40" />
        <path className="signal-flow" pathLength={1} d="M20 160 C 120 160, 140 40, 380 40" />
      </svg>
      <Container className="relative">
        <h2 className="display max-w-5xl text-[2.8rem] sm:text-6xl lg:text-[5.4rem]">
          Spend less time chasing inquiries.
          <span className="serif-em mt-2 block text-gold">Start with a conversation.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-silver">
          Tell us where calls or follow-up get stuck. We&apos;ll discuss which service fits your business.
        </p>
        <div className="mt-10">
          <CtaLink href={strategyCallHref()} primary>Book a Strategy Call</CtaLink>
        </div>
        <p className="mt-6 text-sm text-mist">
          A consultation request does not reserve a meeting or create a service agreement.
        </p>
      </Container>
    </section>
  )
}
