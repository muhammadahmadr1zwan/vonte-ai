import { pageMetadata } from "@/lib/page-metadata"

import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { ServicesOverview } from "@/components/services-overview"
import { Industries } from "@/components/industries"

export const metadata = pageMetadata(
  "Services",
  "AI receptionist, lead follow-up, and websites for service businesses. See the scope, usage allowances, and price of each VONTE service.",
  "/services",
)

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Calls, follow-up, and websites."
        lede="Each service can stand on its own. Together they cover the call, the follow-up, and the website. The screens below are product illustrations, not live customer activity."
      />
      <ServicesOverview detailed />
      <Industries />
      <CtaBand />
    </>
  )
}
