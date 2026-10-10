import { sql } from "drizzle-orm"
import { tools } from "@/lib/db/schema"
import { rankedPickSlugs, picksForCategory } from "@/lib/picks"

/**
 * SQL rank for "picks first, then A to Z": 0..n-1 for picks in DP's order within the
 * viewed category (all 0 when no category or one without picks), n for everything else.
 * Callers add name and id after it, which makes the order total so offset paging is stable.
 */
export function picksRankSql(category: string | undefined | null) {
  const slugs = rankedPickSlugs(category)
  const ranked = picksForCategory(category).length > 0
  const whens = slugs.map((s, i) => sql`when ${s} then ${sql.raw(String(ranked ? i : 0))}`)
  return sql`case ${tools.slug} ${sql.join(whens, sql` `)} else ${sql.raw(String(slugs.length))} end`
}
