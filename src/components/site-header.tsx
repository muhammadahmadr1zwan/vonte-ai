"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react"

import { Container } from "@/components/container"
import { CtaLink } from "@/components/cta-link"
import { Wordmark } from "@/components/wordmark"
import { navItems } from "@/lib/content"
import { strategyCallHref } from "@/lib/site"
import { cn } from "cn"

const subscribeDialogSupport = () => () => {}
const supportsDialog = () => typeof HTMLDialogElement !== "undefined" && typeof HTMLDialogElement.prototype.showModal === "function"
const serverDialogSupport = () => false

export function SiteHeader() {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const disclosureRef = useRef<HTMLDetailsElement>(null)
  const subscribeDisclosure = useCallback((callback: () => void) => {
    const disclosure = disclosureRef.current
    disclosure?.addEventListener("toggle", callback)
    return () => disclosure?.removeEventListener("toggle", callback)
  }, [])
  const disclosureSnapshot = useCallback(() => Boolean(disclosureRef.current?.open), [])
  const disclosureOpen = useSyncExternalStore(subscribeDisclosure, disclosureSnapshot, serverDialogSupport)
  const dialogSupported = useSyncExternalStore(subscribeDialogSupport, supportsDialog, serverDialogSupport)
  const previousOverflow = useRef("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [systemVisible, setSystemVisible] = useState(false)
  const [ctaState, setCtaState] = useState({ pathname, visible: pathname !== "/" })
  const headerCtaVisible = ctaState.pathname === pathname ? ctaState.visible : pathname !== "/"
  const menuId = useId()
  const callHref = strategyCallHref()

  function closeMenu() {
    if (dialogRef.current?.open && typeof dialogRef.current.close === "function") dialogRef.current.close()
    if (disclosureRef.current) disclosureRef.current.open = false
  }

  function openMenu() {
    if (!dialogRef.current || dialogRef.current.open || !supportsDialog()) return
    if (disclosureRef.current) disclosureRef.current.open = false
    previousOverflow.current = document.body.style.overflow
    dialogRef.current.showModal()
    document.body.style.overflow = "hidden"
    setMenuOpen(true)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const query = typeof window.matchMedia === "function" ? window.matchMedia("(min-width: 1024px)") : null
    const onResize = () => { if (query?.matches ?? window.innerWidth >= 1024) closeMenu() }
    if (typeof query?.addEventListener === "function") query.addEventListener("change", onResize)
    else if (typeof query?.addListener === "function") query.addListener(onResize)
    else window.addEventListener("resize", onResize)
    return () => {
      if (typeof query?.removeEventListener === "function") query.removeEventListener("change", onResize)
      else if (typeof query?.removeListener === "function") query.removeListener(onResize)
      else window.removeEventListener("resize", onResize)
      if (dialog?.open) document.body.style.overflow = previousOverflow.current
    }
  }, [])

  useEffect(() => {
    // Preserve a native menu opened while scripts were still arriving.
    if (previousPathname.current !== pathname) closeMenu()
    previousPathname.current = pathname
  }, [pathname])

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
      system.scrollIntoView({ block: "start", behavior: typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
    }
    document.addEventListener("click", repeatSystemLink, true)
    return () => document.removeEventListener("click", repeatSystemLink, true)
  }, [])

  return (
    <header className="site-header" data-site-header>
      <Container className="header-layout">
        <Link href="/" className="shrink-0 text-foreground" aria-label="VONTE home"><Wordmark /></Link>
        <nav className="desktop-navigation" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={currentItem(item.href)}
              className={cn("whitespace-nowrap py-3 text-xs tracking-[0.04em] text-muted-foreground transition-colors hover:text-accent", currentItem(item.href) && "text-accent")}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-action" data-visible={headerCtaVisible}><CtaLink href={callHref}>Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink></div>
        {/* Native interaction may change only this element's open attribute before hydration. */}
        <details ref={disclosureRef} suppressHydrationWarning className="mobile-disclosure" onKeyDown={event => {
          if (event.key === "Escape") { closeMenu(); triggerRef.current?.focus() }
        }}>
          <summary ref={triggerRef} className="mobile-menu-trigger" role="button"
            aria-haspopup={dialogSupported ? "dialog" : undefined} aria-controls={dialogSupported ? menuId : `${menuId}-fallback`}
            aria-expanded={dialogSupported ? menuOpen || disclosureOpen : undefined}
            onClick={event => {
              if (supportsDialog()) {
                event.preventDefault()
                if (disclosureRef.current?.open) closeMenu()
                else openMenu()
              }
            }}>
            <Menu aria-hidden="true" className="menu-closed-icon size-4" /><X aria-hidden="true" className="menu-open-icon size-4" />
            <span className="menu-closed-label"><span className="sr-only">Open menu</span><span aria-hidden="true">Menu</span></span><span className="menu-open-label">Close menu</span>
          </summary>
          <nav id={`${menuId}-fallback`} className="fallback-navigation" aria-label="Mobile fallback">
            {navItems.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={currentItem(item.href)}>{item.label}</Link>)}
            <CtaLink href={callHref} primary>Book a Strategy Call</CtaLink>
          </nav>
        </details>
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
            <button type="button" className="inline-flex size-11 items-center justify-center border border-line" onClick={closeMenu}>
              <X aria-hidden="true" className="size-5" /><span className="sr-only">Close menu</span>
            </button>
          </div>
          <p className="px-5 pt-5 text-xs tracking-[0.2em] text-accent uppercase">Explore VONTE</p>
          <nav className="flex flex-1 flex-col px-5 pt-4" aria-label="Mobile">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={currentItem(item.href)}
                className={cn("flex items-center justify-between gap-4 border-b border-line py-4 font-heading text-2xl tracking-[-0.03em]", currentItem(item.href) && "text-accent")}>
                {item.label}<span aria-hidden="true" className="font-sans text-xs tracking-widest text-accent">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="px-5 pt-6 pb-8" onClick={closeMenu}>
            <CtaLink href={callHref} className="w-full">Book a Strategy Call <ArrowUpRight aria-hidden="true" /></CtaLink>
            <p className="mt-5 text-sm text-subtle">Intelligence in motion.</p>
          </div>
        </div>
      </dialog>
    </header>
  )
}
