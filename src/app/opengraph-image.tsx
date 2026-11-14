import { ImageResponse } from "next/og"
import { defaultPalette } from "@/lib/visual-directions"

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
          <div
            style={{
              marginTop: 28,
              fontSize: 92,
              letterSpacing: 16,
              fontWeight: 700,
            }}
          >
            VONTE
          </div>
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
