---
term: "Scrypt"
slug: "scrypt"
definition: "A memory-hard key derivation function designed to make brute-force attacks expensive by requiring large amounts of RAM."
category: "Encryption"
relatedTerms:
  - "argon2"
  - "key-derivation-function"
  - "salt"
  - "brute-force"
---

Scrypt was created by Colin Percival as a defense against hardware-accelerated password cracking.

## How It Works

- Generates a large block of pseudorandom data in memory
- Repeatedly reads from random locations in this block
- The large memory requirement makes parallel attacks (GPUs, ASICs) expensive

## Compared to Argon2

- Scrypt was the first widely-adopted memory-hard function
- Argon2 (2015) improved on scrypt's design and won the Password Hashing Competition
- Scrypt is still secure and widely deployed
- New projects should prefer Argon2id

## Where It's Used

- Cryptocurrency mining (Litecoin, Dogecoin)
- Password hashing in various applications
- Key derivation for disk encryption
- Tarsnap backup service
