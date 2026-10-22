import { describe, expect, it } from "vitest"
import { fileNumber } from "./reading-file-number"

describe("fileNumber", () => {
  const items = [
    { slug: "newest", publishedAt: "2026-10-01" },
    { slug: "oldest", publishedAt: "2025-01-01" },
    { slug: "middle-b", publishedAt: "2026-03-01" },
    { slug: "middle-a", publishedAt: "2026-03-01" },
  ]

  it("numbers by publish date, oldest first, with slug as the tie-break", () => {
    expect(fileNumber("G", items, "oldest")).toBe("G-001")
    expect(fileNumber("G", items, "middle-a")).toBe("G-002")
    expect(fileNumber("G", items, "middle-b")).toBe("G-003")
    expect(fileNumber("G", items, "newest")).toBe("G-004")
  })

  it("does not depend on the list's incoming order", () => {
    expect(fileNumber("G", [...items].reverse(), "newest")).toBe("G-004")
  })

  it("falls back to slug order when nothing is dated", () => {
    const terms = [{ slug: "vpn" }, { slug: "aliasing" }, { slug: "metadata" }]
    expect(fileNumber("T", terms, "aliasing")).toBe("T-001")
    expect(fileNumber("T", terms, "vpn")).toBe("T-003")
  })

  it("never throws for an unknown slug", () => {
    expect(fileNumber("G", items, "missing")).toBe("G-000")
  })
})
