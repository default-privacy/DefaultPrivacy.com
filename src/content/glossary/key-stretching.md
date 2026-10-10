---
term: "Key Stretching"
slug: "key-stretching"
definition: "A technique that makes a short password harder to crack by passing it through a computationally expensive hashing function many times."
category: "Encryption"
relatedTerms:
  - "argon2"
  - "key-derivation-function"
  - "brute-force"
---

Key stretching deliberately slows down password verification, making brute-force attacks impractical.

## The Problem

- Users choose short, predictable passwords
- Fast hash functions (SHA-256) can be computed billions of times per second
- An 8-character password hashed once with SHA-256 can be cracked in minutes

## The Solution

- Run the password through a slow function thousands or millions of times
- Each guess takes milliseconds instead of nanoseconds
- A billion-guess-per-second attack drops to thousands per second

## Algorithms

- **Argon2id**: Best option — memory-hard and configurable
- **bcrypt**: Well-established, adjustable cost factor
- **scrypt**: Memory-hard predecessor to Argon2
- **PBKDF2**: Older, less resistant to GPU attacks

## Real Impact

- PBKDF2 with 100,000 iterations: ~10,000 guesses/sec on a GPU
- Argon2id with 64MB memory: ~100 guesses/sec on a GPU
- SHA-256 alone: ~10,000,000,000 guesses/sec on a GPU
