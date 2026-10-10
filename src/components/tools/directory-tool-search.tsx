"use client"

import { useTransition } from "react"
import { parseAsInteger, parseAsString, throttle, useQueryStates } from "nuqs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

type DirectoryToolSearchProps = {
  className?: string
  /** Larger field for main column (desktop) */
  size?: "default" | "prominent"
  placeholder?: string
}

/** Same keys as `ToolFilters` — keep one URL write per edit. */
const directorySearchParsers = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
}

/**
 * URL-synced directory search. Do not disable the input during transitions — that drops focus.
 * `throttle(300)` limits RSC refetches while typing; nuqs still updates state immediately.
 */
export function DirectoryToolSearch({
  className,
  size = "default",
  placeholder = "Search by name or keyword…",
}: DirectoryToolSearchProps) {
  const [, startTransition] = useTransition()
  const [{ search }, setParams] = useQueryStates(directorySearchParsers, {
    shallow: false,
    startTransition,
    limitUrlUpdates: throttle(300),
  })

  const prominent = size === "prominent"

  return (
    <div className={cn(className)}>
      <label className="sr-only" htmlFor="directory-tool-search">
        Search tools
      </label>
      <div className="relative">
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-foreground/40",
            prominent ? "left-4 h-[18px] w-[18px]" : "left-3 h-3.5 w-3.5",
          )}
        />
        <Input
          id="directory-tool-search"
          placeholder={placeholder}
          className={cn(
            "brand2-input",
            prominent
              ? "h-14 rounded-xl pl-12 text-[15px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              : "h-10 pl-9 text-[13px] shadow-none",
          )}
          value={search}
          onChange={(e) => {
            const v = e.target.value
            void setParams({
              search: v.length ? v : null,
              page: 1,
            })
          }}
        />
      </div>
    </div>
  )
}
