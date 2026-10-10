---
term: "SIM Cloning"
slug: "sim-cloning"
definition: "Creating a duplicate of a SIM card to intercept calls and messages intended for the original, potentially bypassing SMS-based authentication."
category: "Attacks"
relatedTerms:
  - "sim-swapping"
  - "ss7-vulnerability"
  - "two-factor-authentication"
---

SIM cloning creates an exact copy of a SIM card, allowing two devices to receive the same calls and messages.

## How It Works

- Physical SIM cards contain an authentication key (Ki)
- If this key is extracted, a duplicate SIM can be created
- Modern SIM cards make Ki extraction harder but not impossible
- eSIMs add additional protections but aren't immune

## Compared to SIM Swapping

- **SIM cloning**: Creates a copy; original still works (temporarily)
- **SIM swapping**: Transfers the number; original stops working
- SIM swapping is more common because it doesn't require physical access

## Protection

1. Never use SMS for two-factor authentication
2. Use TOTP apps or hardware keys instead
3. Keep your physical SIM secure
4. Monitor for unexpected service disruptions
5. Consider eSIM which is harder to clone physically
