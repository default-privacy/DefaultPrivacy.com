---
term: "Passkey"
slug: "passkey"
definition: "A passwordless authentication method using public-key cryptography, typically stored on your device and protected by biometrics or device PIN. Passkeys are phishing-resistant and designed to replace passwords entirely."
category: "Authentication"
relatedTerms:
  - "security-key"
  - "two-factor-authentication"
  - "biometrics"
aliases:
  - "Passwordless Login"
  - "FIDO Passkey"
keywords:
  - "passwordless"
  - "WebAuthn"
  - "FIDO2"
  - "no password"
  - "biometric login"
---

Passkeys are the future of authentication—no passwords to remember, phishing-resistant by design, and more convenient than typing. They're cryptographic keys stored on your devices, unlocked by biometrics.

## How Passkeys Work

1. **Registration**: Device creates unique key pair for site
2. **Public key** → sent to website
3. **Private key** → stays on device (secure enclave)
4. **Login**: Site sends challenge, device signs it
5. **Verification**: Site verifies signature
6. **Unlock method**: Biometrics, PIN, or device password

## Passkeys vs Passwords

| Aspect | Passwords | Passkeys |
|--------|-----------|----------|
| Phishing | Vulnerable | Immune |
| Reuse | Common problem | Impossible |
| Server breach | Passwords leaked | Public keys only |
| Memorization | Required | None |
| Typing | Every login | Never |

## Passkey Storage

### Device-Bound
- Stored only on one device
- Most secure
- Lost device = lost access

### Synced Passkeys
- Synced via iCloud, Google, etc.
- Available on all your devices
- Trade-off: cloud provider has keys

### Security Keys
- Hardware device storage
- Most portable
- No cloud sync

## Platform Support

### Apple
- iCloud Keychain sync
- Face ID / Touch ID unlock
- Safari and apps

### Google
- Google Password Manager sync
- Fingerprint / PIN unlock
- Chrome and Android

### Microsoft
- Windows Hello
- Microsoft account sync
- Edge browser

### 1Password, Bitwarden
- Cross-platform sync
- Not tied to one ecosystem

## Benefits

### Security
- Can't be phished
- Can't be reused
- Nothing to leak in breach
- Resistant to brute force

### Convenience
- No typing passwords
- Fast biometric unlock
- Works across devices (synced)
- No password resets

## Current Limitations

- Not universally supported yet
- Syncing ties to ecosystem
- Recovery if all devices lost
- Enterprise adoption still early

