import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
import { Reveal } from "@/components/reveal"
import { steps } from "@/lib/content"

export function Process({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <Eyebrow on="light">How VONTE works</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-navy sm:text-5xl">
            A clear path from the first conversation to a system you can run.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-quiet">
            VONTE aims to work with the calendar, phone, and CRM you already
            use, where those systems are compatible. A launch date is confirmed
            with the scope, not assumed up front.
          </p>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4">
          <div
            className="absolute top-5 right-[8%] left-[8%] hidden h-px bg-gold/60 md:block"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 70}>
              <li className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-gold bg-white font-heading text-sm text-gold-ink">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.03em] text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink">{step.body}</p>
                {detailed ? (
                  <p className="mt-3 text-sm leading-6 text-quiet">{step.detail}</p>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
