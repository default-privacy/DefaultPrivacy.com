"use server"

/**
 * WHOIS Privacy Check — server action wrapper.
 * Core logic: @/lib/whois/rdap (also used by MCP).
 */

import {
  checkWhoisPrivacy as checkWhoisPrivacyImpl,
  type WhoisField,
  type WhoisResult,
} from "@/lib/whois/rdap"
import { checkToolActionRateLimit } from "@/lib/api-rate-limit"
import { countUsage } from "@/lib/analytics/usage"

export type { WhoisField, WhoisResult }

export async function checkWhoisPrivacy(input: string): Promise<WhoisResult> {
  // No-PII demand telemetry: bounded 'whois' key, never the domain.
  countUsage("free_tool", "whois")
  const rl = await checkToolActionRateLimit("whois")
  if (!rl.allowed) {
    return {
      success: false,
      domain: input,
      registrar: null,
      registrationDate: null,
      expirationDate: null,
      fields: [],
      isPrivacyProtected: false,
      privacyScore: "exposed",
      error: `Rate limit exceeded. Try again in ${rl.retryAfterSeconds ?? 60}s.`,
    }
  }
  return checkWhoisPrivacyImpl(input)
}
