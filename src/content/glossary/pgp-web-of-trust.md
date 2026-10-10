---
term: "PGP Web of Trust"
slug: "pgp-web-of-trust"
definition: "A decentralized trust model where PGP users verify each other's identities and sign each other's public keys, creating a network of trust without a central authority."
category: "Email"
relatedTerms:
  - "pgp"
  - "public-key-cryptography"
  - "certificate-authority"
---

The Web of Trust is PGP's alternative to the Certificate Authority model used by TLS.

## How It Works

- Users meet in person and verify each other's identities
- They sign each other's PGP public keys
- If Alice trusts Bob, and Bob has signed Carol's key, Alice may decide to trust Carol's key
- Trust is transitive to a configurable depth

## Problems

- Requires in-person key signing (doesn't scale)
- Complex for non-technical users
- Key servers were never designed for key revocation/deletion
- Email addresses in public keys are harvestable
- The web of trust graph itself reveals social connections (metadata)

## Modern Alternatives

- **Keybase**: Linked social media proofs for key verification (acquired by Zoom)
- **keys.openpgp.org**: Privacy-respecting key server (email verification)
- **Signal**: Automatic key management — users never interact with keys directly

## Current Status

The PGP Web of Trust is largely abandoned. Modern encrypted messaging (Signal) has shown that usable encryption doesn't require users to manage keys manually.
