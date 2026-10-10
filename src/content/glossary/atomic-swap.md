---
term: "Atomic Swap"
slug: "atomic-swap"
definition: "A peer-to-peer exchange of one cryptocurrency for another without using a centralized exchange, preserving privacy by avoiding KYC requirements."
category: "Blockchain"
relatedTerms:
  - "coinjoin"
---

Atomic swaps enable trustless cryptocurrency exchange directly between two parties using cryptographic contracts.

## How It Works

- Uses Hash Time-Locked Contracts (HTLCs)
- Both parties lock their coins in smart contracts
- The swap either completes fully or not at all ("atomic")
- Neither party can cheat or steal the other's coins

## Privacy Benefits

- No centralized exchange that requires identity verification
- No KYC documents submitted
- Transaction history isn't linked through an exchange account
- No third party holds your funds at any point

## Tools

- **Farcaster**: BTC-XMR atomic swap protocol
- **THORChain**: Decentralized cross-chain liquidity
- **COMIT network**: Multi-chain atomic swap protocol

## Limitations

- Fewer trading pairs than centralized exchanges
- Liquidity can be limited
- Bitcoin side of swaps is still visible on Bitcoin's public blockchain
