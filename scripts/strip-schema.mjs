// One-off: strip v4 paid/auth/mentor/content residue from schema.ts.
// Removes named `export const X = ...` blocks by balanced-paren scanning.
// schema.ts is committed — `git checkout` reverts if anything looks wrong.
import { readFileSync, writeFileSync } from "node:fs"
const FILE = "src/lib/db/schema.ts"
let src = readFileSync(FILE, "utf8")

const REMOVE = [
  // paid/auth/mentor/content tables
  "clients", "magicLinkTokens", "sessions", "passkeyCredentials", "formations",
  "annualReportFilings", "raRenewalCharges", "deroInvoices", "cryptoInvoices",
  "signingRequests", "auditSessions", "mentorConversations", "mentorMessages", "contentDrafts",
  // their relations
  "clientsRelations", "sessionsRelations", "formationsRelations", "annualReportFilingsRelations",
  "raRenewalChargesRelations", "deroInvoicesRelations", "cryptoInvoicesRelations",
  "signingRequestsRelations", "mentorConversationsRelations", "mentorMessagesRelations",
  "contentDraftsRelations", "auditSessionsRelations",
  // paid-only enums (carry enums kept: toolStatus, privacyGrade,
  // jurisdictionRisk, categoryVisibility, tagType)
  "priceModelEnum", "paymentStatusEnum", "contentTypeEnum", "draftStatusEnum", "auditStatusEnum",
  "clientStatusEnum", "formationStatusEnum", "tierEnum", "authMethodEnum", "deroInvoiceStatusEnum",
  "complianceFilingStatusEnum", "raRenewalStatusEnum", "signingPurposeEnum", "signingStatusEnum",
  "cryptoChainEnum", "cryptoInvoiceStatusEnum", "cryptoInvoiceContextEnum",
]

function removeExport(text, name) {
  const re = new RegExp(`export const ${name} =`)
  const m = re.exec(text)
  if (!m) return { text, ok: false }
  const start = m.index
  const open = text.indexOf("(", start)
  if (open < 0) return { text, ok: false }
  let depth = 0, k = open
  for (; k < text.length; k++) {
    const c = text[k]
    if (c === "(") depth++
    else if (c === ")") { depth--; if (depth === 0) { k++; break } }
  }
  // swallow an optional trailing semicolon + the rest of the line
  while (k < text.length && text[k] !== "\n") k++
  // swallow the newline and one following blank line if present
  if (text[k] === "\n") k++
  if (text[k] === "\n") k++
  return { text: text.slice(0, start) + text.slice(k), ok: true }
}

const removed = [], missed = []
for (const name of REMOVE) {
  const r = removeExport(src, name)
  if (r.ok) { src = r.text; removed.push(name) } else missed.push(name)
}

writeFileSync(FILE, src)
console.log(`removed ${removed.length}:`, removed.join(", "))
if (missed.length) console.log(`NOT FOUND (${missed.length}):`, missed.join(", "))
console.log(`\nremaining tables:`, (src.match(/pgTable\("/g) || []).length)
console.log(`remaining enums:`, (src.match(/pgEnum\("/g) || []).length)
console.log(`remaining relations:`, (src.match(/= relations\(/g) || []).length)
