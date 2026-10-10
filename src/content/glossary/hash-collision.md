---
term: "Hash Collision"
slug: "hash-collision"
definition: "When two different inputs produce the same hash output, potentially allowing an attacker to forge digital signatures or bypass integrity checks."
category: "Encryption"
relatedTerms:
  - "hash-function"
  - "sha-256"
  - "digital-signature"
---

Hash functions are designed to be collision-resistant, but some older algorithms have been broken.

## Broken Algorithms

- **MD5**: Practical collision attacks since 2004. NEVER use for security.
- **SHA-1**: First practical collision demonstrated in 2017. Being phased out.

## Safe Algorithms

- **SHA-256/SHA-3**: No practical collision attacks known
- **BLAKE2/BLAKE3**: Modern, fast, secure

## Impact of Collisions

- Forged digital signatures (two documents with the same hash)
- Bypassed file integrity checks
- Certificate forgery (if CA uses the vulnerable hash)

## The Flame Malware

The Flame malware (2012) exploited an MD5 collision to forge a Microsoft certificate, making it appear to be a legitimate Windows update. This demonstrated the real-world danger of hash collisions.
