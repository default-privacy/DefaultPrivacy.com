---
term: "Capital One Data Breach"
slug: "capital-one-breach"
definition: "A 2019 data breach where a former Amazon Web Services employee exploited a misconfigured web application firewall to steal personal data of over 100 million Capital One credit card applicants, including Social Security numbers and bank account numbers."
category: "Data Protection"
relatedTerms:
  - "data-breach"
  - "identity-theft"
  - "cloud-act"
  - "web-application-firewall"
aliases:
  - "Capital One Hack"
  - "Capital One Data Leak"
keywords:
  - "Capital One breach"
  - "Capital One hack"
  - "credit card data breach"
  - "AWS misconfiguration breach"
  - "cloud security breach"
  - "bank data breach"
---

The Capital One breach showed that moving to the cloud doesn't automatically mean better security — a single misconfiguration in AWS exposed **100 million credit applications**.

## What Happened

- **March–July 2019**: Paige Thompson, a former AWS employee, exploited a misconfigured **web application firewall** (WAF) on Capital One's AWS infrastructure
- She used a **server-side request forgery (SSRF)** attack to access AWS metadata credentials
- Those credentials gave access to Capital One's S3 storage buckets containing customer data
- Thompson posted about the hack on GitHub and Slack, leading to her identification and arrest

## What Was Exposed

- **100 million** US customers and **6 million** Canadian customers
- Social Security numbers (140,000)
- Bank account numbers (80,000)
- Credit scores, balances, payment history
- Self-reported income
- Names, addresses, dates of birth, phone numbers
- Credit card application data from 2005–2019

## Why This Breach Matters

### Cloud Misconfiguration
The breach wasn't caused by sophisticated hacking — it was a **misconfigured firewall**. This is one of the most common causes of cloud data breaches and highlights the shared responsibility model of cloud security.

### Insider Knowledge
Thompson's prior experience at AWS gave her knowledge of cloud infrastructure that made the attack straightforward. The "insider threat" isn't just current employees — it's anyone who has ever had access.

### 14 Years of Data
Capital One stored credit application data going back to **2005** — far longer than necessary. Data retention policies matter.

## Aftermath

- **$190 million class action settlement** (2022)
- **$80 million fine** from the Office of the Comptroller of the Currency
- Capital One required to improve cloud security practices
- Paige Thompson convicted in 2022
- AWS added protections against SSRF attacks (IMDSv2)
