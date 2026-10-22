import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"
import type { CrossSellTarget } from "@/lib/cross-sell"

/**
 * Presentational server component that renders a curated set of internal cross-sell
 * links (categories / guides / stacks) in the scanner's "we show solutions, not just
 * problems" success/blueprint style (see scanner results page :167-208).
 *
 * Renders nothing when there are no targets. Stays in static HTML (server component)
 * so the internal links are crawlable even when the tool UI itself is a client
 * component.
 */
export function RelatedLinks({
  title,
  description,
  targets,
}: {
  title: string
  description?: string
  targets: CrossSellTarget[]
}) {
  if (targets.length === 0) return null

  return (
    <div className="rounded-lg border border-success/20 bg-success/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-success/20 bg-success/10">
          <Shield className="h-4 w-4 text-success" />
        </div>
        <div>
          <h3 className="text-[14px] font-medium text-success">{title}</h3>
          {description && <p className="text-[12px] text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {targets.map((target) => (
          <Link
            key={target.href}
            href={target.href}
            className="brand2-focus group flex items-center justify-between gap-2 rounded-lg border border-success/20 bg-background px-3 py-2 text-[13px] text-foreground-soft transition-colors hover:border-success/40 hover:bg-success/10 hover:text-foreground"
          >
            <span>{target.label}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-success/60 brand2-arrow-nudge" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
