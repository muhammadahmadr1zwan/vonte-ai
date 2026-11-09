import type { Metadata } from "next"

import { Container } from "@/components/container"
import { CtaBand } from "@/components/cta-band"
import { Eyebrow } from "@/components/eyebrow"
import { PageHero } from "@/components/page-hero"
import { Process } from "@/components/process"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How a VONTE engagement runs: discover the workflow, design the automation, implement and test it, then refine it after launch.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/how-it-works" } }
    : {}),
}

const brings = [
  "How calls, forms, and past leads are handled today.",
  "The services, hours, and questions customers already ask.",
  "Access to the phone, calendar, or CRM that is in scope.",
  "A person who can approve wording before launch.",
]

const confirms = [
  "Which package fits the way inquiries arrive.",
  "What the assistant is allowed to say.",
  "Which systems can be connected, and which cannot.",
  "What the first launch includes, and what it does not.",
  "Commercial terms, in a written agreement.",
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From the way you work today to a system that can keep up."
        lede="Four steps, with the decisions made in the open. VONTE aims to use the calendar, phone, and CRM you already have when those tools can support the workflow."
      />
      <Process detailed />
      <section className="bg-ivory py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.5rem] bg-white p-7">
            <Eyebrow on="light">What you bring</Eyebrow>
            <ul className="mt-6 space-y-4">
              {brings.map((item) => (
                <li key={item} className="border-l-2 border-gold pl-4 text-base leading-7 text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[1.5rem] bg-navy p-7 text-ivory">
            <Eyebrow>What the consultation confirms</Eyebrow>
            <ul className="mt-6 space-y-4">
              {confirms.map((item) => (
                <li key={item} className="border-l-2 border-gold pl-4 text-base leading-7 text-silver">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Container>
        <Container className="mt-8">
          <p className="max-w-3xl text-sm leading-7 text-quiet">
            Launch timing is confirmed with the scope of work. Connections are
            confirmed for the systems in the agreement. Results depend on call
            volume, customer behavior, and how the system is used. Usage follows
            the allowance in the package. Compliance duties for your industry are
            reviewed before launch. This site does not claim a certification.
          </p>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
