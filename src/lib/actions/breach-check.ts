"use server"

/**
 * Domain breach check — server action wrapper.
 * Core logic: @/lib/breaches/hibp (also used by MCP).
 */

import {
  checkBreaches as checkBreachesImpl,
  type BreachCheckResult,
  type BreachInfo,
} from "@/lib/breaches/hibp"
import { checkToolActionRateLimit } from "@/lib/api-rate-limit"
import { countUsage } from "@/lib/analytics/usage"

export type { BreachCheckResult, BreachInfo }

export async function checkBreaches(domain: string): Promise<BreachCheckResult> {
  // No-PII demand telemetry: bounded 'breach-check' key, never the domain.
  countUsage("free_tool", "breach-check")
  const rl = await checkToolActionRateLimit("breach-check")
  if (!rl.allowed) {
    return { success: false, domain, breaches: [], totalExposed: 0 }
  }
  return checkBreachesImpl(domain)
}
