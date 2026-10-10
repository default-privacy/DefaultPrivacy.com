import { describe, expect, it } from "vitest"
import { transformToPrivacyProtocol } from "./transform"

describe("Privacy Protocol record", () => {
  it("has none of the retired keys", () => {
    const now = new Date()
    const row = {
      slug: "x", name: "X", categories: [], websiteUrl: "https://x.example", isOpenSource: true, acceptsCrypto: true, isNoKyc: true,
      isSecurityAudited: true, auditor: "A", auditDate: now, auditUrl: "https://a.example", createdAt: now, updatedAt: now,
    } as never
    const json = JSON.stringify(transformToPrivacyProtocol(row))
    for (const k of ["accepts_crypto", "no_kyc_purchase", "is_security_audited", "security_audit", "audit_url", "audit_date", "auditor"])
      expect(json).not.toContain(k)
  })
})
