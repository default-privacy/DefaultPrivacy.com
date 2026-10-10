#!/usr/bin/env node
/**
 * Audit glossary links - find broken relatedTerms and seeAlso references
 * Run: node scripts/audit-glossary-links.mjs
 */

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { parse as parseYaml } from "yaml"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const GLOSSARY_DIR = join(__dirname, "../src/content/glossary")

function parseFrontmatter(content) {
  const lines = content.split("\n")
  if (lines[0] !== "---") return null
  let endIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIndex = i
      break
    }
  }
  if (endIndex === -1) return null
  const frontmatterContent = lines.slice(1, endIndex).join("\n")
  return parseYaml(frontmatterContent)
}

async function main() {
  const files = await readdir(GLOSSARY_DIR)
  const mdFiles = files.filter((f) => f.endsWith(".md"))
  const existingSlugs = new Set(mdFiles.map((f) => f.replace(".md", "")))

  const brokenRelatedTerms = []
  for (const file of mdFiles) {
    const content = await readFile(join(GLOSSARY_DIR, file), "utf-8")
    const frontmatter = parseFrontmatter(content)
    if (!frontmatter) continue

    const slug = frontmatter.slug || file.replace(".md", "")

    // Check relatedTerms
    const relatedTerms = frontmatter.relatedTerms || []
    for (const ref of relatedTerms) {
      if (!existingSlugs.has(ref)) {
        brokenRelatedTerms.push({ from: slug, missing: ref })
      }
    }

    // Check seeAlso (tools - link to /tools/{slug})
    const seeAlso = frontmatter.seeAlso || []
    for (const item of seeAlso) {
      const toolSlug = typeof item === "string" ? item : item.slug
      if (!toolSlug) continue
      // We can't easily check tools DB from here - just note for manual review
      // For now, we'll skip seeAlso as it links to tools directory, not glossary
    }
  }

  console.log("=== Glossary Link Audit ===\n")
  console.log(`Total glossary terms: ${mdFiles.length}`)
  console.log(`Existing slugs: ${existingSlugs.size}\n`)

  if (brokenRelatedTerms.length > 0) {
    console.log("BROKEN relatedTerms (glossary term references non-existent term):\n")
    const byMissing = {}
    for (const { from, missing } of brokenRelatedTerms) {
      if (!byMissing[missing]) byMissing[missing] = []
      byMissing[missing].push(from)
    }
    for (const [missing, fromList] of Object.entries(byMissing).sort()) {
      console.log(`  Missing: "${missing}"`)
      console.log(`    Referenced by: ${fromList.join(", ")}`)
      console.log()
    }
    console.log(`Total broken relatedTerms: ${brokenRelatedTerms.length}\n`)
  } else {
    console.log("✓ All relatedTerms resolve to existing glossary terms.\n")
  }

  // Also check: which pages link to glossary but we haven't verified?
  console.log("=== Pages that link to glossary (from codebase) ===")
  console.log("  /freedom - hardcoded: feie, expatriation, territorial-taxation, flag-theory")
  console.log("  /freedom - dynamic: glossaryTerms from getGlossaryTermsByCategory")
}

main().catch(console.error)
