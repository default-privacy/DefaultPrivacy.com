---
term: "Cipher Suite"
slug: "cipher-suite"
definition: "A combination of encryption algorithms used together in a TLS connection, specifying the key exchange, authentication, encryption, and integrity methods."
category: "Encryption"
relatedTerms:
  - "tls"
  - "aes-gcm"
  - "chacha20-poly1305"
---

When your browser connects to a website over HTTPS, the cipher suite determines exactly which cryptographic algorithms are used.

## Components

- **Key Exchange**: How the session key is established (ECDHE, DHE)
- **Authentication**: How the server proves its identity (RSA, ECDSA, Ed25519)
- **Encryption**: How data is encrypted (AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305)
- **Hash**: For key derivation and integrity (SHA-256, SHA-384)

## Example

`TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` means:
- ECDHE key exchange (with forward secrecy)
- RSA server authentication
- AES-256-GCM encryption
- SHA-384 for hashing

## Recommended (TLS 1.3)

- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256
- TLS_AES_128_GCM_SHA256

TLS 1.3 only allows secure cipher suites — all weak options were removed.
