"use client"

import { useEffect } from "react"
import { directionVariables, isVisualDirection } from "@/lib/visual-directions"

/** Rendered only by next dev. There is no theme chooser in the public site. */
export function DesignPreview() {
  useEffect(() => {
    const direction = new URLSearchParams(window.location.search).get("direction")
    if (!isVisualDirection(direction)) return
    document.documentElement.dataset.theme = direction
    for (const [key, value] of Object.entries(directionVariables(direction))) {
      document.documentElement.style.setProperty(key, value)
    }
    document.documentElement.dataset.designReady = direction
  }, [])
  return null
}
