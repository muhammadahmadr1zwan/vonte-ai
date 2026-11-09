import { Container } from "@/components/container"

const gaps = [
  ["A call goes unanswered.", "Your team is already with a customer."],
  ["A lead waits for a reply.", "Follow-up depends on finding a spare moment."],
  ["A visitor leaves with questions.", "The website cannot help them request a visit."],
] as const

export function Problem() {
  return (
    <section className="bg-paper py-16 text-navy sm:py-20">
      <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs tracking-[0.18em] text-gold-ink uppercase">The missed opportunity</p>
          <h2 className="display mt-5 max-w-lg text-4xl sm:text-5xl">You&apos;re serving a customer.<span className="serif-em mt-2 block">Another inquiry waits.</span></h2>
          <p className="mt-5 max-w-md text-base leading-7 text-quiet">VONTE helps cover the gaps between the phone, your inbox, and your website.</p>
        </div>
        <ol className="divide-y divide-navy/15 border-y border-navy/15">
          {gaps.map(([title, body], index) => (
            <li key={title} className="flex gap-4 py-5">
              <span className="pt-1 text-xs text-gold-ink" aria-hidden="true">0{index + 1}</span>
              <div><h3 className="font-heading text-xl tracking-[-0.02em]">{title}</h3><p className="mt-2 text-sm leading-6 text-quiet">{body}</p></div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
