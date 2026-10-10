---
term: "Authenticated Encryption"
slug: "authenticated-encryption"
definition: "An encryption method that simultaneously provides confidentiality, integrity, and authenticity, ensuring data hasn't been tampered with."
category: "Encryption"
relatedTerms:
  - "aes-gcm"
  - "chacha20-poly1305"
aliases:
  - "AEAD"
---

Authenticated encryption solves the fundamental problem that encryption alone doesn't prevent modification.

## The Problem

- Standard encryption hides data but an attacker can flip bits in the ciphertext
- The decrypted result is garbage, but the system doesn't know that
- This enables attacks like padding oracles and ciphertext manipulation

## The Solution (AEAD)

Authenticated Encryption with Associated Data provides:
- **Confidentiality**: Data is encrypted
- **Integrity**: Any modification is detected
- **Authenticity**: Proves who encrypted the data
- **Associated Data**: Unencrypted metadata that's also integrity-protected

## Standard Algorithms

- AES-GCM: The most widely used AEAD
- ChaCha20-Poly1305: The main alternative

## Rule

Never use unauthenticated encryption (plain AES-CBC, AES-CTR) for new systems. Always use AEAD.
