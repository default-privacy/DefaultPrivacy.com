/**
 * The channel tag on links to the review page (`?from=hn`). Only these keys are counted;
 * anything else, including no tag, counts as "other", so no free text reaches the counter.
 */
export const REVIEW_CHANNELS = ["hn", "reddit", "x", "pulsemcp", "github", "glama", "smithery", "ai", "readme"] as const

export function reviewChannel(from: unknown): string {
  return typeof from === "string" && (REVIEW_CHANNELS as readonly string[]).includes(from) ? from : "other"
}
