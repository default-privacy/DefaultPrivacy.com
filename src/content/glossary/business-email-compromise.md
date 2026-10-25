---
term: "Business Email Compromise"
abbr: "BEC"
slug: "business-email-compromise"
definition: "A sophisticated scam where criminals impersonate executives, vendors, or business partners via email to trick employees into wiring money or sharing sensitive data."
category: "Attacks"
relatedTerms:
  - "phishing"
  - "social-engineering"
  - "credential-harvesting"
  - "deepfake-fraud"
  - "ai-powered-phishing"
aliases:
  - "BEC"
  - "CEO Fraud"
  - "Email Wire Fraud"
  - "Vendor Email Compromise"
keywords:
  - "business email compromise"
  - "BEC scam"
  - "CEO fraud email"
  - "wire fraud email scam"
  - "vendor email compromise"
  - "email impersonation scam"
---

Business Email Compromise is a costly form of fraud built on carefully crafted emails that trick people into sending money.

## How It Works

### CEO Fraud
- Attacker spoofs or hacks the CEO's email account
- Sends urgent request to finance department: "Wire $150,000 to this account for an acquisition — keep it confidential"
- The urgency and authority prevent normal verification

### Vendor Impersonation
- Attacker compromises or spoofs a vendor's email
- Sends a legitimate-looking invoice with **updated banking details**
- Company pays the invoice to the attacker's account instead of the real vendor

### Payroll Diversion
- Attacker impersonates an employee emailing HR
- Requests a change to direct deposit information
- Employee's paycheck is redirected to the attacker's account

### Lawyer Impersonation
- Attacker poses as an attorney handling a confidential deal
- Creates urgency around closing a transaction
- Pressures the victim to wire funds immediately

## Scale

| Year | FBI-Reported BEC Losses |
|------|------------------------|
| 2020 | $1.87 billion |
| 2021 | $2.39 billion |
| 2022 | $2.74 billion |
| 2023 | $2.95 billion |

## Why It's So Effective

- **No malware required** — pure social engineering
- **Targets human trust** — emails come from known contacts
- **Urgency and authority** prevent verification
- **Wire transfers are irreversible** — once sent, money is gone within hours
- **AI is making it worse** — large language models generate perfect, contextual emails

## Prevention

1. **Mandatory verbal verification** for all wire transfers and payment changes
2. **Multi-person approval** for transactions above a threshold
3. **Email authentication** — Implement DMARC, DKIM, and SPF (check your domain's SPF/DKIM/DMARC with the [email security tool](/email-security))
4. **Slow down** — BEC exploits urgency; build deliberate delays into financial processes
5. **Train employees** — Regular phishing awareness training
6. **Verify banking changes** through established channels, never through the email requesting the change
