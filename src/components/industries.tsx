"use client"

import { useState } from "react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { industries } from "@/lib/content"
import { strategyCallHref } from "@/lib/site"

export function Industries() {
  const [active, setActive] = useState(0)
  const industry = industries[active]

  return (
    <section className="bg-surface py-20 text-foreground sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-accent uppercase">
              Industries
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl">
              Built for businesses
              <span className="serif-em mt-2 block">that book time.</span>
            </h2>
          </div>
          <CtaLink href={strategyCallHref()} variant="navy" primary>
            Book a Strategy Call
          </CtaLink>
        </div>

        <div className="mt-8 grid border border-line lg:mt-12 lg:grid-cols-12">
          <div className="border-b border-line bg-surface p-5 lg:hidden">
            <label htmlFor="industry-preview" className="text-sm font-medium">Explore an industry</label>
            <select id="industry-preview" value={active} onChange={event => setActive(Number(event.target.value))}
              aria-controls="industry-detail" className="mt-3 min-h-12 w-full border border-control bg-surface px-3 text-base text-foreground">
              {industries.map((item, index) => <option key={item.id} value={index}>{item.name}</option>)}
            </select>
          </div>
          <div className="hidden lg:col-span-5 lg:block" role="group" aria-label="Industries">
            {industries.map((item, index) => {
              const selected = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="industry-detail"
                  onClick={() => setActive(index)}
                  className={`flex w-full min-h-16 items-center justify-between gap-3 border-b border-line px-4 py-4 text-left last:border-b-0 ${
                    selected ? "bg-raised text-foreground" : "bg-surface text-muted-foreground hover:bg-raised"
                  }`}
                >
                  <span className="font-heading text-base tracking-[-0.03em] sm:text-xl">
                    {item.name}
                  </span>
                  <span className="text-[0.68rem] tracking-[0.16em] text-accent">
                    0{index + 1}
                  </span>
                </button>
              )
            })}
          </div>
          <article id="industry-detail" className="flex flex-col justify-between bg-background px-6 py-8 sm:px-10 lg:col-span-7" aria-live="polite">
            <div>
              <p className="font-serif text-6xl text-accent italic">0{active + 1}</p>
              <h3 className="display mt-4 text-4xl sm:text-5xl">{industry.name}</h3>
              <p className="serif-em mt-5 max-w-md text-2xl leading-snug text-foreground sm:text-3xl">
                {industry.help}
              </p>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">{industry.problem}</p>
              {industry.boundary ? (
                <p className="mt-4 max-w-lg border-l border-accent pl-4 text-sm leading-6 text-foreground">
                  {industry.boundary}
                </p>
              ) : null}
            </div>
            <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Illustrative fit. Not a certification or a client result.
            </p>
          </article>
        </div>
      </Container>
    </section>
  )
}
