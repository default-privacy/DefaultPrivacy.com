---
term: "RSA"
slug: "rsa"
definition: "One of the first public-key cryptosystems, RSA is based on a hard mathematical problem. Named after its inventors Rivest, Shamir, and Adleman, it's still widely used for key exchange and digital signatures."
category: "Encryption"
relatedTerms:
  - "asymmetric-encryption"
  - "public-key-cryptography"
  - "encryption"
aliases:
  - "Rivest-Shamir-Adleman"
keywords:
  - "public key"
  - "prime factorization"
  - "RSA-2048"
  - "RSA-4096"
  - "key exchange"
---

RSA was invented in 1977 and revolutionized cryptography by solving the key distribution problem. Instead of sharing a secret key, you share a public key that anyone can use to encrypt messages only you can read.

## The Math Behind RSA

RSA's security relies on one simple fact: multiplying two large prime numbers is easy, but factoring their product back into primes is extremely hard.

```
Easy: 61 × 53 = 3233
Hard: 3233 = ? × ? (without knowing 61 and 53)
```

Scale this to 2048-bit numbers and factoring becomes computationally infeasible.

## Key Generation

1. Choose two large random primes (p and q)
2. Compute n = p × q (the modulus)
3. Compute φ(n) = (p-1)(q-1)
4. Choose public exponent e (commonly 65537)
5. Compute private exponent d (modular inverse of e)
6. Public key: (n, e)
7. Private key: (n, d)

## Key Sizes

| Key Size | Security | Status |
|----------|----------|--------|
| 1024-bit | ~80 bits | Deprecated |
| 2048-bit | ~112 bits | Current minimum |
| 3072-bit | ~128 bits | Recommended |
| 4096-bit | ~140 bits | High security |

## Use Cases

### Key Exchange
- Encrypt a symmetric key with RSA
- Use symmetric key for bulk data (hybrid encryption)

### Digital Signatures
- Sign hash of document with private key
- Anyone can verify with public key

### SSL/TLS Certificates
- Website identity verification
- Though ECC is increasingly preferred

## RSA vs Elliptic Curve

| Aspect | RSA-3072 | ECC-256 |
|--------|----------|---------|
| Security | 128 bits | 128 bits |
| Key Size | 3072 bits | 256 bits |
| Speed | Slower | Faster |
| Bandwidth | Higher | Lower |

ECC provides equivalent security with much smaller keys.

## Quantum Threat

RSA is vulnerable to quantum computers:
- Shor's algorithm can factor large numbers efficiently
- Post-quantum cryptography research is ongoing
- Timeline uncertain but RSA may need replacement

