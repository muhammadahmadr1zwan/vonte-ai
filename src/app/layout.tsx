import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import Script from "next/script"

import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js")`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
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
