import { Check, ShieldCheck } from "lucide-react"
import { Container } from "@/components/container"

export function ServiceBoundaries() {
  return (
    <section id="service-boundaries" className="border-y border-line bg-surface py-16 text-foreground sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <ShieldCheck className="size-6 text-accent" aria-hidden="true" />
          <h2 className="display mt-5 text-4xl sm:text-5xl">What VONTE does.<span className="serif-em mt-2 block">And where it stops.</span></h2>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">You approve the answers, scope, and handoff rules before launch.</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="border-b border-line pb-4 text-sm font-medium">Helps your team</h3>
          <ul className="mt-4 space-y-3">
            {["Captures inquiries.", "Answers approved business questions.", "Helps qualify leads.", "Requests appointments for review."].map(item => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <div className="border border-line bg-background p-5 lg:col-span-4">
          <h3 className="text-sm font-medium">Keeps people in control</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Not a replacement for emergency services. If someone is in immediate danger, contact the appropriate emergency service directly.</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Does not diagnose, quote, make unapproved business decisions, or provide medical, dental, or legal advice. Requests that need judgment stay with your team.</p>
        </div>
      </Container>
    </section>
  )
}
