import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionDividerProps = ComponentProps<"div"> & {
  /** Show anchor points at the ends */
  showAnchors?: boolean
  /** Show dimension-style end caps */
  showCaps?: boolean
  /** Optional centered content (icon, badge, etc.) */
  children?: ReactNode
  /** Line opacity (0-1) */
  opacity?: number
  /** Variant style */
  variant?: "default" | "dashed" | "dots"
}

export const SectionDivider = ({
  showAnchors = false,
  showCaps = false,
  children,
  opacity = 0.1,
  variant = "default",
  className,
  ...props
}: SectionDividerProps) => {
  return (
    <div className={cn("relative w-full py-8", className)} role="separator" {...props}>
      <div className="relative flex items-center justify-center">
        {/* Left line segment */}
        <div className="flex-1 flex items-center">
          {/* Left anchor point */}
          {showAnchors && (
            <div className="relative shrink-0 mr-2" style={{ opacity: opacity * 1.5 }}>
              <div className="w-2 h-2 rounded-full border border-foreground" />
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-foreground" />
            </div>
          )}

          {/* Left cap */}
          {showCaps && <div className="w-px h-3 bg-foreground shrink-0" style={{ opacity }} />}

          {/* Left line */}
          <div
            className={cn(
              "flex-1 h-px",
              variant === "dashed" && "border-t border-dashed border-foreground",
              variant === "dots" && "border-t border-dotted border-foreground",
              variant === "default" && "bg-foreground",
            )}
            style={{ opacity }}
          />
        </div>

        {/* Center content */}
        {children && <div className="px-4 shrink-0">{children}</div>}

        {/* Right line segment */}
        <div className="flex-1 flex items-center">
          {/* Right line */}
          <div
            className={cn(
              "flex-1 h-px",
              variant === "dashed" && "border-t border-dashed border-foreground",
              variant === "dots" && "border-t border-dotted border-foreground",
              variant === "default" && "bg-foreground",
            )}
            style={{ opacity }}
          />

          {/* Right cap */}
          {showCaps && <div className="w-px h-3 bg-foreground shrink-0" style={{ opacity }} />}

          {/* Right anchor point */}
          {showAnchors && (
            <div className="relative shrink-0 ml-2" style={{ opacity: opacity * 1.5 }}>
              <div className="w-2 h-2 rounded-full border border-foreground" />
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Technical dimension-line style divider */
export const DimensionDivider = ({
  label,
  className,
  ...props
}: Omit<SectionDividerProps, "children" | "showCaps"> & { label?: string }) => (
  <SectionDivider showCaps className={className} {...props}>
    {label && (
      <span className="text-xs font-mono text-foreground/58 uppercase tracking-wider">{label}</span>
    )}
  </SectionDivider>
)

/** Blueprint-style divider with anchor points */
export const BlueprintDivider = ({
  className,
  ...props
}: Omit<SectionDividerProps, "showAnchors">) => (
  <SectionDivider showAnchors variant="dashed" opacity={0.2} className={className} {...props} />
)
