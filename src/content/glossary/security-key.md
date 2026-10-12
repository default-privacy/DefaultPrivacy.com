---
term: "Security Key"
slug: "security-key"
definition: "A physical hardware device used for two-factor authentication that provides phishing-resistant proof of identity. Security keys use cryptographic protocols (FIDO2/WebAuthn) that verify both the user and the website, preventing credential theft."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "passkey"
aliases:
  - "Hardware Key"
  - "FIDO Key"
  - "U2F Key"
keywords:
  - "YubiKey"
  - "FIDO2"
  - "WebAuthn"
  - "hardware 2FA"
  - "phishing resistant"
---

A security key is the gold standard for authentication. Unlike SMS codes or authenticator apps, security keys are immune to phishing—they cryptographically verify you're on the real site.

## Why Security Keys Are Superior

### Phishing Immunity
- Key checks website's identity
- Won't authenticate to fake sites
- Cryptographic proof of real domain

### No Shared Secrets
- Private key never leaves device
- Nothing for attackers to steal from servers
- Breach doesn't expose credentials

### Proof of Presence
- Must physically touch/press key
- Can't be remotely triggered
- Proves human is present

## How Security Keys Work

### FIDO2/WebAuthn Protocol
1. Website sends challenge
2. Key signs challenge with private key
3. Website verifies signature
4. Private key never transmitted

### Bound to Domain
- Key generates unique keypair per site
- google.com ≠ g00gle.com
- Phishing sites get nothing useful

## Types of Security Keys

### USB-A Keys
- Traditional USB port
- Most compatible

### USB-C Keys
- Modern laptops/phones
- Growing standard

### NFC Keys
- Tap for mobile authentication
- No port needed
- Works with most smartphones

### Built-in Keys
- Apple Touch ID/Face ID
- Windows Hello
- Platform authenticators

## Getting Started

1. **Get at least two keys** (always have a backup)
2. **Register with important accounts** (Google, GitHub, etc.)
3. **Store backup securely** (different location)
4. **Consider passkeys** (security key as password replacement)

## Limitations

- Can be lost/stolen (need backup)
- Not supported everywhere (improving)
- Initial cost ($25-70 per key)
- Physical presence required

For where to start, see [Privacy: where to start](/guides/privacy-where-to-start).

