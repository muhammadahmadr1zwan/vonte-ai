/**
 * Public site configuration.
 * Leave a value blank until it is real. The site must not invent contact details.
 */

function safeHttpUrl(value: string | undefined) {
  const trimmed = value?.trim() ?? ""
  if (!trimmed) return ""
  try {
    const url = new URL(trimmed)
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString().replace(/\/$/, "")
    }
  } catch {
    return ""
  }
  return ""
}

function clean(value: string | undefined) {
  return value?.trim() ?? ""
}

const configuredUrl = safeHttpUrl(process.env.NEXT_PUBLIC_SITE_URL)

export const siteConfig = {
  name: "VONTE",
  descriptor: "AI Automation Agency",
  title: "VONTE | AI Receptionist, Lead Automation & Websites",
  description:
    "VONTE helps service businesses manage calls, follow up with leads, and create conversion-focused websites through intelligent automation.",
  /** Canonical public origin. Empty until NEXT_PUBLIC_SITE_URL is set. */
  url: configuredUrl,
  /** Used for metadata resolution during local builds when no domain is configured. */
  metadataBase: configuredUrl || "http://localhost:3847",
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  /** Optional real scheduling page. Empty means the consultation form is the CTA destination. */
  schedulingUrl: safeHttpUrl(process.env.NEXT_PUBLIC_SCHEDULING_URL),
  /** Optional real voice-demo number. Empty hides the phone demo. */
  voiceDemoNumber: clean(process.env.NEXT_PUBLIC_VOICE_DEMO_NUMBER),
  copyrightYear: 2026,
} as const

export function strategyCallHref() {
  return siteConfig.schedulingUrl || "/contact"
}

export function hasPublicContactDetails() {
  return Boolean(siteConfig.email || siteConfig.phone)
}
