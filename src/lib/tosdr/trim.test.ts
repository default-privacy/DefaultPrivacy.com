import { describe, expect, it } from "vitest"
import { clipQuote, MAX_POINTS, MAX_QUOTE, trimService, type RawPoint } from "./trim"

let nextId = 1
const point = (title: string, cls: string, updated: string, weight = 50): RawPoint => ({
  id: nextId++, title, source: "https://vendor.test/privacy", status: "approved", document_id: 210, updated_at: `${updated}T00:00:00Z`,
  case: { classification: cls, weight },
})
const raw = (points: RawPoint[]) => ({
  id: 1, name: " Example ", rating: "D", is_comprehensively_reviewed: true,
  documents: [{ id: 209, name: "Terms", url: "https://vendor.test/terms" }, { id: 210, name: "Privacy Policy", url: "https://vendor.test/privacy" }], points,
})

describe("trimService", () => {
  it("merges a finding filed once per document, keeping the newest", () => {
    const r = trimService(raw([
      point("Consent is assumed from usage.", "bad", "2025-02-18"),
      point(" Consent is assumed  from usage. ", "bad", "2026-07-29"),
      point("Two-factor login", "good", "2020-11-25"),
    ]))
    expect(r.points.map((p) => p.title)).toEqual(["Consent is assumed from usage.", "Two-factor login"])
    expect(r.points[0].updated).toBe("2026-07-29")
    expect(r.counts).toEqual({ blocker: 0, bad: 1, neutral: 0, good: 1 })
  })

  it("trims stray spaces from titles and the service name", () => {
    const r = trimService(raw([point("  Pseudonyms are allowed ", "good", "2025-09-10")]))
    expect(r.points[0].title).toBe("Pseudonyms are allowed")
    expect(r.name).toBe("Example")
  })

  it("puts blockers, then bad, then good; at most five concerns and eight points", () => {
    const pts = [
      ...Array.from({ length: 7 }, (_, i) => point(`bad ${i}`, "bad", "2026-01-01")),
      point("worst", "blocker", "2026-01-01"),
      ...Array.from({ length: 6 }, (_, i) => point(`good ${i}`, "good", "2026-01-01")),
      point("meh", "neutral", "2026-01-01"),
    ]
    const r = trimService(raw(pts))
    expect(r.points.length).toBe(MAX_POINTS)
    expect(r.points[0].title).toBe("worst")
    expect(r.points.filter((p) => p.class !== "good").length).toBe(5)
    expect(r.points.some((p) => p.class === "neutral")).toBe(false)
  })

  it("drops points that are not approved", () => {
    const pending = { ...point("pending", "bad", "2026-01-01"), status: "pending" }
    expect(trimService(raw([pending])).points).toEqual([])
  })

  it("falls back to the point's own document when ToS;DR gives no source", () => {
    const withSource = (source: string | null) => trimService(raw([{ ...point("x", "bad", "2026-01-01"), source }])).points[0].source
    expect(withSource("")).toBe("https://vendor.test/privacy")
    expect(withSource(null)).toBe("https://vendor.test/privacy")
    expect(withSource("https://vendor.test/terms#3")).toBe("https://vendor.test/terms#3")
  })
})

describe("clipQuote", () => {
  it("cleans spaces, drops empties, cuts long quotes at a word", () => {
    expect(clipQuote("")).toBeNull()
    expect(clipQuote(null)).toBeNull()
    expect(clipQuote("  a  b ")).toBe("a b")
    expect(clipQuote('<p>See <a href="https://x.test">our&nbsp;policy</a> &amp; terms.</p>')).toBe("See our policy & terms.")
    expect(clipQuote("p>Starts mid-tag and ends mid-tag.</")).toBe("Starts mid-tag and ends mid-tag.")
    expect(clipQuote("| Your contacts | To auto-complete. |")).toBe("Your contacts To auto-complete.")
    const q = clipQuote("word ".repeat(100))!
    expect(q.length).toBeLessThanOrEqual(MAX_QUOTE + 1)
    expect(q.endsWith("word…")).toBe(true)
  })
})
