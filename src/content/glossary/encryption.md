---
term: "Encryption"
slug: "encryption"
definition: "The process of converting information into a code to prevent unauthorized access. Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) using a cryptographic algorithm and key. Only those with the correct key can decrypt and read the original data."
category: "Encryption"
relatedTerms:
  - "end-to-end-encryption"
  - "public-key-cryptography"
  - "decryption"
aliases:
  - "Cryptography"
  - "Cipher"
---

Encryption is the foundation of digital privacy. It mathematically scrambles your data so that only authorized parties can read it.

## Types of Encryption

### Symmetric Encryption
- Same key encrypts and decrypts
- Fast and efficient
- Challenge: How do you share the key securely?
- Examples: AES, ChaCha20

### Asymmetric Encryption
- Two keys: public (encrypt) and private (decrypt)
- Anyone can encrypt with your public key
- Only you can decrypt with your private key
- Examples: RSA, ECC

### Hybrid Encryption
- Uses asymmetric to exchange a symmetric key
- Then uses faster symmetric for the actual data
- Best of both worlds
- Used by: TLS, PGP, most modern protocols

## Encryption Strength

Encryption strength is measured in bits:
- **128-bit AES**: 2^128 possible keys (practically unbreakable)
- **256-bit AES**: Used for top-secret government data
- **4096-bit RSA**: Strong asymmetric encryption

## Where You Encounter Encryption

- **HTTPS**: Encrypts web traffic (look for the padlock)
- **Messaging apps**: Signal, WhatsApp use E2EE
- **File encryption**: VeraCrypt, Cryptomator
- **Email**: PGP, S/MIME
- **Storage**: BitLocker, FileVault, LUKS

## Common Misconceptions

- **"Encrypted = Private"**: Metadata may still be visible
- **"All encryption is equal"**: Implementation matters as much as algorithm
- **"Password = Encrypted"**: Password protection isn't always encryption

