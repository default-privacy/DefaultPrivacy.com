import type { ReactNode } from "react"
import type { ReadingHeading } from "@/lib/reading-html"
import { OnThisPage } from "./on-this-page"

/** A page needs this many h2s before it gets a contents list. */
const TOC_MIN_HEADINGS = 3

/**
 * The C2 reading grid: a 660px measure with a sticky contents list on the right
 * from 1100px, and a collapsed list above the article below that.
 */
export function ReadingLayout({
  headings,
  header,
  children,
}: {
  headings: ReadingHeading[]
  header: ReactNode
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
    </div>
  )
}
