import { describe, expect, it } from "vitest"
import { searchGlossaryTerms } from "./glossary"

describe("searchGlossaryTerms", () => {
  it("puts the exact term before substring hits in definitions", async () => {
    const results = await searchGlossaryTerms("tor")
    expect(results[0]?.term.toLowerCase()).toBe("tor")
  })
})
