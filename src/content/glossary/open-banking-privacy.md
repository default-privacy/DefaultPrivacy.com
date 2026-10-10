---
term: "Open Banking Privacy"
slug: "open-banking-privacy"
definition: "The privacy risks created by open banking APIs that allow third-party apps to access your bank account data — including transaction history, balances, and account details — with a single authorization."
category: "Financial Privacy"
relatedTerms:
  - "financial-surveillance"
  - "financial-privacy"
  - "data-minimization"
aliases:
  - "Open Banking Risk"
  - "Banking API Privacy"
  - "Plaid Privacy"
keywords:
  - "open banking privacy risk"
  - "Plaid data collection"
  - "bank data sharing apps"
  - "fintech privacy risk"
---

Open banking lets you connect apps to your bank account with a few clicks. That convenience comes at the cost of handing your complete financial history to third parties.

## How Open Banking Works

1. You sign up for a fintech app (budgeting, investing, lending, etc.)
2. The app uses an aggregator like **Plaid**, **Yodlee**, or **MX** to connect to your bank
3. You enter your bank credentials or authorize via OAuth
4. The aggregator downloads your transaction history, balances, and account details
5. This data is shared with the app — and often with the aggregator's other clients

## What Gets Shared

- **Full transaction history**: Every purchase, deposit, and transfer
- **Account balances**: Current and historical
- **Account holder information**: Name, address, account numbers
- **Recurring payments**: Subscriptions, bills, loan payments
- **Income data**: Salary deposits, freelance payments
- **Investment holdings**: Through connected brokerage accounts

## The Privacy Problem

### Data Aggregators
- **Plaid** connects to 12,000+ financial institutions and serves 8,000+ apps
- Plaid settled a $58M lawsuit in 2022 for collecting more data than users expected
- Aggregators often retain your data even after you stop using the app
- Your bank credentials may be stored (screen-scraping method) by the aggregator

### Third-Party Apps
- Many apps access more data than they need for their stated purpose
- Data may be sold to advertisers, data brokers, or analytics companies
- Security varies wildly — a budget app startup may not have bank-grade security
- App closures or acquisitions can transfer your financial data to unknown entities

### Scope Creep
- You authorize a budgeting app, it accesses your complete transaction history going back years
- Apps may re-access your data periodically without explicit re-authorization
- Revoking access doesn't guarantee data deletion

## How to Protect Yourself

1. **Minimize connected apps** — Only connect apps you truly need
2. **Audit connections regularly** — Check your bank's "connected apps" settings and revoke unused ones
3. **Read permissions** — Understand exactly what data an app will access
4. **Prefer OAuth over credentials** — Never give your bank login to a third party if OAuth is available
5. **Use dedicated accounts** — Connect a secondary checking account with limited funds rather than your primary
6. **Request data deletion** when disconnecting an app
7. **Check Plaid's portal** (my.plaid.com) — See and revoke all your Plaid connections
