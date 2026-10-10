---
term: "Cryptographic Agility"
slug: "cryptographic-agility"
definition: "The ability of a system to quickly switch between cryptographic algorithms without major redesign — critical for transitioning to post-quantum encryption and responding to algorithm breaks."
category: "Encryption"
relatedTerms:
  - "post-quantum-cryptography"
  - "quantum-computing-threat"
  - "cipher-suite"
  - "nist-pqc-standards"
aliases:
  - "Crypto Agility"
  - "Algorithm Agility"
keywords:
  - "cryptographic agility"
  - "switching encryption algorithms"
  - "quantum ready encryption"
  - "future proof encryption"
---

Cryptographic agility is insurance against the future. When an encryption algorithm is broken — by quantum computers, mathematical breakthroughs, or implementation flaws — systems with crypto agility can switch to a new algorithm quickly.

## Why It Matters

History shows that algorithms get broken:
- **DES** (1977): Considered secure, broken by brute force by 1999
- **MD5** (1992): Collision attacks found in 2004, completely broken by 2008
- **SHA-1** (1995): Theoretical breaks in 2005, practical collision in 2017
- **RC4** (1987): Weaknesses discovered, deprecated from TLS in 2015
- **RSA and ECC**: Will be broken by quantum computers (timeline: 10-20 years)

Each time, systems that were locked to a single algorithm faced expensive, slow migrations. Systems with cryptographic agility could switch quickly.

## What It Looks Like

### Agile Systems
- TLS protocol: Negotiates cipher suites — when one is deprecated, servers and clients can switch
- Signal protocol: Added post-quantum key exchange (PQXDH) alongside existing X3DH
- SSH: Supports multiple key types (RSA, Ed25519, now exploring PQ)

### Non-Agile Systems
- Bitcoin: Hardcoded to ECDSA (secp256k1) — migrating requires a network-wide consensus change
- Many IoT devices: Firmware-locked encryption with no update mechanism
- Legacy enterprise systems: Encryption deeply embedded in code with no abstraction layer

## For Users

1. **Choose software that updates regularly** — Updates are how new algorithms reach you
2. **Prefer services actively implementing PQ** — It shows they're thinking about algorithm transitions
3. **Don't rely on single-algorithm systems** for long-term secrets
4. **Keep devices updated** — Many PQ transitions will arrive as standard software updates
5. **Favor open-source** — Open-source projects can be audited for cryptographic agility
