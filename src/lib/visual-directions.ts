/** Shared palette source for the site, local comparisons and generated brand assets. */
export const visualDirections = {
  obsidian: {
    letter: "A", name: "Obsidian & Champagne", mood: "Warm. Editorial. Deliberate.",
    description: "An asymmetric composition, expressive serif detail and warm champagne actions.",
    colors: { bg: "#0A0A0B", surface: "#121213", raised: "#1C1B1B", text: "#F2EEE6", muted: "#BEB8AF", subtle: "#A7A198", accent: "#BEA47B", line: "#36332F", control: "#79736B", button: "#BEA47B", "button-ink": "#0A0A0B" },
  },
  graphite: {
    letter: "B", name: "Graphite & Silver", mood: "Precise. Quiet. Enduring.",
    description: "A centered typographic statement, a horizontal inquiry rail and almost no decorative color.",
    colors: { bg: "#101114", surface: "#16181C", raised: "#1D2026", text: "#F5F5F5", muted: "#B7BBC4", subtle: "#A0A6B1", accent: "#969DA8", line: "#343840", control: "#777E89", button: "#F5F5F5", "button-ink": "#101114" },
  },
  ice: {
    letter: "C", name: "Black & Ice Blue", mood: "Clear. Technical. Assured.",
    description: "A compact split layout, precise interface labels and pale-blue action states.",
    colors: { bg: "#090C10", surface: "#10161E", raised: "#18222D", text: "#F1F4F8", muted: "#B1BECD", subtle: "#9AAEC2", accent: "#80B4EB", line: "#2E3C4B", control: "#647D98", button: "#80B4EB", "button-ink": "#090C10" },
  },
  sage: {
    letter: "D", name: "Carbon & Sage", mood: "Considered. Distinctive. Calm.",
    description: "An offset editorial grid, lighter typography and a restrained sage signal.",
    colors: { bg: "#0A0D0B", surface: "#121814", raised: "#1B241F", text: "#ECEFEA", muted: "#B3BFB7", subtle: "#9AAD9F", accent: "#76AC92", line: "#334238", control: "#698672", button: "#ECEFEA", "button-ink": "#0A0D0B" },
  },
} as const

export type VisualDirection = keyof typeof visualDirections
export const DEFAULT_DIRECTION: VisualDirection = "obsidian"
export const defaultPalette = visualDirections[DEFAULT_DIRECTION].colors

export function directionVariables(direction: VisualDirection): Record<string, string> {
  return Object.fromEntries(Object.entries(visualDirections[direction].colors).map(([key, value]) => [`--v-${key}`, value]))
}

export function isVisualDirection(value: string | null): value is VisualDirection {
  return value !== null && Object.hasOwn(visualDirections, value)
}
