---
term: "Deterministic Encryption"
slug: "deterministic-encryption"
definition: "An encryption scheme where the same plaintext always produces the same ciphertext, enabling exact-match searches on encrypted data at the cost of some security."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "homomorphic-encryption"
---

Deterministic encryption sacrifices some security for the ability to search and compare encrypted values.

## Use Case

- Database column encryption where you need to query exact matches
- Example: Encrypt SSNs but still find records by SSN
- The server never sees the plaintext but can perform equality checks

## Security Trade-off

- Reveals which ciphertexts share the same plaintext (frequency analysis)
- Significantly weaker than randomized encryption
- Should only be used when the search capability is essential

## Alternatives

- **Homomorphic encryption**: Compute on encrypted data without deterministic weakness
- **Searchable encryption**: More complex schemes that support search with better security
- **Client-side search**: Decrypt on the client and search locally
