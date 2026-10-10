import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ConstructionGuideProps = ComponentProps<"svg"> & {
  /** Type of construction guide */
  type?: "crosshair" | "horizontal" | "vertical" | "diagonal"
  /** Position as percentage (0-100) for the line placement */
  position?: number
  /** Secondary position for diagonal lines */
  secondaryPosition?: number
  /** Dash pattern for the line */
  dashArray?: string
  /** Line opacity (0-1) */
  opacity?: number
}

export const ConstructionGuide = ({
  type = "crosshair",
  position = 50,
  secondaryPosition = 40,
  dashArray = "6 6",
  opacity = 0.1,
  className,
  ...props
}: ConstructionGuideProps) => {
  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none text-foreground", className)}
      style={{ width: '100%', height: '100%', opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {(type === "crosshair" || type === "vertical") && (
        <line
          x1={`${position}%`}
          y1="0"
          x2={`${position}%`}
          y2="100%"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray={dashArray}
        />
      )}

      {(type === "crosshair" || type === "horizontal") && (
        <line
          x1="0"
          y1={`${secondaryPosition}%`}
          x2="100%"
          y2={`${secondaryPosition}%`}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray={dashArray}
        />
      )}

      {type === "diagonal" && (
        <>
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray={dashArray}
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray={dashArray}
          />
        </>
      )}
    </svg>
  )
}

/** Preset crosshair centered in a container */
export const CenterCrosshair = ({ opacity = 0.08 }: { opacity?: number }) => (
  <ConstructionGuide type="crosshair" position={50} secondaryPosition={50} opacity={opacity} />
)
