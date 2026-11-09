import { Check } from "lucide-react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"
import { formatMoney } from "@/lib/format"
import {
  completePackage,
  completeSavings,
  packages,
  scopeNote,
  separatePurchase,
  standardPackages,
} from "@/lib/pricing"

function PricePlate({
  setup,
  monthly,
  inset = false,
}: {
  setup: number
  monthly: number
  inset?: boolean
}) {
  return (
    <div className={`mt-6 grid grid-cols-2 gap-4 rounded-2xl px-4 py-4 ${inset ? "bg-navy-deep" : "bg-navy"}`}>
      <div>
        <p className="font-heading text-3xl font-semibold tracking-[-0.03em] text-gold">
          {formatMoney(setup)}
        </p>
        <p className="mt-1 text-[0.68rem] tracking-[0.16em] text-mist uppercase">Setup</p>
      </div>
      <div>
        <p className="font-heading text-3xl font-semibold tracking-[-0.03em] text-ivory">
          {formatMoney(monthly)}
        </p>
        <p className="mt-1 text-[0.68rem] tracking-[0.16em] text-mist uppercase">Per month</p>
      </div>
    </div>
  )
}

function Included({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6">
          <span
            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
              light ? "bg-gold text-navy" : "bg-navy text-gold"
            }`}
          >
            <Check className="size-3" aria-hidden="true" />
          </span>
          <span className={light ? "text-ivory" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PricingGrid({ intro = true }: { intro?: boolean }) {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        {intro ? (
          <>
            <Eyebrow on="light">Pricing</Eyebrow>
            <div className="mt-5 flex max-w-3xl flex-col gap-4">
              <h2 className="font-heading text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-navy sm:text-5xl">
                Four packages. Setup and monthly, side by side.
              </h2>
              <p className="text-lg leading-8 text-quiet">
                Choose one service or the combined system. Every button carries the
                package into the consultation form.
              </p>
            </div>
          </>
        ) : (
          <h2 className="sr-only">Packages and prices</h2>
        )}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {standardPackages.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="flex flex-col rounded-[1.5rem] border border-navy/10 border-l-4 border-l-gold bg-white p-6"
            >
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-navy lg:min-h-[4.25rem]">
                {item.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-quiet lg:min-h-[4.75rem]">
                {item.description}
              </p>
              <PricePlate setup={item.setup} monthly={item.monthly} />
              <Included items={item.included} />
              <p className="mt-6 text-sm leading-6 text-ink">
                <span className="font-semibold">Best for: </span>
                {item.bestFor}
              </p>
              <div className="mt-6">
                <CtaLink href={`/contact?package=${item.id}`} variant="navy" className="w-full">
                  Get Started
                </CtaLink>
              </div>
            </article>
          ))}
          <article
            id={completePackage.id}
            className="rounded-[1.5rem] border border-gold bg-navy p-6 text-ivory shadow-[0_30px_80px_-46px_rgba(204,166,41,0.65)] lg:col-span-3 lg:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="inline-flex rounded-full border border-gold/50 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  Complete Solution
                </p>
                <h3 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.03em]">
                  {completePackage.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-silver">
                  {completePackage.description}
                </p>
                <PricePlate
                  setup={completePackage.setup}
                  monthly={completePackage.monthly}
                  inset
                />
                <p className="mt-5 text-sm leading-6 text-silver">
                  Buying the other three packages separately is{" "}
                  {formatMoney(separatePurchase.setup)} setup and{" "}
                  {formatMoney(separatePurchase.monthly)} per month. Vonte
                  Complete is {formatMoney(completeSavings.setup)} less upfront
                  and {formatMoney(completeSavings.monthly)} less each month.
                </p>
                <p className="mt-4 text-sm leading-6 text-ivory">
                  <span className="font-semibold">Best for: </span>
                  {completePackage.bestFor}
                </p>
                <div className="mt-6">
                  <CtaLink href={`/contact?package=${completePackage.id}`}>
                    Get Started
                  </CtaLink>
                </div>
              </div>
              <Included items={completePackage.included} light />
            </div>
          </article>
        </div>
        <p className="mt-8 max-w-4xl text-sm leading-6 text-quiet">{scopeNote}</p>
        <p className="sr-only">
          {packages.map((item) => `${item.name} ${item.setup} ${item.monthly}`).join(". ")}
        </p>
      </Container>
    </section>
  )
}
