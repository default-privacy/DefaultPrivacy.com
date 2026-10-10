/**
 * Read a tool's claims in one query and shape them as evidence (sources + caveats).
 * Never throws: if tool_claims is missing (code deployed before the migration) or the
 * query fails, the tool simply has no evidence.
 */
import { eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured, toolClaims, tools } from "@/lib/db"
import { buildEvidence, EMPTY_EVIDENCE, type ClaimRow, type ToolEvidence } from "./index"

export { EMPTY_EVIDENCE }

/** Evidence for several tools by slug, one query. Missing slugs map to empty evidence. */
export async function getEvidenceForSlugs(slugs: string[]): Promise<Map<string, ToolEvidence>> {
  const out = new Map<string, ToolEvidence>()
  for (const s of slugs) out.set(s, EMPTY_EVIDENCE)
  if (!isDatabaseConfigured || slugs.length === 0) return out
  try {
    const rows = await db
      .select({ tool: tools, claim: toolClaims })
      .from(toolClaims)
      .innerJoin(tools, eq(tools.id, toolClaims.toolId))
      .where(inArray(tools.slug, slugs))
    const grouped = new Map<string, { current: Record<string, unknown>; rows: ClaimRow[] }>()
    for (const { tool, claim } of rows) {
      const g = grouped.get(tool.slug) ?? { current: tool as unknown as Record<string, unknown>, rows: [] }
      g.rows.push(claim)
      grouped.set(tool.slug, g)
    }
    for (const [slug, g] of grouped) out.set(slug, buildEvidence(g.rows, g.current))
  } catch (e) {
    console.warn("getEvidenceForSlugs failed; serving without evidence:", e instanceof Error ? e.message : e)
  }
  return out
}

export async function getToolEvidence(slug: string): Promise<ToolEvidence> {
  return (await getEvidenceForSlugs([slug])).get(slug) ?? EMPTY_EVIDENCE
}
