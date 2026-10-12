---
term: "Credential Harvesting"
slug: "credential-harvesting"
definition: "The practice of collecting login credentials through phishing pages, data breaches, malware, or social engineering."
category: "Attacks"
relatedTerms:
  - "phishing"
  - "credential-stuffing"
  - "social-engineering"
  - "keylogger"
---

Credential harvesting is the first step in most account takeover attacks. Attackers collect usernames and passwords through various methods.

## Methods

- **Phishing**: Fake login pages that capture credentials
- **Data breaches**: Stolen databases with hashed or plaintext passwords
- **Keyloggers**: Malware that records keystrokes
- **Man-in-the-middle**: Intercepting credentials on insecure networks
- **Password spraying**: Trying common passwords across many accounts
- **Social engineering**: Convincing people to reveal credentials directly

## Scale

- Billions of credentials are available on dark web marketplaces
- Automated tools test stolen credentials across hundreds of services
- Credential databases are traded, combined, and enriched over time

## Protection

1. Use a unique password for every account
2. Use a password manager to generate and store passwords
3. Enable FIDO2/WebAuthn (phishing-proof)
4. Enable TOTP 2FA where FIDO2 isn't available

For what to use, see [Choosing a Password Manager](/guides/how-to-choose-a-password-manager).
