import type { Metadata } from "next"
import { Instrument_Sans, Instrument_Serif } from "next/font/google"

import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"
import { DEFAULT_DIRECTION, directionVariables } from "@/lib/visual-directions"
import { DesignPreview } from "@/components/design-preview"

import "./globals.css"

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataBase),
  title: {
    default: siteConfig.title,
    template: "%s · VONTE",
  },
  description: siteConfig.description,
  applicationName: "VONTE",
  openGraph: {
    type: "website",
    siteName: "VONTE",
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  ...(siteConfig.url
    ? { alternates: { canonical: siteConfig.url } }
    : {}),
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_DIRECTION}
      style={directionVariables(DEFAULT_DIRECTION)}
      className={`${instrument.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {process.env.NODE_ENV === "development" ? <DesignPreview /> : null}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
      </body>
    </html>
  )
}
