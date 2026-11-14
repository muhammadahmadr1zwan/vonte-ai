import { ImageResponse } from "next/og"
import { defaultPalette } from "@/lib/visual-directions"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: defaultPalette.bg,
          color: defaultPalette.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        V
      </div>
    ),
    { ...size },
  )
}
