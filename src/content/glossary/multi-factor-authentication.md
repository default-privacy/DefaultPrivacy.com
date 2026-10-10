---
term: "Multi-Factor Authentication"
slug: "multi-factor-authentication"
definition: "A security method that requires two or more different types of verification: something you know, something you have, or something you are."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "totp"
  - "fido2"
aliases:
  - "MFA"
---

MFA combines multiple authentication factors to ensure that a compromised password alone isn't enough to access an account.

## The Three Factors

- **Something you know**: Password, PIN, security question
- **Something you have**: Phone, security key, smart card
- **Something you are**: Fingerprint, face, voice

## Factor Strength (best to worst)

1. **FIDO2/WebAuthn** (hardware key or passkey) — phishing-proof
2. **TOTP** (authenticator app) — strong, offline-capable
3. **Push notification** (Duo, Microsoft Authenticator) — good but phishable
4. **SMS code** — weak, vulnerable to SIM swapping and SS7
5. **Email code** — weak, security depends on email account
6. **Security questions** — terrible, answers are often guessable or public

## The Golden Rule

Any MFA is better than no MFA. A hardware security key is best, but even SMS 2FA stops most automated attacks.
