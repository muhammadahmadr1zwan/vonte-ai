import { Container } from "@/components/container"
import { steps } from "@/lib/content"
import Link from "next/link"

export function Process({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-background py-16 text-foreground sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
              How VONTE works
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
              From first conversation<span className="serif-em mt-2 block">to a tested launch.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
            VONTE learns the workflow, plans the automation, implements the
            connections that are in scope, and reviews the system after launch.
            A date is confirmed with the work, not assumed.
          </p>
        </div>
        <ol className={detailed ? "mt-10 border-t border-line" : "mt-9 grid gap-6 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4"}>
          {steps.map((step) => (
            <li
              key={step.number}
              className={detailed ? "grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10" : "grid content-start gap-3"}
            >
              <p className={detailed ? "font-serif text-5xl text-accent italic md:col-span-2" : "text-xs tracking-wider text-accent"}>
                {step.number}
              </p>
              <h3 className={detailed ? "display text-4xl md:col-span-4" : "font-heading text-2xl tracking-[-0.03em]"}>{step.title}</h3>
              <div className={detailed ? "md:col-span-6" : ""}>
                <p className="text-sm leading-6 text-foreground">{step.body}</p>
                {detailed ? (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {!detailed ? <Link href="/how-it-works" className="mt-6 inline-flex min-h-11 items-center text-sm underline decoration-accent underline-offset-4">See the process and launch requirements →</Link> : null}
      </Container>
    </section>
  )
}
