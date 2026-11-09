import type { Metadata } from "next"

import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { ServicesOverview } from "@/components/services-overview"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI receptionist, lead follow-up, and conversion-focused websites for service businesses. See what each VONTE service includes.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/services" } }
    : {}),
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Three systems. One job: keep the next conversation."
        lede="Each service can stand on its own. Together they cover the call, the follow-up, and the website. The screens below are product illustrations, not live customer activity."
      />
      <ServicesOverview detailed />
      <CtaBand />
    </>
  )
}
