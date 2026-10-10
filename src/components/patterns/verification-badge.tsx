import type { ComponentProps } from "react"
import { VerifiedCheck } from "@/components/icons"
import { cn } from "@/lib/utils"

type VerificationBadgeProps = ComponentProps<"div"> & {
  /** Verification status */
  status?: "verified" | "open-source" | "e2e-encrypted" | "audited" | "community"
  /** Optional hash to display (will be truncated) */
  hash?: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Show full technical styling */
  showTechnical?: boolean
}

const statusConfig = {
  verified: {
    label: "VERIFIED",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  "open-source": {
    label: "OPEN SOURCE",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  "e2e-encrypted": {
    label: "E2E ENCRYPTED",
    color: "text-technical",
    bgColor: "bg-technical/10",
    borderColor: "border-technical/20",
  },
  audited: {
    label: "AUDITED",
    color: "text-caution",
    bgColor: "bg-caution/10",
    borderColor: "border-caution/20",
  },
  community: {
    label: "COMMUNITY",
    color: "text-technical",
    bgColor: "bg-technical/10",
    borderColor: "border-technical/20",
  },
}

const sizeConfig = {
  sm: {
    padding: "px-2 py-0.5",
    text: "text-[10px]",
    icon: 12,
    hashLength: 6,
  },
  md: {
    padding: "px-2.5 py-1",
    text: "text-xs",
    icon: 14,
    hashLength: 8,
  },
  lg: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    icon: 16,
    hashLength: 12,
  },
}

/** Truncate hash for display */
const truncateHash = (hash: string, length: number) => {
  if (hash.length <= length) return hash
  const half = Math.floor(length / 2)
  return `${hash.slice(0, half)}...${hash.slice(-half)}`
}

export const VerificationBadge = ({
  status = "verified",
  hash,
  size = "md",
  showTechnical = false,
  className,
  ...props
}: VerificationBadgeProps) => {
  const config = statusConfig[status]
  const sizeStyles = sizeConfig[size]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-mono uppercase tracking-wider",
        config.bgColor,
        config.borderColor,
        sizeStyles.padding,
        sizeStyles.text,
        className,
      )}
      {...props}
    >
      {/* Status icon */}
      <VerifiedCheck size={sizeStyles.icon} className={config.color} />

      {/* Status label */}
      <span className={cn("font-semibold", config.color)}>
        {showTechnical ? `[${config.label}]` : config.label}
      </span>

      {/* Hash snippet */}
      {hash && (
        <span className="text-muted-foreground/60 font-normal">
          {truncateHash(hash, sizeStyles.hashLength)}
        </span>
      )}
    </div>
  )
}

/** Terminal-style status indicator */
export const StatusIndicator = ({
  status,
  className,
}: {
  status: keyof typeof statusConfig
  className?: string
}) => {
  const config = statusConfig[status]

  return (
    <span
      className={cn("inline-flex items-center gap-1 font-mono text-xs", config.color, className)}
    >
      <span className="opacity-60">[</span>
      <span className="font-semibold">{config.label}</span>
      <span className="opacity-60">]</span>
    </span>
  )
}

/** Hash display with copy functionality styling */
export const HashDisplay = ({
  hash,
  prefix = "sha256",
  truncate = true,
  length = 12,
  className,
}: {
  hash: string
  prefix?: string
  truncate?: boolean
  length?: number
  className?: string
}) => {
  const displayHash = truncate ? truncateHash(hash, length) : hash

  return (
    <code
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted/50 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="text-foreground/58">{prefix}:</span>
      <span>{displayHash}</span>
    </code>
  )
}

/** Trust score display */
export const TrustScore = ({
  score,
  maxScore = 100,
  showLabel = true,
  className,
}: {
  score: number
  maxScore?: number
  showLabel?: boolean
  className?: string
}) => {
  const percentage = (score / maxScore) * 100
  const { textClass, barClass } =
    percentage >= 80
      ? { textClass: "text-success", barClass: "bg-success" }
      : percentage >= 60
        ? { textClass: "text-caution", barClass: "bg-caution" }
        : { textClass: "text-attention", barClass: "bg-attention" }

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs", className)}>
      {showLabel && <span className="text-muted-foreground">TRUST:</span>}
      <span className={cn("font-semibold", textClass)}>
        {score}/{maxScore}
      </span>
      {/* Visual bar */}
      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", barClass)} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
