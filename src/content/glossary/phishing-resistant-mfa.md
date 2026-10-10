---
term: "Phishing-Resistant MFA"
slug: "phishing-resistant-mfa"
definition: "Multi-factor authentication methods that cannot be intercepted or replayed by phishing attacks, specifically FIDO2/WebAuthn hardware keys and passkeys."
category: "Authentication"
relatedTerms:
  - "fido2"
  - "webauthn"
  - "passkey"
  - "multi-factor-authentication"
---

Most MFA can be phished. Phishing-resistant MFA is the only authentication that can't.

## What CAN Be Phished

- **SMS codes**: Man-in-the-middle proxies relay the code in real-time
- **TOTP codes**: Same man-in-the-middle technique
- **Push notifications**: User may approve the wrong request (MFA fatigue)
- **Email codes**: Intercepted alongside phished passwords

## What CANNOT Be Phished

- **FIDO2/WebAuthn** (hardware keys, passkeys): Credentials are cryptographically bound to the legitimate website's origin. A phishing site can't request them.

## Why It's Phishing-Proof

- The browser checks the website's origin before using the credential
- Even a perfect visual clone of a login page has a different domain
- The cryptographic response is invalid for any domain other than the legitimate one

## Recommendation

If you protect one account with a hardware security key, make it your primary email. All password resets flow through email — it's the master key to everything.
