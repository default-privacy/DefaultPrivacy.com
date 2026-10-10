"use client"

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type AnchorPointProps = ComponentProps<"div"> & {
  /** Size of the outer ring */
  size?: "sm" | "md" | "lg"
  /** Whether to animate with pulse effect */
  animate?: boolean
  /** Animation delay in seconds */
  delay?: number
  /** Whether to show the inner dot */
  showDot?: boolean
  /** Whether to show glow effect */
  showGlow?: boolean
}

const sizeMap = {
  sm: { outer: 6, inner: 2, glow: 6 },
  md: { outer: 8, inner: 3, glow: 10 },
  lg: { outer: 12, inner: 4, glow: 14 },
}

export const AnchorPoint = ({
  size = "md",
  animate = true,
  delay = 0,
  showDot = true,
  showGlow = true,
  className,
  style,
  ...props
}: AnchorPointProps) => {
  const dimensions = sizeMap[size]

  return (
    <div
      className={cn("absolute pointer-events-none", className)}
      style={{
        width: dimensions.outer,
        height: dimensions.outer,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border border-foreground/30"
        style={{
          animation: animate ? `pulse-glow 9s ease-in-out infinite ${delay}s` : undefined,
        }}
      />

      {/* Inner dot */}
      {showDot && (
        <div
          className="absolute rounded-full bg-foreground/40"
          style={{
            width: dimensions.inner,
            height: dimensions.inner,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Glow effect */}
      {showGlow && (
        <div
          className={cn(
            "absolute rounded-full bg-foreground/14",
            animate && "motion-safe:animate-[pulse-glow_9s_ease-in-out_infinite]"
          )}
          style={{
            width: dimensions.outer,
            height: dimensions.outer,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animationDelay: animate ? `${delay}s` : undefined,
          }}
        />
      )}
    </div>
  )
}

/** Preset anchor point positions for common layouts */
export const AnchorPoints = ({
  positions = ["top-left", "top-right", "bottom-left", "bottom-right"],
  size = "sm",
  animate = true,
  offset = 8,
}: {
  positions?: ("top-left" | "top-right" | "bottom-left" | "bottom-right" | "center")[]
  size?: "sm" | "md" | "lg"
  animate?: boolean
  offset?: number
}) => {
  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: offset, left: offset },
    "top-right": { top: offset, right: offset },
    "bottom-left": { bottom: offset, left: offset },
    "bottom-right": { bottom: offset, right: offset },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  }

  return (
    <>
      {positions.map((pos, i) => (
        <AnchorPoint
          key={pos}
          size={size}
          animate={animate}
          delay={i * 0.5}
          style={positionStyles[pos]}
        />
      ))}
    </>
  )
}
