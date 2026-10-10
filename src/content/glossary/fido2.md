---
term: "FIDO2"
slug: "fido2"
definition: "An open authentication standard that combines WebAuthn and CTAP protocols to enable passwordless and phishing-resistant login."
category: "Authentication"
relatedTerms:
  - "webauthn"
  - "passkey"
  - "hardware-security-key"
  - "two-factor-authentication"
---

FIDO2 is the umbrella term for the modern passwordless authentication standard, maintained by the FIDO Alliance.

## Components

- **WebAuthn**: The browser/server API (W3C standard)
- **CTAP2**: Client to Authenticator Protocol — how the browser talks to hardware keys

## Why It Matters

- Phishing is the #1 attack vector — FIDO2 makes it impossible
- Credentials are cryptographically bound to the legitimate website
- A phishing site cannot request or use your FIDO2 credentials

## Supported Authenticators

- YubiKey 5 series
- Google Titan Security Key
- Nitrokey FIDO2
- Windows Hello
- Apple Face ID / Touch ID
- Android biometrics

## Adoption

Google, Microsoft, Apple, and most major platforms support FIDO2. Many organizations are mandating it for employee authentication.
