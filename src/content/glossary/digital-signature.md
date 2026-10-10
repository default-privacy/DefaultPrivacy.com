---
term: "Digital Signature"
slug: "digital-signature"
definition: "A cryptographic mechanism that proves the authenticity and integrity of a message or document, confirming it was created by the claimed sender and hasn't been altered."
category: "Encryption"
relatedTerms:
  - "public-key-cryptography"
  - "hash-function"
  - "pgp"
---

Digital signatures provide non-repudiation — proof that a specific party signed a specific message.

## How It Works

1. Signer hashes the message
2. Encrypts the hash with their private key (this is the signature)
3. Sends the message and signature
4. Recipient hashes the message independently
5. Decrypts the signature with the signer's public key
6. If the hashes match, the signature is valid

## Common Algorithms

- **Ed25519**: Fast, secure, deterministic. Recommended for new systems.
- **RSA-PSS**: Based on RSA. Widely supported.
- **ECDSA**: Elliptic curve. Used in Bitcoin and TLS.

## Applications

- Software code signing (verifying updates are genuine)
- Email signing (PGP, S/MIME)
- Cryptocurrency transactions
- Document signing (contracts, certificates)
- TLS certificates
