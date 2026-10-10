/**
 * Privacy Protocol — Jurisdiction Risk Mapping
 *
 * Maps ISO 3166-1 alpha-2 country codes to PP jurisdiction risk levels.
 * Based on surveillance alliance membership and privacy law strength.
 */

import type { JurisdictionRisk } from "./types"

// Core Five Eyes surveillance alliance
const FIVE_EYES = new Set(["US", "GB", "UK", "CA", "AU", "NZ"])

// Fourteen Eyes = Five Eyes + these additional members
const FOURTEEN_EYES_ONLY = new Set(["DE", "FR", "IT", "ES", "SE", "NO", "NL", "BE", "DK"])

// Countries with strong privacy laws and no major surveillance treaty membership
const LOW_RISK = new Set([
  "CH", // Switzerland — strong privacy, no Eyes membership
  "IS", // Iceland — GDPR + strong protections
  "PA", // Panama — no surveillance treaties
  "RO", // Romania — GDPR, some court protections
])

// Countries with reasonable privacy laws and some cooperation, but not Eyes members
const MEDIUM_RISK = new Set([
  "AT", // Austria
  "FI", // Finland
  "JP", // Japan
  "PT", // Portugal
  "CZ", // Czech Republic
  "SI", // Slovenia
  "HU", // Hungary (note: rule-of-law concerns but no surveillance treaty)
])

/**
 * Returns the PP jurisdiction risk level for a given country code.
 * Returns null if the country code is null or unknown.
 */
export function getJurisdictionRisk(countryCode: string | null | undefined): JurisdictionRisk | null {
  if (!countryCode) return null
  const code = countryCode.toUpperCase().trim()
  if (FIVE_EYES.has(code)) return "five_eyes"
  if (FOURTEEN_EYES_ONLY.has(code)) return "fourteen_eyes"
  if (LOW_RISK.has(code)) return "low"
  if (MEDIUM_RISK.has(code)) return "medium"
  // Default unknown jurisdictions to "high" — conservative stance
  return "high"
}

/** Countries by risk tier, useful for UI display and filtering. */
export const JURISDICTION_RISK_MAP = {
  five_eyes: [...FIVE_EYES],
  fourteen_eyes: [...FIVE_EYES, ...FOURTEEN_EYES_ONLY],
  low: [...LOW_RISK],
  medium: [...MEDIUM_RISK],
} as const
