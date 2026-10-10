import { describe, expect, it } from "vitest"
import { calculateFullPrivacyScore } from "./scoring"

/**
 * Guard for the refusal gate in engine.ts.
 *
 * Four of the five scoring dimensions measure ABSENCE and return 100 when they find
 * nothing. So a page that was never really observed — blocked, half-loaded, no
 * navigation response — scores as well as a genuinely clean one. The scanner would
 * fail TOWARD flattery, which is the wrong direction for a privacy tool.
 *
 * scanUrl() therefore refuses to grade a page it did not observe. This test pins the
 * hazard that makes that gate necessary. If it ever fails, the scoring model changed
 * and the gate should be re-read before anyone assumes it is still needed.
 */
describe("the emptiness hazard", () => {
  const empty = {
    trackers: [],
    cookies: [],
    headers: [],
    thirdPartyRequests: [],
    fingerprintDetections: [],
  }

  it("scores a zero-finding scan as a PASS, not a failure", () => {
    const r = calculateFullPrivacyScore(empty)
    expect(r.overallScore).toBeGreaterThanOrEqual(70)
    expect(r.grade).not.toBe("F")
  })

  it("gives a perfect score to all four absence-based dimensions", () => {
    const r = calculateFullPrivacyScore(empty)
    expect(r.breakdown.trackerScore).toBe(100)
    expect(r.breakdown.cookieScore).toBe(100)
    expect(r.breakdown.thirdPartyScore).toBe(100)
    expect(r.breakdown.fingerprintScore).toBe(100)
    // Only the security dimension correctly punishes an empty observation.
    expect(r.breakdown.securityScore).toBe(0)
  })
})
