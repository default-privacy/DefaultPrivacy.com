/**
 * SSRF guard for the website scanner.
 *
 * The scanner fetches user-supplied URLs server-side (Playwright). Without a guard a
 * caller could point it at cloud-metadata endpoints (169.254.169.254) or internal hosts.
 * assertSafeScanTarget() enforces https-only, a standard port, no embedded credentials,
 * and rejects any hostname that resolves to a private / loopback / link-local / reserved
 * address. We resolve-then-check to blunt DNS rebinding; full connection pinning is not
 * available through Playwright, so this is a best-effort guard at the DNS layer.
 */

import { lookup } from "node:dns/promises"
import net from "node:net"

export class UnsafeScanTargetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnsafeScanTargetError"
  }
}

const ALLOWED_PORTS = new Set(["", "443"])
const BLOCKED_HOST_SUFFIXES = [".localhost", ".local", ".internal"]

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number)
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    return true // malformed → treat as unsafe
  }
  const [a, b, c] = parts
  if (a === 0) return true // 0.0.0.0/8
  if (a === 10) return true // private
  if (a === 127) return true // loopback
  if (a === 169 && b === 254) return true // link-local (cloud metadata)
  if (a === 172 && b >= 16 && b <= 31) return true // private
  if (a === 192 && b === 168) return true // private
  if (a === 100 && b >= 64 && b <= 127) return true // CGNAT (100.64/10)
  if (a === 192 && b === 0 && c === 0) return true // IETF protocol assignments
  if (a === 198 && (b === 18 || b === 19)) return true // benchmarking
  if (a >= 224) return true // multicast + reserved (224.0.0.0/3)
  return false
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase().split("%")[0] // strip zone id
  // IPv4-mapped (::ffff:x.x.x.x). The WHATWG URL parser serializes the embedded IPv4 as
  // hex (::ffff:7f00:1), so match BOTH the dotted and hex forms — otherwise a mapped
  // loopback / metadata address (e.g. ::ffff:a9fe:a9fe = 169.254.169.254) bypasses the guard.
  const mappedDotted = lower.match(/^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/)
  if (mappedDotted) return isPrivateIPv4(mappedDotted[1])
  const mappedHex = lower.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/)
  if (mappedHex) {
    const hi = parseInt(mappedHex[1], 16)
    const lo = parseInt(mappedHex[2], 16)
    return isPrivateIPv4(`${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}`)
  }
  if (lower === "::1" || lower === "::") return true // loopback / unspecified
  if (
    lower.startsWith("fe8") ||
    lower.startsWith("fe9") ||
    lower.startsWith("fea") ||
    lower.startsWith("feb")
  ) {
    return true // fe80::/10 link-local
  }
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true // fc00::/7 unique-local
  return false
}

/** True for any address the scanner must never reach: private, loopback, link-local, reserved, or not an IP. */
export function isPrivateIp(ip: string): boolean {
  const family = net.isIP(ip)
  if (family === 4) return isPrivateIPv4(ip)
  if (family === 6) return isPrivateIPv6(ip)
  return true // not a valid IP literal → unsafe
}

/**
 * Resolve a hostname (or parse an IP literal) and decide whether it is a public,
 * non-reserved address the scanner may reach. Resolve-then-check blunts DNS rebinding;
 * fail-closed on any resolution error. Shared by the initial-target guard and the
 * per-request route guard.
 */
async function isHostAllowed(rawHost: string): Promise<boolean> {
  const host = rawHost.replace(/^\[|\]$/g, "") // strip IPv6 brackets
  if (!host) return false
  if (host === "localhost" || BLOCKED_HOST_SUFFIXES.some((s) => host.endsWith(s))) {
    return false
  }
  // IP literal → check directly (no DNS)
  if (net.isIP(host)) return !isPrivateIp(host)
  // Hostname → resolve every address; reject if ANY is private/reserved.
  let addresses: { address: string }[]
  try {
    addresses = await lookup(host, { all: true })
  } catch {
    return false
  }
  return addresses.length > 0 && addresses.every(({ address }) => !isPrivateIp(address))
}

/**
 * Validate a scan target and return its normalized URL, or throw UnsafeScanTargetError.
 */
export async function assertSafeScanTarget(rawUrl: string): Promise<string> {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new UnsafeScanTargetError("Invalid URL")
  }

  if (parsed.protocol !== "https:") {
    throw new UnsafeScanTargetError("Only https:// targets can be scanned")
  }
  if (!ALLOWED_PORTS.has(parsed.port)) {
    throw new UnsafeScanTargetError("Only the standard HTTPS port is allowed")
  }
  if (parsed.username || parsed.password) {
    throw new UnsafeScanTargetError("Credentials in the URL are not allowed")
  }

  if (!(await isHostAllowed(parsed.hostname))) {
    throw new UnsafeScanTargetError(
      "Target host is not permitted or resolves to a private/reserved address",
    )
  }

  return parsed.toString()
}

/**
 * Per-request guard for the Playwright route interceptor (N5). assertSafeScanTarget only
 * vets the INITIAL target; redirects and subresources are not covered by that one-time
 * check — a 3xx to http://169.254.169.254/ (cloud metadata) or an internal host would
 * otherwise be fetched. Every intercepted request is re-validated here.
 *
 * Policy: only TLS schemes (https / wss) to a public host may load. Plain http (the metadata
 * endpoint is http), ws, and exotic schemes (file / ftp / gopher) are blocked outright;
 * data: and blob: never reach a remote host and are allowed.
 *
 * Best-effort at the DNS layer — Playwright exposes no connection pinning, so a sub-TTL DNS
 * rebind between this lookup and the browser's own resolution remains theoretically possible.
 */
export async function isScanRequestAllowed(rawUrl: string): Promise<boolean> {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return false
  }
  if (parsed.protocol === "data:" || parsed.protocol === "blob:") return true
  if (parsed.protocol !== "https:" && parsed.protocol !== "wss:") return false
  return isHostAllowed(parsed.hostname)
}
