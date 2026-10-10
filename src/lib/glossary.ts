/**
 * Glossary Content Loader
 * 
 * Loads and parses glossary markdown files from /src/content/glossary/
 */

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { parse as parseYaml } from "yaml"

const GLOSSARY_DIR = join(process.cwd(), "src/content/glossary")

export type GlossaryTerm = {
  term: string
  slug: string
  definition: string
  category: string
  content: string
  relatedTerms?: string[]
  aliases?: string[]
  keywords?: string[]
  seeAlso?: Array<{ name: string; slug: string }>
}

type GlossaryFrontmatter = {
  term: string
  slug: string
  definition: string
  category: string
  relatedTerms?: string[]
  aliases?: string[]
  keywords?: string[]
  seeAlso?: Array<{ name: string; slug: string }>
}

/**
 * Parse a markdown file with YAML frontmatter
 */
function parseMarkdownWithFrontmatter(content: string): { frontmatter: GlossaryFrontmatter; body: string } {
  const lines = content.split("\n")
  
  // Check for frontmatter delimiter
  if (lines[0] !== "---") {
    throw new Error("No frontmatter found")
  }
  
  // Find the closing delimiter
  let endIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIndex = i
      break
    }
  }
  
  if (endIndex === -1) {
    throw new Error("No closing frontmatter delimiter found")
  }
  
  const frontmatterContent = lines.slice(1, endIndex).join("\n")
  const body = lines.slice(endIndex + 1).join("\n").trim()
  
  const frontmatter = parseYaml(frontmatterContent) as GlossaryFrontmatter
  
  return { frontmatter, body }
}

/**
 * Get all glossary terms
 */
export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  const files = await readdir(GLOSSARY_DIR)
  const mdFiles = files.filter((f) => f.endsWith(".md"))
  
  const terms: GlossaryTerm[] = []
  
  for (const file of mdFiles) {
    const content = await readFile(join(GLOSSARY_DIR, file), "utf-8")
    const { frontmatter, body } = parseMarkdownWithFrontmatter(content)
    
    terms.push({
      ...frontmatter,
      content: body,
    })
  }
  
  // Sort alphabetically by term
  return terms.sort((a, b) => a.term.localeCompare(b.term))
}

/**
 * Get a single glossary term by slug
 */
export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  try {
    const content = await readFile(join(GLOSSARY_DIR, `${slug}.md`), "utf-8")
    const { frontmatter, body } = parseMarkdownWithFrontmatter(content)
    
    return {
      ...frontmatter,
      content: body,
    }
  } catch {
    return null
  }
}

/**
 * Get all unique categories
 */
export async function getGlossaryCategories(): Promise<string[]> {
  const terms = await getAllGlossaryTerms()
  const categories = new Set(terms.map((t) => t.category))
  return Array.from(categories).sort()
}

/**
 * Get terms by category
 */
export async function getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
  const terms = await getAllGlossaryTerms()
  return terms.filter((t) => t.category === category)
}

/**
 * Get related terms for a given term
 */
export async function getRelatedTerms(term: GlossaryTerm): Promise<GlossaryTerm[]> {
  if (!term.relatedTerms || term.relatedTerms.length === 0) {
    return []
  }
  
  const allTerms = await getAllGlossaryTerms()
  return allTerms.filter((t) => term.relatedTerms?.includes(t.slug))
}

/**
 * Search glossary terms
 */
export async function searchGlossaryTerms(query: string): Promise<GlossaryTerm[]> {
  const terms = await getAllGlossaryTerms()
  const q = query.toLowerCase().trim()

  // Rank, don't just filter: a substring hit in a definition ("tor" in "monitoring")
  // must not bury the term itself. Lower rank = better; ties keep alphabetical order.
  const rank = (t: GlossaryTerm): number => {
    const name = t.term.toLowerCase()
    const aliases = t.aliases?.map((a) => a.toLowerCase()) ?? []
    if (name === q || aliases.includes(q)) return 0
    if (name.startsWith(q)) return 1
    if (name.includes(q) || aliases.some((a) => a.includes(q))) return 2
    if (t.keywords?.some((k) => k.toLowerCase().includes(q))) return 3
    if (t.definition.toLowerCase().includes(q)) return 4
    return -1
  }

  return terms
    .map((t) => ({ t, r: rank(t) }))
    .filter(({ r }) => r >= 0)
    .sort((a, b) => a.r - b.r)
    .map(({ t }) => t)
}

/**
 * Get alphabetical index (first letters that have terms)
 */
export async function getGlossaryAlphabetIndex(): Promise<string[]> {
  const terms = await getAllGlossaryTerms()
  const letters = new Set(terms.map((t) => t.term[0].toUpperCase()))
  return Array.from(letters).sort()
}
