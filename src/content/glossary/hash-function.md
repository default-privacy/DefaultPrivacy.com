---
term: "Hash Function"
slug: "hash-function"
definition: "A mathematical function that converts any input data into a fixed-size string of characters (hash). Cryptographic hash functions are one-way, meaning you cannot reverse the process to recover the original data."
category: "Encryption"
relatedTerms:
  - "sha-256"
  - "encryption"
  - "password-manager"
aliases:
  - "Cryptographic Hash"
  - "Message Digest"
  - "Checksum"
keywords:
  - "hashing"
  - "digest"
  - "fingerprint"
  - "one-way function"
  - "collision resistance"
---

A hash function takes any input—a password, a file, an entire database—and produces a fixed-length "fingerprint." Change one bit of the input, and the entire hash changes dramatically.

## Key Properties

### One-Way (Pre-image Resistance)
- Given a hash, you can't find the original input
- The only way is to guess and check

### Deterministic
- Same input always produces same hash
- Essential for verification

### Collision Resistance
- Extremely hard to find two inputs with the same hash
- Critical for security

### Avalanche Effect
- Tiny input change = completely different hash
- No pattern to exploit

## Common Hash Functions

| Algorithm | Output Size | Status |
|-----------|-------------|--------|
| MD5 | 128 bits | Broken - don't use |
| SHA-1 | 160 bits | Weak - being phased out |
| SHA-256 | 256 bits | Secure - widely used |
| SHA-3 | Variable | Secure - newer standard |
| BLAKE2 | Variable | Secure - very fast |

## Use Cases

### Password Storage
- Never store passwords in plaintext
- Store hash instead
- Verify by hashing input and comparing

### File Integrity
- Download a file, compare hash
- If hashes match, file wasn't corrupted/tampered

### Digital Signatures
- Hash the document
- Sign the hash (much smaller than document)

### Blockchain
- Each block contains hash of previous block
- Tampering breaks the chain

## What Hashing Is NOT

- **Not encryption**: Can't be reversed
- **Not for hiding data**: Anyone can hash and compare
- **Not perfect**: Collisions theoretically possible (just computationally infeasible)

