/**
 * Scan Regression Comparator
 *
 * Pure, dependency-free logic that diffs two scans of the same target over time and
 * reports what changed for the worse (regressions) and for the better (improvements).
 * This is the core primitive behind a future "Monitor" feature — it needs no browser,
 * no database, and no cron, so it can be built and proven in isolation.
 *
 * Design constraints (deliberate):
 *  - INFORMATIONAL, never accusatory. Change labels describe what was observed on the
 *    site ("New tracker observed: x") — they are not claims about a third party's intent.
 *  - Severity caps at "warning". No "critical"/red for third-party findings; red is
 *    reserved for true alarms, which a tracker appearing on someone's site is not.
 *  - REFUSES to compare across a simulated<->real boundary or mismatched scan versions,
 *    so a mock result can never manufacture a false "everything changed" diff.
 */

import type { PrivacyGrade, PrivacyScoreResult, ScanResult } from "./types"

/** A normalized, comparable snapshot derived from a single scan. */
export type ScanFingerprint = {
  grade: PrivacyGrade
  overallScore: number
  trackerDomains: string[]
  thirdPartyDomains: string[]
  presentSecurityHeaders: string[]
  fingerprintApis: string[]
  hasGoogleAnalytics: boolean
  hasFacebookPixel: boolean
  hasThirdPartyCookies: boolean
  hasFingerprinting: boolean
  hasHSTS: boolean
  hasCSP: boolean
  hasPrivacyPolicy: boolean
}

/** A scan plus its computed score — mirrors what the scanner action returns/persists. */
export type ScanSnapshot = {
  result: ScanResult
  score: PrivacyScoreResult
}

export type ScanChange = {
  kind: string
  label: string
  detail?: string
  direction: "regression" | "improvement"
  severity: "info" | "warning"
}

export type ScanDiff =
  | { comparable: false; reason: string }
  | {
      comparable: true
      changes: ScanChange[]
      regressions: ScanChange[]
      improvements: ScanChange[]
      gradeChange: { from: PrivacyGrade; to: PrivacyGrade; delta: number } | null
      scoreDelta: number
      hasRegression: boolean
    }

const GRADE_ORDER: Record<PrivacyGrade, number> = { A: 5, B: 4, C: 3, D: 2, F: 1 }

const sortedUnique = (values: string[]): string[] => [...new Set(values.map(v => v.toLowerCase()))].sort()

/** Derive a normalized, order-independent fingerprint from a scan snapshot. */
export function deriveFingerprint({ result, score }: ScanSnapshot): ScanFingerprint {
  return {
    grade: score.grade,
    overallScore: score.overallScore,
    trackerDomains: sortedUnique(result.trackers.map(t => t.domain)),
    thirdPartyDomains: sortedUnique(result.thirdPartyRequests.map(r => r.domain)),
    presentSecurityHeaders: sortedUnique(result.headers.filter(h => h.present).map(h => h.name)),
    fingerprintApis: sortedUnique(result.fingerprintDetections.filter(f => f.detected).map(f => f.api)),
    hasGoogleAnalytics: result.hasGoogleAnalytics,
    hasFacebookPixel: result.hasFacebookPixel,
    hasThirdPartyCookies: result.hasThirdPartyCookies,
    hasFingerprinting: result.hasFingerprinting,
    hasHSTS: result.hasHSTS,
    hasCSP: result.hasCSP,
    hasPrivacyPolicy: result.hasPrivacyPolicy,
  }
}

const added = (prev: string[], next: string[]): string[] => next.filter(v => !prev.includes(v))

/**
 * Diff two snapshots of the same target. `prev` is the earlier scan, `current` the newer.
 * Returns { comparable: false } when the two cannot be meaningfully compared.
 */
