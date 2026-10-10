---
term: "Homomorphic Encryption"
slug: "homomorphic-encryption"
definition: "A form of encryption that allows computations to be performed on encrypted data without decrypting it first, preserving privacy during processing."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "zero-knowledge-proof"
---

Homomorphic encryption is often called the "holy grail" of cryptography because it allows data to be processed while remaining encrypted.

## How It Works

- Data is encrypted before being sent to a server
- The server performs calculations on the encrypted data
- Results are returned still encrypted
- Only the data owner can decrypt the results

## Types

- **Partially Homomorphic**: Supports one type of operation (addition OR multiplication)
- **Somewhat Homomorphic**: Supports limited operations of both types
- **Fully Homomorphic (FHE)**: Supports arbitrary computations on encrypted data

## Real-World Applications

- **Cloud computing**: Process sensitive data without the cloud provider seeing it
- **Medical research**: Analyze patient data without exposing individual records
- **Voting systems**: Tally votes without revealing individual ballots

## Current Limitations

Fully homomorphic encryption is computationally expensive — operations on encrypted data are much slower than on plaintext. But performance is improving rapidly.
