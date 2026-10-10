"use server"

/**
 * Email Security Checker — server action wrapper.
 * Core logic: @/lib/email-security/dns (also used by MCP).
 */

import {
  checkEmailSecurity as checkEmailSecurityImpl,
  type EmailSecurityResult,
} from "@/lib/email-security/dns"
import { checkToolActionRateLimit } from "@/lib/api-rate-limit"
import { countUsage } from "@/lib/analytics/usage"

export type { EmailSecurityResult }

export async function checkEmailSecurity(input: string): Promise<EmailSecurityResult> {
  // No-PII demand telemetry: bounded 'email-security' key, never the domain.
  countUsage("free_tool", "email-security")
  const rl = await checkToolActionRateLimit("email-security")
  if (!rl.allowed) {
    return {
      success: false,
      domain: input,
      spf: { found: false, record: null, status: "fail", details: "" },
      dkim: { found: false, record: null, status: "fail", details: "", selector: "" },
      dmarc: { found: false, record: null, policy: null, status: "fail", details: "" },
      grade: "F",
      error: `Rate limit exceeded. Try again in ${rl.retryAfterSeconds ?? 60}s.`,
    }
  }
  return checkEmailSecurityImpl(input)
}
