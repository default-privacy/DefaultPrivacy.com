import { cn } from "@/lib/utils"

/**
 * Centralized content width system for Default Privacy.
 *
 * Usage:
 *   <ContentWidth size="lg">...</ContentWidth>
 *   <div className={contentWidthClass("md")}>...</div>
 *
 * Width scale (inside a .container which is max-w-7xl / 1280px):
 *   - xs: max-w-xl   (576px)  — Single focused element, receipt/confirmation
 *   - sm: max-w-2xl  (672px)  — Account pages, forms, narrow flows
 *   - md: max-w-3xl  (768px)  — Text-heavy sections, FAQs, audience pages
 *   - lg: max-w-4xl  (896px)  — 2-column grids, comparison tables, secondary CTAs
 *   - xl: max-w-5xl  (1024px) — 3-column grids, pricing cards, homepage sections
 *   - full: no max-w (1280px) — Hero cards, full-width CTAs (fills container)
 */

export type ContentWidthSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const widthClasses: Record<ContentWidthSize, string> = {
  xs: "max-w-xl",
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  full: "",
}

/**
 * Returns the Tailwind class for a content width size.
 * Use when you need just the class string.
 */
export function contentWidthClass(size: ContentWidthSize): string {
  return widthClasses[size]
}

type ContentWidthProps = {
  size: ContentWidthSize
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article" | "main"
}

/**
 * Wrapper component that applies consistent content width + centering.
 * Automatically adds mx-auto for centering.
 */
export function ContentWidth({
  size,
  children,
  className,
  as: Component = "div",
}: ContentWidthProps) {
  return (
    <Component
      className={cn(
        widthClasses[size],
        size !== "full" && "mx-auto",
        className
      )}
    >
      {children}
    </Component>
  )
}

/**
 * Quick reference for which size to use:
 *
 * | Content Type              | Size | Example                        |
 * |---------------------------|------|--------------------------------|
 * | Hero cards (full-bleed)   | full | Homepage hero, landing heroes  |
 * | 3-column card grids       | xl   | Who We Help, pricing cards     |
 * | 2-column card grids       | lg   | Free Tools, comparison tables  |
 * | Text-heavy content        | md   | FAQs, audience page sections   |
 * | Forms, account flows      | sm   | /account, intake forms         |
 * | Single-focus detail       | xs   | Receipt / confirmation page    |
 */
