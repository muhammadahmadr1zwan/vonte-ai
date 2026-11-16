import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { defaultPalette } from "@/lib/visual-directions"
import officialWordmark from "../../public/brand/vonte-wordmark-white.png"

// Same production artwork as the shared Wordmark, embedded for next/og's image renderer.
const logoData = await readFile(join(process.cwd(), "public/brand/vonte-wordmark-white.png"), "base64")
const logoSrc = `data:image/png;base64,${logoData}`

export const alt = "VONTE — AI automation for calls, leads, and websites"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: defaultPalette.bg,
          padding: "72px",
          color: defaultPalette.text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: defaultPalette.accent,
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            AI Automation Agency
          </div>
          {/* next/og renders native images; next/image is for browser components. */}
          <img src={logoSrc} alt="VONTE" width={920} height={920 * officialWordmark.height / officialWordmark.width} style={{ marginTop: 28 }} />
          <div
            style={{
              marginTop: 22,
              width: 88,
              height: 4,
              background: defaultPalette.accent,
            }}
          />
        </div>
        <div style={{ fontSize: 36, maxWidth: 820, lineHeight: 1.25 }}>
          Answer calls. Follow up with leads. Help visitors book.
        </div>
      </div>
    ),
    { ...size },
  )
}
