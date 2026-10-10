/**
 * Privacy Scanner Types
 * Ported from V2 privacy-scanner.ts
 */

import type { TrackerCategory } from "./trackers"

export type TrackerInfo = {
  url: string
  domain: string
  category: TrackerCategory
  name: string
  blocked: boolean
}

export type CookieInfo = {
  name: string
  domain: string
  path: string
  httpOnly: boolean
  secure: boolean
  sameSite: string
  expires: number | null
  isThirdParty: boolean
  isTracking: boolean
}

export type HeaderInfo = {
  name: string
  value: string | null
  present: boolean
  grade: "good" | "warn" | "bad"
}

export type ThirdPartyRequest = {
  url: string
  domain: string
  type: string
  purpose: "cdn" | "analytics" | "advertising" | "social" | "api" | "unknown"
  size: number
}

export type FingerprintDetection = {
  api: string
  detected: boolean
  scriptUrl: string | null
  risk: "high" | "medium" | "low"
}

export type PrivacyScoreInput = {
  trackerScore: number
  cookieScore: number
  securityScore: number
  thirdPartyScore: number
  fingerprintScore: number
}

export type PrivacyGrade = "A" | "B" | "C" | "D" | "F"

export type PrivacyScoreResult = {
  overallScore: number
  grade: PrivacyGrade
  breakdown: PrivacyScoreInput
  summary: string
  recommendations: string[]
}

export type ScanResult = {
  success: boolean
  error?: string
  url: string
  scanDuration: number

  // True only for illustrative / mock results (Playwright disabled or errored).
  // Undefined/false on real scans. Never persisted to the audit table.
  simulated?: boolean

  // Raw findings
  trackers: TrackerInfo[]
  cookies: CookieInfo[]
  headers: HeaderInfo[]
  thirdPartyRequests: ThirdPartyRequest[]
  fingerprintDetections: FingerprintDetection[]

  // Quick flags
  hasGoogleAnalytics: boolean
  hasFacebookPixel: boolean
  hasThirdPartyCookies: boolean
  hasFingerprinting: boolean
  respectsDNT: boolean
  hasHTTPS: boolean
  hasHSTS: boolean
  hasCSP: boolean
  hasPrivacyPolicy: boolean

  // Scores
  scores: PrivacyScoreInput
}
