import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type DimensionLineProps = ComponentProps<"svg"> & {
  /** Orientation of the dimension line */
  orientation?: "horizontal" | "vertical"
  /** Length of the end caps */
  capSize?: number
  /** Whether to show end caps */
  showCaps?: boolean
  /** Line opacity (0-1) */
  opacity?: number
  /** Optional label to display */
  label?: string
}

export const DimensionLine = ({
  orientation = "horizontal",
  capSize = 8,
  showCaps = true,
  opacity = 0.3,
  label,
  className,
  ...props
}: DimensionLineProps) => {
  const isHorizontal = orientation === "horizontal"

  return (
    <svg
      className={cn(
        "pointer-events-none text-foreground",
        isHorizontal ? "w-full h-4" : "h-full w-4",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={isHorizontal ? "none" : "none"}
      aria-hidden="true"
      style={{ opacity }}
      {...props}
    >
      {isHorizontal ? (
        <g>
          {/* Main horizontal line */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" />

          {/* Left cap */}
          {showCaps && (
            <line
              x1="0"
              y1={`calc(50% - ${capSize / 2}px)`}
              x2="0"
              y2={`calc(50% + ${capSize / 2}px)`}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          )}

          {/* Right cap */}
          {showCaps && (
            <line
              x1="100%"
              y1={`calc(50% - ${capSize / 2}px)`}
              x2="100%"
              y2={`calc(50% + ${capSize / 2}px)`}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          )}

          {/* Label */}
          {label && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="10"
              fontFamily="monospace"
            >
              {label}
            </text>
          )}
        </g>
      ) : (
        <g>
          {/* Main vertical line */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.5" />

          {/* Top cap */}
          {showCaps && (
            <line
              x1={`calc(50% - ${capSize / 2}px)`}
              y1="0"
              x2={`calc(50% + ${capSize / 2}px)`}
              y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          )}

          {/* Bottom cap */}
          {showCaps && (
            <line
              x1={`calc(50% - ${capSize / 2}px)`}
              y1="100%"
              x2={`calc(50% + ${capSize / 2}px)`}
              y2="100%"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          )}
        </g>
      )}
    </svg>
  )
}

/** Horizontal dimension line positioned absolutely at top or bottom */
export const HorizontalDimension = ({
  position = "bottom",
  offset = 0,
  ...props
}: Omit<DimensionLineProps, "orientation"> & {
  position?: "top" | "bottom"
  offset?: number
}) => (
  <div className="absolute left-0 right-0" style={{ [position]: offset }}>
    <DimensionLine orientation="horizontal" {...props} />
  </div>
)

/** Vertical dimension line positioned absolutely at left or right */
export const VerticalDimension = ({
  position = "right",
  offset = 0,
  ...props
}: Omit<DimensionLineProps, "orientation"> & {
  position?: "left" | "right"
  offset?: number
}) => (
  <div className="absolute top-0 bottom-0" style={{ [position]: offset }}>
    <DimensionLine orientation="vertical" {...props} />
  </div>
)
