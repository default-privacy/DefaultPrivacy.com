---
term: "Asymmetric Encryption"
slug: "asymmetric-encryption"
definition: "An encryption method using a pair of mathematically related keys: a public key for encryption and a private key for decryption. This solves the key distribution problem of symmetric encryption."
category: "Encryption"
relatedTerms:
  - "public-key-cryptography"
  - "encryption"
  - "rsa"
aliases:
  - "Public Key Encryption"
  - "PKE"
keywords:
  - "key pair"
  - "public private key"
  - "asymmetric cryptography"
  - "two key encryption"
---

Asymmetric encryption uses two keys that are mathematically linked but computationally impossible to derive from each other. What one key encrypts, only the other can decrypt.

## The Key Pair

### Public Key
- Freely shared with anyone
- Used to encrypt messages TO the owner
- Cannot decrypt what it encrypts

### Private Key
- Kept absolutely secret
- Used to decrypt messages
- Never shared with anyone

## How It Works

1. Alice generates a key pair (public + private)
2. Alice shares her public key openly
3. Bob encrypts a message using Alice's public key
4. Only Alice's private key can decrypt it
5. Even Bob can't decrypt what he just encrypted!

## Why It's Revolutionary

Before asymmetric encryption, secure communication required:
- Meeting in person to exchange keys
- Trusted couriers
- Pre-shared secrets

Now two strangers can communicate securely without ever meeting.

## Common Algorithms

- **RSA**: The original, still widely used
- **ECC** (Elliptic Curve): Smaller keys, same security
- **ElGamal**: Used in PGP
- **Diffie-Hellman**: Key exchange protocol

## Trade-offs

- **Slower** than symmetric encryption (1000x or more)
- **Larger keys** needed for equivalent security
- **Usually combined** with symmetric encryption in practice

## Hybrid Encryption

Most real-world systems use both:
1. Asymmetric to exchange a symmetric key
2. Symmetric for the actual data (fast)
3. Best of both worlds

