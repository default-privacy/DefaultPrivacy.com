---
term: "Security Through Obscurity"
slug: "security-through-obscurity"
definition: "The flawed practice of relying on secrecy of design or implementation as the primary security mechanism, rather than proven cryptographic methods."
category: "OpSec"
relatedTerms:
  - "open-source"
  - "operational-security"
---

Security through obscurity is considered an anti-pattern in security — hiding how something works isn't the same as making it secure.

## Why It Fails

- Attackers will eventually discover the hidden mechanism
- Every person who knows the secret is a potential leak
- There's no way to know if the secret has been compromised
- It gives a false sense of security

## Kerckhoffs's Principle

"A cryptographic system should be secure even if everything about the system, except the key, is public knowledge."

- AES is secure because the algorithm is publicly known and scrutinized
- A proprietary "secret" algorithm is less trustworthy because it hasn't been independently verified

## When Obscurity Is OK

- As an ADDITIONAL layer (defense in depth), never as the only layer
- Hiding your SSH port (security benefit is minimal, but doesn't hurt)
- Not publishing internal network architecture (reasonable operational practice)

## In Privacy

Prefer open-source privacy tools where the security can be verified. Closed-source tools that claim to be "secure" but won't show how are relying on obscurity.
