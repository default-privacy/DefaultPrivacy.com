"use client"

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { useTransition } from "react"
import { cn } from "@/lib/utils"

/**
 * Quick quality facets — each backed by a populated typed trust column
 * (see buildColumnFacetConditions in queries.ts). One shared `f` (CSV) URL key.
 */
const FACETS = [
  { key: "open-source", label: "Open source" },
  { key: "e2ee", label: "E2E encrypted" },
  { key: "no-logs", label: "No logs" },
  { key: "no-five-eyes", label: "Outside Five-Eyes" },
] as const

const facetParsers = {
  f: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
}

export function FacetChips({ className }: { className?: string }) {
  const [, startTransition] = useTransition()
  const [{ f }, setParams] = useQueryStates(facetParsers, {
    shallow: false,
    startTransition,
  })

  const active = new Set(f ? f.split(",").filter(Boolean) : [])

  const toggle = (key: string) => {
    const next = new Set(active)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    void setParams({ f: Array.from(next).join(","), page: 1 })
  }

  const base =
    "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors brand2-focus"
  const off =
    "border-foreground/10 text-foreground/55 hover:border-foreground/25 hover:text-foreground/80"
  const on = "border-primary bg-primary text-primary-foreground"

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        type="button"
        onClick={() => void setParams({ f: "", page: 1 })}
        className={cn(base, active.size === 0 ? on : off)}
      >
        All
      </button>
      {FACETS.map((facet) => (
        <button
          key={facet.key}
          type="button"
          onClick={() => toggle(facet.key)}
          aria-pressed={active.has(facet.key)}
          className={cn(base, active.has(facet.key) ? on : off)}
        >
          {facet.label}
        </button>
      ))}
    </div>
  )
}
