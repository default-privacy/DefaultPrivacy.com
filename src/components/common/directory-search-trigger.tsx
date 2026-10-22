"use client"

import { SearchIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { useSearch } from "@/contexts/search-context"
import { cn } from "@/lib/utils"

type DirectorySearchTriggerProps = ComponentProps<"button"> & {
  showShortcut?: boolean
}

export function DirectorySearchTrigger({
  className,
  showShortcut = true,
  ...props
}: DirectorySearchTriggerProps) {
  const { open } = useSearch()

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1.5 text-muted-foreground brand2-focus transition-colors hover:bg-foreground/[0.06] hover:text-foreground-soft",
        className,
      )}
      aria-label="Search directory (⌘K)"
      {...props}
    >
      <SearchIcon className="h-4 w-4 shrink-0" aria-hidden />
      {showShortcut && (
        <span className="hidden text-[11px] font-medium tracking-tight sm:inline">
          Search
          <kbd className="ml-1.5 rounded border border-foreground/12 bg-foreground/[0.04] px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </span>
      )}
    </button>
  )
}
