import Link from "next/link"

import { Container } from "@/components/container"
import { Wordmark } from "@/components/wordmark"
import { navItems } from "@/lib/content"
import { packages } from "@/lib/pricing"
import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="h-px bg-gold/70" />
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark />
          <p className="display mt-6 max-w-sm text-3xl">
            Intelligence
            <span className="serif-em text-gold"> in motion.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-silver">
            VONTE builds systems that answer calls, follow up with leads, and
            give a service business a website that can request the next
            appointment.
          </p>
          {siteConfig.email || siteConfig.phone ? (
            <ul className="mt-6 space-y-1 text-sm text-silver">
              {siteConfig.email ? (
                <li>
                  <a className="inline-flex min-h-11 items-center hover:text-gold" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}
              {siteConfig.phone ? (
                <li>
                  <a className="inline-flex min-h-11 items-center hover:text-gold" href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-6 max-w-sm text-sm leading-6 text-mist">
              <Link href="/contact" className="inline-flex min-h-11 items-center text-silver underline decoration-gold underline-offset-4">Start a conversation →</Link>
            </p>
          )}
        </div>
        <div className="lg:col-span-3 lg:col-start-7">
          <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
            Explore
          </p>
          <ul className="mt-3 text-sm text-silver">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="inline-flex min-h-11 items-center hover:text-gold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
            Packages
          </p>
          <ul className="mt-3 text-sm text-silver">
            {packages.map((item) => (
              <li key={item.id}>
                <Link className="inline-flex min-h-11 items-center hover:text-gold" href={`/pricing#${item.id}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.copyrightYear} {siteConfig.name}
        </p>
        <p className="max-w-xl sm:text-right">
          Calls. Conversations. Connections.
        </p>
      </Container>
    </footer>
  )
}
