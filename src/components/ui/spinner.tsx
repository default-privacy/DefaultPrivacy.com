import type { LucideProps } from "lucide-react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const SIZE_CLASS = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-6",
  xl: "size-10",
} as const

export type SpinnerProps = Omit<LucideProps, "ref"> & {
  size?: keyof typeof SIZE_CLASS
}

/**
 * Lucide spinner with predictable sizing and reduced-motion inherited from globals.css.
 * Default decorative (aria-hidden with adjacent loading text).
 */
export function Spinner({
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}: SpinnerProps) {
  return (
    <Loader2
      aria-hidden={ariaHidden}
      className={cn("animate-spin", SIZE_CLASS[size], className)}
      {...props}
    />
  )
}
