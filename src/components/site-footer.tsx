import Link from "next/link"

import { Container } from "@/components/container"
import { Wordmark } from "@/components/wordmark"
import { navItems } from "@/lib/content"
import { packages } from "@/lib/pricing"
import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="h-px bg-gold/80" />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_0.7fr_0.9fr]">
        <div>
          <Wordmark />
          <div className="mt-4 h-px w-10 bg-gold" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-silver">
            VONTE builds systems that answer calls, follow up with leads, and
            give a service business a website that can request the next
            appointment.
          </p>
          {siteConfig.email || siteConfig.phone ? (
            <ul className="mt-6 space-y-1 text-sm text-silver">
              {siteConfig.email ? (
                <li>
                  <a className="hover:text-gold" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}
              {siteConfig.phone ? (
                <li>
                  <a className="hover:text-gold" href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-6 max-w-sm text-sm leading-6 text-mist">
              Consultation requests are taken through the contact form. A public
              email and phone number will be added here when they are confirmed.
            </p>
          )}
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-gold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
            Packages
          </p>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            {packages.map((item) => (
              <li key={item.id}>
                <Link className="hover:text-gold" href={`/pricing#${item.id}`}>
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
          Service terms are provided in a written agreement. Public legal pages
          will be linked here when they are approved.
        </p>
      </Container>
    </footer>
  )
}
