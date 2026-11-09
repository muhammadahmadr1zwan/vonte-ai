import Link from "next/link"
import { Check } from "lucide-react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"
import { Reveal } from "@/components/reveal"
import {
  FollowUpVisual,
  ReceptionistVisual,
  WebsiteVisual,
} from "@/components/service-visuals"
import { services } from "@/lib/content"
import { getPackage } from "@/lib/pricing"

const visuals = {
  "ai-receptionist": ReceptionistVisual,
  "lead-follow-up": () => <FollowUpVisual tone="dark" />,
  "website-chatbot": WebsiteVisual,
}

export function ServicesOverview({ detailed = false }: { detailed?: boolean }) {
  return (
    <div id="solutions">
      {services.map((service, index) => {
        const pkg = getPackage(service.id)!
        const dark = service.id === "lead-follow-up"
        const Visual = visuals[service.id]
        const reversed = index === 2
        return (
          <section
            key={service.id}
            id={detailed ? service.id : `solution-${service.id}`}
            className={dark ? "bg-navy text-ivory" : index === 0 ? "bg-white" : "bg-ivory"}
          >
            <Container className="py-20 sm:py-28">
              <Reveal>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <Eyebrow on={dark ? "dark" : "light"}>{service.eyebrow}</Eyebrow>
                    <h2 className="mt-5 font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                      {service.headline}
                    </h2>
                    <p className={`mt-5 text-lg leading-8 ${dark ? "text-silver" : "text-quiet"}`}>
                      {service.lede}
                    </p>
                    {detailed
                      ? service.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className={`mt-4 text-base leading-7 ${dark ? "text-silver" : "text-quiet"}`}
                          >
                            {paragraph}
                          </p>
                        ))
                      : null}
                    <ul className="mt-8 space-y-3">
                      {pkg.included.slice(0, detailed ? pkg.included.length : 4).map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6">
                          <span
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                              dark ? "bg-gold text-navy" : "bg-navy text-gold"
                            }`}
                          >
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          <span className={dark ? "text-ivory" : "text-ink"}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {detailed ? (
                      <p className={`mt-6 text-sm leading-6 ${dark ? "text-mist" : "text-quiet"}`}>
                        {service.note}
                      </p>
                    ) : null}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <CtaLink href={`/contact?package=${service.id}`} variant={dark ? "gold" : "navy"}>
                        Get Started
                      </CtaLink>
                      {detailed ? (
                        <CtaLink href={`/pricing#${service.id}`} variant={dark ? "inverse" : "quiet"}>
                          See pricing
                        </CtaLink>
                      ) : (
                        <Link
                          href={`/services#${service.id}`}
                          className={`inline-flex h-12 items-center text-sm font-semibold underline-offset-4 hover:underline ${
                            dark ? "text-gold" : "text-gold-ink"
                          }`}
                        >
                          Read the service detail
                        </Link>
                      )}
                    </div>
                  </div>
                  <Visual />
                </div>
              </Reveal>
            </Container>
          </section>
        )
      })}
    </div>
  )
}
