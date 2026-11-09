import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede: string
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <Container className="relative py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-heading text-[2.35rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver">{lede}</p>
      </Container>
    </section>
  )
}
