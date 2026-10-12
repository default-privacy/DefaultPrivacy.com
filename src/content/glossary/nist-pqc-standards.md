---
term: "NIST Post-Quantum Standards"
slug: "nist-pqc-standards"
definition: "The new cryptographic standards published by the US National Institute of Standards and Technology (NIST) to replace vulnerable RSA and ECC algorithms before quantum computers can break them."
category: "Encryption"
relatedTerms:
  - "post-quantum-cryptography"
  - "quantum-computing-threat"
  - "harvest-now-decrypt-later"
  - "cryptographic-agility"
aliases:
  - "NIST PQC"
  - "Post-Quantum Standards"
  - "FIPS 203"
  - "FIPS 204"
  - "FIPS 205"
keywords:
  - "NIST post quantum standards"
  - "new encryption standards"
  - "FIPS 203 204 205"
  - "quantum safe standards"
---

NIST's post-quantum standards are the most significant update to cryptographic standards since the adoption of AES in 2001. They define the algorithms that will protect digital communications for decades.

## The Standards (Finalized 2024)

| Standard | Algorithm | Type | Based On | Use Case |
|----------|-----------|------|----------|----------|
| **FIPS 203** | ML-KEM (Kyber) | Key encapsulation | Lattice problems | TLS, VPNs, key exchange |
| **FIPS 204** | ML-DSA (Dilithium) | Digital signature | Lattice problems | Code signing, certificates, auth |
| **FIPS 205** | SLH-DSA (SPHINCS+) | Digital signature | Hash functions | Where conservative security is needed |

**Coming soon:**
- **FN-DSA (FALCON)**: Compact lattice-based signatures (expected 2025)
- Additional algorithms from ongoing evaluation rounds

## Why Lattice-Based?

Most selected algorithms use lattice mathematics — a class of problems believed to be hard for both classical and quantum computers. The "Learning With Errors" (LWE) problem and its variants have been studied for decades without practical breaks.

## Migration Timeline

| System | Expected PQ Migration |
|--------|----------------------|
| Web browsers (TLS) | 2024-2026 |
| Messaging apps | 2023-2025 (Signal, iMessage already done) |
| VPNs | 2025-2027 |
| Email (S/MIME, PGP) | 2026-2028 |
| SSH | 2025-2027 |
| Cryptocurrency | 2027-2030+ (requires consensus changes) |
| IoT devices | 2028+ (many will never migrate) |
| Government systems | 2025-2035 (NSA mandate: all classified systems PQ by 2035) |

## What This Means for You

- Software you use will gradually switch to these algorithms through regular updates
- **Keep everything updated** — PQ protection arrives via updates
- The transition is happening behind the scenes for most users
- For long-term encrypted data, the transition urgency is higher
- If you manage servers or infrastructure, start planning PQ migration now

## The Bigger Picture

NIST PQC standards represent a global coordination effort to prevent a cryptographic catastrophe. Unlike Y2K, there's no fixed deadline — quantum computers could arrive in 10 years or 30. The standards exist so migration can begin now rather than in a panic when the first large quantum computer is announced.
