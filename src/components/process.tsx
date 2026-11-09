import { Container } from "@/components/container"
import { steps } from "@/lib/content"

export function Process({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-ivory py-20 text-navy sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
              How VONTE works
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
              Discover. Design.
              <span className="serif-em mt-2 block">Implement. Optimize.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-quiet lg:col-span-4 lg:col-start-9">
            VONTE learns the workflow, plans the automation, implements the
            connections that are in scope, and reviews the system after launch.
            A date is confirmed with the work, not assumed.
          </p>
        </div>
        <ol className="mt-14 border-t border-navy/15">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid gap-4 border-b border-navy/15 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
            >
              <p className="font-serif text-5xl text-gold-ink italic md:col-span-2">
                {step.number}
              </p>
              <h3 className="display text-4xl md:col-span-4">{step.title}</h3>
              <div className="md:col-span-6">
                <p className="text-base leading-7 text-ink">{step.body}</p>
                {detailed ? (
                  <p className="mt-3 text-sm leading-6 text-quiet">{step.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
