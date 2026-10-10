---
term: "Public Key Cryptography"
slug: "public-key-cryptography"
definition: "A cryptographic system that uses pairs of keys: public keys (which may be disseminated widely) and private keys (which are known only to the owner). This enables secure communication between parties who have never met and forms the basis for digital signatures, key exchange, and encrypted communication."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "end-to-end-encryption"
  - "pgp"
aliases:
  - "Asymmetric Cryptography"
  - "PKI"
  - "Public Key Infrastructure"
---

Public key cryptography solved one of the oldest problems in cryptography: how do two people communicate securely if they've never met to exchange a secret key?

## The Key Pair

Every user has two mathematically linked keys:

### Public Key
- Can be shared with anyone
- Used to encrypt messages TO you
- Used to verify signatures FROM you
- Like your email address—public knowledge

### Private Key
- Must remain secret at all times
- Used to decrypt messages sent to you
- Used to create digital signatures
- Like your email password—never shared

## Core Operations

### Encryption
1. Alice wants to send Bob a secret message
2. Alice encrypts with Bob's PUBLIC key
3. Only Bob's PRIVATE key can decrypt it
4. Even Alice can't decrypt what she just sent!

### Digital Signatures
1. Bob wants to prove he wrote a message
2. Bob signs with his PRIVATE key
3. Anyone can verify with Bob's PUBLIC key
4. Proves authenticity and integrity

## Real-World Applications

- **HTTPS/TLS**: Secures all web traffic
- **Email encryption**: PGP/GPG
- **Cryptocurrency**: Wallet addresses are public keys
- **SSH**: Secure server access
- **Code signing**: Verify software authenticity

## The Math Behind It

Public key crypto relies on "trapdoor functions"—easy to compute one way, nearly impossible to reverse:
- **RSA**: Factoring large prime numbers
- **ECC**: Elliptic curve discrete logarithm
- **Diffie-Hellman**: Discrete logarithm problem

## Key Management

Your private key is everything:
- If compromised, all security is lost
- If lost, encrypted data is gone forever
- Use strong passwords on private keys
- Store backups securely (encrypted, offline)

