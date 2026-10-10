---
term: "Nonce"
slug: "nonce"
definition: "A 'number used once'—a random or sequential value that ensures cryptographic operations produce unique results even with the same key. Nonces prevent replay attacks and are critical for secure encryption modes."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "aes"
  - "salt"
aliases:
  - "Number Used Once"
  - "IV"
  - "Initialization Vector"
keywords:
  - "cryptographic nonce"
  - "initialization vector"
  - "replay attack"
  - "unique value"
---

A nonce ensures that encrypting the same data with the same key produces different ciphertext each time. Without nonces, patterns in encrypted data could reveal information about the plaintext.

## Why Nonces Matter

Without a nonce:
```
encrypt("Hello", key) = "x7Kj9mN3"
encrypt("Hello", key) = "x7Kj9mN3"  (same!)
```

Attacker learns you sent the same message twice.

With a nonce:
```
encrypt("Hello", key, nonce1) = "x7Kj9mN3"
encrypt("Hello", key, nonce2) = "pQ8rS2tU"  (different!)
```

Each encryption looks completely different.

## Nonce vs Salt vs IV

| Term | Purpose | Secrecy | Uniqueness |
|------|---------|---------|------------|
| Nonce | Encryption uniqueness | Public | Must never repeat with same key |
| Salt | Password hashing | Public | Unique per password |
| IV | Block cipher initialization | Public | Must not repeat (usually random) |

IV is often used interchangeably with nonce, though technically IVs have specific requirements depending on the cipher mode.

## Critical Rule: Never Reuse

Reusing a nonce with the same key is catastrophic:

### For Stream Ciphers (ChaCha20)
- XOR of two ciphertexts = XOR of plaintexts
- Plaintext can be recovered

### For AES-GCM
- Authentication is completely broken
- Attackers can forge messages

## How to Generate Nonces

### Random Nonces
- Generate using secure random source
- Works well for most cases
- Risk: collision with large message volumes

### Counter Nonces
- Increment for each message
- Never repeats (if managed correctly)
- Must persist counter state

### Combination
- Random + counter
- Best of both approaches
- Used in some protocols

## Nonces in Practice

### TLS
- Random nonces in handshake
- Counter-based for record encryption

### Cryptocurrency
- Transaction nonces prevent replay
- Mining nonces for proof-of-work

### API Security
- Request nonces prevent replay attacks
- Time-limited validity

