"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useEffect, useId, useRef } from "react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Wordmark } from "@/components/wordmark"
import { navItems } from "@/lib/content"
import { strategyCallHref } from "@/lib/site"
import { cn } from "cn"

export function SiteHeader() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const callHref = strategyCallHref()

  function closeMenu() { dialogRef.current?.close() }

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const onResize = () => { if (query.matches) closeMenu() }
    query.addEventListener("change", onResize)
    return () => query.removeEventListener("change", onResize)
  }, [])

  useEffect(() => { closeMenu() }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-ivory backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-3">
        <Link href="/" className="shrink-0 text-ivory" aria-label="VONTE home"><Wordmark /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
              className={cn("py-3 text-xs tracking-[0.12em] text-silver transition-colors hover:text-gold", pathname === item.href && "text-gold")}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block"><CtaLink href={callHref}>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink></div>
        <div className="flex items-center gap-2 lg:hidden">
          <CtaLink href={callHref} className="h-11 px-3 text-sm">Book a call</CtaLink>
          <button ref={triggerRef} type="button" className="inline-flex size-11 items-center justify-center border border-white/20"
            aria-haspopup="dialog" aria-controls={menuId}
            onClick={() => { dialogRef.current?.showModal(); document.body.style.overflow = "hidden" }}>
            <Menu aria-hidden="true" className="size-5" /><span className="sr-only">Open menu</span>
          </button>
        </div>
      </Container>
      <dialog onKeyDown={(event) => {
        if (event.key !== "Tab") return
        const items = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button")
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }} ref={dialogRef} id={menuId} aria-label="Menu" className="mobile-menu"
        onClose={() => { document.body.style.overflow = ""; triggerRef.current?.focus() }}>
        <div className="flex min-h-full flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between px-5">
            <Wordmark />
            <button type="button" className="inline-flex size-11 items-center justify-center border border-white/20" onClick={closeMenu}>
              <X aria-hidden="true" className="size-5" /><span className="sr-only">Close menu</span>
            </button>
          </div>
          <p className="px-5 pt-8 text-xs tracking-[0.2em] text-gold uppercase">Explore VONTE</p>
          <nav className="flex flex-1 flex-col px-5 pt-4" aria-label="Mobile">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={pathname === item.href ? "page" : undefined}
                className={cn("flex items-center justify-between gap-4 border-b border-white/15 py-5 font-heading text-3xl tracking-[-0.03em]", pathname === item.href && "text-gold")}>
                {item.label}<span className="font-sans text-xs tracking-widest text-gold">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="px-5 pt-10 pb-8" onClick={closeMenu}>
            <CtaLink href={callHref} className="w-full">Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <p className="mt-5 text-sm text-mist">Intelligence in motion.</p>
          </div>
        </div>
      </dialog>
    </header>
  )
}
