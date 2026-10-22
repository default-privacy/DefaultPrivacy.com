import type { ReactNode } from "react"
import type { ReadingHeading } from "@/lib/reading-html"
import { OnThisPage } from "./on-this-page"

/** A page needs this many h2s before it gets a contents list. */
const TOC_MIN_HEADINGS = 3

/**
 * The composed reading grid: a 680px measure, a sticky contents list on the left from
 * 1100px (a collapsed list above the article below that), and side material on the
 * right from 1280px.
 */
export function ReadingLayout({
  headings,
  header,
  side,
  children,
}: {
  headings: ReadingHeading[]
  header: ReactNode
  /** Side material (tools in a stack, related terms): a right column on wide screens, after the article below that. */
  side?: ReactNode
  children: ReactNode
}) {
  const toc = headings.length >= TOC_MIN_HEADINGS ? headings : []
  return (
    <div className="reading-layout">
      <article className="reading-article">
        {header}
        {toc.length > 0 && (
          <details className="reading-toc-inline">
            <summary>On this page</summary>
            <ol>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </details>
        )}
        {children}
      </article>
      {toc.length > 0 && (
        <aside className="reading-aside">
          <OnThisPage headings={toc} />
        </aside>
      )}
      {side && <aside className="reading-side">{side}</aside>}
    </div>
  )
}
