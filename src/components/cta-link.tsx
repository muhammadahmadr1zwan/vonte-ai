import Link from "next/link"
import { buttonVariants } from "@/components/ui/button-variants"

export function CtaLink({ href, children, className, variant = "gold", primary = false }: {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "gold" | "inverse" | "navy" | "quiet"
  primary?: boolean
}) {
  const classes = buttonVariants({ variant, size: "cta", className })
  return href.startsWith("http://") || href.startsWith("https://")
    ? <a href={href} className={classes} data-strategy-cta={primary || undefined}>{children}</a>
    : <Link href={href} className={classes} data-strategy-cta={primary || undefined}>{children}</Link>
}
