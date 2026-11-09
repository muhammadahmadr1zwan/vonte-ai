import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
import { faqs } from "@/lib/content"

export function FaqList({ compact = false }: { compact?: boolean }) {
  const items = compact ? faqs.slice(0, 6) : faqs
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Eyebrow on="light">Questions</Eyebrow>
          <h2 className="mt-5 font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-navy sm:text-5xl">
            Before you ask for a conversation.
          </h2>
          {compact ? (
            <p className="mt-4 text-sm leading-6 text-quiet">
              More answers sit with the full pricing and process pages. The
              essentials are here.
            </p>
          ) : null}
        </div>
        <Accordion multiple className="border-t border-navy/10">
          {items.map((item) => (
            <AccordionItem key={item.question} className="border-b border-navy/10">
              <AccordionTrigger className="py-5 font-heading text-lg font-semibold tracking-[-0.02em] text-navy hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-7 text-quiet">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
