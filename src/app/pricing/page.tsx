import { pageMetadata } from "@/lib/page-metadata"

import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { PricingGrid } from "@/components/pricing-grid"
import { RoiCalculator } from "@/components/roi-calculator"

export const metadata = pageMetadata(
  "Pricing",
  "Compare VONTE setup fees, monthly fees, included items, and usage allowances for AI Receptionist, lead follow-up, websites, and Vonte Complete.",
  "/pricing",
)

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="A clear investment. A connected business."
        lede="Every package has a one-time setup fee and a monthly retainer. The included list is the scope. Anything beyond it is confirmed before work begins."
      />
      <PricingGrid intro={false} />
      <RoiCalculator />
      <CtaBand />
    </>
  )
}
