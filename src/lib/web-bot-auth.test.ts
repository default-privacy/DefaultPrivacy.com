import { generateKeyPairSync, createPublicKey } from "node:crypto"
import { describe, expect, it } from "vitest"

import {
  buildDirectory,
  directoryUrl,
  parsePrivateJwk,
  parsePublicJwks,
  signEd25519,
  WEB_BOT_AUTH_DIRECTORY_PATH,
} from "./web-bot-auth"

function freshKeypair(kid = "test-key") {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519")
  const publicJwk = { ...(publicKey.export({ format: "jwk" }) as Record<string, string>), kid }
  const privateJwk = {
    ...(privateKey.export({ format: "jwk" }) as Record<string, string>),
    kid,
  }
  return { publicJwk, privateJwk }
}

describe("parsePublicJwks", () => {
  it("returns null on unset / empty env so the route can 404 cleanly", () => {
    expect(parsePublicJwks(undefined)).toBeNull()
    expect(parsePublicJwks("")).toBeNull()
    expect(parsePublicJwks("   ")).toBeNull()
  })

  it("accepts a valid Ed25519 JWK array (raw env shape)", () => {
    const { publicJwk } = freshKeypair("prod-2026-05-27")
    const parsed = parsePublicJwks(JSON.stringify([publicJwk]))
    expect(parsed).toHaveLength(1)
    expect(parsed?.[0].kid).toBe("prod-2026-05-27")
    expect(parsed?.[0].kty).toBe("OKP")
    expect(parsed?.[0].crv).toBe("Ed25519")
  })

  it("accepts a single JWK (not in an array) by wrapping it", () => {
    const { publicJwk } = freshKeypair()
    const parsed = parsePublicJwks(JSON.stringify(publicJwk))
    expect(parsed).toHaveLength(1)
  })

  it("throws when the env value is not valid JSON", () => {
    expect(() => parsePublicJwks("{not json")).toThrow(/not valid JSON/)
  })

  it("rejects wrong kty / crv (e.g. RSA snuck into the directory)", () => {
    const bad = { kty: "RSA", crv: "Ed25519", x: "abc", kid: "k1" }
    expect(() => parsePublicJwks(JSON.stringify([bad]))).toThrow(/schema validation/)
  })

  it("rejects keys with the wrong x length (not a 32-byte Ed25519 key)", () => {
    const { publicJwk } = freshKeypair()
    const tooShort = { ...publicJwk, x: "AAAAAAAA" }
    expect(() => parsePublicJwks(JSON.stringify([tooShort]))).toThrow(/43 base64url chars/)
  })

  it("rejects duplicate kids so verifiers cannot pick the wrong key", () => {
    const { publicJwk: a } = freshKeypair("dup")
    const { publicJwk: b } = freshKeypair("dup")
    expect(() => parsePublicJwks(JSON.stringify([a, b]))).toThrow(/duplicate kid/)
  })
})

describe("buildDirectory", () => {
  it("emits a JWKS shape with `keys` per RFC 7517", () => {
    const { publicJwk } = freshKeypair()
    const directory = buildDirectory([publicJwk] as never)
    expect(directory).toHaveProperty("keys")
    expect(directory.keys).toHaveLength(1)
  })
})

describe("parsePrivateJwk + signEd25519", () => {
  it("round-trips: signs with the parsed private key and verifies against the public key", async () => {
    const { publicJwk, privateJwk } = freshKeypair("sig-test")
    const parsedPrivate = parsePrivateJwk(JSON.stringify(privateJwk))
    expect(parsedPrivate).not.toBeNull()

    const message = new TextEncoder().encode('"@method": GET\n"@path": /.well-known/x')
    const signature = signEd25519(parsedPrivate!, message)
    expect(signature).toHaveLength(64)

    // Verify with the public key to prove the keypair signed/verifies cleanly.
    const publicKey = createPublicKey({ key: publicJwk as never, format: "jwk" })
    const { verify: nodeVerify } = await import("node:crypto")
    const valid = nodeVerify(null, message, publicKey, signature)
    expect(valid).toBe(true)
  })

  it("rejects a private JWK missing the `d` parameter", () => {
    const { publicJwk } = freshKeypair()
    expect(() => parsePrivateJwk(JSON.stringify(publicJwk))).toThrow(/schema validation/)
  })

  it("returns null on unset env", () => {
    expect(parsePrivateJwk(undefined)).toBeNull()
    expect(parsePrivateJwk("")).toBeNull()
  })
})

describe("directoryUrl", () => {
  it("joins origin + spec path without double slash", () => {
    expect(directoryUrl("https://defaultprivacy.com")).toBe(
      `https://defaultprivacy.com${WEB_BOT_AUTH_DIRECTORY_PATH}`,
    )
    expect(directoryUrl("https://defaultprivacy.com/")).toBe(
      `https://defaultprivacy.com${WEB_BOT_AUTH_DIRECTORY_PATH}`,
    )
  })
})
