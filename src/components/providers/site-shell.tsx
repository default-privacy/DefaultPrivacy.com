"use client"

import type { PropsWithChildren } from "react"
import { CookieConsent } from "@/components/common/cookie-consent"
import { SearchProvider } from "@/contexts/search-context"

/** Global client shell: directory search (⌘K) + cookie notice. */
export function SiteShell({ children }: PropsWithChildren) {
  return (
    <SearchProvider>
      {children}
      <CookieConsent />
    </SearchProvider>
  )
}
