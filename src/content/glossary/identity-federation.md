---
term: "Identity Federation"
slug: "identity-federation"
definition: "A system that allows users to use a single identity across multiple organizations without each organization managing separate credentials."
category: "Authentication"
relatedTerms:
  - "single-sign-on"
  - "oauth"
  - "saml"
---

Identity federation links a user's identity across multiple systems, so one login works everywhere.

## Examples

- "Sign in with Google" on third-party websites
- Enterprise users accessing partner company resources
- Government digital identity systems

## Privacy Trade-offs

- **Convenience**: One strong credential instead of many weak ones
- **Risk**: The identity provider becomes a single point of failure
- **Tracking**: The IdP knows every service you access
- **Data sharing**: Attributes (name, email, groups) may be shared with services

## Self-Sovereign Identity

An emerging alternative where you control your own identity credentials (stored in a wallet on your device) and share only what's needed with each service. No central identity provider needed.
