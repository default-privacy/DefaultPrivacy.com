/**
 * Source-of-truth literals for the DNS TXT discovery records DP publishes
 * at its DNS provider for `defaultprivacy.com`.
 *
 * Why DNS-based discovery: a TXT record at a well-known subdomain is the
 * cheapest possible pointer at an MCP / agent-readiness surface. A crawler
 * that doesn't know `/.well-known/agentroot.json` exists can still find it
 * by resolving `_agentroot.defaultprivacy.com` once.
 *
 * Status: opportunistic adoption. The IETF I-D for DNS-based MCP discovery
 * (`draft-serra-mcp-discovery-uri`) is individual, no working group, and
 * expires 2026-09-25 unless renewed. The format below mirrors the SPF /
 * DKIM / DMARC convention (semicolon-separated key=value, leading `v=`
 * version tag) so it stays readable to humans and parseable by trivial
 * tooling regardless of how the I-D evolves.
 *
 * These literals are the canonical record values. `scripts/check-dns.ts`
 * resolves the records via the local resolver and asserts the published
 * value matches the literal — opt-in (not part of the standard `check:*`
 * suite) because DNS propagation is operational, not drift, and a guard
 * that ran in CI would be flaky during provider changes.
 *
 * To publish or update: edit this file, then update the corresponding TXT
 * records at the DNS provider for `defaultprivacy.com`. Verification:
 *   bun scripts/check-dns.ts
 */

export const DP_APEX_DOMAIN = "defaultprivacy.com" as const

export type DnsTxtRecord = {
  /** Subdomain under the apex; the leading `_` mirrors SRV/SPF/DKIM convention. */
  host: string
  /** Full hostname for `dig` etc. */
  fqdn: string
  /** The TXT record value, exactly as published. */
  value: string
  /** Short description for the docs + check script output. */
  description: string
}

const agentroot = `https://${DP_APEX_DOMAIN}/.well-known/agentroot.json`
const mcpServer = `https://${DP_APEX_DOMAIN}/.well-known/mcp-server.json`

export const DP_DNS_TXT_RECORDS: ReadonlyArray<DnsTxtRecord> = [
  {
    host: "_agentroot",
    fqdn: `_agentroot.${DP_APEX_DOMAIN}`,
    value: `v=agentroot1; url=${agentroot}`,
    description: "Points crawlers at the canonical agentroot.json discovery manifest.",
  },
  {
    host: "_mcp",
    fqdn: `_mcp.${DP_APEX_DOMAIN}`,
    value: `v=mcp1; url=${mcpServer}`,
    description: "Points agents at the MCP server descriptor (mcp-server.json).",
  },
  {
    // NOT a discovery record — this one is load-bearing AUTH. It is the public half
    // of the keypair that proves ownership of the `com.defaultprivacy` MCP registry
    // namespace; the private half is kept offline. Delete this record and you
    // permanently lose the ability to change that namespace's registry entries.
    host: "@",
    fqdn: DP_APEX_DOMAIN,
    value:
      "v=MCPv1; k=ed25519; p=k+WijtP6Ucz2H9tO7vb0sblZNhgXXNQLBNdJUNnnBfA=",
    description:
      "MCP registry namespace ownership proof for com.defaultprivacy (used by `mcp-publisher login dns`).",
  },
] as const
