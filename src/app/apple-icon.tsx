import { ImageResponse } from "next/og"
import { defaultPalette } from "@/lib/visual-directions"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: defaultPalette.bg,
          color: defaultPalette.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        V
      </div>
    ),
    { ...size },
  )
}
