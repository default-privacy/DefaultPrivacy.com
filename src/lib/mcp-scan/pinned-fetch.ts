/**
 * HTTPS request to a host we do not trust (any server listed in the MCP registry).
 *
 * Adapted from default-privacy-v4's safe-fetch, itself ported from @veniceai/mcp-server
 * (MIT, Copyright (c) 2026 Venice AI), src/tools/remote-fetch.ts. Changes here: POST with
 * a body, https and port 443 only, redirects are returned rather than followed, and the
 * address check is the live scanner guard's (`isPrivateIp`).
 *
 * The point is DNS-rebinding defense: we resolve the hostname once, refuse it if ANY
 * address is private or reserved, then connect to that exact address. A hostile entry
 * cannot answer "1.2.3.4" to the check and "192.168.1.1" to the connection.
 */

import { lookup } from "node:dns/promises"
import https from "node:https"
import { isIP } from "node:net"
import type { RequestOptions } from "node:https"
import { isPrivateIp } from "@/lib/scanner/ssrf-guard"

export type PinnedResponse = { status: number; headers: Record<string, string>; body: string }

export class PinnedFetchError extends Error {
  constructor(
    message: string,
    public readonly code: "URL_BLOCKED" | "ADDRESS_BLOCKED" | "DNS_FAILED" | "TIMEOUT" | "TOO_LARGE" | "NETWORK",
  ) {
    super(message)
    this.name = "PinnedFetchError"
  }
}

type Lookup = (hostname: string) => Promise<string[]>

export type PinnedFetchOptions = {
  method?: "GET" | "POST"
  headers?: Record<string, string>
  body?: string
  timeoutMs?: number
  maxBytes?: number
  /** Test hook. */
  lookupAddresses?: Lookup
}

const defaultLookup: Lookup = async (hostname) => {
  const records = await lookup(hostname, { all: true, verbatim: true })
  // IPv4 first: this box has no working IPv6 route, and most hosts offer both.
  return records.sort((a, b) => a.family - b.family).map((r) => r.address)
}

/** Resolve and vet a URL. Returns the addresses to connect to, or throws. */
export async function vetUrl(url: URL, lookupAddresses: Lookup = defaultLookup): Promise<string[]> {
  if (url.protocol !== "https:") throw new PinnedFetchError(`Only https is allowed: ${url.protocol}`, "URL_BLOCKED")
  if (url.port && url.port !== "443") throw new PinnedFetchError(`Only port 443 is allowed: ${url.port}`, "URL_BLOCKED")
  if (url.username || url.password) throw new PinnedFetchError("Credentials in the URL are not allowed", "URL_BLOCKED")
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase()
  if (host === "localhost" || /\.(localhost|local|internal)$/.test(host)) {
    throw new PinnedFetchError(`Local hostname: ${host}`, "URL_BLOCKED")
  }
  let addresses: string[]
  try {
    addresses = isIP(host) ? [host] : await lookupAddresses(host)
  } catch {
    throw new PinnedFetchError(`Could not resolve ${host}`, "DNS_FAILED")
  }
  if (addresses.length === 0) throw new PinnedFetchError(`Could not resolve ${host}`, "DNS_FAILED")
  const bad = addresses.find((a) => isPrivateIp(a))
  if (bad) throw new PinnedFetchError(`Resolves to a private or reserved address: ${bad}`, "ADDRESS_BLOCKED")
  return addresses
}

export async function pinnedFetch(rawUrl: string, opts: PinnedFetchOptions = {}): Promise<PinnedResponse> {
  const url = new URL(rawUrl)
  const addresses = await vetUrl(url, opts.lookupAddresses)
  let last: unknown
  for (const address of addresses) {
    try {
      return await requestAt(url, address, opts)
    } catch (err) {
      if (err instanceof PinnedFetchError && (err.code === "TIMEOUT" || err.code === "TOO_LARGE")) throw err
      last = err
    }
  }
  throw last instanceof PinnedFetchError ? last : new PinnedFetchError(String((last as Error)?.message ?? last), "NETWORK")
}

function requestAt(url: URL, address: string, opts: PinnedFetchOptions): Promise<PinnedResponse> {
  const family = isIP(address)
  const timeoutMs = opts.timeoutMs ?? 15_000
  const maxBytes = opts.maxBytes ?? 2 * 1024 * 1024
  const body = opts.body ?? ""
  const options: RequestOptions = {
    hostname: url.hostname,
    servername: url.hostname,
    port: 443,
    path: `${url.pathname}${url.search}`,
    method: opts.method ?? (opts.body ? "POST" : "GET"),
    headers: { ...opts.headers, host: url.host, "content-length": String(Buffer.byteLength(body)) },
    lookup: ((_h: string, o: { all?: boolean }, cb: (...a: unknown[]) => void) =>
      o?.all ? cb(null, [{ address, family }]) : cb(null, address, family)) as unknown as RequestOptions["lookup"],
  }
  return new Promise((resolveOuter, rejectOuter) => {
    let settled = false
    const done = (fn: () => void) => { if (!settled) { settled = true; clearTimeout(deadline); fn() } }
    const resolve = (v: PinnedResponse) => done(() => resolveOuter(v))
    const reject = (e: unknown) => done(() => rejectOuter(e))
    const req = https.request(options, (res) => {
      // Pinning check: refuse if the socket somehow landed elsewhere.
      const remote = res.socket?.remoteAddress?.replace(/^::ffff:/, "")
      if (remote && remote !== address.replace(/^::ffff:/, "")) {
        req.destroy()
        return reject(new PinnedFetchError(`Connected to ${remote}, expected ${address}`, "ADDRESS_BLOCKED"))
      }
      const chunks: Buffer[] = []
      let total = 0
      res.on("data", (c: Buffer) => {
        total += c.length
        if (total > maxBytes) {
          req.destroy()
          reject(new PinnedFetchError(`Response over ${maxBytes} bytes`, "TOO_LARGE"))
        } else chunks.push(c)
      })
      res.on("end", () => {
        const headers: Record<string, string> = {}
        for (const [k, v] of Object.entries(res.headers)) if (v !== undefined) headers[k] = Array.isArray(v) ? v.join(", ") : v
        resolve({ status: res.statusCode ?? 0, headers, body: Buffer.concat(chunks).toString("utf8") })
      })
      res.on("error", (e) => reject(new PinnedFetchError(e.message, "NETWORK")))
    })
    // Hard deadline for the whole exchange. It settles the promise itself: under Bun,
    // destroying a request after the response has started neither closes the socket nor
    // fires 'error' or 'end', so waiting on events alone hung three workers for an hour.
    const deadline = setTimeout(() => {
      reject(new PinnedFetchError(`Timed out after ${timeoutMs} ms`, "TIMEOUT"))
      req.destroy()
      req.socket?.destroy()
    }, timeoutMs)
    req.on("error", (e) => reject(e instanceof PinnedFetchError ? e : new PinnedFetchError(e.message, "NETWORK")))
    req.end(body)
  })
}
