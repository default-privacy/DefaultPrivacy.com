// One-off: generate tool<->tag associations (tools_to_tags was never seeded).
// Deterministic keyword matcher over each tool's text + structured flags.
// Dry-run by default: prints a coverage report and writes /tmp/tag-backfill.sql
// (slug-keyed, resolved to ids at apply-time via JOIN — safe for local + Neon).
//
// Usage: bun scripts/backfill-tool-tags.mjs [backup.json]
import { readFileSync, writeFileSync } from "node:fs"

const BK = process.argv[2] ||
  `${process.env.HOME}/privatebydefault/defaultprivacy-git/backups/backup_2026-01-22T19-20-41.json`

const b = JSON.parse(readFileSync(BK, "utf8"))
const d = b.data || b
const tools = d.tools || []
const tags = d.tags || []

// ── Junk vocabulary to prune (scraper artifacts + pure marketing blobs) ──
const JUNK = new Set([
  "awesomeopensourcecom", "einvestigatorcom", "haveibeenzuckeredcom", "optoutprescreencom",
  "whopostedwhatcom", "windowsspyblocker", "stickykeysslayer", "destinationfreedom",
  "beginnerfriendly", "communitypowered", "communitysupported", "cybersecurityfocused",
  "privacyconscious", "privacyrespecting", "productivityfocused", "professionalgrade",
  "securityoriented", "interdisciplinary", "internetconnected", "financialaccounting",
  "windowscompatible", "quantumresistant", "reidentification",
])

// Too generic on a privacy-tools directory → don't auto-assign (would tag ~everything).
const GENERIC_SKIP = new Set(["privacy", "security", "resources"])

// ── Curated matchers for tags where the slug alone is weak/ambiguous ──
// value = array of regex source strings (case-insensitive, matched on a text haystack)
const SYN = {
  "2fa": ["\\b2fa\\b", "\\bmfa\\b", "two[\\s-]?factor", "multi[\\s-]?factor", "authenticator"],
  "two-factor-authentication": ["\\b2fa\\b", "\\bmfa\\b", "two[\\s-]?factor", "multi[\\s-]?factor"],
  "api": ["\\bapi\\b"],
  "ad-blocker": ["ad[\\s-]?block"],
  "anonymity": ["anonym"],
  "anonymous": ["anonym"],
  "audit": ["\\baudit"],
  "authentication": ["authenticat", "\\bsso\\b", "single sign"],
  "biometric": ["biometric", "face[\\s-]?id", "touch[\\s-]?id", "fingerprint reader"],
  "bitcoin": ["bitcoin", "\\bbtc\\b", "lightning network"],
  "business-tools": ["\\bbusiness\\b", "enterprise"],
  "chat": ["\\bchat\\b", "messenger", "messaging"],
  "cloud-storage": ["cloud[\\s-]?storage", "file storage", "file sync"],
  "compliance": ["complian"],
  "content-blocking": ["content[\\s-]?block"],
  "cookie-blocker": ["\\bcookie"],
  "crypto": ["\\bcrypto", "cryptocurrenc"],
  "cryptocurrency": ["cryptocurrenc", "\\bcrypto\\b"],
  "crypto-wallet": ["\\bwallet\\b"],
  "data-protection": ["data[\\s-]?protection"],
  "data-removal": ["data[\\s-]?removal", "remove your (data|info)", "delete your (data|account|info)", "opt[\\s-]?out"],
  "decentralized": ["decentrali"],
  "developer-tools": ["developer", "\\bsdk\\b", "\\bcli\\b", "\\bapi\\b"],
  "documentation": ["documentation", "\\bdocs\\b"],
  "education": ["education", "\\blearn\\b", "\\bcourse", "tutorial"],
  "encrypted-messaging": ["encrypted messag", "secure messag", "private messag"],
  "encrypted-storage": ["encrypted storage", "encrypted (file|cloud)"],
  "encryption": ["encrypt"],
  "end-to-end-encryption": ["end[\\s-]?to[\\s-]?end", "\\be2ee?\\b"],
  "file-encryption": ["file encrypt", "encrypt (your )?file"],
  "fingerprinting-protection": ["fingerprint"],
  "foss": ["\\bfoss\\b", "open[\\s-]?source"],
  "hardware-key": ["hardware key", "security key", "yubikey", "\\bfido2?\\b", "\\bu2f\\b"],
  "identity-protection": ["identity"],
  "intrusion-detection": ["intrusion", "\\bids\\b", "\\bips\\b"],
  "ios": ["\\bios\\b", "iphone", "\\bipad"],
  "media-player": ["media player", "video player", "music player", "podcast"],
  "mobile": ["\\bmobile\\b", "android", "\\bios\\b", "iphone"],
  "monero": ["monero", "\\bxmr\\b"],
  "monitoring": ["monitor"],
  "network-analysis": ["network analy", "packet", "\\bwireshark"],
  "no-logs": ["no[\\s-]?logs?", "zero[\\s-]?logs?", "no[\\s-]?logging", "does(n't| not) log"],
  "no-tracking": ["no[\\s-]?track", "block track", "don'?t track", "tracker[\\s-]?free"],
  "open-source": ["open[\\s-]?source"],
  "opt-out": ["opt[\\s-]?out"],
  "p2p": ["\\bp2p\\b", "peer[\\s-]?to[\\s-]?peer"],
  "password-manager": ["password[\\s-]?manager", "password[\\s-]?vault"],
  "personal-information": ["personal info", "\\bpii\\b", "personal data"],
  "privacy-browser": ["privacy[\\s-]?browser", "private[\\s-]?browser"],
  "privacy-coin": ["privacy coin", "monero", "zcash", "\\bxmr\\b"],
  "private-browsing": ["private[\\s-]?brows", "incognito"],
  "secure-email": ["secure email", "private email", "encrypted email", "\\bemail\\b"],
  "self-hosted": ["self[\\s-]?host"],
  "streaming": ["stream"],
  "sync": ["\\bsync"],
  "tor": ["\\btor\\b", "onion (service|routing|network)", "\\.onion"],
  "tracker-blocker": ["tracker[\\s-]?block", "block(s|ing)? tracker"],
  "traffic-analysis": ["traffic analy"],
  "video-call": ["video call", "video (conferenc|chat|meeting)"],
  "voip": ["\\bvoip\\b", "voice call", "voice over ip"],
  "vpn": ["\\bvpn\\b"],
  "vulnerability-scanning": ["vulnerab", "\\bcve\\b", "security scan"],
  "zero-knowledge": ["zero[\\s-]?knowledge", "\\bzk\\b"],
}

