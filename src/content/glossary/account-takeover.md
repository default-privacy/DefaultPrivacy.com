---
term: "Account Takeover"
slug: "account-takeover"
definition: "A form of identity theft where criminals gain unauthorized access to a victim's online accounts — email, banking, social media, or shopping — by using stolen credentials, SIM swapping, or social engineering to lock out the real owner and exploit the account."
category: "Attacks"
relatedTerms:
  - "credential-stuffing"
  - "credential-harvesting"
  - "sim-swapping"
  - "phishing"
  - "identity-theft"
  - "password-manager"
aliases:
  - "ATO"
  - "Account Hijacking"
  - "Account Compromise"
keywords:
  - "account takeover"
  - "account hacked"
  - "someone hacked my account"
  - "account hijacked"
  - "how to recover hacked account"
  - "account takeover prevention"
  - "ATO fraud"
---

Account takeover is what happens when someone else gains control of your online accounts — your email, bank, social media, or any service tied to your identity. It's the gateway to financial fraud, identity theft, and digital destruction.

## How Accounts Get Taken Over

### Credential Stuffing
- Attackers use **username/password pairs from data breaches** and try them across other services
- Because **65% of people reuse passwords**, this works at massive scale
- Automated tools test millions of credential pairs per hour

### Phishing
- Fake login pages harvest real credentials
- Increasingly sophisticated — AI-generated, personalized, domain-spoofed

### SIM Swapping
- Attacker convinces your phone carrier to transfer your number to their SIM
- They receive your **two-factor authentication codes**
- Gives access to any account using SMS-based 2FA

### Session Hijacking
- Stealing active session tokens (via malware, public WiFi, or XSS attacks)
- Attacker accesses your account without needing your password

### Social Engineering
- Calling customer support and impersonating you
- Using data from breaches to answer security questions

## What Attackers Do With Taken-Over Accounts

### Email Accounts (Most Dangerous)
- Reset passwords for every other service linked to that email
- Read sensitive communications
- Intercept financial transactions
- Impersonate you to contacts

### Financial Accounts
- Transfer funds, make purchases
- Apply for credit in your name
- Change account details to lock you out

### Social Media
- Scam your followers
- Steal your identity
- Lock you out permanently
- Demand ransom for return

## How to Protect Yourself

1. **Use unique passwords for every account** — reuse is what makes credential stuffing work
2. **Enable hardware security keys** (FIDO2/WebAuthn) — the strongest form of 2FA
3. **Avoid SMS-based 2FA** — use authenticator apps or hardware keys instead
4. **Check if your credentials are leaked** — breach-checking services show whether your email appears in known breaches
5. **Monitor your accounts** — set up login notifications and review activity regularly
6. **Freeze your credit** — prevents new accounts from being opened in your name

For what to use, see [how to choose a password manager](/guides/how-to-choose-a-password-manager).
