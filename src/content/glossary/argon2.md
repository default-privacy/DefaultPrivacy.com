---
term: "Argon2"
slug: "argon2"
definition: "The winner of the Password Hashing Competition, designed to be resistant to GPU and ASIC-based cracking by requiring large amounts of memory."
category: "Encryption"
relatedTerms:
  - "hash-function"
  - "salt"
  - "key-derivation-function"
  - "brute-force"
---

Argon2 is the current state-of-the-art password hashing function, succeeding bcrypt and scrypt.

## Why Argon2

- **Memory-hard**: Requires significant RAM, making GPU/ASIC attacks expensive
- **Configurable**: Adjust memory, time, and parallelism independently
- **Three variants**: Argon2d (data-dependent), Argon2i (data-independent), Argon2id (hybrid — recommended)

## Compared to Other Hashing

| Algorithm | Memory-Hard | GPU-Resistant | Modern |
|-----------|------------|---------------|--------|
| MD5/SHA-1 | No | No | No (broken) |
| bcrypt | Partially | Partially | Aging |
| scrypt | Yes | Yes | Good |
| Argon2id | Yes | Yes | Best |

## Recommended Parameters

For password hashing in 2024+:
- Memory: 64 MB minimum (more is better)
- Iterations: 3+
- Parallelism: Match available CPU cores

## Where It's Used

Bitwarden, 1Password, KeePassXC, and many modern applications use Argon2id for password hashing.
