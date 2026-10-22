"use client"

import { Input } from "@/components/ui/input"
import type { CategoryGroup, getPublicTags } from "@/lib/db/queries"
import { cn } from "@/lib/utils"
import { ChevronRight, Search, X } from "lucide-react"
import {
  parseAsInteger,
  parseAsString,
  throttle,
  useQueryStates,
} from "nuqs"
import { useEffect, useMemo, useState, useTransition } from "react"

type PublicTag = Awaited<ReturnType<typeof getPublicTags>>[number]

type ToolFiltersProps = {
  groups: CategoryGroup[]
  publicTags: PublicTag[]
  totalCount: number
  /** Hide the flat tag cloud — e.g. the desktop rail shows categories only. */
  showTags?: boolean
  /** Hide the categories block on lg+ — e.g. inside the drawer, where the rail already shows categories. */
  categoriesHiddenOnDesktop?: boolean
}

const toolsFilterParsers = {
  search: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  subCategory: parseAsString.withDefault(""),
  tags: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
}

export function ToolFilters({
  groups,
  publicTags,
  totalCount: _totalCount,
  showTags = true,
  categoriesHiddenOnDesktop = false,
}: ToolFiltersProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(toolsFilterParsers, {
    shallow: false,
    startTransition,
    limitUrlUpdates: throttle(300),
  })
  const [categorySearch, setCategorySearch] = useState("")
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const activeCategory = params.category

  // Derive active tag slugs as a Set
  const activeTagSlugs = useMemo(
    () => new Set(params.tags ? params.tags.split(",").filter(Boolean) : []),
    [params.tags]
  )

  const toggleTag = (slug: string) => {
    const next = new Set(activeTagSlugs)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    setParams({ tags: Array.from(next).join(",") || "", page: 1 })
  }

  const filteredGroups = useMemo(() => {
    if (!categorySearch.trim()) return groups

    const term = categorySearch.toLowerCase()
    return groups
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.name.toLowerCase().includes(term)),
      }))
      .filter(group => group.label.toLowerCase().includes(term) || group.items.length > 0)
  }, [categorySearch, groups])

  useEffect(() => {
    if (categorySearch.trim()) {
      queueMicrotask(() =>
        setOpenGroups(new Set(filteredGroups.map((group) => group.label)))
      )
    }
  }, [categorySearch, filteredGroups])

  useEffect(() => {
    if (!activeCategory) return
    const match = groups.find(
      (group) =>
        group.label === activeCategory ||
        group.items.some((item) => item.name === activeCategory)
    )
    if (match && !openGroups.has(match.label)) {
      queueMicrotask(() =>
        setOpenGroups((prev) => new Set(prev).add(match.label))
      )
    }
  }, [activeCategory, groups, openGroups])

  const updateFilter = (
    name: keyof typeof toolsFilterParsers,
    value: string | boolean | number
  ) => {
    const update: Partial<typeof params> = { [name]: value }
    if (name !== "page") update.page = 1
    setParams(update)
  }

  const clearFilters = () => {
    setParams({
      search: "",
      category: "",
      subCategory: "",
      tags: "",
      page: 1,
    })
  }

  const hasActiveFilters =
    params.search ||
    params.category ||
    params.subCategory ||
    params.tags

  return (
    <div className="space-y-6">
      {/* Header - simpler like Vercel Marketplace */}
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-medium text-foreground">Filter Tools</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded p-1 text-muted-foreground transition-colors brand2-focus hover:text-foreground-soft"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tool search — hidden on lg where DirectoryToolSearch sits above the grid */}
      <div className="lg:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools…"
            className="h-9 pl-9 text-[13px] brand2-input"
            value={params.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
      </div>

      {/* Tag Filters - horizontal pills */}
      {showTags && publicTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {publicTags.map((tag) => {
            const isActive = activeTagSlugs.has(tag.slug)
            return (
              <button
                key={tag.slug}
                type="button"
                onClick={() => toggleTag(tag.slug)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[12px] transition-colors brand2-focus",
                  isActive
                    ? "bg-foreground/10 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
                )}
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Categories - clean list like Vercel */}
      <div className={cn(categoriesHiddenOnDesktop && "lg:hidden")}>
        {/* Redundant with the "Filter Tools" header in the categories-only rail; keep it
            in the drawer where it separates the tag cloud from the category tree. */}
        {showTags && (
          <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
        )}

        {/* Category search */}
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter categories…"
            className="h-8 pl-8 pr-7 text-[12px] brand2-input"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            aria-label="Filter categories"
          />
          {categorySearch && (
            <button
              type="button"
              onClick={() => setCategorySearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground-soft"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="relative">
          <div className="max-h-[calc(100dvh-var(--header-height)-10rem)] space-y-0.5 overflow-y-auto pb-2 pr-3 [scrollbar-gutter:stable]">
          {filteredGroups.map((group) => {
            const isOpen = openGroups.has(group.label)
            return (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups(prev => {
                      const next = new Set(prev)
                      if (next.has(group.label)) next.delete(group.label)
                      else next.add(group.label)
                      return next
                    })
                  }
                  className="flex w-full items-center gap-1.5 py-1.5 text-[13px] text-foreground-soft transition-colors brand2-focus hover:text-foreground"
                >
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
                      isOpen && "rotate-90"
                    )}
                  />
                  <span className="flex-1 text-left">{group.label}</span>
                  <span className="text-[11px] tabular-nums text-muted-foreground">{group.total}</span>
                </button>

                {isOpen && (
                  <div className="ml-5 space-y-0.5 py-1">
                    {group.items.map((item) => {
                      const isActive =
                        params.category === group.label && params.subCategory === item.name
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            if (isActive) {
                              setParams({ category: "", subCategory: "", page: 1 })
                            } else {
                              setParams({
                                category: group.label,
                                subCategory: item.name,
                                page: 1,
                              })
                            }
                          }}
                          className={cn(
                            "flex w-full items-center justify-between py-1 text-[12px] transition-colors brand2-focus",
                            isActive
                              ? "font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="flex items-center gap-2 truncate">
                            {isActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                            )}
                            {item.name}
                          </span>
                          <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                            {item.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="border-t border-foreground/8 pt-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {params.search && (
              <span className="inline-flex items-center gap-1 rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[11px] text-foreground-soft">
                &ldquo;{params.search}&rdquo;
                <button type="button" onClick={() => updateFilter("search", "")} className="ml-0.5 rounded-sm p-0.5 hover:bg-foreground/10">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {params.subCategory && (
              <span className="inline-flex items-center gap-1 rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[11px] text-foreground-soft">
                {params.subCategory}
                <button type="button" onClick={() => setParams({ category: "", subCategory: "", page: 1 })} className="ml-0.5 rounded-sm p-0.5 hover:bg-foreground/10">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {Array.from(activeTagSlugs).map(slug => {
              const tag = publicTags.find(t => t.slug === slug)
              return (
                <span key={slug} className="inline-flex items-center gap-1 rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[11px] text-foreground-soft">
                  {tag?.name ?? slug}
                  <button type="button" onClick={() => toggleTag(slug)} className="ml-0.5 rounded-sm p-0.5 hover:bg-foreground/10">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {isPending && (
        <div className="text-[11px] text-muted-foreground">Loading...</div>
      )}
    </div>
  )
}
