import fs from "node:fs"
const tax = JSON.parse(fs.readFileSync("/tmp/taxonomy-v2.json", "utf8"))
let asn = JSON.parse(fs.readFileSync("/tmp/assignments.json", "utf8"))
const members = JSON.parse(fs.readFileSync("/tmp/memberships.json", "utf8"))
const slug = s => s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")

const renames = {
  "Private Search Engine":["private-search"],"DNS Providers":["dns"],"Proxies":["proxies"],
  "Mail Forwarding":["aliases-forwarding"],"Email Checker":["email-security"],"Laptop":["laptops-desktops"],
  "Privacy Phones":["privacy-phones"],"Routers":["routers-firmware"],"Mobile OS":["mobile-os"],
  "2-Factor Authentication":["auth-2fa"],"Windows Defences":["windows-privacy"],"Crypto Wallets":["crypto-wallets"],
  "Pre Paid Cards":["prepaid-virtual-cards"],"P2P Messaging":["encrypted-messaging"],"VoIP":["voip-calls"],
  "Social Media":["social-networks"],"File Sharing and Sync":["file-sharing-sync"],"Web Hosting":["web-cloud-hosting"],
  "Self Hosting":["self-hosting-servers"],"RSS Readers":["rss-news-readers"],"Online Courses":["courses"],
}
const displayRename = {
  "Google Analytics":"Tracker Removal","GPS Tracking":"GPS Anti-Tracking","App Store":"App Stores",
  "Mac OS Defences":"macOS Defenses","Data Breaches":"Data Breach Lookup","Scanners":"Vulnerability Scanners",
  "Audio Editors & Recorders":"Audio Editors","Cloud Productivity Suites":"Office Suites","Large Language Models":"Private AI",
  "Policy and Research":"Policy & Research","Freedom and Safety":"Freedom & Safety","eBook Reader":"eBook Readers",
  "LLCs":"Anonymous LLCs","Digital Estate Planning":"Estate Planning","Maps":"Maps & Geolocation",
  "Private Investigators":"People Investigation","Specialized Search Engine":"Specialized Search","Desktop Operating Systems":"Desktop OS",
}
const M = { ...tax.categoryActions }

// --- corrections ---
// Browser Extensions: keep as a subcategory (not a pure tag) to avoid orphaning extension-only tools
M["Browser Extensions"] = "browser-privacy"
displayRename["Browser Extensions"] = "Browser Extensions"
// Guides subcategory + reroute the 17 AI guide-sites out of "courses"
tax.subcategories.push({ slug:"guides", name:"Guides", group:"resources" })
asn = asn.map(a => a.sub === "courses" ? { ...a, sub:"guides" } : a)

// old category name -> canonical subcat slug (keep + merge only)
const catToSub = {}
for (const [name, act] of Object.entries(M)) {
  if (typeof act === "string" && tax.groups.some(g => g.slug === act)) {
    catToSub[name] = (renames[name] && renames[name][0]) || slug(displayRename[name] || name)
  } else if (typeof act === "string" && act.startsWith("merge:")) {
    catToSub[name] = act.slice(6)
  }
}
// ensure every catToSub target exists as a subcat (add any 'keep' canonical not already present)
const subBySlug = new Map(tax.subcategories.map(s => [s.slug, s]))
for (const [name, act] of Object.entries(M)) {
  if (typeof act === "string" && tax.groups.some(g => g.slug === act)) {
    const sl = catToSub[name]
    if (!subBySlug.has(sl)) { const s = { slug: sl, name: displayRename[name] || name, group: act }; tax.subcategories.push(s); subBySlug.set(sl, s) }
  }
}
const subSlugs = new Set(tax.subcategories.map(s => s.slug))

// per-tool new subcategory memberships
const toolSubs = new Map()
const add = (t, s) => { if (!toolSubs.has(t)) toolSubs.set(t, new Set()); toolSubs.get(t).add(s) }
for (const m of members) { const sub = catToSub[m.cat]; if (sub) add(m.tool, sub) }
for (const a of asn) add(a.id, a.sub)

// validate + orphans
const bad = []
for (const [, ss] of toolSubs) for (const s of ss) if (!subSlugs.has(s)) bad.push(s)
const allTools = new Set(members.map(m => m.tool)); asn.forEach(a => allTools.add(a.id))
const orphaned = [...allTools].filter(t => !toolSubs.has(t) || toolSubs.get(t).size === 0)

// --- emit SQL ---
const esc = s => String(s).replace(/'/g, "''")
let sql = "BEGIN;\nDELETE FROM tools_to_categories;\nDELETE FROM categories;\n"
for (const g of tax.groups) sql += `INSERT INTO categories (id,name,slug,sort_order,visibility) VALUES ('grp_${g.slug}','${esc(g.name)}','${g.slug}',${g.sort},'public');\n`
const usedSubs = new Set(); for (const [, ss] of toolSubs) for (const s of ss) usedSubs.add(s)
let so = 0
for (const s of tax.subcategories) { if (!usedSubs.has(s.slug)) continue; so += 10; sql += `INSERT INTO categories (id,name,slug,parent_id,sort_order,visibility) VALUES ('sub_${s.slug}','${esc(s.name)}','${s.slug}','grp_${s.group}',${so},'public');\n` }
const vals = []
for (const [t, ss] of toolSubs) for (const s of ss) vals.push(`('${t}','sub_${s}')`)
const uniq = [...new Set(vals)]
sql += `INSERT INTO tools_to_categories (tool_id,category_id) VALUES\n${uniq.join(",\n")};\n`
sql += "COMMIT;\n"
fs.writeFileSync("/tmp/migration.sql", sql)

console.log("groups:", tax.groups.length, "| subcats:", tax.subcategories.length, "| memberships:", uniq.length)
console.log("invalid sub slugs:", bad.length ? [...new Set(bad)].join(",") : "none ✓")
console.log("orphaned tools (no subcat after migration):", orphaned.length)
if (orphaned.length) console.log("  ", orphaned.slice(0, 25).join(","))
// distribution of subcats that got 0 tools (dead subcats)
const used = new Set(); for (const [, ss] of toolSubs) for (const s of ss) used.add(s)
const empty = tax.subcategories.filter(s => !used.has(s.slug)).map(s => s.slug)
console.log("subcats that end up EMPTY:", empty.length ? empty.join(", ") : "none")
