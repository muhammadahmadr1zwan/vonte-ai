import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"
import { Reveal } from "@/components/reveal"
import { industries } from "@/lib/content"
import { strategyCallHref } from "@/lib/site"

export function Industries() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow on="light">Industries</Eyebrow>
              <h2 className="mt-5 font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-navy sm:text-5xl">
                Built for businesses that book time.
              </h2>
            </div>
            <CtaLink href={strategyCallHref()} variant="navy">
              Let&apos;s Discuss Your Business.
            </CtaLink>
          </div>
        </Reveal>
        <div className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
          {industries.map((industry, index) => (
            <article
              key={industry.id}
              className="grid gap-3 py-7 md:grid-cols-[7rem_0.8fr_1.2fr] md:gap-8"
            >
              <p className="font-heading text-sm text-gold-ink">0{index + 1}</p>
              <div>
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-navy">
                  {industry.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-ink">{industry.help}</p>
              </div>
              <div>
                <p className="text-sm leading-7 text-quiet">{industry.problem}</p>
                {industry.boundary ? (
                  <p className="mt-3 text-sm leading-6 text-ink">{industry.boundary}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
