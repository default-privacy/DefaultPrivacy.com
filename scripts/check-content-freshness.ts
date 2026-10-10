/**
 * Content freshness: which guides haven't been checked in over 90 days? A guide's date
 * is its "Last checked:" line (e.g. "**Last checked: October 2026**"), else updatedAt,
 * else publishedAt. Report only, never fails: rechecking a guide is a human job.
 *
 *   bun run scripts/check-content-freshness.ts
 *   CONTENT_REPORT=report.md bun run scripts/check-content-freshness.ts   # also write markdown
 *
 * Uses Bun's built-in YAML parser, so CI needs no `bun install`.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const GUIDES_DIR = join(import.meta.dir, "../src/content/guides")
const MAX_AGE_DAYS = 90
const DAY_MS = 24 * 3600 * 1000

type Row = { slug: string; title: string; date: Date | null; source: string }

// "October 2026" means the start of that month, the conservative reading.
function parseDate(text: string): Date | null {
  const t = text.trim()
  const ms = Date.parse(/^[A-Za-z]+ \d{4}$/.test(t) ? `1 ${t} UTC` : t)
  return Number.isNaN(ms) ? null : new Date(ms)
}

function read(file: string): Row {
  const slug = file.replace(/\.md$/, "")
  const raw = readFileSync(join(GUIDES_DIR, file), "utf8")
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fm) return { slug, title: slug, date: null, source: "no frontmatter" }
  let meta: { title?: string; updatedAt?: unknown; publishedAt?: unknown }
  try {
    meta = Bun.YAML.parse(fm[1]) as typeof meta
  } catch {
    return { slug, title: slug, date: null, source: "unreadable frontmatter" }
  }
  const checked = raw.slice(fm[0].length).match(/Last checked:\s*([^*·\n]+)/i)?.[1]
  const [source, value] = checked
    ? ["Last checked", checked]
    : meta.updatedAt
      ? ["updatedAt", String(meta.updatedAt)]
      : ["publishedAt", String(meta.publishedAt ?? "")]
  const date = parseDate(value)
  return { slug, title: meta.title ?? slug, date, source: date ? source : `unreadable ${source}: "${value.trim()}"` }
}

const rows = readdirSync(GUIDES_DIR)
  .filter((f) => f.endsWith(".md"))
  .map(read)
const now = Date.now()
const age = (r: Row) => (r.date ? Math.floor((now - r.date.getTime()) / DAY_MS) : Infinity)
const stale = rows.filter((r) => age(r) > MAX_AGE_DAYS).sort((a, b) => age(b) - age(a))

const lines = [
  "## Content freshness",
  "",
  `${stale.length} of ${rows.length} guides older than ${MAX_AGE_DAYS} days, dated by their "Last checked:" line, else updatedAt, else publishedAt.`,
]
if (stale.length > 0) {
  lines.push("", "| Guide | Date | From | Age (days) |", "| --- | --- | --- | ---: |")
  for (const r of stale) {
    const date = r.date ? r.date.toISOString().slice(0, 10) : "?"
    const title = r.title.replace(/\|/g, "\\|")
    lines.push(`| [${title}](https://defaultprivacy.com/guides/${r.slug}) | ${date} | ${r.source} | ${age(r) === Infinity ? "?" : age(r)} |`)
  }
}
const report = `${lines.join("\n")}\n`

console.log(report)
if (process.env.CONTENT_REPORT) writeFileSync(process.env.CONTENT_REPORT, report)
