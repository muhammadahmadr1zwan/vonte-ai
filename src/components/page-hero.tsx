import { Container } from "@/components/container"

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
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative py-12 sm:py-20">
        <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display mt-6 max-w-4xl text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">{lede}</p>
      </Container>
    </section>
  )
}
