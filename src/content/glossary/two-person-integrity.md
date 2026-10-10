---
term: "Two-Person Integrity"
slug: "two-person-integrity"
definition: "A security principle requiring two authorized people to complete a critical action, preventing any single person from causing harm."
category: "OpSec"
relatedTerms:
  - "shamirs-secret-sharing"
  - "operational-security"
aliases:
  - "Two-Person Rule"
  - "Dual Control"
---

Two-person integrity ensures no single individual has enough access to compromise a critical system.

## Applications

- **Nuclear launch**: Two officers must turn keys simultaneously
- **Key ceremonies**: Certificate Authority root key generation requires multiple participants
- **Cryptocurrency custody**: Multi-signature wallets requiring multiple approvals
- **Financial transactions**: Dual authorization above certain amounts

## Digital Implementation

- **Multi-sig wallets**: 2-of-3 or 3-of-5 signature requirements
- **Shamir's Secret Sharing**: Split the key among multiple parties
- **Hardware Security Modules**: Require multiple smart cards for key operations

## Privacy Application

For high-value secrets (master encryption keys, cryptocurrency), two-person integrity prevents any single point of compromise — including coercion of a single individual.
