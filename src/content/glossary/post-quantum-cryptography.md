---
term: "Post-Quantum Cryptography"
slug: "post-quantum-cryptography"
definition: "Cryptographic algorithms designed to resist attacks from both classical and quantum computers — the next generation of encryption being standardized to replace RSA, ECC, and other vulnerable algorithms."
category: "Encryption"
relatedTerms:
  - "quantum-computing-threat"
  - "harvest-now-decrypt-later"
  - "nist-pqc-standards"
  - "cryptographic-agility"
  - "rsa"
  - "elliptic-curve-cryptography"
aliases:
  - "PQC"
  - "Quantum-Resistant Cryptography"
  - "Quantum-Safe Encryption"
keywords:
  - "post quantum cryptography"
  - "quantum resistant encryption"
  - "quantum safe algorithms"
  - "encryption after quantum computers"
---

Post-quantum cryptography isn't about encrypting things with quantum computers — it's about encrypting things that quantum computers can't break.

## Why It's Urgent Now

Current encryption (RSA, ECC) relies on math problems that quantum computers can solve efficiently:
- **RSA**: Based on factoring large numbers → Shor's algorithm breaks it
- **ECC**: Based on elliptic curve discrete logarithm → also broken by Shor's
- **Diffie-Hellman**: Key exchange based on discrete logarithm → broken

When sufficiently powerful quantum computers arrive, all of these become useless. And because of "harvest now, decrypt later" strategies, the urgency is today, not whenever quantum computers arrive.

## The New Algorithms

NIST finalized its first post-quantum standards in 2024:

### For Encryption / Key Exchange
- **ML-KEM (CRYSTALS-Kyber)**: Lattice-based key encapsulation. Fast, small keys. The primary standard for TLS and general encryption.

### For Digital Signatures
- **ML-DSA (CRYSTALS-Dilithium)**: Lattice-based signatures. Primary standard for most applications.
- **SLH-DSA (SPHINCS+)**: Hash-based signatures. Larger but based on extremely well-understood math (hash functions).
- **FN-DSA (FALCON)**: Lattice-based signatures with smaller sizes but more complex implementation.

## What's Already Migrating

- **Signal**: Added PQXDH (post-quantum key exchange) in 2023
- **Apple iMessage**: PQ3 protocol using ML-KEM since 2024
- **AWS**: Post-quantum TLS available for some services

## What It Means for You

1. **Your messaging may already be quantum-safe** — Signal and iMessage have migrated
2. **Web browsing** is transitioning
3. **VPNs** will need to upgrade — WireGuard and OpenVPN are working on PQ support
4. **Cryptocurrency** faces challenges — Bitcoin and Ethereum use ECDSA (vulnerable)
5. **Your current encrypted data** — Files encrypted with AES-256 are already quantum-safe (symmetric encryption is resistant)

## Action Items

1. **Use AES-256** for file encryption (quantum-resistant)
2. **Update software regularly** — PQ upgrades arrive through updates
3. **Think about long-term secrets** — If data needs to be protected for 10+ years, consider the quantum timeline now

For what to use, see [Signal vs SimpleX](/guides/signal-vs-simplex).
