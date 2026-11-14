"use client"

import { useEffect, useRef, useState } from "react"
import { DEFAULT_DIRECTION, visualDirections, type VisualDirection } from "@/lib/visual-directions"

export function DesignLab() {
  const [direction, setDirection] = useState<VisualDirection>(DEFAULT_DIRECTION)
  const [width, setWidth] = useState(1440)
  const [available, setAvailable] = useState(0)
  const host = useRef<HTMLDivElement>(null)
  const theme = visualDirections[direction]
  useEffect(() => {
    if (!host.current) return
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width))
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  const scale = available ? Math.min(1, available / width) : 1
  const height = width < 768 ? 844 : 1000
  return <div data-design-lab className="design-lab">
    <div className="lab-intro">
      <p className="section-label">VONTE / Local design study</p>
      <h1 className="display mt-5 text-4xl sm:text-6xl">Four directions.<br />One VONTE.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">The same offers, real components and working interactions. Compare the composition on desktop and mobile, then scroll inside the preview to explore the full homepage.</p>
    </div>
    <div className="lab-choices" role="group" aria-label="Visual directions">
      {(Object.entries(visualDirections) as [VisualDirection, typeof theme][]).map(([key, item]) => <button key={key} type="button" aria-pressed={direction === key} onClick={() => setDirection(key)} className="lab-choice">
        <span className="text-xs text-subtle">Direction {item.letter}{key === DEFAULT_DIRECTION ? " · Selected default" : ""}</span>
        <span className="mt-3 block text-lg">{item.name}</span>
        <span className="mt-3 flex gap-2" aria-hidden="true">{[item.colors.bg, item.colors.text, item.colors.accent].map(color => <span key={color} className="size-4 rounded-full border border-white/30" style={{background:color}} />)}</span>
      </button>)}
    </div>
    <div className="lab-toolbar">
      <div><h2 className="text-lg font-medium">{theme.name}</h2><p className="mt-1 text-sm text-muted-foreground">{theme.description}</p></div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm">Viewport <select aria-label="Preview width" className="ml-2 min-h-11 border border-control bg-surface px-3 text-foreground" value={width} onChange={event => setWidth(Number(event.target.value))}>{[375,390,430,768,1024,1440].map(value => <option key={value} value={value}>{value}px</option>)}</select></label>
        <a href={`/?direction=${direction}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Open full preview ↗</a>
      </div>
    </div>
    <div ref={host} className="lab-frame-host" style={{height:height*scale}}>
      <iframe key={`${direction}-${width}`} title={`${theme.name} VONTE homepage at ${width}px`} src={`/?direction=${direction}`} className="lab-frame" style={{width,height,transform:`scale(${scale})`,left:"50%",marginLeft:-width/2}} />
    </div>
    <p className="mt-5 text-sm leading-6 text-muted-foreground">Selected default: {visualDirections[DEFAULT_DIRECTION].name}. {visualDirections[DEFAULT_DIRECTION].description} All four directions remain available here. This route returns 404 in production.</p>
  </div>
}
