---
term: "Stealth Address"
slug: "stealth-address"
definition: "A technique where the sender generates a unique, one-time address for each transaction, preventing observers from linking transactions to the receiver."
category: "Blockchain"
relatedTerms:
  - "ring-signatures"
  - "zero-knowledge-proof"
---

Stealth addresses ensure that even if someone knows your public address, they can't see your incoming transactions on the blockchain.

## How It Works

1. The receiver publishes a "stealth meta-address"
2. For each transaction, the sender generates a unique one-time address derived from the meta-address
3. The receiver scans the blockchain using their private key to detect payments
4. Each transaction goes to a different address — no visible link between them

## Where It's Used

- **Monero**: Mandatory stealth addresses for all transactions
- **Ethereum**: Proposed EIP-5564 for optional stealth addresses

## Privacy Benefit

On a transparent blockchain like Bitcoin, if someone knows your address, they can see every transaction you've ever received. Stealth addresses make this impossible.
