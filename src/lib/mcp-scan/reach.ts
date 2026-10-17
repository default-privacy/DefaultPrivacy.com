/**
 * Reach flags: what a server's tools can do with a person's data, read from each tool's
 * NAME only. A flag needs an action word and an object in the same name ("send_email",
 * "submit_payment", "read_file"). Descriptions are not used: in the first sample they
 * flagged "NOT a purchase" as money and "a buy link" as a purchase. Opaque names are
 * missed, so the scan undercounts rather than smears. The tool names behind every flag
 * are kept as evidence.
 */

import type { ProbeTool } from "./probe"

export const REACH_FLAGS = ["files", "messages", "money", "browse", "code"] as const
export type ReachFlag = (typeof REACH_FLAGS)[number]

const set = (s: string) => new Set(s.split(" "))
// verbs: null means the object word alone is enough (it already names an action).
// first: the object word must be the name's first word ("buy_course", not "compare_rent_vs_buy").
type Rule = { verbs: Set<string> | null; objects: Set<string>; first?: boolean }

// Tightened 2026-10-16 after an independent check of 99 flagged hosts found 25 wrong:
// "directory"/"folder" were phone books and link folders, draft/sent invoices moved no
// money, "draft_email" sent nothing, "fetch ... page" read the vendor's own docs, and a
// bare "shell" matched a string-quoting helper.
const RULES: Record<ReachFlag, Rule[]> = {
  files: [
    { verbs: set("read write edit delete remove list create move copy upload download open save"), objects: set("file files filesystem fs") },
  ],
  messages: [
    { verbs: set("send post reply forward read list"), objects: set("email emails mail mails message messages sms dm dms inbox tweet tweets chat chats") },
  ],
  money: [
    { verbs: set("create make send submit initiate process issue execute request place pay"), objects: set("payment payments charge charges refund refunds transfer transfers payout payouts order orders paid") },
    { verbs: null, objects: set("checkout") },
    { verbs: null, objects: set("buy purchase"), first: true },
  ],
  browse: [
    { verbs: set("navigate visit fetch scrape crawl screenshot distill read open"), objects: set("url urls webpage webpages website websites") },
    { verbs: null, objects: set("scrape crawl screenshot webpage") },
  ],
  code: [
    { verbs: set("run execute exec eval"), objects: set("code command commands shell bash script scripts python javascript js terminal") },
  ],
}

/** "createPaymentLink" / "create_payment-link" -> ["create","payment","link"] */
export function nameTokens(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

export function reachOf(tools: ProbeTool[]): { reach: ReachFlag[]; evidence: Partial<Record<ReachFlag, string[]>> } {
  const evidence: Partial<Record<ReachFlag, string[]>> = {}
  for (const t of tools) {
    const words = nameTokens(t.name)
    for (const f of REACH_FLAGS) {
      const hit = RULES[f].some(
        (r) =>
          (r.first ? r.objects.has(words[0]) : words.some((w) => r.objects.has(w))) &&
          (r.verbs === null || words.some((w) => r.verbs!.has(w))),
      )
      if (hit && (evidence[f] ??= []).length < 10) evidence[f]!.push(t.name)
    }
  }
  return { reach: REACH_FLAGS.filter((f) => evidence[f]), evidence }
}

/** Counts of tools by the server's own annotation hints (undefined = not declared). */
export function hintCounts(tools: ProbeTool[]) {
  return {
    readOnly: tools.filter((t) => t.annotations?.readOnlyHint === true).length,
    destructive: tools.filter((t) => t.annotations?.destructiveHint === true).length,
    undeclared: tools.filter((t) => t.annotations?.readOnlyHint === undefined).length,
  }
}
