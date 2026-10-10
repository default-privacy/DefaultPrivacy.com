---
term: "HMAC"
slug: "hmac"
definition: "A mechanism for verifying both the integrity and authenticity of a message using a cryptographic hash function combined with a secret key."
category: "Encryption"
relatedTerms:
  - "hash-function"
  - "sha-256"
  - "symmetric-encryption"
---

HMAC (Hash-based Message Authentication Code) proves that a message hasn't been tampered with and was created by someone who knows the secret key.

## How It Works

- Combines a hash function (like SHA-256) with a secret key
- The sender generates HMAC(key, message) and sends it alongside the message
- The receiver computes the same HMAC and compares
- If they match, the message is authentic and unmodified

## Unlike a Plain Hash

- A regular hash (SHA-256 of a message) can be recomputed by anyone
- HMAC requires the secret key — only authorized parties can create or verify it

## Where It's Used

- API authentication (signing requests)
- JWT (JSON Web Token) verification
- TLS record protocol
- Cookie signing in web applications

## HMAC is Not Encryption

HMAC verifies integrity and authenticity but does not hide the message content. The message is sent in plaintext alongside the HMAC.
