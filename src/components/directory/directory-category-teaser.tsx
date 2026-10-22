import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ToolCard } from "@/components/tools/tool-card"
import { Button } from "@/components/ui/button"
import { getToolCategoryTagMap, getToolsInCategoryNames } from "@/lib/db/queries"

/**
 * Category teaser for a directory slice.
 * Excludes "Data Erasers" (disk & file secure-delete tools like DBAN — different problem).
 */
export const DATA_BROKER_DIRECTORY_CATEGORIES = ["Data Broker Redaction"] as const

const chipClassName =
  "inline-flex items-center rounded-full border border-foreground/10 bg-background/45 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-none transition-colors brand2-focus hover:border-foreground/16 hover:bg-foreground/[0.03]"

const viewAllChipClassName =
  "inline-flex items-center gap-1 rounded-full border border-dashed border-foreground/14 bg-transparent px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-none transition-colors brand2-focus hover:border-foreground/22 hover:text-foreground"

export type DirectoryCategoryTeaserProps = {
  categoryNames: readonly string[] | string[]
  eyebrow: string
  title: string
  description: string
  toolLimit?: number
  browseHref?: string
  browseLabel?: string
  /** Show pills linking to /directory?category=… for each name */
  showCategoryChips?: boolean
}

export function DirectoryCategoryTeaserSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-foreground/[0.03] via-background to-background px-6 py-6 md:px-8 md:py-7">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-3 w-40 rounded geist-skeleton" />
            <div className="h-9 w-80 max-w-full rounded geist-skeleton" />
            <div className="h-4 w-full max-w-lg rounded geist-skeleton" />
          </div>
          <div className="border-t border-foreground/10 pt-4 flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-28 rounded-full geist-skeleton" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-h-[148px] rounded-xl border border-border/40 geist-skeleton" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function DirectoryCategoryTeaser({
  categoryNames,
  eyebrow,
  title,
  description,
  toolLimit = 18,
  browseHref = "/directory",
  browseLabel = "Browse full directory",
  showCategoryChips = true,
}: DirectoryCategoryTeaserProps) {
  const names = [...categoryNames]
  const tools = await getToolsInCategoryNames(names, { limit: toolLimit })
  const categoryMap = tools.length > 0 ? await getToolCategoryTagMap(tools.map(t => t.id)) : new Map()

  const browseButton = (
    <Button size="lg" className="group brand2-btn-primary brand2-focus" asChild>
      <Link href={browseHref}>
        {browseLabel}
        <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" />
      </Link>
    </Button>
  )

  return (
    <div id="compare-tools" className="mx-auto w-full max-w-4xl scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
        <div className="relative z-10 px-6 py-6 md:px-8 md:py-7 space-y-6">
          <div>
            <p className="mb-2 text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">{eyebrow}</p>
            <h2 className="mb-2 text-2xl font-medium tracking-cinematic text-foreground md:text-3xl">{title}</h2>
            <p className="text-muted-foreground max-w-2xl">{description}</p>
          </div>

          {showCategoryChips && names.length > 0 && (
            <nav className="border-t border-foreground/10 pt-4" aria-label="Filter by category">
              <div className="flex flex-wrap gap-2">
                {names.map((label) => (
                  <Link
                    key={label}
                    href={{ pathname: "/directory", query: { category: label } }}
                    className={chipClassName}
                  >
                    {label}
                  </Link>
                ))}
                <Link href={browseHref} className={viewAllChipClassName}>
                  View all
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
            </nav>
          )}

          {tools.length === 0 ? (
            <div className="border-t border-foreground/10 pt-6 flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-muted-foreground max-w-md">
                Directory listings in these categories will appear here once published. You can still explore the full
                directory.
              </p>
              {browseButton}
            </div>
          ) : (
            <>
              <div className="border-t border-foreground/10 pt-6">
                <div className="relative md:static">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-background/95 to-transparent md:hidden"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-background/95 to-transparent md:hidden"
                    aria-hidden
                  />
                  <div
                    className="flex flex-nowrap gap-4 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:thin] md:grid md:grid-cols-2 md:grid-rows-none md:overflow-visible md:pb-0 md:snap-none lg:grid-cols-3 [&::-webkit-scrollbar]:h-1.5"
                  >
                    {tools.map((tool) => {
                      const ct = categoryMap.get(tool.id)
                      return (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          categoryLabel={ct?.categoryLabel ?? undefined}
                          tags={ct?.tags}
                          variant="teaser"
                          className="w-[min(280px,88vw)] shrink-0 snap-start md:w-auto md:min-w-0"
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-center border-t border-foreground/10 pt-6">{browseButton}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
