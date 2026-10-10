import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type GridPatternProps = ComponentProps<"svg"> & {
  /** Main grid cell size in pixels */
  size?: number
  /** Fine grid subdivision size in pixels */
  fineSize?: number
  /** Main grid line opacity (0-1) */
  opacity?: number
  /** Fine grid line opacity (0-1) */
  fineOpacity?: number
  /** Whether to show fine grid subdivision */
  showFineGrid?: boolean
  /** Unique ID prefix for pattern definitions */
  patternId?: string
}

export const GridPattern = ({
  size = 48,
  fineSize = 12,
  opacity = 0.045,
  fineOpacity = 0.022,
  showFineGrid = true,
  patternId = "grid",
  className,
  ...props
}: GridPatternProps) => {
  const mainId = `${patternId}-main`
  const fineId = `${patternId}-fine`

  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Main grid pattern */}
        <pattern id={mainId} width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Fine grid pattern */}
        {showFineGrid && (
          <pattern id={fineId} width={fineSize} height={fineSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${fineSize} 0 L 0 0 0 ${fineSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.25"
            />
          </pattern>
        )}
      </defs>

      {/* Fine grid layer */}
      {showFineGrid && (
        <rect
          width="100%"
          height="100%"
          fill={`url(#${fineId})`}
          className="text-foreground"
          style={{ opacity: fineOpacity }}
        />
      )}

      {/* Main grid layer */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#${mainId})`}
        className="text-foreground"
        style={{ opacity }}
      />
    </svg>
  )
}