export function diffSnapshots(prev: ScanSnapshot, current: ScanSnapshot): ScanDiff {
  if (prev.result.simulated || current.result.simulated) {
    return { comparable: false, reason: "one or both scans are simulated (mock) results" }
  }
  if (!prev.result.success || !current.result.success) {
    return { comparable: false, reason: "one or both scans did not complete successfully" }
  }

  const a = deriveFingerprint(prev)
  const b = deriveFingerprint(current)
  const changes: ScanChange[] = []

  // Trackers — the headline signal.
  for (const domain of added(a.trackerDomains, b.trackerDomains)) {
    changes.push({
      kind: "tracker-added",
      label: `New tracker observed: ${domain}`,
      direction: "regression",
      severity: "warning",
    })
  }
  for (const domain of added(b.trackerDomains, a.trackerDomains)) {
    changes.push({
      kind: "tracker-removed",
      label: `Tracker no longer observed: ${domain}`,
      direction: "improvement",
      severity: "info",
    })
  }

  // Named-tracker flags (call these out explicitly — they are what people share).
  if (!a.hasGoogleAnalytics && b.hasGoogleAnalytics) {
    changes.push({ kind: "google-analytics-added", label: "Google Analytics now loading", direction: "regression", severity: "warning" })
  }
  if (a.hasGoogleAnalytics && !b.hasGoogleAnalytics) {
    changes.push({ kind: "google-analytics-removed", label: "Google Analytics no longer loading", direction: "improvement", severity: "info" })
  }
  if (!a.hasFacebookPixel && b.hasFacebookPixel) {
    changes.push({ kind: "meta-pixel-added", label: "Meta Pixel now loading", direction: "regression", severity: "warning" })
  }
  if (a.hasFacebookPixel && !b.hasFacebookPixel) {
    changes.push({ kind: "meta-pixel-removed", label: "Meta Pixel no longer loading", direction: "improvement", severity: "info" })
  }

  // Security headers — losing one is a regression.
  for (const header of added(b.presentSecurityHeaders, a.presentSecurityHeaders)) {
    changes.push({
      kind: "security-header-lost",
      label: `Security header lost: ${header}`,
      direction: "regression",
      severity: "warning",
    })
  }
  for (const header of added(a.presentSecurityHeaders, b.presentSecurityHeaders)) {
    changes.push({
      kind: "security-header-gained",
      label: `Security header added: ${header}`,
      direction: "improvement",
      severity: "info",
    })
  }

  // Fingerprinting turning on.
  if (!a.hasFingerprinting && b.hasFingerprinting) {
    changes.push({ kind: "fingerprinting-added", label: "Fingerprinting now detected", direction: "regression", severity: "warning" })
  }
  if (a.hasFingerprinting && !b.hasFingerprinting) {
    changes.push({ kind: "fingerprinting-removed", label: "Fingerprinting no longer detected", direction: "improvement", severity: "info" })
  }

  // Third-party cookies.
  if (!a.hasThirdPartyCookies && b.hasThirdPartyCookies) {
    changes.push({ kind: "third-party-cookies-added", label: "Third-party cookies now set", direction: "regression", severity: "info" })
  }
  if (a.hasThirdPartyCookies && !b.hasThirdPartyCookies) {
    changes.push({ kind: "third-party-cookies-removed", label: "Third-party cookies no longer set", direction: "improvement", severity: "info" })
  }

  // Overall grade / score movement.
  const delta = GRADE_ORDER[b.grade] - GRADE_ORDER[a.grade]
  const gradeChange = a.grade !== b.grade ? { from: a.grade, to: b.grade, delta } : null
  if (gradeChange && delta < 0) {
    changes.push({
      kind: "grade-dropped",
      label: `Privacy grade dropped ${a.grade} → ${b.grade}`,
      direction: "regression",
      severity: "warning",
    })
  } else if (gradeChange && delta > 0) {
    changes.push({
      kind: "grade-improved",
      label: `Privacy grade improved ${a.grade} → ${b.grade}`,
      direction: "improvement",
      severity: "info",
    })
  }

  const regressions = changes.filter(c => c.direction === "regression")
  const improvements = changes.filter(c => c.direction === "improvement")

  return {
    comparable: true,
    changes,
    regressions,
    improvements,
    gradeChange,
    scoreDelta: b.overallScore - a.overallScore,
    hasRegression: regressions.length > 0,
  }
}
