/**
 * "How private is X?" for one product, composed from what Default Privacy already has plus the
 * ToS;DR snapshot: DP's own sourced record if the product is in the directory, DP's private
 * replacements if it is a mainstream product people leave, ToS;DR's review of its terms, and the
 * vendor's own privacy policy. No network calls of its own; the directory lookups are injected so
 * this is unit-tested without a database.
 */

import { replacementCategory } from "./consumer-replacements"
import { sortByPicks } from "./picks"
import type { PrivacyProtocolTool } from "./privacy-protocol"
import { snapshotFor, termsReview, tosdrServiceForName, tosdrServiceForSlug, type TermsReview } from "./tosdr"

export const THREAT_MODEL_GUIDE = "how-to-build-your-threat-model"

export type HowPrivateDeps = {
  getTool: (slug: string) => Promise<PrivacyProtocolTool | null>
  url: (path: string) => string
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

export async function howPrivate(product: string, deps: HowPrivateDeps) {
  const byName = tosdrServiceForName(product)

  // Directory record: the service's tied slug first, else the product name as a slug.
  const slugs = [...(byName?.dpSlugs ?? []), slugify(product)].filter(Boolean)
  let tool: PrivacyProtocolTool | null = null
  for (const slug of [...new Set(slugs)]) {
    tool = await deps.getTool(slug)
    if (tool && !tool.deprecated) break
    tool = null
  }
  const service = byName ?? (tool ? tosdrServiceForSlug(tool.slug) : null)
  const review: TermsReview | null = service ? termsReview(service) : null
  const policyUrl = service ? (snapshotFor(service)?.privacy_policy_url ?? null) : null

  const replacement = replacementCategory(product)
  let replacements = null
  if (replacement) {
    const found = (await Promise.all(replacement.slugs.map((s) => deps.getTool(s)))).filter(
      (t): t is PrivacyProtocolTool => t !== null && !t.deprecated,
    )
    replacements = {
      replaced_by: replacement.label,
      top: sortByPicks(found, replacement.category, true)
        .slice(0, 3)
        .map((t) => ({ name: t.name, slug: t.slug, pick: t.pick, dp_url: t.dp_url })),
      what_changes: replacement.whatChanges,
      more: deps.url(`directory?category=${replacement.category}`),
    }
  }

  const dpRecord = tool && {
    name: tool.name,
    pick: tool.pick,
    privacy: tool.privacy,
    trust: tool.trust,
    sources: tool.sources ?? {},
    caveats: tool.caveats ?? [],
    last_verified: tool.meta.last_verified,
    dp_url: tool.dp_url,
  }

  const threatModel = deps.url(`guides/${THREAT_MODEL_GUIDE}`)
  if (!dpRecord && !review && !replacements) {
    return {
      product,
      found: false as const,
      message: `Default Privacy has no record, replacement list or terms review for '${product}'. Say so rather than guess. Try dp_search with what the product does, and read the vendor's own privacy policy.`,
      threat_model: threatModel,
    }
  }

  const notMeasured = [
    review
      ? "ToS;DR grades what the terms of service and privacy policy say, not what the app does in practice (encryption, what it actually collects)."
      : "No ToS;DR review is on file for this product.",
    dpRecord
      ? "Any null field in dp_record (encryption, logging, jurisdiction, what it requires from you) has not been checked by Default Privacy. Null never means no."
      : "This product is not in Default Privacy's directory, so Default Privacy has not checked its encryption, logging or jurisdiction.",
    `Whether any of this matters depends on who you need protection from: ${threatModel}`,
  ]

  return {
    product,
    found: true as const,
    dp_record: dpRecord,
    replacements,
    terms_review: review,
    vendor_policy: policyUrl,
    picks_note:
      dpRecord?.pick && review
        ? `Default Privacy picks ${dpRecord.name} (${dpRecord.pick.reason}) and ToS;DR rates its ${review.service} terms ${review.rating ?? "unrated"}. They measure different things: the pick weighs the product as a whole, ToS;DR grades the wording of its terms and privacy policy. Give the person both, with what each measures.`
        : null,
    not_measured: notMeasured,
  }
}
