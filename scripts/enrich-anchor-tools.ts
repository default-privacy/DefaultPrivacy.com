#!/usr/bin/env bun
// NOTE (2026-10-09): accepts_crypto, no_kyc and security_audited are retired from display (site, API, MCP); this script may still write the columns but they must not be shown.
/**
 * Targeted, accuracy-first enrichment of well-known "anchor" privacy tools.
 *
 * Every value below is a well-established public fact about the tool (HQ
 * jurisdiction, encryption model, logging posture, free tier, no-KYC signup,
 * independent audits). Fields we are NOT confident about are OMITTED (left null)
 * — the long tail is never guessed. This sharpens the HEAD of the ADO ranking
 * where agents and the spot-check look.
 *
 * Matched by slug against published tools. Dry-run by default; --apply writes.
 *   bun run scripts/enrich-anchor-tools.ts            # dry-run
 *   bun run scripts/enrich-anchor-tools.ts --apply    # write
 *
 * jurisdictionRisk enum: low | medium | high | five_eyes | fourteen_eyes
 *   (ADO modifier: low +10, medium +5, fourteen_eyes -5, five_eyes -10)
 */
import { eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"

const APPLY = process.argv.includes("--apply")

type Fields = Partial<{
  websiteUrl: string
  jurisdiction: string
  jurisdictionRisk: "low" | "medium" | "high" | "five_eyes" | "fourteen_eyes"
  logsIp: boolean
  logsMetadata: boolean
  e2ee: boolean
  zeroKnowledge: boolean
  requiresEmail: boolean
  requiresPhone: boolean
  hasFreeTier: boolean
  acceptsCrypto: boolean
  isNoKyc: boolean
  isOpenSource: boolean
  isSecurityAudited: boolean
  auditor: string
}>

// slug -> well-established facts
const ANCHORS: Record<string, Fields> = {
  // ── Email ────────────────────────────────────────────────────────────────
  "proton": { jurisdiction: "CH", jurisdictionRisk: "low", e2ee: true, logsIp: false, requiresEmail: false, hasFreeTier: true, acceptsCrypto: true, isOpenSource: true, isSecurityAudited: true },
  "protonvpn": { jurisdiction: "CH", jurisdictionRisk: "low", logsIp: false, logsMetadata: false, requiresEmail: false, hasFreeTier: true, acceptsCrypto: true, isOpenSource: true, isSecurityAudited: true },
  "protonpass": { jurisdiction: "CH", jurisdictionRisk: "low", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "tuta": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", e2ee: true, logsIp: false, requiresEmail: false, hasFreeTier: true, isOpenSource: true },
  "mailbox-org": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", e2ee: true, logsIp: false, hasFreeTier: false },
  "startmail": { jurisdiction: "NL", jurisdictionRisk: "fourteen_eyes", e2ee: true, hasFreeTier: false },
  "fastmail": { jurisdiction: "AU", jurisdictionRisk: "five_eyes", e2ee: false, hasFreeTier: false },
  "addy": { jurisdiction: "GB", jurisdictionRisk: "five_eyes", hasFreeTier: true, isOpenSource: true },
  "firefox-private-relay": { jurisdiction: "US", jurisdictionRisk: "five_eyes", hasFreeTier: true, isOpenSource: true },

  // ── Messaging ──────────────────────────────────────────────────────────────
  "signal": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, logsIp: false, logsMetadata: false, requiresEmail: false, requiresPhone: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "session": { jurisdiction: "CH", jurisdictionRisk: "low", e2ee: true, logsIp: false, logsMetadata: false, requiresEmail: false, requiresPhone: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "simplex-chat": { e2ee: true, logsMetadata: false, requiresEmail: false, requiresPhone: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "briar": { e2ee: true, logsIp: false, logsMetadata: false, requiresEmail: false, requiresPhone: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "threema-libre": { jurisdiction: "CH", jurisdictionRisk: "low", e2ee: true, logsIp: false, requiresEmail: false, requiresPhone: false, isNoKyc: true, hasFreeTier: false, isOpenSource: true, isSecurityAudited: true },
  "element": { jurisdiction: "GB", jurisdictionRisk: "five_eyes", e2ee: true, hasFreeTier: true, isOpenSource: true },
  "matrix": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "jitsi": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, hasFreeTier: true, isOpenSource: true },
  "brave-talk": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, hasFreeTier: true },

  // ── VPN / Network anonymity ──────────────────────────────────────────────
  "mullvad": { jurisdiction: "SE", jurisdictionRisk: "fourteen_eyes", logsIp: false, logsMetadata: false, requiresEmail: false, isNoKyc: true, hasFreeTier: false, acceptsCrypto: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },
  "ivpn": { jurisdiction: "GI", jurisdictionRisk: "medium", logsIp: false, logsMetadata: false, requiresEmail: false, isNoKyc: true, hasFreeTier: false, acceptsCrypto: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },
  "tor": { logsIp: false, logsMetadata: false, requiresEmail: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "tor-browser": { logsIp: false, logsMetadata: false, requiresEmail: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "orbot": { logsIp: false, requiresEmail: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "i2p": { logsIp: false, logsMetadata: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "i2p-anonymous-network": { logsIp: false, logsMetadata: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "freenet": { logsIp: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "onionshare": { e2ee: true, logsIp: false, logsMetadata: false, requiresEmail: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },

  // ── Browsers / Search ────────────────────────────────────────────────────
  "brave-browser": { jurisdiction: "US", jurisdictionRisk: "five_eyes", hasFreeTier: true, isOpenSource: true },
  "librewolf": { hasFreeTier: true, isOpenSource: true },
  "mullvad-browser": { jurisdiction: "SE", jurisdictionRisk: "fourteen_eyes", hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "duckduckgo": { jurisdiction: "US", jurisdictionRisk: "five_eyes", logsIp: false, hasFreeTier: true },
  "brave-search": { jurisdiction: "US", jurisdictionRisk: "five_eyes", logsIp: false, hasFreeTier: true },
  "startpage": { jurisdiction: "NL", jurisdictionRisk: "fourteen_eyes", logsIp: false, hasFreeTier: true },
  "kagi": { jurisdiction: "US", jurisdictionRisk: "five_eyes", logsIp: false, hasFreeTier: false },
  "searxng": { logsIp: false, hasFreeTier: true, isOpenSource: true },

  // ── Password managers / 2FA ──────────────────────────────────────────────
  "bitwarden": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },
  "keepass": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "keepass-xc": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "keepassium": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "pass": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "lesspass": { hasFreeTier: true, isOpenSource: true },
  "1password": { jurisdiction: "CA", jurisdictionRisk: "five_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: false, isSecurityAudited: true },
  "aegis-authenticator": { hasFreeTier: true, isOpenSource: true },
  "2fas": { hasFreeTier: true, isOpenSource: true },
  "ente-auth": { e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },

  // ── Storage / Notes / Sync ───────────────────────────────────────────────
  "cryptomator": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },
  // veracrypt.fr 301s to veracrypt.io, which reads "Brought to you by AM Crypto
  // (https://amcrypto.jp)". AM Crypto is Mounir Idrassi's practice, and its own contact block —
  // in all three site languages — gives "Kobe, Japan" ("from my base in Kobe, Japan" / 神戸を拠点に).
  // The FR/fourteen_eyes pair described IDRIX, the retired French entity. Japan is not a member of
  // the Five/Nine/Fourteen Eyes (SSEUR), so neither alliance value is available; "medium" is the
  // honest slot — not an alliance member, and not a haven either. NOTE: no corporate registration
  // is published (no 株式会社/合同会社, no number), so this records where the maintainer operates,
  // not an incorporation we did not retrieve.
  "veracrypt": { websiteUrl: "https://veracrypt.io", jurisdiction: "JP", jurisdictionRisk: "medium", e2ee: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "standard-notes": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "joplin": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "cryptpad": { jurisdiction: "FR", jurisdictionRisk: "fourteen_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "nextcloud": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", hasFreeTier: true, isOpenSource: true },
  "syncthing": { e2ee: true, logsIp: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "filen": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true },
  "ente": { e2ee: true, zeroKnowledge: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true, auditor: "Cure53" },
  "localsend": { e2ee: true, requiresEmail: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "boxcryptor": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", e2ee: true, zeroKnowledge: true, hasFreeTier: false },

  // ── Operating systems / Hardening ────────────────────────────────────────
  "grapheneos": { logsIp: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "calyxos": { isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "lineageos": { hasFreeTier: true, isOpenSource: true },
  "qubes-os": { isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "tails": { logsIp: false, logsMetadata: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "whonix": { logsIp: false, isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "aurora-store": { isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "accrescent": { hasFreeTier: true, isOpenSource: true },

  // ── Crypto / Financial privacy ───────────────────────────────────────────
  "monero": { isNoKyc: true, hasFreeTier: true, isOpenSource: true, isSecurityAudited: true },
  "electrum": { isNoKyc: true, hasFreeTier: true, isOpenSource: true },
  "cake-wallet": { isNoKyc: true, hasFreeTier: true, isOpenSource: true },

  // ── Hardware keys ────────────────────────────────────────────────────────
  "nitrokey": { jurisdiction: "DE", jurisdictionRisk: "fourteen_eyes", hasFreeTier: false, isOpenSource: true },

  // ── Domains / Hosting (privacy-first) ────────────────────────────────────
  "njalla": { requiresEmail: false, isNoKyc: true, hasFreeTier: false, acceptsCrypto: true },
  "1984-hosting": { jurisdiction: "IS", jurisdictionRisk: "low", hasFreeTier: false, acceptsCrypto: true },

  // ── Content / Ad / Tracker blocking ──────────────────────────────────────
  "ublock-origin": { hasFreeTier: true, isOpenSource: true },
  "privacy-badger": { jurisdiction: "US", jurisdictionRisk: "five_eyes", hasFreeTier: true, isOpenSource: true },
  "pi-hole": { hasFreeTier: true, isOpenSource: true },
  "adguard": { jurisdiction: "CY", jurisdictionRisk: "medium", hasFreeTier: true },
  "dnscrypt-proxy-2": { logsIp: false, hasFreeTier: true, isOpenSource: true },

  // ── Encryption tooling ───────────────────────────────────────────────────
  "gpg4win": { e2ee: true, hasFreeTier: true, isOpenSource: true },
  "gpg-suite": { e2ee: true, hasFreeTier: true, isOpenSource: true },

  // ── Email clients ────────────────────────────────────────────────────────
  "mozilla-thunderbird": { jurisdiction: "US", jurisdictionRisk: "five_eyes", e2ee: true, hasFreeTier: true, isOpenSource: true },
  "k-9-mail": { e2ee: true, hasFreeTier: true, isOpenSource: true },
}

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const slugs = Object.keys(ANCHORS)
  const rows = await db
    .select()
    .from(tools)
    .where(inArray(tools.slug, slugs))

  const present = new Set(rows.map((r) => r.slug))
  const missing = slugs.filter((s) => !present.has(s))

  console.log(`\n=== ANCHOR ENRICHMENT ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===`)
  console.log(`curated anchors: ${slugs.length}   matched in DB: ${rows.length}   missing: ${missing.length}`)
  if (missing.length) console.log(`missing slugs: ${missing.join(", ")}`)

  let changed = 0
  const now = new Date()
  for (const row of rows) {
    const fields = ANCHORS[row.slug]
    // Only write keys whose value differs, so re-runs are no-ops.
    const patch: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(fields)) {
      if ((row as Record<string, unknown>)[k] !== v) patch[k] = v
    }
    if (Object.keys(patch).length === 0) continue
    changed++
    if (APPLY) {
      await db.update(tools).set({ ...patch, lastVerified: now, updatedAt: now }).where(eq(tools.id, row.id))
    }
  }

  console.log(`\ntools ${APPLY ? "written" : "that would change"}: ${changed}`)
  console.log(APPLY ? "✅ applied (lastVerified stamped on each)." : "(dry-run — no writes.)")
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 anchor enrichment failed:", e)
  process.exit(1)
})
