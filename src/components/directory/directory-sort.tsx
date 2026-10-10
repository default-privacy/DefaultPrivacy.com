"use client"

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { useTransition } from "react"
import { cn } from "@/lib/utils"

const sortParsers = {
  sort: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
}

/** Default ("") is DP picks first, then A to Z; see parseFacetFilters in directory-browser. */
const OPTIONS = [
  { value: "", label: "DP picks first" },
  { value: "name", label: "Name A–Z" },
  { value: "newest", label: "Newest" },
] as const

export function DirectorySort({ className }: { className?: string }) {
  const [, startTransition] = useTransition()
  const [{ sort }, setParams] = useQueryStates(sortParsers, {
    shallow: false,
    startTransition,
  })

  return (
    <label className={cn("flex items-center gap-1.5 text-[12px] text-foreground/50", className)}>
      <span className="hidden sm:inline">Sort</span>
      <select
        value={sort ?? ""}
        onChange={(e) => void setParams({ sort: e.target.value, page: 1 })}
        aria-label="Sort tools"
        className="rounded-full border border-foreground/10 bg-background px-3 py-1.5 text-[12px] font-medium text-foreground/70 brand2-focus transition-colors hover:border-foreground/25"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
