import { describe, expect, it } from "vitest"
import {
  buildEvidence,
  caveatText,
  checkInvariants,
  convertDraftRow,
  convertResearchFile,
  numberSources,
  sourceProblem,
  valuesEqual,
} from "./index"

const research = {
  slug: "x",
  checked: "2026-10-09",
  claims: [
    { attribute: "acceptsCrypto", value: true, sources: ["https://a.example/pay"], quote: "We accept Bitcoin.", note: "faq" },
    { attribute: "isNoKyc", value: null, sources: [], quote: "", note: "not stated" },
    { attribute: "isOpenSource", value: true, sources: [], quote: "" },
    { attribute: "isSecurityAudited", value: true, sources: ["ftp://a.example/audit"], quote: "" },
    { attribute: "bogus", value: true, sources: ["https://a.example"] },
  ],
  caveats: [
    { text: "Not available in Iceland.", sources: ["https://a.example/faq"], quote: "cannot offer" },
    { text: "No source here.", sources: [] },
  ],
}

describe("convertResearchFile", () => {
  const r = convertResearchFile(research)
  it("keeps valid claims with a Source says note, never a Quote prefix", () => {
    const c = r.claims.find((x) => x.attribute === "acceptsCrypto")!
    expect(c.note).toBe("Source says: We accept Bitcoin. | faq")
    expect(c.note).not.toMatch(/Quote:/)
  })
  it("reports null values as unchecked and writes no row", () => {
    expect(r.unchecked.map((u) => u.attribute)).toEqual(["isNoKyc"])
    expect(r.claims.some((c) => c.attribute === "isNoKyc")).toBe(false)
  })
  it("refuses zero sources, non-http sources and unknown attributes", () => {
    expect(r.refused.map((x) => x.what).sort()).toEqual(["bogus", "caveat 2", "isOpenSource", "isSecurityAudited"])
  })
  it("numbers caveats from 1 and appends the source text", () => {
    const cv = r.claims.filter((c) => c.attribute === "caveat")
    expect(cv).toHaveLength(1)
    expect(cv[0].sortOrder).toBe(1)
    expect(cv[0].note).toBe("Not available in Iceland. | Source says: cannot offer")
    expect(caveatText(cv[0].note!)).toBe("Not available in Iceland.")
  })
  it("refuses a file without slug or date", () => {
    expect(convertResearchFile({ claims: [] }).refused.length).toBeGreaterThan(0)
  })
})

describe("convertDraftRow", () => {
  const row = {
    slug: "d",
    lastVerified: "2026-10-09T00:00:00.000Z",
    description: "Desc",
    jurisdiction: "CH",
    jurisdictionRisk: "low",
    isNoKyc: true,
    isSecurityAudited: true,
    auditor: "Securitum",
    auditUrl: "https://a.example/report.pdf",
    auditDate: "2022-09-06",
    githubUrl: null,
    sources: {
      description: ["https://a.example"],
      jurisdiction: ["https://a.example/legal"],
      jurisdictionRisk: ["derived: getJurisdictionRisk('CH')"],
      isNoKyc: ["https://a.example/signup"],
      isSecurityAudited: ["https://a.example/audit"],
      auditor: ["https://a.example/audit"],
      githubUrl: ["https://github.com/a/b"],
    },
    caveats: [{ text: "Careful.", sources: ["https://a.example/c"] }],
  }
  const r = convertDraftRow(row)
  it("skips derived jurisdictionRisk and folds audit fields into isSecurityAudited", () => {
    expect(r.claims.map((c) => c.attribute).sort()).toEqual(["caveat", "description", "isNoKyc", "isSecurityAudited", "jurisdiction"])
    expect(r.claims.find((c) => c.attribute === "isSecurityAudited")!.audit).toEqual({
      auditor: "Securitum",
      auditUrl: "https://a.example/report.pdf",
      auditDate: "2022-09-06",
    })
    expect(r.refused).toEqual([])
  })
  it("reports a sourced attribute with no value as unchecked", () => {
    expect(r.unchecked.map((u) => u.attribute)).toEqual(["githubUrl"])
  })
  it("takes the checked date from lastVerified", () => {
    expect(r.claims[0].checked).toBe("2026-10-09")
  })
})

