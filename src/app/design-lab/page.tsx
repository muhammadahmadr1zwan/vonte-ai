import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Design study",
  robots: { index: false, follow: false },
}

export default async function DesignLabPage() {
  if (process.env.NODE_ENV !== "development") notFound()
  const { DesignLab } = await import("@/components/design-lab")
  return <DesignLab />
}
