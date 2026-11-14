import { cn } from "cn"

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-heading text-sm font-medium tracking-[0.3em] uppercase",
        className,
      )}
    >
      <span className="size-1.5 bg-accent" aria-hidden="true" />
      Vonte
    </span>
  )
}
