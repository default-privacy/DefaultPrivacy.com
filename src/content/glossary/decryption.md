---
term: "Decryption"
slug: "decryption"
definition: "The process of converting encrypted data (ciphertext) back into readable form (plaintext) using the correct key. Decryption is the inverse of encryption—only those with the proper key can decrypt."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "end-to-end-encryption"
  - "public-key-cryptography"
---

Encryption is useless without decryption. The two are inseparable—you encrypt to protect, you decrypt to use.

## How Decryption Works

- **Symmetric**: Same key that encrypted also decrypts (AES, ChaCha20)
- **Asymmetric**: Private key decrypts what was encrypted with the public key (RSA, ECC)
- **Hybrid**: Asymmetric decrypts a symmetric key, which then decrypts the data (TLS, PGP)

## Who Can Decrypt

- **You**: With your private key or password
- **Recipient**: In E2EE messaging, only the intended recipient has the key
- **Service provider**: In encrypted-at-rest storage, they hold the keys—they can decrypt
- **Attackers**: If they obtain the key through theft, coercion, or weak crypto

## Decryption and Privacy

- **E2EE**: Only endpoints can decrypt—not even the service provider
- **Encrypted backup**: You hold the only key—lose it, lose access
- **Government access**: "Going dark" debate—law enforcement wants decryption backdoors
- **Key escrow**: Storing keys with third parties—defeats purpose of encryption
