---
term: "Zero-Knowledge Rollup"
slug: "zero-knowledge-rollup"
definition: "A blockchain scaling technique that bundles hundreds of transactions into a single proof, improving throughput while maintaining privacy through zero-knowledge proofs."
category: "Blockchain"
relatedTerms:
  - "zero-knowledge-proof"
  - "privacy-coin"
---

ZK-rollups combine two innovations: scaling through batching and privacy through zero-knowledge proofs.

## How It Works

1. Hundreds of transactions are collected off-chain
2. A zero-knowledge proof is generated that verifies all transactions are valid
3. Only the proof (tiny compared to the raw transactions) is submitted on-chain
4. The main chain verifies the proof in a single operation

## Privacy Benefits

- Transaction details can remain private while the proof guarantees correctness
- Observers see only the proof, not individual transaction data
- Enables private smart contract execution at scale

## Projects

- **zkSync**: General-purpose ZK-rollup for Ethereum
- **StarkNet**: Uses STARKs (no trusted setup needed)
- **Polygon zkEVM**: EVM-compatible ZK-rollup

## Relevance to Privacy

ZK-rollups demonstrate that privacy and scalability aren't mutually exclusive.
