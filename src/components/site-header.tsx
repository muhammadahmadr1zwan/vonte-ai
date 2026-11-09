"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Wordmark } from "@/components/wordmark"
import { navItems } from "@/lib/content"
import { strategyCallHref } from "@/lib/site"
import { cn } from "cn"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openPath, setOpenPath] = useState(pathname)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const callHref = strategyCallHref()

  if (pathname !== openPath) {
    setOpenPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab" || !panelRef.current) return
      const items = panelRef.current.querySelectorAll<HTMLElement>("a, button")
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
      previous?.focus()
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 text-ivory backdrop-blur-md">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-sm text-ivory" aria-label="VONTE home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm tracking-wide text-silver transition-colors hover:text-gold",
                  active && "text-gold",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="hidden lg:block">
          <CtaLink href={callHref}>Book a Strategy Call</CtaLink>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <CtaLink href={callHref} className="h-10 px-3.5 text-sm">
            Book a call
          </CtaLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-ivory"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" className="size-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </Container>
      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-navy text-ivory lg:hidden"
        >
          <div className="flex h-[4.5rem] items-center justify-between px-5">
            <Wordmark />
            <button
              ref={closeRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-6" aria-label="Mobile">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-b border-white/10 py-4 font-heading text-3xl font-semibold tracking-[-0.03em]",
                    active && "text-gold",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="px-5 pb-8">
            <CtaLink href={callHref} className="w-full">
              Book a Strategy Call
            </CtaLink>
          </div>
        </div>
      ) : null}
    </header>
  )
}
