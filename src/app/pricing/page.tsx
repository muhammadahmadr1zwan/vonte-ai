import type { Metadata } from "next"

import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { PricingGrid } from "@/components/pricing-grid"
import { RoiCalculator } from "@/components/roi-calculator"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "VONTE pricing: AI Receptionist, lead follow-up, website and chatbot, and Vonte Complete. Setup fees and monthly retainers, stated plainly.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/pricing" } }
    : {}),
}

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
