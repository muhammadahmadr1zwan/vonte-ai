import { cn } from "cn"

export function Eyebrow({
  children,
  on = "dark",
  className,
}: {
  children: React.ReactNode
  on?: "dark" | "light"
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] uppercase",
        on === "dark" ? "text-gold" : "text-gold-ink",
        className,
      )}
    >
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {children}
    </p>
  )
}