// Structured-flag rules → extra tags
const FLAG_TAGS = [
  { flag: "isOpenSource", slugs: ["open-source", "foss"] },
  { flag: "isSecurityAudited", slugs: ["audit"] },
  { flag: "acceptsCrypto", slugs: ["crypto"] },
]

// Build matcher per clean tag
const clean = tags.filter((t) => !JUNK.has(t.slug) && !GENERIC_SKIP.has(t.slug))
const matchers = new Map() // slug -> RegExp
for (const t of clean) {
  const src = SYN[t.slug] || [
    "\\b" + t.slug.replace(/[-_]/g, "[\\s-]?").replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
  ]
  matchers.set(t.slug, new RegExp(src.join("|"), "i"))
}

const haystack = (t) =>
  [t.name, t.tagline, t.description, t.mainCategory, t.subCategory].filter(Boolean).join(" • ").toLowerCase()

// Compute pairs (tool.slug -> Set of tag.slug)
const pairs = [] // [toolSlug, tagSlug]
const perTag = new Map()
let toolsCovered = 0
for (const tool of tools) {
  if (!tool.slug) continue
  const hs = haystack(tool)
  const assigned = new Set()
  for (const [slug, re] of matchers) if (re.test(hs)) assigned.add(slug)
  for (const { flag, slugs } of FLAG_TAGS) if (tool[flag] === true) for (const s of slugs) if (matchers.has(s)) assigned.add(s)
  if (assigned.size) toolsCovered++
  for (const s of assigned) {
    pairs.push([tool.slug, s])
    perTag.set(s, (perTag.get(s) || 0) + 1)
  }
}

// ── Report ──
console.log(`\n=== TAG BACKFILL — dry run ===`)
console.log(`tools: ${tools.length} | clean tags: ${clean.size ?? clean.length} | junk to prune: ${JUNK.size} | generic skipped: ${[...GENERIC_SKIP].join(", ")}`)
console.log(`total associations: ${pairs.length}`)
console.log(`tools with >=1 tag: ${toolsCovered} (${((toolsCovered / tools.length) * 100).toFixed(1)}%)`)
console.log(`avg tags/tool (of covered): ${(pairs.length / (toolsCovered || 1)).toFixed(1)}`)

const sorted = [...perTag.entries()].sort((a, b) => b[1] - a[1])
console.log(`\n--- tag counts (all ${sorted.length} that matched >=1) ---`)
for (const [s, n] of sorted) {
  const flag = n > 400 ? "  <-- very broad" : ""
  console.log(`  ${String(n).padStart(4)}  ${s}${flag}`)
}
const zero = clean.filter((t) => !perTag.has(t.slug)).map((t) => t.slug)
console.log(`\n--- clean tags with ZERO matches (secondary drop candidates): ${zero.length} ---`)
console.log("  " + (zero.join(", ") || "(none)"))

console.log(`\n--- sniff test: 8 sample tools ---`)
const byslug = new Map()
for (const [ts, gs] of pairs) { if (!byslug.has(ts)) byslug.set(ts, []); byslug.get(ts).push(gs) }
for (const tool of tools.slice(0, 40).filter((t) => byslug.has(t.slug)).slice(0, 8)) {
  console.log(`  ${tool.name}: ${byslug.get(tool.slug).join(", ")}`)
}

// ── Emit statements (slug-keyed, resolved via JOIN at apply time) ──
const esc = (s) => s.replace(/'/g, "''")
const stmts = []
stmts.push(`DELETE FROM tags WHERE slug IN (${[...JUNK].map((s) => `'${esc(s)}'`).join(", ")})`)
stmts.push(`DELETE FROM tools_to_tags`)
const CHUNK = 800
for (let i = 0; i < pairs.length; i += CHUNK) {
  const vals = pairs.slice(i, i + CHUNK).map(([ts, gs]) => `('${esc(ts)}','${esc(gs)}')`).join(",")
  stmts.push(
    `INSERT INTO tools_to_tags (tool_id, tag_id) ` +
    `SELECT t.id, g.id FROM (VALUES ${vals}) AS v(ts, gs) ` +
    `JOIN tools t ON t.slug = v.ts JOIN tags g ON g.slug = v.gs ON CONFLICT DO NOTHING`)
}
// (a) whole-file transaction for local Docker psql
writeFileSync("/tmp/tag-backfill.sql", "BEGIN;\n" + stmts.join(";\n") + ";\nCOMMIT;\n")
// (b) one JSON body per line for Neon /sql over curl -4 (idempotent; order preserved)
writeFileSync("/tmp/neon-stmts.jsonl", stmts.map((s) => JSON.stringify({ query: s, params: [] })).join("\n") + "\n")
console.log(`\nwrote /tmp/tag-backfill.sql + /tmp/neon-stmts.jsonl (${stmts.length} statements) — NOT applied`)
