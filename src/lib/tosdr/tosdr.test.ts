import { describe, expect, it } from "vitest"
import snapshot from "@/data/tosdr-snapshot.json"
import { termsReview, TOSDR_ATTRIBUTION, TOSDR_SERVICES, tosdrServiceForName, tosdrServiceForSlug } from "."

describe("the hand-checked ToS;DR map", () => {
  it("every service has a snapshot entry under the same name", () => {
    for (const s of TOSDR_SERVICES) {
      const snap = (snapshot.services as Record<string, { name: string }>)[String(s.id)]
      expect(snap, s.name).toBeTruthy()
      expect(snap.name).toBe(s.name)
    }
  })

  it("no name or slug points at two services", () => {
    const names = TOSDR_SERVICES.flatMap((s) => s.names)
    expect(new Set(names).size).toBe(names.length)
    const slugs = TOSDR_SERVICES.flatMap((s) => s.dpSlugs ?? [])
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("matches exact names only, never lookalikes", () => {
    expect(tosdrServiceForName("Gmail")?.name).toBe("Google")
    expect(tosdrServiceForName("  zoom ")?.name).toBe("Zoom Video Communications")
    expect(tosdrServiceForName("Windows")?.name).toBe("Microsoft Services")
    expect(tosdrServiceForName("Proton Mail")?.name).toBe("Proton AG")
    expect(tosdrServiceForName("ZoomInfo")).toBeNull()
    expect(tosdrServiceForName("mint")).toBeNull()
    expect(tosdrServiceForSlug("protonpass")?.name).toBe("Proton AG")
    expect(tosdrServiceForSlug("no-such-tool")).toBeNull()
  })
})

describe("termsReview", () => {
  it("credits ToS;DR and its licence, with at most 8 points", () => {
    const r = termsReview(tosdrServiceForName("notion")!)!
    expect(r.by).toBe("ToS;DR")
    expect(r.attribution).toBe(TOSDR_ATTRIBUTION)
    expect(r.attribution).toMatch(/ToS;DR.*CC BY-SA 3\.0/)
    expect(r.points.length).toBeGreaterThan(0)
    expect(r.points.length).toBeLessThanOrEqual(8)
    expect(r.url).toBe("https://tosdr.org/en/service/1817")
  })

  it("flags a review whose newest point is over 18 months older than the copy", () => {
    for (const s of TOSDR_SERVICES) {
      const r = termsReview(s)!
      const cutoff = new Date(snapshot.copied_on)
      cutoff.setMonth(cutoff.getMonth() - 18)
      expect(r.stale, s.name).toBe(!r.newest_point || new Date(r.newest_point) < cutoff)
    }
    // Zoom's newest point is from July 2023 in the first copy.
    expect(termsReview(tosdrServiceForName("zoom")!)!.newest_point! < "2024-01-01").toBe(true)
    expect(termsReview(tosdrServiceForName("zoom")!)!.stale).toBe(true)
  })

  it("lists no finding twice and no title with stray spaces", () => {
    for (const s of TOSDR_SERVICES) {
      const titles = termsReview(s)!.points.map((p) => p.title)
      expect(new Set(titles.map((t) => t.toLowerCase())).size, s.name).toBe(titles.length)
      for (const t of titles) expect(t, s.name).toBe(t.replace(/\s+/g, " ").trim())
    }
  })

  it("puts concerns before good points", () => {
    for (const s of TOSDR_SERVICES) {
      const classes = termsReview(s)!.points.map((p) => p.class)
      const firstGood = classes.indexOf("good")
      if (firstGood >= 0) expect(classes.slice(firstGood).every((c) => c === "good"), s.name).toBe(true)
    }
  })
})
