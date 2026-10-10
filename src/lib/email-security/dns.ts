/**
 * Email security DNS checks (SPF, DKIM, DMARC).
 * Shared by web UI, audit pipeline, and MCP — no "use server".
 */

import { resolve, resolveTxt } from "dns/promises"

export type EmailSecurityResult = {
  success: boolean
  domain: string
  spf: {
    found: boolean
    record: string | null
    status: "pass" | "warn" | "fail"
    details: string
  }
  dkim: {
    found: boolean
    record: string | null
    status: "pass" | "warn" | "fail"
    details: string
    selector: string
  }
  dmarc: {
    found: boolean
    record: string | null
    policy: string | null
    status: "pass" | "warn" | "fail"
    details: string
  }
  grade: "A" | "B" | "C" | "D" | "F"
  error?: string
}

function extractDomain(input: string): string {
  let domain = input.trim().toLowerCase()
  domain = domain.replace(/^https?:\/\//, "")
  domain = domain.split("/")[0]
  domain = domain.split(":")[0]
  domain = domain.replace(/^www\./, "")
  return domain
}

async function lookupTxt(hostname: string): Promise<string[]> {
  try {
    const records = await resolveTxt(hostname)
    return records.map((r) => r.join(""))
  } catch {
    return []
  }
}

function checkSpf(records: string[]): EmailSecurityResult["spf"] {
  const spfRecord = records.find((r) => r.startsWith("v=spf1"))

  if (!spfRecord) {
    return {
      found: false,
      record: null,
      status: "fail",
      details:
        "No SPF record found. Anyone can send email pretending to be your domain.",
    }
  }

  if (spfRecord.includes("+all")) {
    return {
      found: true,
      record: spfRecord,
      status: "fail",
      details:
        "SPF record uses +all which allows anyone to send as your domain. This is effectively no protection.",
    }
  }

  if (spfRecord.includes("?all")) {
    return {
      found: true,
      record: spfRecord,
      status: "warn",
      details:
        "SPF record uses ?all (neutral). This doesn't actively reject unauthorized senders.",
    }
  }

  if (spfRecord.includes("~all")) {
    return {
      found: true,
      record: spfRecord,
      status: "warn",
      details:
        "SPF record uses ~all (softfail). Unauthorized emails are marked but not rejected. Consider using -all for strict enforcement.",
    }
  }

  if (spfRecord.includes("-all")) {
    return {
      found: true,
      record: spfRecord,
      status: "pass",
      details: "SPF record uses -all (hardfail). Unauthorized senders are rejected.",
    }
  }

  return {
    found: true,
    record: spfRecord,
    status: "warn",
    details: "SPF record found but could not determine enforcement level.",
  }
}

function checkDkim(
  records: string[],
  selector: string
): EmailSecurityResult["dkim"] {
  const dkimRecord = records.find(
    (r) => r.includes("v=DKIM1") || r.includes("k=rsa") || r.includes("p=")
  )

  if (!dkimRecord) {
    return {
      found: false,
      record: null,
      status: "warn",
      selector,
      details: `No DKIM record found at ${selector}._domainkey. DKIM may use a different selector, or may not be configured.`,
    }
  }

  if (dkimRecord.includes("p=") && !dkimRecord.includes("p=;")) {
    return {
      found: true,
      record: dkimRecord,
      status: "pass",
      selector,
      details:
        "DKIM record found with a public key. Emails from this domain can be cryptographically verified.",
    }
  }

  return {
    found: true,
    record: dkimRecord,
    status: "warn",
    selector,
    details: "DKIM record found but the public key may be revoked or empty.",
  }
}

function checkDmarc(records: string[]): EmailSecurityResult["dmarc"] {
  const dmarcRecord = records.find((r) => r.startsWith("v=DMARC1"))

  if (!dmarcRecord) {
    return {
      found: false,
      record: null,
      policy: null,
      status: "fail",
      details:
        "No DMARC record found. There are no instructions for receiving servers on how to handle failed SPF/DKIM checks.",
    }
  }

  const policyMatch = dmarcRecord.match(/p=(\w+)/)
  const policy = policyMatch ? policyMatch[1] : null

  if (policy === "reject") {
    return {
      found: true,
      record: dmarcRecord,
      policy,
      status: "pass",
      details:
        "DMARC policy is set to reject. Emails that fail authentication are rejected.",
    }
  }

  if (policy === "quarantine") {
    return {
      found: true,
      record: dmarcRecord,
      policy,
      status: "warn",
      details:
        "DMARC policy is set to quarantine. Failed emails go to spam. Consider upgrading to reject.",
    }
  }

  if (policy === "none") {
    return {
      found: true,
      record: dmarcRecord,
      policy,
      status: "warn",
      details:
        "DMARC policy is set to none (monitoring only). Failed emails are still delivered. This is a good start but doesn't protect recipients.",
    }
  }

  return {
    found: true,
    record: dmarcRecord,
    policy,
    status: "warn",
    details: "DMARC record found but policy could not be determined.",
  }
}

function calculateGrade(
  spf: EmailSecurityResult["spf"],
  dkim: EmailSecurityResult["dkim"],
  dmarc: EmailSecurityResult["dmarc"]
): EmailSecurityResult["grade"] {
  const statuses = [spf.status, dkim.status, dmarc.status]
  const failCount = statuses.filter((s) => s === "fail").length
  const passCount = statuses.filter((s) => s === "pass").length

  if (passCount === 3) return "A"
  if (passCount === 2 && failCount === 0) return "B"
  if (failCount === 0) return "C"
  if (failCount === 1) return "D"
  return "F"
}

export async function checkEmailSecurity(input: string): Promise<EmailSecurityResult> {
  const domain = extractDomain(input)

  if (!domain || !domain.includes(".")) {
    return {
      success: false,
      domain: input,
      grade: "F",
      error: "Please enter a valid domain name.",
      spf: { found: false, record: null, status: "fail", details: "" },
      dkim: { found: false, record: null, status: "fail", details: "", selector: "" },
      dmarc: { found: false, record: null, policy: null, status: "fail", details: "" },
    }
  }

  try {
    try {
      await resolve(domain)
    } catch {
      return {
        success: false,
        domain,
        grade: "F",
        error: `Could not resolve domain: ${domain}`,
        spf: { found: false, record: null, status: "fail", details: "" },
        dkim: { found: false, record: null, status: "fail", details: "", selector: "" },
        dmarc: { found: false, record: null, policy: null, status: "fail", details: "" },
      }
    }

    const commonDkimSelectors = [
      "default",
      "google",
      "selector1",
      "selector2",
      "k1",
      "mail",
      "dkim",
    ]
    const [txtRecords, dmarcRecords, ...dkimResults] = await Promise.all([
      lookupTxt(domain),
      lookupTxt(`_dmarc.${domain}`),
      ...commonDkimSelectors.map((sel) => lookupTxt(`${sel}._domainkey.${domain}`)),
    ])

    let dkimRecords: string[] = []
    let dkimSelector = "default"
    for (let i = 0; i < commonDkimSelectors.length; i++) {
      if (dkimResults[i].length > 0) {
        dkimRecords = dkimResults[i]
        dkimSelector = commonDkimSelectors[i]
        break
      }
    }

    const spf = checkSpf(txtRecords)
    const dkim = checkDkim(dkimRecords, dkimSelector)
    const dmarc = checkDmarc(dmarcRecords)
    const grade = calculateGrade(spf, dkim, dmarc)

    return { success: true, domain, spf, dkim, dmarc, grade }
  } catch (error) {
    return {
      success: false,
      domain,
      grade: "F",
      error: error instanceof Error ? error.message : "Unknown error",
      spf: { found: false, record: null, status: "fail", details: "" },
      dkim: { found: false, record: null, status: "fail", details: "", selector: "" },
      dmarc: { found: false, record: null, policy: null, status: "fail", details: "" },
    }
  }
}
