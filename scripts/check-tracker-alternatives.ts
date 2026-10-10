// Guard: every directory slug referenced by the scanner's tracker→alternative map
// must resolve to a Published tool. Fails loudly naming the dead slug — a rotten slug
// otherwise renders a 404 link on the scan results page (the runtime filter degrades
// it, this catches it at the source).
//   bun --env-file=.env --env-file=.env.local run scripts/check-tracker-alternatives.ts

import { getToolSlugs } from "../src/lib/db/queries"
import { categoryRecommendations, trackerMappings } from "../src/lib/scanner/tracker-alternatives"

const referenced = new Map<string, string[]>() // slug -> where it's referenced
for (const m of trackerMappings) {
  for (const slug of m.alternativeSlugs) {
    referenced.set(slug, [...(referenced.get(slug) ?? []), `mapping "${m.name}"`])
  }
}
for (const [category, rec] of Object.entries(categoryRecommendations)) {
  for (const slug of rec.slugs) {
    referenced.set(slug, [...(referenced.get(slug) ?? []), `categoryRecommendations.${category}`])
  }
}

const published = new Set((await getToolSlugs()).map((r) => r.slug))
if (published.size === 0) {
  console.error("check-tracker-alternatives: no published tools returned — is DATABASE_URL set?")
  process.exit(2)
}

const dead = [...referenced.entries()].filter(([slug]) => !published.has(slug))
if (dead.length > 0) {
  console.error("check-tracker-alternatives: FAIL — slugs not resolving to Published tools:")
  for (const [slug, sites] of dead) {
    console.error(`  ${slug}  (referenced by ${sites.join(", ")})`)
  }
  process.exit(1)
}

console.log(
  `check-tracker-alternatives: OK — ${referenced.size} unique slug(s) across ${trackerMappings.length} mappings all resolve to Published tools`,
)
process.exit(0)
