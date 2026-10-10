---
term: "Ring Signatures"
slug: "ring-signatures"
definition: "A cryptographic technique that allows someone to sign a message on behalf of a group, making it impossible to determine which group member actually signed."
category: "Blockchain"
relatedTerms:
  - "zero-knowledge-proof"
  - "mixnet"
---

Ring signatures provide transaction privacy on blockchains by obscuring the real sender among a group of possible signers.

## How It Works

- The signer creates a signature using their private key and the public keys of other group members
- Anyone can verify the signature is valid and came from the group
- No one can determine which specific member signed
- Group members don't need to cooperate or even know they're included

## Use in Cryptocurrencies

- **Monero (XMR)**: Uses ring signatures for every transaction to hide the sender

## Compared to Other Privacy Methods

- **CoinJoin**: Requires coordination between users; ring signatures don't
- **Zero-knowledge proofs**: More computationally expensive but provide stronger guarantees
- **Ring signatures**: Good balance of privacy, performance, and simplicity
