---
term: "Zero-Knowledge Rollup"
slug: "zero-knowledge-rollup"
definition: "A blockchain scaling technique that bundles hundreds of transactions into a single proof, improving throughput using zero-knowledge proofs."
category: "Blockchain"
relatedTerms:
  - "zero-knowledge-proof"
  - "privacy-coin"
---

ZK-rollups use zero-knowledge proofs to scale a blockchain by batching transactions.

## How It Works

1. Hundreds of transactions are collected off-chain
2. A zero-knowledge proof is generated that verifies all transactions are valid
3. Only the proof (tiny compared to the raw transactions) is submitted on-chain
4. The main chain verifies the proof in a single operation

## Projects

- **zkSync**: General-purpose ZK-rollup for Ethereum
- **StarkNet**: Uses STARKs (no trusted setup needed)
- **Polygon zkEVM**: EVM-compatible ZK-rollup

