import { DirectorySort } from "@/components/directory/directory-sort"
import { FacetChips } from "@/components/directory/facet-chips"
import { ToolCard } from "@/components/tools/tool-card"
import { ToolFilters } from "@/components/tools/tool-filters"
import { ToolFiltersPanel } from "@/components/tools/tool-filters-panel"
import { DirectoryToolSearch } from "@/components/tools/directory-tool-search"
import { Button } from "@/components/ui/button"
import {
  getCategoryGroups,
  getPublicTags,
  getToolCategoryTagMap,
  getTools,
  getToolsCount,
} from "@/lib/db/queries"
import { ChevronLeft, ChevronRight, Shield } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export type DirectorySearchParams = {
  search?: string
  category?: string
  subCategory?: string
  tags?: string
  /** CSV of typed-column facet keys (open-source) */
  f?: string
  /** picks (default) | name | newest */
  sort?: string
  page?: string
}

type DirectoryBrowserProps = {
  searchParams: DirectorySearchParams
  /** Pagination + reset links resolve against this — "/" on the homepage, "/directory" on the directory page */
  basePath: string
  /** Hide when a search field already lives above (homepage hero owns it there) */
  showSearch?: boolean
}

const ITEMS_PER_PAGE = 24


function parseTagSlugs(tags: string | undefined) {
  return tags ? tags.split(",").map((s) => s.trim()).filter(Boolean) : undefined
}

/** Map the `f` (facet CSV) + `sort` URL params onto ToolFilters column facets. */
function parseFacetFilters(sp: DirectorySearchParams) {
  const keys = new Set((sp.f ?? "").split(",").map((s) => s.trim()).filter(Boolean))
  const has = (k: string) => (keys.has(k) ? true : undefined)
  const sortBy =
    sp.sort === "name" ? ("name" as const)
    : sp.sort === "newest" ? ("createdAt" as const)
    : ("picks" as const) // default: DP picks first, then A to Z
  return {
    openSource: has("open-source"),
    sortBy,
    sortOrder: sp.sort === "newest" ? ("desc" as const) : ("asc" as const),
  }
}

async function ToolsGrid({
  searchParams,
  basePath,
}: {
  searchParams: DirectorySearchParams
  basePath: string
}) {
  const page = Number(searchParams.page) || 1
  const offset = (page - 1) * ITEMS_PER_PAGE

  const filters = {
    search: searchParams.search,
    category: searchParams.category,
    subCategory: searchParams.subCategory,
    tagSlugs: parseTagSlugs(searchParams.tags),
    publicOnly: true,
    limit: ITEMS_PER_PAGE,
    offset,
    ...parseFacetFilters(searchParams),
  }

  const [tools, totalCount] = await Promise.all([
    getTools(filters),
    getToolsCount(filters),
  ])

  // Batch-fetch normalized categories + tags for all tools on this page
  const categoryTagMap = await getToolCategoryTagMap(tools.map((t) => t.id))

  // When the user is actively filtering by a subcategory, force the card label
  // to match the sidebar filter so the directory feels consistent (e.g. cards
  // under "Voice Assistants" show "Voice Assistants", not whichever sibling
  // subcategory happens to sort first alphabetically).
  const decodeFilterValue = (value: string | undefined) => {
    if (!value) return undefined
    try {
      return decodeURIComponent(value.replace(/\+/g, " ")).trim() || undefined
    } catch {
      return value.replace(/\+/g, " ").trim() || undefined
    }
  }
  const activeFilterLabel =
    decodeFilterValue(searchParams.subCategory) ?? decodeFilterValue(searchParams.category)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  if (tools.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-foreground/10 bg-foreground/[0.01] py-16 text-center">
          <Shield className="mb-4 h-10 w-10 text-muted-foreground" aria-hidden />
          <h3 className="text-lg font-medium text-foreground">No tools found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
          <Button variant="outline" className="brand2-focus mt-4 border-foreground/12" asChild>
            <Link href={basePath}>Clear all filters</Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Result count — mirrors the mock's count bar */}
      <div className="mb-4 flex items-center justify-between border-b border-foreground/8 pb-3">
        <span className="font-mono text-[12px] text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground">{totalCount}</span> tools
          {totalPages > 1 && (
            <>
              {" "}
              · page {page} of {totalPages}
            </>
          )}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const ctData = categoryTagMap.get(tool.id)
          return (
            <ToolCard
              key={tool.id}
              tool={tool}
              categoryLabel={activeFilterLabel ?? ctData?.categoryLabel ?? undefined}
              tags={ctData?.tags}
            />
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="brand2-focus border-foreground/12"
            disabled={page <= 1}
            asChild={page > 1}
          >
            {page > 1 ? (
              <Link
                rel="nofollow"
                href={{
                  pathname: basePath,
                  query: { ...searchParams, page: page - 1 },
                }}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Link>
            ) : (
              <>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </>
            )}
          </Button>
          <span className="px-4 text-[12px] tabular-nums text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="brand2-focus border-foreground/12"
            disabled={page >= totalPages}
            asChild={page < totalPages}
          >
            {page < totalPages ? (
              <Link
                rel="nofollow"
                href={{
                  pathname: basePath,
                  query: { ...searchParams, page: page + 1 },
                }}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            ) : (
              <>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  )
}

/**
 * The full directory body — category sidebar + facet chips + tool grid with the
 * pagination. Shared by the homepage (basePath "/")
 * and /directory so there is exactly one directory implementation.
 */
export async function DirectoryBrowser({
  searchParams,
  basePath,
  showSearch = true,
}: DirectoryBrowserProps) {
  const [groups, publicTags, totalCount] = await Promise.all([
    getCategoryGroups(),
    getPublicTags(),
    getToolsCount({
      search: searchParams.search,
      category: searchParams.category,
      subCategory: searchParams.subCategory,
      tagSlugs: parseTagSlugs(searchParams.tags),
      publicOnly: true,
      ...parseFacetFilters(searchParams),
    }),
  ])

  return (
    <div className="flex gap-10">
      {/* Category rail (desktop) — the searchable, counted category tree stays pinned here */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)]">
          <Suspense>
            <ToolFilters
              groups={groups}
              publicTags={publicTags}
              totalCount={totalCount}
              showTags={false}
            />
          </Suspense>
        </div>
      </aside>

      {/* Main column */}
      <div className="min-w-0 flex-1">
        {/* Search — only when this surface owns search (e.g. /directory) */}
        {showSearch && (
          <div className="mb-4">
            <Suspense>
              <DirectoryToolSearch size="prominent" />
            </Suspense>
          </div>
        )}

        {/* Quick facets + the Filters drawer trigger (the full tag list lives in the drawer) */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <Suspense>
            <FacetChips />
          </Suspense>
          <div className="flex shrink-0 items-center gap-2">
            <Suspense>
              <DirectorySort />
            </Suspense>
            <ToolFiltersPanel groups={groups} publicTags={publicTags} totalCount={totalCount} />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-lg border border-foreground/8 bg-foreground/[0.03]"
                />
              ))}
            </div>
          }
        >
          <ToolsGrid searchParams={searchParams} basePath={basePath} />
        </Suspense>
      </div>
    </div>
  )
}
