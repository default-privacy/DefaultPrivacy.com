"use client"

/**
 * Quick exit for safety pages (stalking and abuse survivors). Leaves for a neutral
 * site with location.replace(), so pressing Back doesn't return to this page. It's a
 * plain link underneath, so it still works with JavaScript off. It can't erase browser
 * history, which is why the page itself warns that the visit can be seen.
 */
const NEUTRAL_URL = "https://www.bbc.com/weather"

export function QuickExit() {
  return (
    <a
      href={NEUTRAL_URL}
      rel="noreferrer"
      onClick={(e) => {
        e.preventDefault()
        window.location.replace(NEUTRAL_URL)
      }}
      className="brand2-focus fixed bottom-4 right-4 z-[90] rounded-md border border-primary/40 bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-lg hover:bg-foreground/[0.06]"
    >
      Leave this site quickly
    </a>
  )
}
