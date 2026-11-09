import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

const variants = {
  gold: "gold",
  inverse: "inverse",
  navy: "navy",
  quiet: "quiet",
} as const

export function CtaLink({
  href,
  children,
  className,
  variant = "gold",
}: {
  href: string
  children: React.ReactNode
  className?: string
  variant?: keyof typeof variants
}) {
  const external = href.startsWith("http://") || href.startsWith("https://")

  return (
    <Button
      nativeButton={false}
      variant={variants[variant]}
      size="cta"
      className={cn(className)}
      render={
        external ? (
          <a href={href} rel="noreferrer" />
        ) : (
          <Link href={href} />
        )
      }
    >
      {children}
    </Button>
  )
}
