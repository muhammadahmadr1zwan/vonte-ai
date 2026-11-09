import { cn } from "cn"

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading text-[0.95rem] font-semibold tracking-[0.28em] uppercase",
        className,
      )}
    >
      Vonte
    </span>
  )
}
