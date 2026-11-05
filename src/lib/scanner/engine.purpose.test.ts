import { describe, expect, it } from "vitest"
import { determinePurpose } from "./engine"

/**
 * A known tracker must never score as a free CDN request just because its host
 * contains "cdn" or "cloudfront". The CDN check used to run first, so LiveRamp,
 * Segment and RB2B (which names individual visitors) all scored as harmless.
 */
describe("determinePurpose", () => {
  it("scores a known tracker on a CDN-looking host as a tracker", () => {
    expect(determinePurpose("https://ddwl4m2hdecbv.cloudfront.net/b/KEY/KEY.js.gz", "")).toBe("advertising") // RB2B
    expect(determinePurpose("https://idsync.rlcdn.com/1000.gif", "")).toBe("advertising") // LiveRamp
    expect(determinePurpose("https://cdn.segment.com/analytics.js/v1/x/analytics.min.js", "")).toBe("analytics")
  })

  it("still treats a plain CDN as a CDN", () => {
    expect(determinePurpose("https://cdn.jsdelivr.net/npm/x@1/dist/x.min.js", "")).toBe("cdn")
    expect(determinePurpose("https://d1234abcd.cloudfront.net/app.js", "")).toBe("cdn")
  })
})

describe("EasyPrivacy fallback", () => {
  const page = "https://example.com/"
  it("flags a listed tracker the named lists miss", () => {
    expect(determinePurpose("https://cdn.matomo.cloud/x.matomo.cloud/matomo.js", "", page, "script")).toBe("tracking") // "cdn" host
    expect(determinePurpose("https://munchkin.marketo.net/munchkin.js", "", page, "script")).toBe("tracking")
    expect(determinePurpose("https://js.hs-analytics.net/analytics/1/x.js", "", page, "script")).toBe("tracking") // HubSpot
    expect(determinePurpose("https://cdn.mouseflow.com/projects/x.js", "", page, "script")).toBe("analytics") // named list wins
  })
  it("passes a plain CDN and skips the list when no page url is given", () => {
    expect(determinePurpose("https://cdn.jsdelivr.net/npm/x@1/dist/x.min.js", "", page)).toBe("cdn")
    expect(determinePurpose("https://munchkin.marketo.net/munchkin.js", "")).toBe("unknown")
  })
})
