import { describe, expect, it } from "vitest"
import { PgDialect } from "drizzle-orm/pg-core"
import { REPLACEMENT_LISTS } from "./consumer-replacements"
import {
  PICKS,
  allPickSlugs,
  isPick,
  pickInfo,
  picksForCategory,
  rankedPickSlugs,
  sortByPicks,
} from "./picks"
import { picksRankSql } from "./picks-order"

const headCategories = new Set(REPLACEMENT_LISTS.map((r) => r.category))

describe("PICKS data", () => {
  it("has 1 to 3 picks per category", () => {
    for (const [cat, list] of Object.entries(PICKS)) {
      expect(list.length, cat).toBeGreaterThanOrEqual(1)
      expect(list.length, cat).toBeLessThanOrEqual(3)
    }
  })

  it("has no duplicate slug within a category", () => {
    for (const [cat, list] of Object.entries(PICKS)) {
      const slugs = list.map((p) => p.slug)
      expect(new Set(slugs).size, cat).toBe(slugs.length)
    }
  })

  it("only names the 16 head categories", () => {
    expect(headCategories.size).toBe(16)
    for (const cat of Object.keys(PICKS)) expect(headCategories.has(cat), cat).toBe(true)
  })

  it("has a plain reason with no URLs for every pick", () => {
    for (const list of Object.values(PICKS))
      for (const p of list) {
        expect(p.reason.trim().length, p.slug).toBeGreaterThan(0)
        expect(p.reason, p.slug).not.toMatch(/https?:|www\.|\.com\b|\.org\b/i)
      }
  })

  it("keeps Proton to three picks overall and leaves out the owner's cuts", () => {
    const proton = new Set(["proton", "proton-drive", "protonpass", "lumo", "proton-vpn"])
    expect(allPickSlugs().filter((s) => proton.has(s))).toHaveLength(3)
    expect(allPickSlugs()).not.toContain("standard-notes")
    expect(allPickSlugs()).not.toContain("filen")
  })

  it("does not claim an audit for cryptomator", () => {
    expect(PICKS["encrypted-cloud-storage"].find((p) => p.slug === "cryptomator")!.reason).not.toMatch(/audit/i)
  })
})

describe("helpers", () => {
  it("picksForCategory accepts a slug or a display name", () => {
    expect(picksForCategory("password-managers").map((p) => p.slug)).toEqual(["bitwarden", "keepass-xc", "protonpass"])
    expect(picksForCategory("Password Managers")).toEqual(picksForCategory("password-managers"))
    expect(picksForCategory("VoIP & Calls").map((p) => p.slug)).toEqual(["signal", "jitsi", "jami"])
    expect(picksForCategory("vpn")).toEqual([])
    expect(picksForCategory(undefined)).toEqual([])
  })

  it("pickInfo gives the first category and the reason", () => {
    expect(pickInfo("signal")?.category).toBe("encrypted-messaging")
    expect(pickInfo("signal")?.position).toBe(1)
    expect(pickInfo("some-vpn")).toBeNull()
    expect(isPick("tuta")).toBe(true)
  })
})

describe("ordering: picks first, then A to Z", () => {
  const tool = (slug: string, name = slug) => ({ slug, name })

  it("puts password manager picks first, in DP's order, then A to Z", () => {
    const items = ["zoho-vault", "protonpass", "1password", "bitwarden", "keepass-xc", "dashlane"].map((s) => tool(s))
    expect(sortByPicks(items, "password-managers").map((t) => t.slug)).toEqual([
      "bitwarden",
      "keepass-xc",
      "protonpass",
      "1password",
      "dashlane",
      "zoho-vault",
    ])
  })

  it("puts browser picks first and ignores picks from other categories", () => {
    const items = ["vivaldi", "mullvad-browser", "bitwarden", "firefox", "brave-browser", "arc"].map((s) => tool(s))
    expect(sortByPicks(items, "browsers").map((t) => t.slug)).toEqual([
      "firefox",
      "brave-browser",
      "mullvad-browser",
      "arc",
      "bitwarden",
      "vivaldi",
    ])
  })

  it("with no category, any-category picks come first by name, then A to Z", () => {
    const items = [tool("zzz", "Zed"), tool("signal", "Signal"), tool("aaa", "Alpha"), tool("bitwarden", "Bitwarden")]
    expect(sortByPicks(items, undefined).map((t) => t.slug)).toEqual(["bitwarden", "signal", "aaa", "zzz"])
    expect(rankedPickSlugs("a-category-with-no-picks")).toEqual(allPickSlugs())
  })

  it("can keep a curated list's own order for non-picks", () => {
    const items = [tool("z-app"), tool("a-app"), tool("tuta"), tool("proton")]
    expect(sortByPicks(items, "encrypted-email", true).map((t) => t.slug)).toEqual(["tuta", "proton", "z-app", "a-app"])
  })

  it("the SQL rank follows the same slug order", () => {
    const q = new PgDialect().sqlToQuery(picksRankSql("password-managers"))
    expect(q.params).toEqual(["bitwarden", "keepass-xc", "protonpass"])
    expect(q.sql).toMatch(/when \$1 then 0 when \$2 then 1 when \$3 then 2 else 3 end/)
    const none = new PgDialect().sqlToQuery(picksRankSql(undefined))
    expect(none.params).toEqual(allPickSlugs())
    expect(none.sql).toMatch(/then 0/)
    expect(none.sql).not.toMatch(/then 1 /)
  })
})