describe("sourceProblem / valuesEqual", () => {
  it("accepts http(s) only", () => {
    expect(sourceProblem(["https://a.example", "http://b.example"])).toBeNull()
    expect(sourceProblem([])).toBe("no source")
    expect(sourceProblem(["javascript:alert(1)"])).toMatch(/non-http/)
    expect(sourceProblem(["derived: something"])).toMatch(/non-http/)
  })
  it("compares platforms as sets and null with null", () => {
    expect(valuesEqual("platforms", ["ios", "web"], ["web", "ios"])).toBe(true)
    expect(valuesEqual("isNoKyc", true, false)).toBe(false)
    expect(valuesEqual("isNoKyc", true, null)).toBe(false)
    expect(valuesEqual("isNoKyc", null, undefined)).toBe(true)
  })
})

describe("buildEvidence", () => {
  const rows = [
    { attribute: "jurisdiction", sortOrder: 0, value: true, note: null, sourceUrls: ["https://a.example/s"], checkedOn: "2026-10-09" },
    { attribute: "isOpenSource", sortOrder: 0, value: true, note: "Source says: x", sourceUrls: ["https://a.example/p"], checkedOn: "2026-10-09" },
    { attribute: "caveat", sortOrder: 2, value: null, note: "Second. | Source says: y", sourceUrls: ["https://a.example/p"], checkedOn: "2026-10-09" },
    { attribute: "caveat", sortOrder: 1, value: null, note: "First.", sourceUrls: ["https://a.example/c"], checkedOn: "2026-10-09" },
  ]
  it("maps attributes to record paths and orders caveats", () => {
    const e = buildEvidence(rows)
    expect(Object.keys(e.sources).sort()).toEqual(["privacy.jurisdiction", "trust.is_open_source"])
    expect(e.caveats.map((c) => c.text)).toEqual(["First.", "Second."])
  })
  it("drops a claim whose value no longer matches the column", () => {
    const e = buildEvidence(rows, { jurisdiction: false, isOpenSource: true })
    expect(Object.keys(e.sources)).toEqual(["trust.is_open_source"])
  })
  it("numbers distinct urls once, rows before caveats", () => {
    const n = numberSources(buildEvidence(rows))
    expect(n.urls).toEqual(["https://a.example/s", "https://a.example/p", "https://a.example/c"])
    expect(n.index("https://a.example/p")).toBe(2)
  })
  it("never returns sources for the retired attributes", () => {
    const retired = ["isNoKyc", "acceptsCrypto", "isSecurityAudited"].map((attribute) => ({
      attribute, sortOrder: 0, value: true, note: null, sourceUrls: ["https://a.example/r"], checkedOn: "2026-10-09",
    }))
    expect(buildEvidence(retired).sources).toEqual({})
  })
})

describe("checkInvariants", () => {
  const tools = [
    { id: "1", slug: "a", isNoKyc: true, acceptsCrypto: null, isSecurityAudited: false },
    { id: "2", slug: "b", isNoKyc: true, acceptsCrypto: true, isSecurityAudited: null },
  ]
  it("reports unsourced gated values and disagreements", () => {
    const r = checkInvariants(tools, [
      { toolId: "1", attribute: "isNoKyc", value: true, sourceUrls: ["https://a.example"] },
      { toolId: "2", attribute: "isNoKyc", value: false, sourceUrls: ["https://a.example"] },
    ])
    expect(r.unsourcedGated.map((x) => `${x.slug}.${x.attribute}`).sort()).toEqual(["a.isSecurityAudited", "b.acceptsCrypto", "b.isNoKyc"])
    expect(r.disagreements).toEqual([{ slug: "b", attribute: "isNoKyc", claim: false, column: true }])
    expect(r.badSources).toEqual([])
  })
  it("reports non-http sources", () => {
    const r = checkInvariants(tools, [{ toolId: "1", attribute: "caveat", value: null, sourceUrls: ["file:///etc/passwd"] }])
    expect(r.badSources).toHaveLength(1)
  })
})
