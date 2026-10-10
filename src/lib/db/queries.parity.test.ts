/**
 * Parity / characterization tests for the directory list ↔ count read path.
 *
 * getTools and getToolsCount MUST always agree: the total shown in the UI has to equal
 * the number of rows the listing returns for the SAME filters. They share one filter
 * builder, and this test pins that invariant across the whole filter matrix — including
 * the empty-result short-circuit branches (publicOnly / category / tag) — so a future
 * change to either path can't silently desync list vs. count on prod.
 *
 * DB-backed: runs against whatever Postgres `DATABASE_URL` points at (local Docker in
 * dev). It SKIPS cleanly when no reachable DB is configured (the default unit run / CI),
 * so `bun run test` stays green without a database. To actually exercise it:
 *   DATABASE_URL=postgres://dp:...@127.0.0.1:5432/defaultprivacy bun run test
 */
import { beforeAll, describe, expect, it } from "vitest"
import { sql } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { getToolsUncached, getToolsCountUncached, type ToolFilters } from "@/lib/db/queries"
import { categories, tags } from "@/lib/db/schema"

async function dbReachable(): Promise<boolean> {
  if (!isDatabaseConfigured) return false
  try {
    await db.execute(sql`select 1`)
    return true
  } catch {
    return false
  }
}

const reachable = await dbReachable()

/** Count for `filters` must equal the length of the full listing for the same filters. */
async function parity(filters: ToolFilters): Promise<number> {
  const list = await getToolsUncached({ ...filters, limit: 100_000, offset: 0 })
  const count = await getToolsCountUncached(filters)
  expect(count).toBe(list.length)
  return count
}

describe.skipIf(!reachable)("directory list ↔ count parity", () => {
  let sampleCategory: string | undefined
  let sampleTag: string | undefined

  beforeAll(async () => {
    sampleCategory = (await db.select({ slug: categories.slug }).from(categories).limit(1))[0]?.slug
    sampleTag = (await db.select({ slug: tags.slug }).from(tags).limit(1))[0]?.slug
  })

  it("baseline — no filters (DB is seeded)", async () => {
    expect(await parity({})).toBeGreaterThan(0)
  })

  it("status filter", async () => { await parity({ status: "Published" }) })
  it("search filter (match)", async () => { await parity({ search: "vpn" }) })
  it("publicOnly filter", async () => { await parity({ publicOnly: true }) })
  it("trust-column facet (openSource)", async () => { await parity({ openSource: true }) })
  it("combined facets", async () => { await parity({ publicOnly: true, openSource: true, e2ee: true }) })

  it("category filter (real slug)", async () => {
    if (!sampleCategory) return
    await parity({ category: sampleCategory })
  })
  it("category + facet + search", async () => {
    if (!sampleCategory) return
    await parity({ category: sampleCategory, openSource: true, search: "a" })
  })
  it("tag filter (real slug)", async () => {
    if (!sampleTag) return
    await parity({ tagSlugs: [sampleTag] })
  })

  // Empty-result short-circuits: BOTH functions must collapse to 0 / [] identically.
  it("empty — no-match search", async () => {
    expect(await parity({ search: "zzzq-no-such-tool-xyz" })).toBe(0)
  })
  it("empty — nonexistent category", async () => {
    expect(await parity({ category: "nonexistent-category-zzz" })).toBe(0)
  })
  it("empty — nonexistent tag", async () => {
    expect(await parity({ tagSlugs: ["nonexistent-tag-zzz"] })).toBe(0)
  })
})
