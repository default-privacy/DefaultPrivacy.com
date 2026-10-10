"use client"

/**
 * Keyboard / screen-reader skip link — visually hidden until focused (first tab stop
 * on every page). On activation it moves focus to the page's <main> landmark.
 *
 * We resolve <main> programmatically instead of anchoring to a per-page `#main-content`
 * id: the home page's <main> already carries `id="directory"` and scanner/results renders
 * two <main> elements, so a shared id would collide. Focusing the first <main> works
 * uniformly and skips the header/nav.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      onClick={(e) => {
        const main = document.querySelector("main")
        if (!main) return
        e.preventDefault()
        if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1")
        ;(main as HTMLElement).focus()
        main.scrollIntoView({ block: "start" })
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-primary/40 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Skip to main content
    </a>
  )
}
