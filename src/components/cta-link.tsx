import Link from "next/link"
import { buttonVariants } from "@/components/ui/button-variants"

export function CtaLink({ href, children, className, variant = "gold" }: {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "gold" | "inverse" | "navy" | "quiet"
}) {
  const classes = buttonVariants({ variant, size: "cta", className })
  return href.startsWith("http://") || href.startsWith("https://")
    ? <a href={href} className={classes}>{children}</a>
    : <Link href={href} className={classes}>{children}</Link>
}
