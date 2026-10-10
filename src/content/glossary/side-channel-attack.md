---
term: "Side-Channel Attack"
slug: "side-channel-attack"
definition: "An attack that exploits indirect information leakage from a system — such as timing, power consumption, or electromagnetic emissions — rather than breaking the cryptography directly."
category: "Attacks"
relatedTerms:
  - "cryptanalysis"
  - "encryption"
---

Side-channel attacks bypass cryptographic security by observing the physical characteristics of the system performing the encryption.

## Types

- **Timing attacks**: Measuring how long operations take reveals information about the key
- **Power analysis**: Monitoring power consumption during cryptographic operations
- **Electromagnetic emissions**: Capturing EM radiation from processors
- **Acoustic cryptanalysis**: Listening to sounds made by computer hardware
- **Cache timing**: Exploiting CPU cache behavior to extract keys

## Famous Examples

- **Spectre/Meltdown** (2018): CPU speculative execution leaks data across security boundaries
- **TEMPEST**: NSA program for capturing EM emissions from equipment
- **Hertzbleed** (2022): CPU frequency scaling leaks cryptographic keys

## Defense

- Constant-time implementations (algorithms that take the same time regardless of input)
- Hardware countermeasures (noise generation, power regulation)
- Algorithms designed for side-channel resistance (Curve25519, ChaCha20)
