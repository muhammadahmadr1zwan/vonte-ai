import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"

/** Keep page descriptions and social previews aligned without exposing runtime configuration. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} · ${siteConfig.name}`
  const url = siteConfig.url ? new URL(path, siteConfig.url).toString() : undefined
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VONTE — AI automation for calls, leads, and websites" }],
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: ["/opengraph-image"] },
  }
}
