"use client"

import { useEffect, useState } from "react"
import type { ReadingHeading } from "@/lib/reading-html"

/**
 * The sticky "On this page" list (the locked C2 reading layout). The only client
 * piece on a reading page: it marks the h2 the reader is in.
 */
export function OnThisPage({ headings }: { headings: ReadingHeading[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return
    // A heading becomes current when it enters the band just under the header.
    // Scrolling past it keeps it current until the next one arrives.
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (entering[0]) setActive(entering[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  return (
    <nav aria-label="On this page" className="reading-toc">
      <p className="reading-toc-label">On this page</p>
      <ol>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
