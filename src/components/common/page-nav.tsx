"use client"

import { useEffect, useState } from "react"

export type PageNavItem = { id: string; label: string }

/**
 * Sticky "On this page" list for a long page: the section in view is marked.
 * The page passes its section ids; the component owns only the active state.
 */
export function PageNav({ items, back }: { items: PageNavItem[]; back?: { href: string; label: string } }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (entering[0]) setActive(entering[0].target.id)
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/45">On this page</p>
      <ol className="border-l border-foreground/10">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-3.5 transition-colors brand2-focus rounded-r-sm ${
                active === i.id
                  ? "border-foreground font-semibold text-foreground"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ol>
      {back && (
        <a href={back.href} className="mt-5 block text-[13px] text-foreground/50 hover:text-foreground brand2-focus rounded-sm">
          ← {back.label}
        </a>
      )}
    </nav>
  )
}
