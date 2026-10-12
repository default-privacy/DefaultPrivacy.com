---
term: "CoinJoin"
slug: "coinjoin"
definition: "A Bitcoin privacy technique that combines multiple users' transactions into a single transaction, making it difficult to determine which inputs correspond to which outputs."
category: "Blockchain"
relatedTerms:
  - "mixnet"
  - "ring-signatures"
---

CoinJoin improves Bitcoin privacy by breaking the transaction graph that links senders to receivers.

## How It Works

1. Multiple users agree to create a transaction together
2. All inputs and outputs are combined into one transaction
3. Each user signs only their own input
4. The amounts are equal, so observers can't match inputs to outputs

## Implementations

- **JoinMarket**: Decentralized CoinJoin marketplace
- **Whirlpool (Samourai)**: Structured CoinJoin protocol (service seized in 2024)

## Limitations

- Requires other participants to mix with
- Fixed denomination amounts reduce flexibility
- Chain analysis can sometimes detect CoinJoin transactions
- Regulatory pressure is increasing on mixing services

## Compared to Private Coins

Privacy coins like Monero have privacy built into the protocol. Bitcoin CoinJoin is an after-the-fact privacy addition that requires active participation.
