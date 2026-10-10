---
term: "SIM Swapping"
slug: "sim-swapping"
definition: "A social engineering attack where an attacker convinces a mobile carrier to transfer your phone number to their SIM card, hijacking SMS-based authentication."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "social-engineering"
  - "totp"
---

SIM swapping is one of the most effective attacks against SMS-based two-factor authentication.

## How It Works

1. Attacker gathers personal information about the victim
2. Calls the mobile carrier pretending to be the victim
3. Convinces the carrier to transfer the number to a new SIM
4. Victim's phone loses service
5. Attacker receives all SMS messages, including 2FA codes
6. Attacker resets passwords on bank accounts, email, crypto exchanges

## Impact

- Cryptocurrency theft (millions of dollars in documented cases)
- Email account takeover
- Bank account access
- Identity theft

## Protection

1. **Never use SMS for 2FA** — use TOTP apps or hardware keys instead
2. **Add a PIN/passphrase** to your carrier account
3. **Port freeze**: Ask your carrier to prevent number transfers
4. **Don't share your phone number** publicly when possible
5. **Use a separate number** for sensitive accounts (VoIP or MySudo)
