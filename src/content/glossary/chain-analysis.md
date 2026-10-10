---
term: "Chain Analysis (Blockchain Surveillance)"
slug: "chain-analysis"
definition: "The use of specialized software tools and techniques to trace cryptocurrency transactions across a public blockchain, link wallet addresses to real-world identities, and reconstruct the movement of funds."
category: "Crypto"
relatedTerms:
  - "carf"
  - "dac8"
  - "source-of-funds"
  - "common-reporting-standard"
aliases:
  - "chain analysis"
  - "blockchain surveillance"
  - "on-chain tracing"
  - "crypto tracing"
keywords:
  - "chain analysis"
  - "blockchain surveillance"
  - "crypto tracing"
  - "wallet address tracking"
  - "chainalysis"
  - "on-chain analysis"
---

Chain analysis is the practice of tracing cryptocurrency transactions across a public blockchain to follow the movement of funds and, where possible, connect wallet addresses to real-world identities.

## How It Works

Most major blockchains — Bitcoin, Ethereum, and others — record every transaction in a permanent, publicly readable ledger. Every transfer from one address to another is visible to anyone who looks.

Chain analysis firms like Chainalysis, Elliptic, and TRM Labs have built software that:

- **Clusters addresses** — identifies groups of addresses likely controlled by the same person or entity based on transaction patterns
- **Tags known entities** — labels addresses associated with exchanges, mixers, darknet markets, and other known services
- **Traces fund flows** — follows value as it moves from address to address, even through multiple hops
- **Scores risk** — assigns risk ratings to transactions based on the history of the funds involved

## Who Uses It

Chain analysis tools are used by:

- **Government agencies** — the IRS, FBI, DEA, and dozens of international law enforcement agencies purchase chain analysis software as standard tools
- **Regulated exchanges** — KYC-compliant exchanges use risk scoring to flag or block transactions involving funds from flagged sources
- **Banks** — financial institutions receiving crypto-to-fiat conversions use chain analysis to evaluate the origin of funds
- **Compliance teams** — corporations accepting crypto payments use it to assess counterparty risk

## What It Can and Cannot Do

**What chain analysis can do:**

- Identify that wallet A sent funds that eventually reached exchange B
- Flag funds as "high risk" if they passed through a mixer, darknet market, or sanctioned address
- Provide evidence in criminal investigations connecting an exchange account to a transaction history
- Trace the origin of funds through many hops if the pattern is visible on-chain

**What chain analysis cannot easily do:**

- De-anonymize a self-custody wallet with no exchange connections
- Trace funds through genuine privacy coins (Monero, for example) that use cryptographic techniques specifically designed to break transaction linkability
- Prove who controlled a wallet — only that the wallet received or sent funds

## Why It Matters for Financial Privacy

If you hold crypto on a centralized exchange, that exchange knows your identity and your wallet addresses. When you withdraw funds on-chain, the exchange's withdrawal address is a known, tagged entity. Chain analysis tools can then trace what happens to those funds from that point.

The practical implication: funds that pass through exchanges leave a detectable trail even when moved to self-custody afterward. The number of hops required to lose that trail effectively depends on the tools being used against you.

## The Source of Funds Problem

Chain analysis is particularly relevant when converting crypto to fiat through a bank or regulated exchange. Compliance systems may flag incoming funds as "high risk" if their origin involves:

- A mixing service or tumbler
- A darknet market address
- A sanctioned entity (OFAC-listed addresses)
- An unusually complex transaction path

If your funds are flagged, you may be asked to explain the source. This is where documentation — exchange records, purchase history, transaction logs — becomes essential.

## Key Takeaway

Chain analysis is the reason that "crypto is anonymous" is an oversimplification. On most public blockchains, transactions are pseudonymous at best. Connecting pseudonyms to identities is an industry that employs hundreds of analysts and processes billions in government contracts. Understanding this is essential for any honest assessment of crypto privacy.
