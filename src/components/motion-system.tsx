"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react"
import { usePathname } from "next/navigation"

const MotionContext = createContext(false)
const staticSnapshot = () => false
const visibilityEvent = "vonte-motion-visibility"
const sceneVisibility = new WeakMap<Element, boolean>()

function motionSnapshot() {
  return typeof window.matchMedia === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !document.hidden && typeof IntersectionObserver !== "undefined" && typeof Element.prototype.animate === "function"
}

function subscribeMotion(callback: () => void) {
  const query = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null
  if (typeof query?.addEventListener === "function") query.addEventListener("change", callback)
  else query?.addListener?.(callback)
  document.addEventListener("visibilitychange", callback)
  return () => {
    if (typeof query?.removeEventListener === "function") query.removeEventListener("change", callback)
    else query?.removeListener?.(callback)
    document.removeEventListener("visibilitychange", callback)
  }
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const allowed = useSyncExternalStore(subscribeMotion, motionSnapshot, staticSnapshot)
  return <MotionContext.Provider value={allowed}>{children}<MotionObserver enabled={allowed} /></MotionContext.Provider>
}

/** One motion observer for all pages/scenes. Nothing starts hidden in CSS or SSR. */
function MotionObserver({ enabled }: { enabled: boolean }) {
  const pathname = usePathname()
  const revealed = useRef(new WeakSet<Element>())
  useEffect(() => {
    document.documentElement.dataset.uiReady = "true"
    document.documentElement.dataset.motionAllowed = String(enabled)
    const main = document.getElementById("main")
    if (!main) return
    const scenes = () => main.querySelectorAll<HTMLElement>("[data-motion-scene]")
    if (!enabled || typeof IntersectionObserver === "undefined") {
      scenes().forEach(node => { sceneVisibility.set(node, false); node.dispatchEvent(new Event(visibilityEvent)) })
      return
    }
    const observed = new WeakSet<Element>()
    const animations = new Set<Animation>()
    let frame = 0
    const animate = (node: HTMLElement, hero = false) => {
      if (revealed.current.has(node) || node.getClientRects().length === 0) return
      revealed.current.add(node)
      const actions = node.hasAttribute("data-hero-actions")
      const animation = node.animate([
        { opacity: actions ? .8 : .5, transform: `translateY(${actions ? 4 : 12}px)` },
        { opacity: 1, transform: "none" },
      ], { duration: hero ? 700 : 500, delay: hero ? Math.min(Number(node.dataset.heroStep || 0) * 65, 260) : Math.min(Number(node.dataset.motionDelay || 0), 150), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" })
      animations.add(animation)
      animation.onfinish = animation.oncancel = () => animations.delete(animation)
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement
        if (node.hasAttribute("data-motion-scene")) {
          sceneVisibility.set(node, entry.isIntersecting)
          node.dispatchEvent(new Event(visibilityEvent))
        }
        if (entry.isIntersecting && node.hasAttribute("data-motion")) animate(node)
      }
    }, { rootMargin: "0px 0px -32px 0px", threshold: [0, .12] })
    const register = () => {
      main.querySelectorAll<HTMLElement>("[data-hero-step]").forEach(node => {
        const rect = node.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < innerHeight) animate(node, true)
      })
      main.querySelectorAll<HTMLElement>("[data-motion],[data-motion-scene]").forEach(node => {
        if (!observed.has(node)) { observed.add(node); observer.observe(node) }
      })
    }
    register()
    // Covers streamed content and Next's retained routes without per-section observers.
    const mutations = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(register) })
    mutations.observe(main, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      mutations.disconnect()
      animations.forEach(animation => animation.cancel())
      scenes().forEach(node => { sceneVisibility.set(node, false); node.dispatchEvent(new Event(visibilityEvent)) })
    }
  }, [enabled, pathname])
  return null
}

export function useMotionAllowed() { return useContext(MotionContext) }

function useSceneVisibility(ref: RefObject<HTMLElement | null>) {
  const subscribe = useCallback((callback: () => void) => {
    const element = ref.current
    element?.addEventListener(visibilityEvent, callback)
    return () => element?.removeEventListener(visibilityEvent, callback)
  }, [ref])
  const snapshot = useCallback(() => !!ref.current && sceneVisibility.get(ref.current) === true, [ref])
  return useSyncExternalStore(subscribe, snapshot, staticSnapshot)
}

/** Finite playback; leaving the viewport/tab pauses its timer and CSS motion. */
export function useSequencePlayer(ref: RefObject<HTMLElement | null>, length: number, { auto = false, interval = 850 }: { auto?: boolean; interval?: number } = {}) {
  const allowed = useMotionAllowed()
  const inView = useSceneVisibility(ref)
  const [state, setState] = useState({ active: 0, playing: auto })
  const running = state.playing && allowed && inView
  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => setState(previous => previous.active === length - 1
      ? { ...previous, playing: false }
      : { ...previous, active: previous.active + 1 }), interval)
    return () => clearTimeout(timer)
  }, [running, state.active, length, interval])
  const select = (active: number) => setState({ active, playing: false })
  const next = () => setState(previous => ({ active: (previous.active + 1) % length, playing: false }))
  const toggle = () => setState(previous => previous.playing
    ? { ...previous, playing: false }
    : { active: previous.active === length - 1 ? 0 : previous.active, playing: true })
  return { active: state.active, playing: running, canAnimate: allowed, select, next, toggle }
}

export type SequencePlayer = ReturnType<typeof useSequencePlayer>

export function SequenceControls({ player, name, status }: { player: SequencePlayer; name: string; status: string }) {
  return <div className="sequence-controls" data-motion-controls role="group" aria-label={`${name} controls`}>
    <button type="button" onClick={player.toggle} disabled={!player.canAnimate} aria-label={`${player.playing ? "Pause" : "Play"} ${name}`}>{player.playing ? "Pause" : "Play"}</button>
    <button type="button" onClick={player.next} aria-label={`Next ${name} stage`}>Next stage <span aria-hidden="true">→</span></button>
    <p role="status" aria-live={player.playing ? "off" : "polite"}>{status}</p>
  </div>
}

/** The real value is rendered immediately; this only accents the updated element. */
export function useMotionPulse(ref: RefObject<HTMLElement | null>, value: string | number) {
  const allowed = useMotionAllowed()
  useEffect(() => {
    const node = ref.current
    if (!allowed || !node || typeof node.animate !== "function") return
    const rect = node.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > innerHeight) return
    const animation = node.animate([{ opacity: .65, transform: "translateY(3px)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "ease-out" })
    return () => animation.cancel()
  }, [allowed, ref, value])
}
