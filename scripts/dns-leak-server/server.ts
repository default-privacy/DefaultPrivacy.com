#!/usr/bin/env bun

/**
 * Default Privacy — DNS Leak Test Server
 *
 * Lightweight authoritative DNS server + HTTP API.
 * Runs on a VPS with NS records for leak.defaultprivacy.com pointing here.
 *
 * DNS flow:
 *   1. Client resolves {token}-{n}.leak.defaultprivacy.com
 *   2. User's DNS resolver queries this server (port 53)
 *   3. We log the resolver's IP against the token
 *   4. We respond with a dummy A record (127.0.0.1)
 *
 * HTTP API:
 *   GET /results/:token  — returns resolver IPs for that token
 *   GET /health          — health check
 *
 * Environment:
 *   DNS_LEAK_DOMAIN    — base domain (default: leak.defaultprivacy.com)
 *   HTTP_PORT          — HTTP API port (default: 8053)
 *   SHARED_SECRET      — required; authenticates requests from the Next.js app
 *   TOKEN_TTL_MS       — how long to keep token data (default: 300000 = 5 min)
 */

import { createSocket } from "dgram"
import { createServer } from "http"

// ─── Configuration ───────────────────────────────────────────────────────────

const DNS_LEAK_DOMAIN = process.env.DNS_LEAK_DOMAIN ?? "leak.defaultprivacy.com"
const HTTP_PORT = parseInt(process.env.HTTP_PORT ?? "8053", 10)
const SHARED_SECRET = process.env.SHARED_SECRET
const TOKEN_TTL_MS = parseInt(process.env.TOKEN_TTL_MS ?? "300000", 10)

if (!SHARED_SECRET) {
  console.error("[dns-leak] SHARED_SECRET is required")
  process.exit(1)
}

// ─── Token Store ─────────────────────────────────────────────────────────────

type ResolverEntry = {
  ip: string
  firstSeen: number
  queryCount: number
}

type TokenData = {
  resolvers: Map<string, ResolverEntry>
  createdAt: number
}

const tokenStore = new Map<string, TokenData>()

function recordResolver(token: string, resolverIp: string) {
  let data = tokenStore.get(token)
  if (!data) {
    data = { resolvers: new Map(), createdAt: Date.now() }
    tokenStore.set(token, data)
  }

  const existing = data.resolvers.get(resolverIp)
  if (existing) {
    existing.queryCount++
  } else {
    data.resolvers.set(resolverIp, {
      ip: resolverIp,
      firstSeen: Date.now(),
      queryCount: 1,
    })
  }
}

function getResolvers(token: string): ResolverEntry[] {
  const data = tokenStore.get(token)
  if (!data) return []
  return Array.from(data.resolvers.values())
}

// Cleanup expired tokens every 60s
setInterval(() => {
  const now = Date.now()
  for (const [token, data] of tokenStore) {
    if (now - data.createdAt > TOKEN_TTL_MS) {
      tokenStore.delete(token)
    }
  }
}, 60_000)

// ─── DNS Server (UDP port 53) ────────────────────────────────────────────────

/**
 * Minimal DNS response builder.
 * We only need to handle A record queries for *.leak.defaultprivacy.com
 * and respond with 127.0.0.1.
 */
function buildDnsResponse(
  queryBuffer: Buffer,
  _queryName: string,
): Buffer {
  const response = Buffer.alloc(512)
  let offset = 0

  // Copy transaction ID from query
  queryBuffer.copy(response, 0, 0, 2)
  offset = 2

  // Flags: standard response, authoritative, no error
  response.writeUInt16BE(0x8400, offset)
  offset += 2

  // Question count: 1
  response.writeUInt16BE(1, offset)
  offset += 2

  // Answer count: 1
  response.writeUInt16BE(1, offset)
  offset += 2

  // Authority + Additional: 0
  response.writeUInt16BE(0, offset)
  offset += 2
  response.writeUInt16BE(0, offset)
  offset += 2

  // Copy question section from query (starts at byte 12)
  const questionStart = 12
  let questionEnd = questionStart
  // Walk the labels to find end of QNAME
  while (queryBuffer[questionEnd] !== 0 && questionEnd < queryBuffer.length) {
    questionEnd += queryBuffer[questionEnd] + 1
  }
  questionEnd++ // null terminator
  questionEnd += 4 // QTYPE (2) + QCLASS (2)

  queryBuffer.copy(response, offset, questionStart, questionEnd)
  offset += questionEnd - questionStart

  // Answer section: pointer to name in question (0xC00C), A record, IN class
  // Name pointer
  response.writeUInt16BE(0xc00c, offset)
  offset += 2

  // Type A
  response.writeUInt16BE(1, offset)
  offset += 2

  // Class IN
  response.writeUInt16BE(1, offset)
  offset += 2

  // TTL: 0 (no caching)
  response.writeUInt32BE(0, offset)
  offset += 4

  // RDLENGTH: 4 bytes (IPv4)
  response.writeUInt16BE(4, offset)
  offset += 2

  // RDATA: 127.0.0.1
  response.writeUInt8(127, offset++)
  response.writeUInt8(0, offset++)
  response.writeUInt8(0, offset++)
  response.writeUInt8(1, offset++)

  return response.subarray(0, offset)
}

