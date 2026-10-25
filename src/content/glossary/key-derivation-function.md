---
term: "Key Derivation Function"
abbr: "KDF"
slug: "key-derivation-function"
definition: "A cryptographic function that derives one or more secret keys from a master secret, password, or other source of entropy. KDFs add security through computational cost and produce keys of the required length and format."
category: "Encryption"
relatedTerms:
  - "hash-function"
  - "password-manager"
  - "salt"
aliases:
  - "KDF"
  - "Key Stretching"
keywords:
  - "PBKDF2"
  - "scrypt"
  - "argon2"
  - "HKDF"
  - "password stretching"
---

Key Derivation Functions transform weak input (like passwords) into strong cryptographic keys. They're designed to be intentionally slow, making brute-force attacks impractical.

## Why Not Just Hash?

A simple hash is too fast:
- Modern GPUs can compute billions of SHA-256 hashes per second
- Short passwords can be cracked quickly
- KDFs add intentional slowness

## Types of KDFs

### Password-Based KDFs
Designed for human-chosen passwords:
- **Argon2**: Modern winner, memory-hard
- **bcrypt**: Time-tested, widely used
- **scrypt**: Memory-hard predecessor to Argon2
- **PBKDF2**: Older but still acceptable

### General-Purpose KDFs
For deriving keys from good entropy:
- **HKDF**: Extract-and-expand paradigm
- **Used when** input already has high entropy

## Argon2 (Recommended)

Winner of the Password Hashing Competition:

### Variants
- **Argon2d**: Maximum resistance to GPU attacks
- **Argon2i**: Resistant to side-channel attacks
- **Argon2id**: Hybrid, recommended for most uses

### Parameters
- **Memory**: Amount of RAM required
- **Iterations**: Time cost
- **Parallelism**: Number of threads

## How KDFs Protect Passwords

```
User password: "cat123"

Without KDF:
SHA256("cat123") → cracked in milliseconds

With Argon2 (100ms per attempt):
Argon2("cat123", salt, params) → 10 guesses/second max
```

At 10 guesses/second:
- 1 million passwords = 27 hours
- 1 billion passwords = 3 years

## Key Stretching Parameters

### Time Cost
- How long each derivation takes
- Balance security vs user experience
- Login: 100-500ms acceptable
- Encryption: can be longer

### Memory Cost
- RAM required per derivation
- Defeats GPU/ASIC attacks
- GPUs have limited memory per core

### Parallelism
- CPU threads used
- More threads = faster on multi-core
- But also more resources for attackers

## Best Practices

1. **Use Argon2id** for new applications
2. **Tune parameters** for ~100-500ms on target hardware
3. **Re-hash** stored passwords when upgrading
4. **Use unique salt** per password
5. **Never** roll your own KDF

