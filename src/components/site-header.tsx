"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"

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
  const previousOverflow = useRef("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [systemVisible, setSystemVisible] = useState(false)
  const [ctaState, setCtaState] = useState({ pathname, visible: pathname !== "/" })
  const headerCtaVisible = ctaState.pathname === pathname ? ctaState.visible : pathname !== "/"
  const menuId = useId()
  const callHref = strategyCallHref()

  function closeMenu() { dialogRef.current?.close() }

  function openMenu() {
    if (!dialogRef.current || dialogRef.current.open) return
    previousOverflow.current = document.body.style.overflow
    dialogRef.current.showModal()
    document.body.style.overflow = "hidden"
    setMenuOpen(true)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const query = window.matchMedia("(min-width: 1024px)")
    const onResize = () => { if (query.matches) closeMenu() }
    query.addEventListener("change", onResize)
    return () => {
      query.removeEventListener("change", onResize)
      if (dialog?.open) document.body.style.overflow = previousOverflow.current
    }
  }, [])

  useEffect(() => { closeMenu() }, [pathname])

  // Show the header action only when an in-page consultation action is out of view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= 0.5) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      const show = visible.size === 0
      setCtaState(current => current.pathname === pathname && current.visible === show ? current : { pathname, visible: show })
    }, { rootMargin: "-81px 0px 0px 0px", threshold: [0, 0.5] })
    document.querySelectorAll("main [data-strategy-cta]").forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return
    // Cached routes may remain mounted; observe the visible homepage section.
    const system = Array.from(document.querySelectorAll("main #system"))
      .find(element => element.getClientRects().length > 0)
    if (!system) return
    const observer = new IntersectionObserver(([entry]) => setSystemVisible(entry.isIntersecting), {
      rootMargin: "-81px 0px -60% 0px",
    })
    observer.observe(system)
    return () => observer.disconnect()
  }, [pathname])

  function currentItem(href: string): "page" | "location" | undefined {
    if (href === "/#system") return pathname === "/" && systemVisible ? "location" : undefined
    if (href === "/" && systemVisible && pathname === "/") return undefined
    return pathname === href ? "page" : undefined
  }

  useEffect(() => {
    // Next skips same-URL fragment links. Handle repeat selections in both menus
    // and the footer before the router, preserving its existing history entry.
    function repeatSystemLink(event: MouseEvent) {
      if (window.location.pathname !== "/" || window.location.hash !== "#system" ||
        event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null
      if (!(anchor instanceof HTMLAnchorElement) || anchor.href !== window.location.href) return
      const system = Array.from(document.querySelectorAll<HTMLElement>("main #system"))
        .find(element => element.getClientRects().length > 0)
      if (!system) return
      event.preventDefault()
      system.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
    }
    document.addEventListener("click", repeatSystemLink, true)
    return () => document.removeEventListener("click", repeatSystemLink, true)
  }, [])

  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-ivory backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-3">
        <Link href="/" className="shrink-0 text-ivory" aria-label="VONTE home"><Wordmark /></Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={currentItem(item.href)}
              className={cn("whitespace-nowrap py-3 text-xs tracking-[0.04em] text-silver transition-colors hover:text-gold", currentItem(item.href) && "text-gold")}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={cn("hidden focus-within:visible lg:block", !headerCtaVisible && "invisible")}><CtaLink href={callHref}>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink></div>
        <div className="flex items-center gap-2 lg:hidden">
          <button ref={triggerRef} type="button" className="inline-flex size-11 items-center justify-center border border-white/20"
            aria-haspopup="dialog" aria-controls={menuId} aria-expanded={menuOpen}
            onClick={openMenu}>
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
        onClose={() => { document.body.style.overflow = previousOverflow.current; setMenuOpen(false); triggerRef.current?.focus() }}>
        <div className="flex min-h-full flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between px-5">
            <Wordmark />
            <button type="button" className="inline-flex size-11 items-center justify-center border border-white/20" onClick={closeMenu}>
              <X aria-hidden="true" className="size-5" /><span className="sr-only">Close menu</span>
            </button>
          </div>
          <p className="px-5 pt-5 text-xs tracking-[0.2em] text-gold uppercase">Explore VONTE</p>
          <nav className="flex flex-1 flex-col px-5 pt-4" aria-label="Mobile">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={currentItem(item.href)}
                className={cn("flex items-center justify-between gap-4 border-b border-white/15 py-4 font-heading text-2xl tracking-[-0.03em]", currentItem(item.href) && "text-gold")}>
                {item.label}<span aria-hidden="true" className="font-sans text-xs tracking-widest text-gold">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="px-5 pt-6 pb-8" onClick={closeMenu}>
            <CtaLink href={callHref} className="w-full">Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <p className="mt-5 text-sm text-mist">Intelligence in motion.</p>
          </div>
        </div>
      </dialog>
    </header>
  )
}
