import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return []
  const base = siteConfig.url
  const paths = ["", "/services", "/pricing", "/how-it-works", "/contact"]
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: "2026-11-08",
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }))
}
