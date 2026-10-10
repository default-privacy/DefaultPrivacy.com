import { describe, expect, it } from "vitest"
import { isRefusedByServer } from "./engine"

/**
 * Guard for the refusal gate in scanUrl().
 *
 * Four of the five scoring dimensions measure ABSENCE and return 100 when they find
 * nothing (pinned in scoring.emptiness.test.ts), so an error page grades BETTER than a
 * real site. This gate refuses those.
 *
 * Every number below is MEASURED against the live site with this engine's own
 * user-agent and headers — not chosen. If a case starts failing, re-measure the site
 * before changing the threshold.
 *
 * ⚠️ The request floor is deliberately INSIDE the >= 400 branch. Hoisting it out — so
 * that "few requests" alone refuses a scan — breaks exactly the privacy-respecting
 * static sites this tool exists to reward. The second test below is what catches that.
 */
describe("isRefusedByServer", () => {
  it("refuses a refusal status with a starved load", () => {
    expect(isRefusedByServer(401, 8)).toBe(true) // reuters.com
    expect(isRefusedByServer(401, 10)).toBe(true) // wsj.com
    expect(isRefusedByServer(403, 19)).toBe(true) // bloomberg, "Are you a robot?"
    expect(isRefusedByServer(403, 1)).toBe(true) // codeberg.org, "Access denied"
    expect(isRefusedByServer(502, 1)).toBe(true) // sr.ht, down
    expect(isRefusedByServer(429, 1)).toBe(true) // gnu.org, rate-limited
  })

  it("NEVER refuses a genuinely clean site — these all answered 200", () => {
    // The load-bearing test. A minimal static site is a correct grade, not a failure.
    expect(isRefusedByServer(200, 1)).toBe(false) // example.com
    expect(isRefusedByServer(200, 4)).toBe(false) // suckless.org, openbsd.org
    expect(isRefusedByServer(200, 7)).toBe(false) // nginx.org, wikipedia.org
    expect(isRefusedByServer(200, 8)).toBe(false) // sqlite.org
    expect(isRefusedByServer(200, 14)).toBe(false) // curl.se
    expect(isRefusedByServer(200, 15)).toBe(false) // kernel.org
    expect(isRefusedByServer(200, 43)).toBe(false) // spiegel.de, 2MB page, 2 third-party
  })

  it("grades a page that renders fully behind a refusal status", () => {
    // stackoverflow.com answers 403 to this UA and still serves its whole feed.
    // Status alone would have wrongly refused it.
    expect(isRefusedByServer(403, 85)).toBe(false)
    expect(isRefusedByServer(403, 143)).toBe(false)
  })
})
