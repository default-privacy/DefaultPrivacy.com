---
term: "Tokenization"
slug: "tokenization"
definition: "A data security technique that replaces sensitive data with non-sensitive placeholder tokens while storing the original data in a secure vault."
category: "Data Protection"
relatedTerms:
  - "pseudonymity"
  - "encryption"
  - "pii"
---

Tokenization protects sensitive data by removing it from systems that don't need the original values.

## How It Works

1. Sensitive data (credit card number, SSN) is sent to a tokenization system
2. A random token is generated to replace it
3. The mapping is stored in a secure token vault
4. Systems that process the data use tokens instead of real values
5. Only the token vault can reverse the mapping

## Tokenization vs Encryption

- **Encryption**: Mathematically transforms data; reversible with the key
- **Tokenization**: Replaces data with random values; no mathematical relationship
- Tokenization is preferred when the processing system doesn't need the real data

## Where It's Used

- Payment card processing (PCI-DSS compliance)
- Healthcare data (HIPAA compliance)
- Cloud data protection
- Apple Pay and Google Pay use tokenization for card numbers
