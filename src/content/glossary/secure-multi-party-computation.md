---
term: "Secure Multi-Party Computation"
slug: "secure-multi-party-computation"
definition: "A cryptographic technique that allows multiple parties to jointly compute a function over their combined data without revealing their individual inputs to each other."
category: "Cloud"
relatedTerms:
  - "homomorphic-encryption"
  - "zero-knowledge-proof"
  - "differential-privacy"
---

MPC enables collaboration on sensitive data without anyone sharing their actual data.

## How It Works

- Each party holds private input data
- Through cryptographic protocols, they jointly compute a result
- Each party learns only the final output, not anyone else's input
- No trusted third party is needed

## Examples

- **Salary comparison**: Determine who earns more without revealing either salary
- **Private auctions**: Find the highest bid without revealing any bids
- **Medical research**: Compute statistics across hospital databases without sharing patient records
- **Private voting**: Tally votes without revealing individual ballots

## Real-World Uses

- **Privacy-preserving analytics**: Competing companies computing market statistics
- **Financial compliance**: Cross-institution fraud detection without sharing customer data
- **Cryptocurrency**: Threshold signatures for multi-party wallets

## Trade-offs

MPC is computationally expensive and requires communication between parties. It's practical for many use cases but not yet suitable for high-frequency or very large-scale computations.
