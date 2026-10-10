---
term: "WebAuthn"
slug: "webauthn"
definition: "A web standard that enables passwordless authentication using hardware security keys, biometrics, or platform authenticators."
category: "Authentication"
relatedTerms:
  - "passkey"
  - "two-factor-authentication"
  - "security-key"
  - "hardware-security-key"
---

WebAuthn (Web Authentication) is a W3C standard that replaces passwords with cryptographic credentials.

## How It Works

- A public-private key pair is generated for each website
- The private key stays on your device (never sent to the server)
- Authentication uses a cryptographic challenge-response protocol
- No shared secrets — nothing to phish, leak, or crack

## What It Enables

- **Passkeys**: Platform-based credentials synced across devices
- **Security keys**: USB/NFC hardware authenticators (YubiKey)
- **Biometric auth**: Face ID, Touch ID, Windows Hello

## Privacy Benefits

- Each credential is unique per website — no cross-site tracking
- No passwords to be stolen in data breaches
- Phishing-resistant by design (credentials are origin-bound)

## Browser Support

Supported in all major browsers: Chrome, Firefox, Safari, Edge.
