import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type CornerMarkProps = ComponentProps<"div"> & {
  /** Position of the corner mark */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Length of the L-bracket arms in pixels */
  size?: number
  /** Whether to show the anchor circle */
  showAnchor?: boolean
  /** Anchor circle radius */
  anchorRadius?: number
  /** Line opacity (0-1) */
  opacity?: number
  /** Inset from the edge */
  inset?: number
}

export const CornerMark = ({
  position = "top-left",
  size = 24,
  showAnchor = false,
  anchorRadius = 2,
  opacity = 0.22,
  inset = 8,
  className,
  ...props
}: CornerMarkProps) => {
  const positionStyles = {
    "top-left": { top: inset, left: inset },
    "top-right": { top: inset, right: inset },
    "bottom-left": { bottom: inset, left: inset },
    "bottom-right": { bottom: inset, right: inset },
  }

  const rotations = {
    "top-left": "rotate(0deg)",
    "top-right": "rotate(90deg)",
    "bottom-left": "rotate(-90deg)",
    "bottom-right": "rotate(180deg)",
  }

  return (
    <div
      className={cn("absolute pointer-events-none", className)}
      style={{ ...positionStyles[position], opacity }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: rotations[position] }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* L-bracket */}
        <path
          d={`M 0 ${size} L 0 0 L ${size} 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-foreground"
        />
        {/* Anchor circle at corner */}
        {showAnchor && (
          <circle
            cx="0"
            cy="0"
            r={anchorRadius}
            fill="currentColor"
            className="text-foreground"
          />
        )}
      </svg>
    </div>
  )
}

/** Renders corner marks at all four corners */
export const CornerMarks = ({
  size = 24,
  showAnchor = false,
  anchorRadius = 2,
  opacity = 0.22,
  inset = 8,
  className,
}: Omit<CornerMarkProps, "position">) => (
  <>
    <CornerMark
      position="top-left"
      size={size}
      showAnchor={showAnchor}
      anchorRadius={anchorRadius}
      opacity={opacity}
      inset={inset}
      className={className}
    />
    <CornerMark
      position="top-right"
      size={size}
      showAnchor={showAnchor}
      anchorRadius={anchorRadius}
      opacity={opacity}
      inset={inset}
      className={className}
    />
    <CornerMark
      position="bottom-left"
      size={size}
      showAnchor={showAnchor}
      anchorRadius={anchorRadius}
      opacity={opacity}
      inset={inset}
      className={className}
    />
    <CornerMark
      position="bottom-right"
      size={size}
      showAnchor={showAnchor}
      anchorRadius={anchorRadius}
      opacity={opacity}
      inset={inset}
      className={className}
    />
  </>
)
