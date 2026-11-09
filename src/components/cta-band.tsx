import Link from "next/link"

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
          Your next opportunity
          <span className="serif-em mt-2 block text-gold">is already calling.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-silver">
          Let&apos;s build the systems that help your business answer.
        </p>
        <div className="mt-10">
          <CtaLink href={strategyCallHref()}>Book a Strategy Call</CtaLink>
        </div>
        <p className="mt-6 text-sm text-mist">
          <Link href="/contact" className="underline decoration-gold underline-offset-4 hover:text-ivory">
            Tell us what you&apos;re looking to automate.
          </Link>
        </p>
      </Container>
    </section>
  )
}
