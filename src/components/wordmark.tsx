import { cn } from "cn"

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-heading text-[0.78rem] font-medium tracking-[0.34em] uppercase",
        className,
      )}
    >
      <span className="size-1.5 bg-gold" aria-hidden="true" />
      Vonte
    </span>
  )
}
