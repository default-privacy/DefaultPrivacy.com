/**
 * Web Bot Auth — Ed25519 identity directory per the draft-meunier-web-bot-auth
 * architecture and RFC 9421 (HTTP Message Signatures). Publishes a JWKS at
 * /.well-known/http-message-signatures-directory so origin servers can verify
 * any future signed HTTP requests originating from this service.
 *
 * The public JWKs come from env (`WEB_BOT_AUTH_PUBLIC_KEYS_JWKS_JSON` — a JSON
 * array of JWK objects) so key material lives outside the repo. The private
 * key (`WEB_BOT_AUTH_PRIVATE_KEY_JWK_JSON`) is parallel-tracked but only used
 * if a future caller wires outbound signing.
 *
 * Generate a fresh keypair with `bun scripts/generate-web-bot-auth-key.ts`.
 */

import { createPrivateKey, sign as nodeSign } from "node:crypto"
import { z } from "zod"

/* ------------------------------------------------------------------ */
/* JWK schemas (Ed25519 / RFC 8037 + JWS alg per RFC 8037 §3.1)        */
/* ------------------------------------------------------------------ */

const BASE64URL = /^[A-Za-z0-9_-]+$/

const publicJwkSchema = z.object({
  kty: z.literal("OKP"),
  crv: z.literal("Ed25519"),
  x: z.string().regex(BASE64URL, "x must be base64url"),
  kid: z.string().min(1),
  use: z.literal("sig").optional(),
  alg: z.literal("EdDSA").optional(),
  nbf: z.number().int().optional(),
  exp: z.number().int().optional(),
})

const privateJwkSchema = publicJwkSchema.extend({
  d: z.string().regex(BASE64URL, "d must be base64url"),
})

export type PublicEd25519Jwk = z.infer<typeof publicJwkSchema>
export type PrivateEd25519Jwk = z.infer<typeof privateJwkSchema>

/* ------------------------------------------------------------------ */
/* Public-key directory                                                */
/* ------------------------------------------------------------------ */

/**
 * Parse the JWKS env value. Returns the parsed key array or null when the
 * env is unset/empty — callers map null to a 404 on the directory route.
 * Throws on a present-but-malformed value so misconfiguration fails loud.
 */
export function parsePublicJwks(value: string | undefined): PublicEd25519Jwk[] | null {
  if (!value || value.trim().length === 0) return null

  let raw: unknown
  try {
    raw = JSON.parse(value)
  } catch {
    throw new Error("WEB_BOT_AUTH_PUBLIC_KEYS_JWKS_JSON is not valid JSON")
  }

  const arr = Array.isArray(raw) ? raw : [raw]
  if (arr.length === 0) return null

  const parsed = z.array(publicJwkSchema).safeParse(arr)
  if (!parsed.success) {
    throw new Error(
      `WEB_BOT_AUTH_PUBLIC_KEYS_JWKS_JSON failed schema validation: ${parsed.error.message}`,
    )
  }

  const ids = new Set<string>()
  for (const jwk of parsed.data) {
    if (ids.has(jwk.kid)) {
      throw new Error(`WEB_BOT_AUTH_PUBLIC_KEYS_JWKS_JSON has duplicate kid: ${jwk.kid}`)
    }
    ids.add(jwk.kid)
    // Ed25519 public keys are exactly 32 bytes — 43 base64url chars without padding.
    if (jwk.x.length !== 43) {
      throw new Error(
        `WEB_BOT_AUTH_PUBLIC_KEYS_JWKS_JSON kid=${jwk.kid}: x must be 43 base64url chars (32-byte Ed25519 public key)`,
      )
    }
  }

  return parsed.data
}

export type WebBotAuthDirectory = {
  /** JWKS shape per RFC 7517. */
  keys: PublicEd25519Jwk[]
}

export function buildDirectory(keys: PublicEd25519Jwk[]): WebBotAuthDirectory {
  return { keys }
}

/* ------------------------------------------------------------------ */
/* Signing primitive (RFC 9421 ed25519 algorithm)                      */
/* ------------------------------------------------------------------ */

export function parsePrivateJwk(value: string | undefined): PrivateEd25519Jwk | null {
  if (!value || value.trim().length === 0) return null
  let raw: unknown
  try {
    raw = JSON.parse(value)
  } catch {
    throw new Error("WEB_BOT_AUTH_PRIVATE_KEY_JWK_JSON is not valid JSON")
  }
  const parsed = privateJwkSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(
      `WEB_BOT_AUTH_PRIVATE_KEY_JWK_JSON failed schema validation: ${parsed.error.message}`,
    )
  }
  if (parsed.data.x.length !== 43 || parsed.data.d.length !== 43) {
    throw new Error(
      "WEB_BOT_AUTH_PRIVATE_KEY_JWK_JSON: x and d must each be 43 base64url chars (32 bytes)",
    )
  }
  return parsed.data
}

/**
 * Sign arbitrary bytes with the configured Ed25519 private key. Returns the
 * raw 64-byte signature. Callers build the RFC 9421 signature base above this.
 * Throws if no private key is configured.
 */
export function signEd25519(jwk: PrivateEd25519Jwk, message: Uint8Array): Uint8Array {
  const keyObject = createPrivateKey({ key: jwk, format: "jwk" })
  return new Uint8Array(nodeSign(null, message, keyObject))
}

/* ------------------------------------------------------------------ */
/* Spec-required URLs                                                  */
/* ------------------------------------------------------------------ */

export const WEB_BOT_AUTH_DIRECTORY_PATH = "/.well-known/http-message-signatures-directory"

export function directoryUrl(origin: string): string {
  return origin.replace(/\/$/, "") + WEB_BOT_AUTH_DIRECTORY_PATH
}
