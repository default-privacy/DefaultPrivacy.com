/**
 * Text written by someone other than Default Privacy (DNS records, WHOIS fields, registry
 * entries, breach write-ups) goes to an AI client inside tool output. Flatten it to one
 * line, drop control and invisible format characters (zero-width, bidi overrides, Unicode
 * tags, variation selectors), and cut it. Cutting cannot stop a short planted instruction; the tool output also
 * names these fields as third-party text.
 */
export function cleanThirdParty(value: string, max: number): string {
  const flat = value.replace(/[\p{Cc}\p{Cf}\u2028\u2029\u{FE00}-\u{FE0F}\u{E0100}-\u{E01EF}]+/gu, " ").replace(/\s+/g, " ").trim()
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat
}
