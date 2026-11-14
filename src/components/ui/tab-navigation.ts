import type { KeyboardEvent } from "react"

/** Automatic activation, one tab stop, wraparound arrows, and Home/End. */
export function navigateTabs(event: KeyboardEvent<HTMLElement>, active: number, count: number, select: (index: number) => void) {
  let next: number
  if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (active + 1) % count
  else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (active - 1 + count) % count
  else if (event.key === "Home") next = 0
  else if (event.key === "End") next = count - 1
  else return
  event.preventDefault()
  select(next)
  event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
}
