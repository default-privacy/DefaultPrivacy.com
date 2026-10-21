import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { BASELINE, SITUATIONS } from "./situations"

const file = (kind: "guide" | "stack", slug: string) =>
  join(process.cwd(), "src/content", kind === "guide" ? "guides" : "stacks", `${slug}.md`)

describe("situations", () => {
  it("every item points at an existing guide or stack", () => {
    const missing = [...BASELINE, ...SITUATIONS.flatMap((s) => s.items)].filter((i) => !existsSync(file(i.kind, i.slug)))
    expect(missing).toEqual([])
  })

  it("has unique ids and at least one item per situation", () => {
    expect(new Set(SITUATIONS.map((s) => s.id)).size).toBe(SITUATIONS.length)
    for (const s of SITUATIONS) {
      expect(s.items.length, s.id).toBeGreaterThan(0)
    }
  })
})
