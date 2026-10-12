---
term: "AES-GCM"
slug: "aes-gcm"
definition: "A mode of AES encryption that provides both confidentiality and authentication in a single operation, widely used in TLS."
category: "Encryption"
relatedTerms:
  - "aes"
  - "symmetric-encryption"
  - "tls"
  - "encryption-at-rest"
---

AES-GCM (Galois/Counter Mode) is an authenticated encryption mode that combines AES-CTR encryption with GMAC authentication.

## Why Authenticated Encryption Matters

- Encryption alone doesn't prevent tampering
- An attacker could modify encrypted data without detection
- GCM detects any modification, ensuring both confidentiality and integrity

## Where It's Used

- TLS 1.2 and 1.3
- IPsec VPNs
- Cloud storage encryption
- SSH

## Performance

- Very fast on processors with AES-NI hardware instructions
- Parallelizable — can encrypt multiple blocks simultaneously
- The authentication tag is generated alongside encryption at minimal extra cost

## Caution

Never reuse a nonce (initialization vector) with the same key in GCM mode. Nonce reuse completely breaks the authentication and can reveal plaintext.
