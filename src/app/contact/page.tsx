import type { Metadata } from "next"
import { Suspense } from "react"

import { ContactAside, ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a VONTE strategy conversation. Tell us about your business and the package you want to discuss.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/contact" } }
    : {}),
}

async function ContactBody({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>
}) {
  const params = await searchParams
  const raw = Array.isArray(params.package) ? params.package[0] : params.package
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <ContactForm key={raw ?? "none"} initialPackage={raw} />
      <ContactAside initialPackage={raw} />
    </div>
  )
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>
}) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build a Smarter Business."
        lede="Tell us where your business is losing time or missing opportunities. We'll explore which VONTE solution fits."
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <Suspense
            fallback={
              <p className="text-quiet" role="status">
                Loading the consultation form…
              </p>
            }
          >
            <ContactBody searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
