import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"

export default function NotFound() {
  return (
    <section className="bg-background">
      <Container className="py-28">
        <Eyebrow on="light">404</Eyebrow>
        <h1 className="mt-5 max-w-xl font-heading text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          This page is not on the site.
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">
          The link may be out of date. Services, pricing, the process, and the
          consultation form are the main paths.
        </p>
        <div className="mt-8">
          <CtaLink href="/" variant="navy">
            Back to the homepage
          </CtaLink>
        </div>
      </Container>
    </section>
  )
}
