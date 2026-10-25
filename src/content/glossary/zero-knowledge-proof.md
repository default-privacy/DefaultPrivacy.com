---
term: "Zero-Knowledge Proof"
abbr: "ZKP"
slug: "zero-knowledge-proof"
definition: "A cryptographic method by which one party can prove to another party that they know a value, without conveying any information apart from the fact that they know the value. This allows authentication and verification without exposing sensitive data."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "authentication"
  - "privacy-by-design"
aliases:
  - "ZKP"
  - "Zero Knowledge"
  - "ZK Proof"
seeAlso:
  - name: "Zcash"
    slug: "zcash"
---

Zero-Knowledge Proofs allow you to prove you know something without revealing what that something is. This has profound implications for privacy.

## Real-World Analogy

Imagine proving you're over 21 to enter a bar without showing your ID (which contains your name, address, and exact birthdate). A zero-knowledge proof would let you prove just the relevant fact (age ≥ 21) without revealing anything else.

## Applications in Privacy

### Authentication
- Prove you know a password without transmitting it
- Verify identity without exposing personal data

### Financial Privacy
- Prove you have sufficient funds without revealing your balance
- Verify transactions without exposing amounts or parties

### Voting Systems
- Prove your vote was counted without revealing who you voted for

## Types of ZKP

- **Interactive**: Requires back-and-forth communication
- **Non-Interactive**: Single proof that anyone can verify
- **zk-SNARKs**: "Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge"
- **zk-STARKs**: Similar but with quantum resistance

## Why It Matters

In a world of data breaches, proving facts without revealing underlying data dramatically reduces your attack surface.

