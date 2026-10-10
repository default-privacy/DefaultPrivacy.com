/**
 * Scanner verdict headline.
 *
 * Produces the one-line result headline. It leads with the TRUE dominant privacy
 * issue — the worst-scoring breakdown dimension that has real evidence — instead of
 * always the tracker count (which could blame trackers on a site whose trackers are
 * fine but whose cookies/third-parties are not).
 *
 * Honesty rules baked in:
 *  - Grade gate first: an A/B never gets an exposure headline, an F never a cheery one.
 *    Grade is derived from the same sub-scores, so this can't contradict the gauge.
 *  - Informational, never accusatory: counts and category nouns ("11 cookies"), never
 *    intent or a company name (the DETECTED ledger already names companies).
 *  - "before you clicked a thing" energy only fits on-load findings (cookies, third
 *    parties, trackers); missing security headers get static phrasing.
 *  - Numbers come from the same arrays the stat grid renders, so nothing can disagree.
 */

import type { PrivacyScoreResult, ScanResult } from "./types"

export type Verdict = { headline: string; emphasis: string; pre: string; post: string }

const s = (n: number) => (n === 1 ? "" : "s")
const line = (pre: string, emphasis: string, post: string): Verdict => ({ headline: pre + emphasis + post, emphasis, pre, post })

// Tie-break when two dimensions share the worst sub-score: prefer the most concrete
// on-load evidence; security last (a missing header is not a load event).
const ORDER = ["cookie", "thirdParty", "tracker", "fingerprint", "security"]

export function buildVerdict({ result, score }: { result: ScanResult; score: PrivacyScoreResult }): Verdict {
  const g = score.grade
  const b = score.breakdown

  const trackerN = result.trackers.length
  const adSocialN = result.trackers.filter(t => t.category === "advertising" || t.category === "social").length
  const thirdPartyN = result.thirdPartyRequests.length
  const cookieN = result.cookies.length
  const trkCookieN = result.cookies.filter(c => c.isTracking).length
  const tpCookieN = result.cookies.filter(c => c.isThirdParty).length
  const fp = result.hasFingerprinting
  const missHSTS = !result.hasHSTS
  const missCSP = !result.hasCSP

  // Layer 1 — grade gate: A/B stay positive and never run the ranker.
  if (g === "A" || g === "B") {
    if (trackerN === 0 && thirdPartyN <= 3 && cookieN === 0 && !fp)
      return line("Clean — ", "nothing tracked you", " on this page.")
    if (trackerN === 0)
      return line("", "No trackers", " fired before you clicked a thing.")
    return line("Mostly clean — ", `just ${trackerN} tracker${s(trackerN)}`, " loaded on this page.")
  }

  // Layer 2 — a dimension may only be "the story" if it has a countable finding.
  const evidence: Record<string, boolean> = {
    cookie: cookieN > 0,
    thirdParty: thirdPartyN > 0,
    tracker: trackerN > 0,
    fingerprint: fp,
    security: missHSTS || missCSP,
  }

  // Layer 3 — rank sub-scores worst-first; walk to the first dimension with evidence.
  const scored: [string, number][] = [
    ["tracker", b.trackerScore],
    ["cookie", b.cookieScore],
    ["security", b.securityScore],
    ["thirdParty", b.thirdPartyScore],
    ["fingerprint", b.fingerprintScore],
  ]
  scored.sort((a, z) => a[1] - z[1] || ORDER.indexOf(a[0]) - ORDER.indexOf(z[0]))
  const worst = scored.find(([dim]) => evidence[dim])?.[0]
  const soft = g === "C" // C = qualified register; D/F = full exposure

  // Layer 4 — phrase the chosen dimension with its raw count.
  switch (worst) {
    case "cookie": {
      if (trkCookieN > 0)
        return line("", `${trkCookieN} tracking cookie${s(trkCookieN)}`, soft ? " set as the page loaded." : " set before you clicked a thing.")
      if (tpCookieN > 0)
        return line("", `${tpCookieN} third-party cookie${s(tpCookieN)}`, soft ? " set as the page loaded." : " set before you clicked a thing.")
      return line("", `${cookieN} cookie${s(cookieN)}`, soft ? " set as the page loaded." : " set before you clicked a thing.")
    }
    case "thirdParty":
      return line("", `${thirdPartyN} third part${thirdPartyN === 1 ? "y" : "ies"}`, soft ? " were contacted as this page loaded." : " contacted before you clicked a thing.")
    case "tracker": {
      if (adSocialN > 0)
        return line("", `${adSocialN} ad & social tracker${s(adSocialN)}`, soft ? " loaded on this page." : " loaded before you clicked a thing.")
      return line("", `${trackerN} tracker${s(trackerN)}`, soft ? " loaded on this page." : " loaded before you clicked a thing.")
    }
    case "fingerprint":
      return line("", "Browser fingerprinting", " ran the moment this page loaded.")
    case "security": {
      const what = missHSTS && missCSP ? "No HSTS or CSP" : missHSTS ? "No HSTS" : "No Content-Security-Policy"
      return line("", what, " — this page ships without core browser-security headers.")
    }
    default:
      // Poor grade but nothing nameable (rare). Grade-generic, no fabricated number.
      return line("", "Multiple privacy gaps", " showed up on this page.")
  }
}
