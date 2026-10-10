---
term: "Quantum Computing Threat"
slug: "quantum-computing-threat"
definition: "The risk that sufficiently powerful quantum computers will break widely-used encryption algorithms, potentially exposing all currently encrypted data."
category: "Emerging Threats"
relatedTerms:
  - "post-quantum-cryptography"
  - "rsa"
  - "elliptic-curve-cryptography"
---

Quantum computers don't just break encryption faster — they use entirely different mathematical approaches that make certain cryptographic problems trivial.

## What Breaks

- **RSA**: Factoring large numbers becomes easy (Shor's algorithm)
- **Elliptic Curve Cryptography**: Discrete logarithm problem becomes easy
- **Diffie-Hellman key exchange**: Same mathematical weakness
- **DSA/ECDSA**: Digital signatures broken

## What Survives

- **AES-256**: Grover's algorithm reduces effective security to AES-128 (still strong)
- **SHA-256**: Still resistant with doubled output
- **Post-quantum algorithms**: Lattice-based, hash-based, code-based cryptography

## Timeline

- Current quantum computers: ~1,000 qubits (not enough)
- Breaking RSA-2048 requires: ~4,000+ logical qubits
- Estimated timeline: 10-20 years (opinions vary widely)

## "Harvest Now, Decrypt Later"

Intelligence agencies are likely storing encrypted communications today, planning to decrypt them when quantum computers arrive. If your secrets need to be protected for decades, post-quantum encryption is already necessary.

## Action Items

1. Use services implementing post-quantum key exchange (Signal already does)
2. Migrate to post-quantum TLS as it becomes available
3. Use AES-256 for symmetric encryption (quantum-resistant)
4. Plan for cryptographic agility — the ability to switch algorithms quickly
