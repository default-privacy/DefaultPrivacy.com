---
term: "Rubber-Hose Cryptanalysis"
slug: "rubber-hose-cryptanalysis"
definition: "A euphemism for extracting cryptographic keys through physical coercion or torture, highlighting that the weakest link in any encryption system is the human holding the key."
category: "Attacks"
relatedTerms:
  - "plausible-deniability"
  - "deniable-encryption"
  - "shamirs-secret-sharing"
---

The term is a darkly humorous acknowledgment that no amount of mathematical security matters if someone can force you to reveal your password.

## The Problem

- AES-256 is unbreakable by brute force
- But a human can be threatened, coerced, or legally compelled to reveal keys
- In some jurisdictions (UK), refusing to provide decryption keys is a crime
- Physical threats bypass all cryptographic protections

## Technical Countermeasures

- **Deniable encryption**: Hidden volumes that reveal different data depending on the password given
- **Shamir's Secret Sharing**: Split the key so no single person can decrypt
- **Dead man's switches**: Automatic destruction of keys if not regularly authenticated
- **Plausible deniability**: Design systems so the existence of encrypted data can't be proven

## Legal Landscape

- **US**: Fifth Amendment may protect against compelled decryption (case law is mixed)
- **UK**: Refusing to decrypt carries up to 5 years in prison (RIPA Part III)
- **Australia**: Compelled decryption law since 2018
- **France**: Refusing to decrypt carries up to 3 years in prison
