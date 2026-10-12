---
term: "Time-Based One-Time Password (TOTP)"
slug: "totp"
definition: "A two-factor authentication method that generates temporary codes based on the current time and a shared secret, used by apps like Google Authenticator."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "security-key"
---

TOTP generates a new 6-digit code every 30 seconds using a shared secret and the current time.

## How It Works

- During setup, the server generates a secret key (shared via QR code)
- Your authenticator app stores this secret
- Both the app and server independently compute: HMAC(secret, time/30)
- The resulting codes match because both sides have the same secret and time

## Advantages Over SMS

- Works offline — no cell signal needed
- Not vulnerable to SIM swapping attacks
- Not vulnerable to SS7 network attacks
- Faster than waiting for a text message

## Backup

Always save the setup QR code or secret key during enrollment. If you lose your phone without a backup, you'll be locked out of your accounts.

For what to use, see [Move 2FA codes to a new app or phone](/guides/move-2fa-codes-to-a-new-app-or-phone).
