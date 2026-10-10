import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type IconProps = ComponentProps<"svg"> & {
  /** Icon size */
  size?: number
  /** Stroke width */
  strokeWidth?: number
}

const iconDefaults = {
  size: 24,
  strokeWidth: 1.5,
}

/** Shield with grid overlay - represents protection/security */
export const ShieldNode = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Shield outline */}
    <path
      d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Grid lines inside shield */}
    <line x1="12" y1="6" x2="12" y2="17" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    {/* Anchor points */}
    <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.4" />
  </svg>
)

/** Padlock in blueprint/schematic style */
export const LockSchematic = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Lock body - rectangular */}
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* Shackle */}
    <path
      d="M8 11V7a4 4 0 1 1 8 0v4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Keyhole - geometric */}
    <circle cx="12" cy="15" r="1.5" stroke="currentColor" strokeWidth="1" />
    <line x1="12" y1="16.5" x2="12" y2="18" stroke="currentColor" strokeWidth="1" />
    {/* Construction marks */}
    <line x1="5" y1="11" x2="3" y2="11" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="19" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
)

/** Interconnected network nodes - represents P2P/decentralization */
export const NetworkMesh = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Connection lines */}
    <line x1="12" y1="4" x2="5" y2="10" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="12" y1="4" x2="19" y2="10" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="10" x2="5" y2="17" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="19" y1="10" x2="19" y2="17" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="17" x2="12" y2="20" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="19" y1="17" x2="12" y2="20" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="5" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    {/* Nodes */}
    <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="19" cy="10" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="5" cy="17" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="19" cy="17" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="12" cy="20" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    {/* Node centers */}
    <circle cx="12" cy="4" r="0.75" fill="currentColor" />
    <circle cx="5" cy="10" r="0.75" fill="currentColor" />
    <circle cx="19" cy="10" r="0.75" fill="currentColor" />
    <circle cx="5" cy="17" r="0.75" fill="currentColor" />
    <circle cx="19" cy="17" r="0.75" fill="currentColor" />
    <circle cx="12" cy="20" r="0.75" fill="currentColor" />
  </svg>
)

/** Key with geometric precision */
export const EncryptionKey = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Key head - circular with construction marks */}
    <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    {/* Key shaft */}
    <line
      x1="11"
      y1="11"
      x2="20"
      y2="20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Key teeth - geometric */}
    <line
      x1="15"
      y1="15"
      x2="17"
      y2="13"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="17"
      x2="19"
      y2="15"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Construction guide */}
    <line x1="8" y1="4" x2="8" y2="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="4" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
)

/** Eye with slash - anti-surveillance */
export const EyeSlash = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Eye outline */}
    <path
      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Iris */}
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
    {/* Pupil - construction style */}
    <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.6" />
    {/* Slash through */}
    <line
      x1="4"
      y1="4"
      x2="20"
      y2="20"
      stroke="currentColor"
      strokeWidth={strokeWidth * 1.25}
      strokeLinecap="round"
    />
    {/* Construction guides on slash */}
    <circle cx="4" cy="4" r="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="20" cy="20" r="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
)

/** Fingerprint in schematic style - represents identity/authentication */
export const FingerprintSchematic = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Fingerprint arcs - technical style */}
    <path
      d="M12 2a10 10 0 0 0-7 3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M19 5a10 10 0 0 1 2 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M3 12a10 10 0 0 0 3 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M12 22a10 10 0 0 0 6-2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Inner arcs */}
    <path
      d="M8 8a4 4 0 0 1 8 0"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M16 12a4 4 0 0 1-8 4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Center point */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
    {/* Construction marks */}
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="2 2"
      opacity="0.3"
    />
  </svg>
)

/** Code/Terminal bracket - represents open source/code */
export const CodeBracket = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Left bracket */}
    <path
      d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Right bracket */}
    <path
      d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Code lines */}
    <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="9" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="9" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Cursor/anchor point */}
    <rect x="6" y="11" width="2" height="3" fill="currentColor" opacity="0.4" />
  </svg>
)

/** Verified checkmark with technical styling */
export const VerifiedCheck = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-current", className)}
    {...props}
  >
    {/* Outer circle with construction marks */}
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
    {/* Inner construction circle */}
    <circle
      cx="12"
      cy="12"
      r="5"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="2 2"
      opacity="0.3"
    />
    {/* Checkmark */}
    <path
      d="M8 12l3 3 5-6"
      stroke="currentColor"
      strokeWidth={strokeWidth * 1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Anchor points */}
    <circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="3" cy="12" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="21" cy="12" r="1" fill="currentColor" opacity="0.4" />
  </svg>
)
