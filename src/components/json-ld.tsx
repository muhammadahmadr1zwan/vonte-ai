import { packages } from "@/lib/pricing"
import { siteConfig } from "@/lib/site"

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    makesOffer: packages.flatMap((item) => [
      {
        "@type": "Offer",
        name: `${item.name} — setup`,
        description: "One-time setup fee",
        price: item.setup,
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: `${item.name} — monthly`,
        description: `${item.description} Monthly retainer.`,
        price: item.monthly,
        priceCurrency: "USD",
      },
    ]),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
