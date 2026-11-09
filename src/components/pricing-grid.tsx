import { Container } from "@/components/container"
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

export function PricingGrid({ intro = true }: { intro?: boolean }) {
  return (
    <section id="pricing" className="bg-paper text-navy">
      {intro ? (
        <div className="bg-navy text-ivory">
          <Container className="py-20 sm:py-28">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase">
              Pricing
            </p>
            <h2 className="display mt-5 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
              Four packages.
              <span className="serif-em mt-2 block text-gold">A clear place to start.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-silver sm:text-lg">
              Start with the workflow that needs attention. Or bring calls, follow-up, and your website together with Vonte Complete.
            </p>
          </Container>
        </div>
      ) : (
        <h2 className="sr-only">Packages and prices</h2>
      )}

      <Container className={intro ? "py-16 sm:py-20" : "py-16 sm:py-20"}>
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
                <p className={`mt-3 xl:min-h-24 text-sm leading-6 ${featured ? "text-silver" : "text-quiet"}`}>
                  {item.description}
                </p>
                <div className="mt-8 border-y border-current/15 py-5">
                  <p className="text-sm"><span className={`font-heading text-[2.5rem] leading-none tracking-[-0.05em] ${featured ? "text-gold" : "text-navy"}`}>{formatMoney(item.monthly)}</span><span className={featured ? "text-silver" : "text-quiet"}> /month</span></p>
                  <p className={`mt-3 text-sm ${featured ? "text-silver" : "text-quiet"}`}>+ {formatMoney(item.setup)} one-time setup</p>
                </div>
                <p className={`mt-6 text-sm leading-6 ${featured ? "text-silver" : "text-ink"}`}>
                  {item.bestFor}
                </p>
                <ul className={`mt-6 space-y-3 ${intro ? "" : "xl:hidden"}`}>
                  {item.included.map((line) => (
                    <li key={line} className={`text-sm leading-6 ${featured ? "text-ivory" : "text-ink"}`}>
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <CtaLink
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
          <p className="mt-3 max-w-3xl text-sm leading-6 text-quiet">
            The three packages purchased separately are {formatMoney(separatePurchase.setup)}{" "}
            setup and {formatMoney(separatePurchase.monthly)} per month. The
            bundle is {formatMoney(completeSavings.setup)} less upfront and{" "}
            {formatMoney(completeSavings.monthly)} less each month. Usage is still
            defined by each package’s included allowance.
          </p>
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

        <p className="mt-8 max-w-4xl text-sm leading-6 text-quiet">{scopeNote}</p>
      </Container>
    </section>
  )
}
