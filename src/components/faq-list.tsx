import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/container"
import { faqs } from "@/lib/content"

export function FaqList({ compact = false }: { compact?: boolean }) {
  const items = compact ? faqs.slice(0, 6) : faqs
  return (
    <section className="bg-ivory py-20 text-navy sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
            Questions
          </p>
          <h2 className="display mt-5 text-[2.6rem] sm:text-5xl">
            Before the
            <span className="serif-em mt-2 block">first conversation.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-quiet">
            Answers follow the published packages. Where a detail depends on your
            systems, the consultation confirms it.
          </p>
        </div>
        <Accordion multiple className="border-t border-navy/15 lg:col-span-8">
          {items.map((item, index) => (
            <AccordionItem key={item.question} className="border-b border-navy/15">
              <AccordionTrigger className="items-start gap-6 py-5 text-left font-heading text-xl tracking-[-0.03em] text-navy hover:no-underline sm:text-2xl">
                <span className="pt-1 text-[0.68rem] tracking-[0.16em] text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pr-2 pb-6 pl-10 text-base leading-7 text-quiet">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
