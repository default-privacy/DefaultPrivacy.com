---
term: "Decentralized Identity"
slug: "decentralized-identity"
definition: "An identity model where individuals control their own credentials without relying on centralized authorities, using cryptographic proofs."
category: "Authentication"
relatedTerms:
  - "identity-federation"
  - "webauthn"
  - "zero-knowledge-proof"
aliases:
  - "Self-Sovereign Identity"
  - "SSI"
---

Decentralized identity puts you in control of your credentials instead of relying on Google, Facebook, or government databases.

## How It Works

- Credentials are stored in a wallet on your device
- You present only the claims needed (e.g., "I'm over 18" without revealing your birthdate)
- Verifiers can check the credential's authenticity without contacting the issuer
- No central database of your identity usage

## Technologies

- **Verifiable Credentials (W3C)**: Standard format for digital credentials
- **DIDs (Decentralized Identifiers)**: Self-owned identifiers that don't require a registry
- **Zero-knowledge proofs**: Prove properties without revealing underlying data

## Why It Matters

Traditional identity systems create centralized targets for breaches and surveillance. Decentralized identity could provide verified identity without the privacy costs of centralized databases.
