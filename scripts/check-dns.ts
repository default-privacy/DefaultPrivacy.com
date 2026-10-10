#!/usr/bin/env bun
/**
 * dns:check — opt-in verifier for the DNS TXT discovery records.
 *
 * NOT in the standard `check:*` guard suite. DNS propagation is operational,
 * not drift — a CI guard that resolved these on every push would be flaky
 * during provider changes and would block unrelated work. Run on demand:
 *
 *   npm run dns:check
 *
 * Resolves each record in src/lib/dns-records.ts via the local resolver,
 * normalizes whitespace, and asserts the published value matches the
 * literal. Reports unpublished records as informational (not failures) so
 * the script doubles as a publish-readiness check before pushing records.
 *
 * Exit codes:
 *   0 — every record matches OR every mismatched record is "unpublished".
 *   1 — at least one record is published with a value that disagrees with
 *       the literal (genuine drift between source-of-truth and DNS).
 */

import { resolveTxt } from "node:dns/promises"

import { DP_DNS_TXT_RECORDS } from "../src/lib/dns-records"

type Status = "match" | "unpublished" | "drift"

type Result = {
  fqdn: string
  status: Status
  expected: string
  found?: string
  note?: string
}

function normalizeTxt(chunks: string[]): string {
  // resolveTxt returns string[][] where each inner array is one record split
  // by 255-char chunks. Re-join the chunks for each record before comparing.
  return chunks.join("").replace(/\s+/g, " ").trim()
}

async function checkOne(fqdn: string, expected: string): Promise<Result> {
  try {
    const records = await resolveTxt(fqdn)
    const normalized = records.map(normalizeTxt)
    const expectedNormalized = expected.replace(/\s+/g, " ").trim()
    const exact = normalized.find((r) => r === expectedNormalized)
    if (exact) {
      return { fqdn, status: "match", expected }
    }
    return {
      fqdn,
      status: "drift",
      expected,
      found: normalized.join(" | "),
      note: "published value disagrees with the source-of-truth literal",
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code ?? "UNKNOWN"
    if (code === "ENOTFOUND" || code === "ENODATA") {
      return {
        fqdn,
        status: "unpublished",
        expected,
        note: `not published yet (resolver returned ${code})`,
      }
    }
    return {
      fqdn,
      status: "drift",
      expected,
      note: `resolver error ${code}`,
    }
  }
}

async function main(): Promise<number> {
  console.log(
    `dns:check — verifying ${DP_DNS_TXT_RECORDS.length} TXT record(s) against src/lib/dns-records.ts\n`,
  )

  const results = await Promise.all(
    DP_DNS_TXT_RECORDS.map((r) => checkOne(r.fqdn, r.value)),
  )

  let hasDrift = false
  for (const r of results) {
    const tag =
      r.status === "match" ? "OK   " : r.status === "unpublished" ? "NEW  " : "DRIFT"
    console.log(`  ${tag}  ${r.fqdn}`)
    if (r.status === "match") {
      console.log(`         "${r.expected}"`)
    } else if (r.status === "unpublished") {
      console.log(`         expected: "${r.expected}"`)
      console.log(`         ${r.note}`)
    } else {
      hasDrift = true
      console.log(`         expected: "${r.expected}"`)
      console.log(`         found:    ${r.found ?? "(none)"}`)
      if (r.note) console.log(`         note:     ${r.note}`)
    }
    console.log()
  }

  const matched = results.filter((r) => r.status === "match").length
  const unpublished = results.filter((r) => r.status === "unpublished").length
  const drifted = results.filter((r) => r.status === "drift").length

  console.log(
    `Summary: ${matched} match, ${unpublished} not published yet, ${drifted} drift.`,
  )

  if (hasDrift) {
    console.error(
      "\nFix: update the TXT record at the DNS provider to match src/lib/dns-records.ts, " +
        "or update src/lib/dns-records.ts if the DNS value is the new source of truth.",
    )
    return 1
  }

  if (unpublished > 0) {
    console.log(
      "\nTo publish: see docs/Default Privacy/MCP/DNS_RECORDS.md for provider-specific instructions.",
    )
  }

  return 0
}

process.exit(await main())
