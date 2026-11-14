import { pageMetadata } from "@/lib/page-metadata"

import { Container } from "@/components/container"
import { CtaBand } from "@/components/cta-band"
import { Eyebrow } from "@/components/eyebrow"
import { PageHero } from "@/components/page-hero"
import { Process } from "@/components/process"
import { FaqList } from "@/components/faq-list"
import { IntelligenceSystem } from "@/components/intelligence-system"

export const metadata = pageMetadata(
  "How It Works",
  "Explore the VONTE inquiry workflow and engagement process: discover, design, implement, test, and refine with your team.",
  "/how-it-works",
)

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
        title="Built around the way you work."
        lede="Four stages, with the decisions made in the open. VONTE learns the workflow, plans the automation, implements supported connections, and reviews what is live."
      />
      <Process detailed />
      <IntelligenceSystem />
      <section className="bg-background py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="border border-line bg-surface p-7">
            <Eyebrow on="light">What you bring</Eyebrow>
            <ul className="mt-6 space-y-4">
              {brings.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-base leading-7 text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="bg-background p-7 text-foreground">
            <Eyebrow>What the consultation confirms</Eyebrow>
            <ul className="mt-6 space-y-4">
              {confirms.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-base leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Container>
        <Container className="mt-8">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            Launch timing is confirmed with the scope of work. Connections are
            confirmed for the systems in the agreement. Results depend on call
            volume, customer behavior, and how the system is used. Usage follows
            the allowance in the package. Compliance duties for your industry are
            reviewed before launch. This site does not claim a certification.
          </p>
        </Container>
      </section>
      <FaqList />
      <CtaBand />
    </>
  )
}
