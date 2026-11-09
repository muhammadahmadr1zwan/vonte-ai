import { Plus } from "lucide-react"
import { Container } from "@/components/container"
import { faqs } from "@/lib/content"

export function FaqList({ compact = false }: { compact?: boolean }) {
  const items = compact ? faqs.slice(0, 6) : faqs
  return (
    <section className="bg-ivory py-20 text-navy sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-medium tracking-[0.2em] text-gold-ink uppercase">Questions</p>
          <h2 className="display mt-5 text-[2.6rem] sm:text-5xl">Before the<span className="serif-em mt-2 block">first conversation.</span></h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-quiet">Answers follow the published packages. Where a detail depends on your systems, the consultation confirms it.</p>
        </div>
        <div className="border-t border-navy/15 lg:col-span-8">
          {items.map((item, index) => (
            <details key={item.question} className="group border-b border-navy/15">
              <summary className="flex min-h-16 cursor-pointer list-none items-start gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="pt-1 text-xs tracking-[0.16em] text-gold-ink" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="flex-1 font-heading text-xl leading-snug tracking-[-0.03em] sm:text-2xl">{item.question}</h3>
                <Plus className="mt-1 size-5 shrink-0 text-gold-ink transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pr-2 pb-6 pl-9 text-base leading-7 text-quiet">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
