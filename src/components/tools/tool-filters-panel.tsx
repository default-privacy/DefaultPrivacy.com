"use client"

import type { CategoryGroup, getPublicTags } from "@/lib/db/queries"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { ToolFilters } from "@/components/tools/tool-filters"

type PublicTag = Awaited<ReturnType<typeof getPublicTags>>[number]

type ToolFiltersPanelProps = {
  groups: CategoryGroup[]
  publicTags: PublicTag[]
  totalCount: number
}

const panelParsers = {
  search: parseAsString.withDefault(""),
  subCategory: parseAsString.withDefault(""),
  tags: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
}

export function ToolFiltersPanel({ groups, publicTags, totalCount }: ToolFiltersPanelProps) {
  const [params] = useQueryStates(panelParsers)
  const activeCount =
    (params.search ? 1 : 0) +
    (params.subCategory ? 1 : 0) +
    (params.tags ? params.tags.split(",").filter(Boolean).length : 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 brand2-focus">
          <Filter className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium tabular-nums text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96">
        <SheetHeader className="mb-4">
          <SheetTitle>Browse Tools</SheetTitle>
        </SheetHeader>
        <ToolFilters
          groups={groups}
          publicTags={publicTags}
          totalCount={totalCount}
          categoriesHiddenOnDesktop
        />
      </SheetContent>
    </Sheet>
  )
}
