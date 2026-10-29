import { unstable_cache } from "next/cache"
import { and, eq, isNull, sql } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { getToolsCount } from "@/lib/db/queries"

export type PublicDirectoryStats = {
  toolCount: number
  parentCategoryCount: number
  toolsLabel: string
}

const FALLBACK: PublicDirectoryStats = {
  toolCount: 800,
  parentCategoryCount: 15,
  toolsLabel: "800+",
}

/** Marketing-friendly rounded count, e.g. 779 → "770+" */
export function formatDirectoryCount(count: number): string {
  if (count <= 0) return "0"
  if (count < 10) return String(count)
  const rounded = Math.floor(count / 10) * 10
  return `${rounded}+`
}

async function fetchPublicDirectoryStats(): Promise<PublicDirectoryStats> {
  if (!isDatabaseConfigured) return FALLBACK

  try {
    const [toolCount, parentRow] = await Promise.all([
      getToolsCount({ publicOnly: true, status: "Published" }),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(categories)
        .where(and(isNull(categories.parentId), eq(categories.visibility, "public"))),
    ])

    return {
      toolCount,
      parentCategoryCount: Number(parentRow[0]?.count ?? FALLBACK.parentCategoryCount),
      toolsLabel: formatDirectoryCount(toolCount),
    }
  } catch {
    // DELIBERATE graceful degradation — do NOT rethrow here. Unlike the directory
    // list / tool pages (which surface DB errors via their error boundary, N6), this
    // is a cosmetic rounded count label rendered in the ROOT layout on every page.
    // Rethrowing would turn a DB blip into a site-wide global-error crash, taking down
    // even client-only pages (e.g. /password-check). A stale "800+" label is correct here.
    return FALLBACK
  }
}

export const getPublicDirectoryStats = unstable_cache(
  fetchPublicDirectoryStats,
  ["public-directory-stats"],
  // The root layout reads this, and a page revalidates as often as the SHORTEST cache it
  // touches, so a short value here made every page regenerate every 10 minutes (ISR writes,
  // CPU). The value is a rounded label ("870+") that moves a few times a month, and daily
  // still rebuilt every page each day, so it matches the reading pages' weekly 604800.
  { revalidate: 604800 },
)
