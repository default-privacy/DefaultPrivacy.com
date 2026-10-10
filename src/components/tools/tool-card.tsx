"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { tools } from "@/lib/db/schema"
import type { TagInfo } from "@/lib/db/queries"
import { OutboundLink } from "@/components/common/outbound-link"
import {
  ExternalLink as ExternalLinkIcon,
  Github,
  Globe,
  Lock,
  Shield,
  Smartphone,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { pickInfo } from "@/lib/picks"

type Tool = typeof tools.$inferSelect

type ToolCardProps = {
  tool: Tool
  categoryLabel?: string
  tags?: TagInfo[]
  /** Homepage teaser: same Card shell as directory, whole card links to listing; no footer row */
  variant?: "default" | "teaser"
  /** With variant teaser: classes on outer Link (e.g. width for horizontal scroll) */
  className?: string
}

/** Palette-safe jurisdiction tint — only privacy-friendly (low-risk) reads as positive. */
function jurisdictionTint(risk: string | null) {
  return risk === "low"
    ? "border-success/20 bg-success/8 text-success"
    : "border-foreground/8 bg-foreground/[0.03] text-foreground/50"
}

function TagPill({ icon: Icon, label, tooltip }: { icon: React.ElementType; label: string; tooltip?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 rounded-full border border-foreground/8 bg-foreground/[0.02] px-2 py-0.5 text-[10px] font-medium text-foreground/60 transition-colors hover:border-foreground/12 hover:text-foreground/80">
            <Icon className="h-2.5 w-2.5" />
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>{tooltip || label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ToolCard({ tool, categoryLabel, tags, variant = "default", className }: ToolCardProps) {
  const displayCategory = categoryLabel
  const slugs = new Set(tags?.map(t => t.slug) ?? [])
  // Quality signals now come from the typed trust columns (consistent with the filters);
  // mobile stays tag-derived (no dedicated column).
  const showOpenSource = tool.isOpenSource === true
  const showE2ee = tool.e2ee === true
  const pick = tool.isDeprecated ? null : pickInfo(tool.slug)
  const showAndroid = slugs.has("android-app")
  const showIos = slugs.has("ios-app")
  const showMobile = showAndroid || showIos
  const mobileLabel = showAndroid && showIos
    ? "Android & iOS"
    : showAndroid ? "Android" : "iOS"

  const card = (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-foreground/12 bg-foreground/[0.03] p-4 transition-all",
        variant === "default" && "group hover:border-foreground/20 hover:bg-foreground/[0.06] hover:-translate-y-px",
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 overflow-hidden">
        {tool.faviconUrl ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-foreground/8 bg-foreground/[0.02]">
            <Image
              src={tool.faviconUrl}
              alt={tool.name}
              width={32}
              height={32}
              className="rounded-sm"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-foreground/8 bg-foreground/[0.02]">
            <Shield className="h-4 w-4 text-foreground/40" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium text-foreground/90 transition-colors group-hover:text-foreground">
            {variant === "teaser" ? (
              <span className="block truncate">{tool.name}</span>
            ) : (
              <Link href={`/directory/${tool.slug}`} className="block truncate rounded-sm brand2-focus hover:underline hover:underline-offset-2">
                {tool.name}
              </Link>
            )}
          </h3>
          {displayCategory && (
            <p className="truncate text-[11px] text-foreground/45">
              {displayCategory}
            </p>
          )}
          {tool.jurisdiction && (
            <span
              className={cn(
                "mt-1 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide",
                jurisdictionTint(tool.jurisdictionRisk),
              )}
              title={`Jurisdiction: ${tool.jurisdiction}${tool.jurisdictionRisk ? ` (${tool.jurisdictionRisk.replace("_", "-")})` : ""}`}
            >
              <Globe className="h-2.5 w-2.5" />
              {tool.jurisdiction}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-[12px] leading-relaxed text-foreground/50 line-clamp-2">
        {tool.tagline || tool.description?.slice(0, 100)}
      </p>

      {/* Footer */}
      {variant === "default" && (
        <div className="mt-3 space-y-2.5 border-t border-foreground/6 pt-3">
          {/* Attribute pills — their own wrapping row so they never crowd the action */}
          {(showOpenSource || showE2ee || showMobile) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {showOpenSource && <TagPill icon={Github} label="OSS" tooltip="Open source: the software's code is public. For services, the app may be open while the servers are not." />}
              {showE2ee && <TagPill icon={Lock} label="E2EE" tooltip="End-to-End Encrypted" />}
              {showMobile && <TagPill icon={Smartphone} label="Mobile" tooltip={`Mobile App (${mobileLabel})`} />}
            </div>
          )}
          {/* Action + DP pick badge — stable bottom row, never jumbles */}
          <div className="flex items-center justify-between gap-3">
            <OutboundLink
              href={tool.websiteUrl}
              className="group/link flex items-center gap-1.5 rounded-sm text-[11px] text-foreground/50 brand2-focus transition-colors hover:text-foreground/80"
            >
              Visit Site
              <ExternalLinkIcon className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
            </OutboundLink>
            {pick && (
              <Link
                href="/how-we-pick"
                title={`DP pick: ${pick.reason} How we pick`}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium text-foreground/70 brand2-focus transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Star className="h-2.5 w-2.5" aria-hidden />
                DP pick
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )

  if (variant === "teaser") {
    return (
      <Link
        href={`/directory/${tool.slug}`}
        className={cn(
          "group block h-full min-h-0 rounded-lg brand2-focus",
          className,
        )}
      >
        {card}
      </Link>
    )
  }

  return card
}
