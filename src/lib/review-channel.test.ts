import { describe, expect, it } from "vitest"
import { reviewChannel } from "./review-channel"

describe("reviewChannel", () => {
  it("counts listed tags and folds everything else into other", () => {
    expect(reviewChannel("hn")).toBe("hn")
    expect(reviewChannel("reddit")).toBe("reddit")
    expect(reviewChannel("someone@example.com")).toBe("other")
    expect(reviewChannel(undefined)).toBe("other")
    expect(reviewChannel(["hn"])).toBe("other")
  })
})
