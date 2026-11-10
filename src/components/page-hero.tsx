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
    <section className="page-intro relative overflow-hidden bg-background text-foreground">
      <Container className="relative py-12 sm:py-20">
        <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display mt-6 max-w-4xl text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl" data-motion="intro">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{lede}</p>
      </Container>
    </section>
  )
}
