"use client"

import type { PropsWithChildren } from "react"
import { SearchProvider } from "@/contexts/search-context"

/** Global client shell: directory search (⌘K). No cookie notice: the site sets no cookies. */
export function SiteShell({ children }: PropsWithChildren) {
  return <SearchProvider>{children}</SearchProvider>
}
