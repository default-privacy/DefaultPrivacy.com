---
term: "Plausible Encryption"
slug: "plausible-encryption"
definition: "Encryption that produces ciphertext indistinguishable from random data, preventing adversaries from proving that encryption was used at all."
category: "Encryption"
relatedTerms:
  - "deniable-encryption"
  - "plausible-deniability"
  - "steganography"
---

Plausible encryption hides not just the content of data, but the very existence of encryption.

## Why It Matters

- In some jurisdictions, possessing encrypted data is suspicious or illegal
- Border agents may demand you decrypt devices if they detect encryption
- Plausible encryption lets you deny that encrypted data exists at all

## Techniques

- **VeraCrypt hidden volumes**: A container within a container
- **Steganography**: Hide encrypted data inside innocent-looking files
- **Disk encryption with hidden OS**: Boot into a decoy OS or the real one depending on password

## The Random Data Defense

Good encryption produces output indistinguishable from random data. If your disk is filled with "random" data (as from a secure erase), encrypted partitions blend in. Without the key, it's impossible to prove encrypted data exists.
