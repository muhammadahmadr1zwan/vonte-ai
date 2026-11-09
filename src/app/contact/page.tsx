import { pageMetadata } from "@/lib/page-metadata"
import { randomUUID } from "node:crypto"
import { connection } from "next/server"
import { Suspense } from "react"

import { ContactInquiry } from "@/components/contact-form"
import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"

export const metadata = pageMetadata(
  "Contact",
  "Request a VONTE strategy conversation. Tell us about your business and the package you want to discuss.",
  "/contact",
)

async function ContactBody({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>
}) {
  await connection()
  const params = await searchParams
  const raw = Array.isArray(params.package) ? params.package[0] : params.package
  return (
    <ContactInquiry key={raw ?? "none"} initialPackage={raw} submissionId={randomUUID()} />
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
        title="Tell us what your business needs."
        lede="Tell us where inquiries stall. We’ll review your business and the package you’re considering, then follow up to discuss the fit. This request does not reserve a meeting."
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
