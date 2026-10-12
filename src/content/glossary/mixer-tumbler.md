---
term: "Mixer / Tumbler"
slug: "mixer-tumbler"
definition: "A service that pools cryptocurrency from multiple users and redistributes it, breaking the link between the original sender and the final recipient."
category: "Blockchain"
relatedTerms:
  - "coinjoin"
  - "ring-signatures"
---

Mixers and tumblers attempt to break the transaction trail on public blockchains like Bitcoin.

## How It Works

- Users send crypto to the mixer
- The mixer pools funds from many users
- After a delay, funds are sent to the users' destination addresses
- The amounts and timing are randomized to prevent tracing

## Centralized vs Decentralized

- **Centralized mixers**: Operated by a company. They see all inputs and outputs. Requires trust.
- **Decentralized mixers**: Use cryptographic protocols (like CoinJoin) so no single party sees the full picture.

## Legal Status

- Bestmixer.io was shut down by Europol in 2019
- Samourai Wallet developers were arrested in 2024
- Using mixers for legitimate privacy is legal in most jurisdictions, but services that facilitate money laundering face enforcement

For what to use, see [Anonymous Payments and Financial Privacy](/stacks/anonymous-payments-financial-privacy).
