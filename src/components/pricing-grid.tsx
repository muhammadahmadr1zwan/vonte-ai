import { Container } from "@/components/container"
import Link from "next/link"
import { CtaLink } from "@/components/cta-link"
import { formatMoney } from "@/lib/format"
import {
  comparisonRows,
  completeSavings,
  packages,
  scopeNote,
  separatePurchase,
  type PackageId,
} from "@/lib/pricing"

function hasFeature(ids: readonly PackageId[], id: PackageId) {
  return ids.includes(id)
}

export function PricingGrid({ intro = true, preview = false }: { intro?: boolean; preview?: boolean }) {
  return (
    <section id="pricing" className="bg-paper text-navy">
      {intro ? (
        <div className="bg-navy text-ivory">
          <Container className="py-16 sm:py-20">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
              Pricing
            </p>
            <h2 className="display mt-5 max-w-4xl text-4xl sm:text-5xl">
              Compare the packages.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-silver sm:text-lg">
              One-time setup. Monthly operation. Choose one service, or combine all three with Vonte Complete.
            </p>
          </Container>
        </div>
      ) : (
        <h2 className="sr-only">Packages and prices</h2>
      )}

      <Container className="py-12 sm:py-16">
        <div className="grid border border-navy/10 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => {
            const featured = item.featured
            return (
              <article
                key={item.id}
                id={item.id}
                className={`flex flex-col border-b border-navy/10 p-6 last:border-b-0 md:border-r xl:border-b-0 xl:last:border-r-0 ${
                  featured ? "bg-navy text-ivory" : "bg-paper"
                }`}
              >
                <p className={`text-[0.68rem] tracking-[0.18em] uppercase ${featured ? "text-gold" : "text-gold-ink"}`}>
                  {featured ? "Complete Solution" : "Package"}
                </p>
                <h3 className="mt-4 min-h-14 font-heading text-2xl leading-tight tracking-[-0.03em]">
                  {item.name}
                </h3>
                {!preview ? <p className={`mt-3 xl:min-h-24 text-sm leading-6 ${featured ? "text-silver" : "text-quiet"}`}>
                  {item.description}
                </p> : null}
                <div className="mt-8 border-y border-current/15 py-5">
                  <p className="text-sm"><span className={`font-heading text-[2.5rem] leading-none tracking-[-0.05em] ${featured ? "text-gold" : "text-navy"}`}>{formatMoney(item.monthly)}</span><span className={featured ? "text-silver" : "text-quiet"}> /month</span></p>
                  <p className={`mt-3 text-sm ${featured ? "text-silver" : "text-quiet"}`}>+ {formatMoney(item.setup)} one-time setup</p>
                </div>
                {!preview ? <p className={`mt-6 text-sm leading-6 ${featured ? "text-silver" : "text-ink"}`}>
                  {item.bestFor}
                </p> : null}
                <ul className={`mt-6 space-y-3 ${intro ? "" : "xl:hidden"}`}>
                  {(preview ? item.included.slice(0, 3) : item.included).map((line) => (
                    <li key={line} className={`text-sm leading-6 ${featured ? "text-ivory" : "text-ink"}`}>
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <CtaLink
                    primary
                    href={`/contact?package=${item.id}`}
                    variant={featured ? "gold" : "navy"}
                    className="w-full"
                  >
                    Discuss package
                  </CtaLink>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 border border-navy/10 bg-ivory px-5 py-6 sm:px-7">
          <p className="font-heading text-2xl tracking-[-0.03em]">
            Vonte Complete saves {formatMoney(completeSavings.setup)} in setup and{" "}
            {formatMoney(completeSavings.monthly)} per month.
          </p>
          {!preview ? <p className="mt-3 max-w-3xl text-sm leading-6 text-quiet">
            The three packages purchased separately are {formatMoney(separatePurchase.setup)}{" "}
            setup and {formatMoney(separatePurchase.monthly)} per month. The
            bundle is {formatMoney(completeSavings.setup)} less upfront and{" "}
            {formatMoney(completeSavings.monthly)} less each month. Usage is still
            defined by each package’s included allowance.
          </p> : <p className="mt-2 text-sm leading-6 text-quiet">Compared with buying the three services separately. Choose Complete if your business needs all three.</p>}
        </div>

        {!intro ? <div className="mt-10 hidden xl:block">
          <h3 className="font-heading text-2xl tracking-[-0.03em]">What each package includes</h3>
          <div className="mt-5 overflow-hidden border border-navy/10">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Package feature comparison</caption>
              <thead>
                <tr className="border-b border-navy/10 bg-ivory">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Scope
                  </th>
                  {packages.map((item) => (
                    <th key={item.id} scope="col" className="px-3 py-3 font-medium">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-navy/10 last:border-b-0">
                    <th scope="row" className="px-4 py-3 font-normal text-ink">
                      {row.feature}
                    </th>
                    {packages.map((item) => {
                      const included = hasFeature(row.ids, item.id)
                      return (
                        <td key={item.id} className="px-3 py-3">
                          {included ? (
                            <span className="text-gold-ink">
                              Included
                              <span className="sr-only"> in {item.name}</span>
                            </span>
                          ) : (
                            <span className="text-quiet">
                              —
                              <span className="sr-only"> Not included in {item.name}</span>
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> : null}

        {preview ? <>
          <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center text-sm underline decoration-gold-ink underline-offset-4">Compare all inclusions and usage allowances →</Link>
          <details className="mt-4 max-w-4xl border-t border-navy/15 pt-2 text-sm text-quiet"><summary className="min-h-11 cursor-pointer py-3">Usage and commercial terms</summary><p className="pt-2 leading-6">{scopeNote}</p></details>
        </> : <p className="mt-8 max-w-4xl text-sm leading-6 text-quiet">{scopeNote}</p>}
      </Container>
    </section>
  )
}
