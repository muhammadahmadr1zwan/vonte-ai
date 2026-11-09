import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
import { Reveal } from "@/components/reveal"
import { problems } from "@/lib/content"

export function Problem() {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow on="light">The problem</Eyebrow>
              <h2 className="mt-5 font-heading text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-navy sm:text-5xl">
                Every Missed Call Is a Missed Opportunity.
              </h2>
            </div>
            <ol className="divide-y divide-navy/10 border-y border-navy/10">
              {problems.map((problem, index) => (
                <li key={problem.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                  <span className="pt-1 font-heading text-sm text-gold-ink">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-heading text-xl font-semibold tracking-[-0.02em] text-navy">
                      {problem.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-quiet">{problem.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-12 rounded-[1.6rem] bg-navy px-6 py-8 text-ivory sm:px-10 sm:py-10">
            <div className="h-px w-10 bg-gold" />
            <p className="mt-5 max-w-3xl font-heading text-2xl leading-snug font-semibold tracking-[-0.03em] sm:text-3xl">
              VONTE connects the pieces so opportunities don&apos;t get lost
              between your phone, website, and inbox.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
