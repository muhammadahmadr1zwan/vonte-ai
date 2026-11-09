import { CtaBand } from "@/components/cta-band"
import { FaqList } from "@/components/faq-list"
import { Hero } from "@/components/hero"
import { Industries } from "@/components/industries"
import { IntelligenceSystem } from "@/components/intelligence-system"
import { PricingGrid } from "@/components/pricing-grid"
import { Problem } from "@/components/problem"
import { Process } from "@/components/process"
import { ProductDemo } from "@/components/product-demo"
import { RoiCalculator } from "@/components/roi-calculator"
import { ServicesOverview } from "@/components/services-overview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <IntelligenceSystem />
      <ServicesOverview />
      <ProductDemo />
      <Industries />
      <Process />
      <PricingGrid />
      <RoiCalculator />
      <FaqList />
      <CtaBand />
    </>
  )
}
