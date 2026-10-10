import { describe, expect, it } from "vitest"
import { sourceCodeUrl } from "./transform"

describe("sourceCodeUrl", () => {
  it("turns the stored owner/repo form into a GitHub URL", () => {
    expect(sourceCodeUrl("bitwarden/server")).toBe("https://github.com/bitwarden/server")
  })
  it("keeps full URLs and empty values as they are", () => {
    expect(sourceCodeUrl("https://codeberg.org/x/y")).toBe("https://codeberg.org/x/y")
    expect(sourceCodeUrl(null)).toBeNull()
    expect(sourceCodeUrl("")).toBeNull()
  })
})
