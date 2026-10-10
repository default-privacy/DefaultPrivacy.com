---
term: "Cipher"
slug: "cipher"
definition: "An algorithm for performing encryption or decryption. Ciphers transform plaintext into ciphertext (encryption) and back again (decryption) using a key. Modern ciphers are mathematically designed to resist all known attacks."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "aes"
  - "symmetric-encryption"
aliases:
  - "Cypher"
  - "Encryption Algorithm"
keywords:
  - "block cipher"
  - "stream cipher"
  - "cipher suite"
  - "encryption method"
---

A cipher is the mathematical recipe for scrambling and unscrambling data. From ancient substitution ciphers to modern AES, the goal remains the same: make data unreadable without the key.

## Types of Modern Ciphers

### Block Ciphers
- Process fixed-size blocks (e.g., 128 bits)
- Same key encrypts all blocks
- Need modes of operation for larger data
- Examples: AES, Blowfish, Twofish

### Stream Ciphers
- Process one bit/byte at a time
- Generate keystream XORed with plaintext
- Often faster, simpler
- Examples: ChaCha20, RC4 (deprecated)

## Block Cipher Modes

Block ciphers need modes to handle data larger than one block:

### ECB (Electronic Codebook)
- Each block encrypted independently
- **Never use**: Patterns visible in ciphertext

### CBC (Cipher Block Chaining)
- Each block XORed with previous ciphertext
- Requires initialization vector (IV)
- Vulnerable to padding oracle attacks

### CTR (Counter Mode)
- Turns block cipher into stream cipher
- Parallelizable, random access
- Nonce must never repeat

### GCM (Galois/Counter Mode)
- CTR + authentication
- Detects tampering
- **Recommended** for most uses

## Cipher Suites

A cipher suite is a complete set of algorithms for secure communication:

```
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
│    │     │        │    │     │
│    │     │        │    │     └─ Hash for integrity
│    │     │        │    └─ Mode of operation
│    │     │        └─ Symmetric cipher
│    │     └─ Authentication
│    └─ Key exchange
└─ Protocol
```

## Historical vs Modern

### Historical Ciphers
- Caesar cipher (shift letters)
- Vigenère (polyalphabetic)
- Enigma (mechanical rotor)
- All broken by modern standards

### Modern Requirements
- Mathematically proven security properties
- Resistance to known-plaintext attacks
- No practical key recovery attacks
- Fast in software and hardware

