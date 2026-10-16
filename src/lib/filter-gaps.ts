/**
 * The yes/no filters in directory search (open source, end-to-end encrypted, free tier) match
 * only a sourced "yes". A tool whose field Default Privacy has not checked (null) is left out,
 * so a filter on its own would silently drop DP's own picks while their fields are unsourced.
 * This names the category's picks that a filter left out only because a field is unchecked.
 */

import type { PrivacyProtocolTool } from "./privacy-protocol"
import { picksForCategory } from "./picks"

export type BoolFilters = { open_source?: boolean; e2ee?: boolean; has_free_tier?: boolean }

const FIELDS: Record<keyof BoolFilters, (t: PrivacyProtocolTool) => boolean | null> = {
  open_source: (t) => t.trust.is_open_source,
  e2ee: (t) => t.privacy.encryption.e2ee,
  has_free_tier: (t) => t.payment.has_free_tier,
}

export type PickLeftOut = { name: string; slug: string; unchecked: string[]; dp_url: string }

export async function picksLeftOutUnchecked(
  category: string | undefined,
  filters: BoolFilters,
  returnedSlugs: string[],
  getTool: (slug: string) => Promise<PrivacyProtocolTool | null>,
): Promise<PickLeftOut[]> {
  const active = (Object.keys(FIELDS) as (keyof BoolFilters)[]).filter((k) => filters[k] === true)
  if (active.length === 0) return []
  const missing = picksForCategory(category).filter((p) => !returnedSlugs.includes(p.slug))
  const out: PickLeftOut[] = []
  for (const p of missing) {
    const t = await getTool(p.slug)
    if (!t || t.deprecated) continue
    // Left out only when no active field is a checked "no" and at least one is unchecked.
    const values = active.map((k) => [k, FIELDS[k](t)] as const)
    if (values.some(([, v]) => v === false)) continue
    const unchecked = values.filter(([, v]) => v === null).map(([k]) => k)
    if (unchecked.length > 0) out.push({ name: t.name, slug: t.slug, unchecked, dp_url: t.dp_url })
  }
  return out
}
