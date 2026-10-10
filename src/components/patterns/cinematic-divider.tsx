import { cn } from "@/lib/utils"

type CinematicDividerProps = {
  className?: string
  /** Max width of inner frame (Tailwind max-w-* token) */
  maxWidthClass?: string
}

/** Full-width section break: soft gradient lines + restrained center focal dot */
export function CinematicDivider({
  className,
  maxWidthClass = "max-w-6xl",
}: CinematicDividerProps) {
  return (
    <div className={cn("container py-8 md:py-10", className)} role="separator">
      <div className={cn("mx-auto flex items-center gap-6", maxWidthClass)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/22 to-transparent" />
        <div className="h-1 w-1 shrink-0 rounded-full bg-primary/70 ring-1 ring-primary/35" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/22 to-transparent" />
      </div>
    </div>
  )
}