function parseDnsName(buf: Buffer, startOffset: number): { name: string; endOffset: number } {
  const labels: string[] = []
  let offset = startOffset

  while (offset < buf.length) {
    const len = buf[offset]
    if (len === 0) {
      offset++
      break
    }
    // Pointer (compression) — not expected for our use case but handle it
    if ((len & 0xc0) === 0xc0) {
      const pointer = buf.readUInt16BE(offset) & 0x3fff
      const { name } = parseDnsName(buf, pointer)
      labels.push(name)
      offset += 2
      return { name: labels.join("."), endOffset: offset }
    }
    offset++
    labels.push(buf.subarray(offset, offset + len).toString("ascii"))
    offset += len
  }

  return { name: labels.join("."), endOffset: offset }
}

const dnsServer = createSocket("udp4")

dnsServer.on("message", (msg, rinfo) => {
  try {
    const { name } = parseDnsName(msg, 12)
    const lowerName = name.toLowerCase()

    // Only respond to queries for our domain
    if (!lowerName.endsWith(DNS_LEAK_DOMAIN)) {
      return
    }

    // Extract token from subdomain: {token}-{n}.leak.defaultprivacy.com
    const prefix = lowerName.replace(`.${DNS_LEAK_DOMAIN}`, "")
    // Token format: {token}-{n} — extract just the token part
    const dashIdx = prefix.lastIndexOf("-")
    const token = dashIdx > 0 ? prefix.substring(0, dashIdx) : prefix

    if (token) {
      recordResolver(token, rinfo.address)
      console.log(`[dns] resolver answered ${lowerName} (token: ${token})`)
    }

    const response = buildDnsResponse(msg, lowerName)
    dnsServer.send(response, rinfo.port, rinfo.address)
  } catch (err) {
    console.error("[dns] Error processing query:", err)
  }
})

dnsServer.on("error", (err) => {
  console.error("[dns] Server error:", err)
})

dnsServer.bind(53, () => {
  console.log(`[dns] Listening on UDP port 53 for *.${DNS_LEAK_DOMAIN}`)
})

// ─── HTTP API ────────────────────────────────────────────────────────────────

const httpServer = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json")

  // Auth check (except health)
  if (req.url !== "/health") {
    const authHeader = req.headers.authorization
    if (authHeader !== `Bearer ${SHARED_SECRET}`) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: "Unauthorized" }))
      return
    }
  }

  // GET /health
  if (req.url === "/health") {
    res.writeHead(200)
    res.end(JSON.stringify({
      status: "ok",
      domain: DNS_LEAK_DOMAIN,
      activeTokens: tokenStore.size,
      uptime: process.uptime(),
    }))
    return
  }

  // GET /results/:token
  const resultsMatch = req.url?.match(/^\/results\/([a-z0-9]+)$/)
  if (resultsMatch && req.method === "GET") {
    const token = resultsMatch[1]
    const resolvers = getResolvers(token)

    res.writeHead(200)
    res.end(JSON.stringify({
      token,
      resolvers: resolvers.map((r) => ({
        ip: r.ip,
        firstSeen: r.firstSeen,
        queryCount: r.queryCount,
      })),
      resolverCount: resolvers.length,
    }))
    return
  }

  res.writeHead(404)
  res.end(JSON.stringify({ error: "Not found" }))
})

httpServer.listen(HTTP_PORT, () => {
  console.log(`[http] API listening on port ${HTTP_PORT}`)
  console.log(`[http] GET /results/:token  — fetch resolver IPs`)
  console.log(`[http] GET /health          — health check`)
})
