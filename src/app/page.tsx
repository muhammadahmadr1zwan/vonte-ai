import { CtaBand } from "@/components/cta-band"
import { Hero } from "@/components/hero"
import { IntelligenceSystem } from "@/components/intelligence-system"
import { PricingGrid } from "@/components/pricing-grid"
import { Problem } from "@/components/problem"
import { Process } from "@/components/process"
import { ProductDemo } from "@/components/product-demo"
import { ServicesOverview } from "@/components/services-overview"
import { ServiceBoundaries } from "@/components/service-boundaries"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <IntelligenceSystem compact />
      <ServicesOverview />
      <ProductDemo />
      <ServiceBoundaries />
      <Process />
      <PricingGrid preview />
      <CtaBand />
    </>
  )
}
