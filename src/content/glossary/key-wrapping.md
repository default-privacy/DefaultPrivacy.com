---
term: "Key Wrapping"
slug: "key-wrapping"
definition: "A technique for encrypting cryptographic keys using another key, protecting keys at rest and during transport."
category: "Encryption"
relatedTerms:
  - "aes"
  - "key-exchange"
  - "encryption-at-rest"
---

Key wrapping ensures that encryption keys are never stored or transmitted in plaintext.

## Why It Matters

- Encryption is only as strong as how well the keys are protected
- Keys need to be stored somewhere — wrapping encrypts them at rest
- When keys are sent between systems, wrapping protects them in transit

## How It Works

- A Key Encryption Key (KEK) encrypts the actual data encryption keys
- The KEK is stored separately (often in a hardware security module)
- To use a data key, you first unwrap it with the KEK

## Standards

- AES Key Wrap (RFC 3394) is the most common algorithm
- Used in PGP, S/MIME, TLS, and cloud key management services

## The Key Hierarchy

Most systems use a hierarchy: Master Key > Key Encryption Keys > Data Encryption Keys. This limits the damage if any single key is compromised.
