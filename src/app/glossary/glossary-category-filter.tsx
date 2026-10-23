"use client"

import { useState } from "react"

/**
 * Category chips that narrow the A–Z list below. The list stays server-rendered;
 * a picked category only adds a style rule hiding entries (and empty letters) that
 * don't match, so no term data is sent to the browser for this.
 */
export function GlossaryCategoryFilter({ categories }: { categories: { name: string; count: number }[] }) {
  const [picked, setPicked] = useState<string | null>(null)
  const sel = picked && JSON.stringify(picked)
  const chip =
    "brand2-focus inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"

  return (
    <div className="flex flex-wrap gap-2">
      {sel && (
        <style>{`[data-glossary-cat]:not([data-glossary-cat=${sel}]),[data-glossary-letter]:not(:has([data-glossary-cat=${sel}])){display:none}`}</style>
      )}
      {categories.map(({ name, count }) => {
        const on = picked === name
        return (
          <button
            key={name}
            type="button"
            aria-pressed={on}
            onClick={() => setPicked(on ? null : name)}
            className={`${chip} ${
              on
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/10 text-foreground/65 hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            {name}
            <span className={on ? "text-background/60" : "text-foreground/40"}>{count}</span>
          </button>
        )
      })}
      {picked && (
        <button
          type="button"
          onClick={() => setPicked(null)}
          className="brand2-focus rounded-sm px-2 py-1 text-xs text-foreground/50 underline underline-offset-2 hover:text-foreground"
        >
          Show all
        </button>
      )}
    </div>
  )
}
