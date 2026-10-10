// One-off: load a SQL snapshot into Neon over the WebSocket driver (:443),
// because this box's network blocks the raw Postgres port (:5432).
// Usage: NEON_URL=... SNAP=/path/to.sql bun scripts/neon-load.mjs
import { neonConfig, Client } from "@neondatabase/serverless"
import { readFileSync } from "node:fs"

// Bun provides a browser-style WebSocket global, which the serverless driver accepts.
neonConfig.webSocketConstructor = WebSocket

const url = process.env.NEON_URL
const snap = process.env.SNAP
if (!url || !snap) {
  console.error("need NEON_URL and SNAP env vars")
  process.exit(1)
}

const sqlText = readFileSync(snap, "utf8")
const client = new Client(url)

const t0 = Date.now()
await client.connect()
console.log("connected to Neon over :443")

// Multi-statement simple query → Postgres runs it as one implicit transaction (atomic).
await client.query(sqlText)
console.log(`load complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`)

const counts = await client.query(`
  select 'tools' t, count(*)::int n from tools
  union all select 'published', count(*)::int from tools where status = 'Published'
  union all select 'categories', count(*)::int from categories
  union all select 'tags', count(*)::int from tags
  union all select 'tools_to_categories', count(*)::int from tools_to_categories
  union all select 'tools_to_tags', count(*)::int from tools_to_tags
  order by 1
`)
console.log("\n=== Neon row counts ===")
for (const r of counts.rows) console.log(`${r.t.padEnd(22)} ${r.n}`)

await client.end()
