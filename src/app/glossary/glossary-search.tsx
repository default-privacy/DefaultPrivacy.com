"use client"

import { Input } from "@/components/ui/input"
import type { GlossaryTerm } from "@/lib/glossary"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"

type Props = {
  terms: GlossaryTerm[]
}

export function GlossarySearch({ terms }: Props) {
  const [query, setQuery] = useState("")

  const filteredTerms = useMemo(() => {
    if (!query.trim()) return []

    // Normalize "what is X" queries for better discoverability
    let searchQuery = query.trim().toLowerCase()
    const whatIsMatch = searchQuery.match(/^what\s+is\s+(.+)$/)
    if (whatIsMatch) searchQuery = whatIsMatch[1].trim()

    const lowerQuery = searchQuery
    return terms
      .filter((t) => {
        if (t.term.toLowerCase().includes(lowerQuery)) return true
        if (t.definition.toLowerCase().includes(lowerQuery)) return true
        if (t.aliases?.some((a) => a.toLowerCase().includes(lowerQuery))) return true
        if (t.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))) return true
        return false
      })
      .slice(0, 8)
  }, [query, terms])

  return (
    <div className="relative max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search terms (e.g. what is VPN)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="brand2-focus absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {filteredTerms.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-20 rounded-xl border border-foreground/10 bg-background shadow-lg brand2-material-menu overflow-hidden">
          <div className="p-2">
            <div className="space-y-0.5">
              {filteredTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  onClick={() => setQuery("")}
                  className="brand2-focus flex items-start justify-between gap-2 rounded-lg px-3 py-2 hover:bg-foreground/[0.06] transition-colors"
                >
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-foreground">{term.term}</span>
                    <span className="block text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {term.definition}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono text-muted-foreground border border-foreground/10 rounded-full px-2 py-0.5 mt-0.5">
                    {term.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No results */}
      {query.trim() && filteredTerms.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-20 rounded-xl border border-foreground/10 bg-background shadow-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            No terms found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
