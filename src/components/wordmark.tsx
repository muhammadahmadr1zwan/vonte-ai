import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import officialWordmark from "../../public/brand/vonte-wordmark-white.png"

type WordmarkProps = {
  className?: string
  placement?: "header" | "menu" | "footer"
  homeLink?: boolean
}

/** Source-pixel artwork, including the registered mark; never reconstructed as font text. */
export function Wordmark({ className, placement = "header", homeLink = false }: WordmarkProps) {
  const image = (
    <Image
      src={officialWordmark}
      alt="VONTE"
      unoptimized
      loading="eager"
      className={cn("block h-auto max-w-full shrink-0", {
        "w-40 sm:w-44": placement === "header",
        "w-44 sm:w-48": placement === "menu",
        "w-52 sm:w-56": placement === "footer",
      }, className)}
      data-vonte-wordmark
    />
  )
  return homeLink ? <Link href="/" aria-label="VONTE home" className="inline-flex min-h-11 max-w-full items-center">{image}</Link> : image
}
