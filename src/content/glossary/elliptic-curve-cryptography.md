---
term: "Elliptic Curve Cryptography"
abbr: "ECC"
slug: "elliptic-curve-cryptography"
definition: "A public-key cryptography approach based on the algebraic structure of elliptic curves. ECC provides equivalent security to RSA with much smaller key sizes, making it ideal for mobile devices, IoT, and performance-critical applications."
category: "Encryption"
relatedTerms:
  - "asymmetric-encryption"
  - "public-key-cryptography"
  - "rsa"
aliases:
  - "ECC"
  - "Elliptic Curve"
keywords:
  - "ECDSA"
  - "ECDH"
  - "curve25519"
  - "secp256k1"
  - "P-256"
---

Elliptic Curve Cryptography achieves the same security as RSA but with dramatically smaller keys. A 256-bit ECC key provides security comparable to a 3072-bit RSA key.

## Why Smaller Keys Matter

- **Faster operations**: Less computation needed
- **Lower bandwidth**: Smaller keys/signatures to transmit
- **Better for constrained devices**: IoT, smart cards, mobile
- **Future-proofing**: Easier to increase security level

## Common Curves

### Curve25519
- Designed by Daniel Bernstein
- Used in Signal, WireGuard, SSH
- 128-bit security level
- Resistant to timing attacks by design

### P-256 (secp256r1)
- NIST standard curve
- Widely supported
- Used in TLS, ECDSA
- Some controversy over NIST involvement

### secp256k1
- Bitcoin's curve
- Not a NIST curve (seen as advantage)
- Used in Ethereum and many cryptocurrencies

## ECC Applications

### ECDH (Key Exchange)
- Elliptic Curve Diffie-Hellman
- Establishes shared secret over insecure channel
- Used in TLS handshakes

### ECDSA (Signatures)
- Elliptic Curve Digital Signature Algorithm
- Signs transactions in Bitcoin/Ethereum
- Verifies code and documents

### EdDSA (ed25519)
- Modern signature scheme
- Faster and simpler than ECDSA
- Used in SSH, Signal, Tor

## Security Comparison

| Security Level | RSA | ECC |
|----------------|-----|-----|
| 80 bits | 1024 bits | 160 bits |
| 112 bits | 2048 bits | 224 bits |
| 128 bits | 3072 bits | 256 bits |
| 192 bits | 7680 bits | 384 bits |
| 256 bits | 15360 bits | 512 bits |

## Quantum Considerations

- ECC is **vulnerable** to quantum computers
- Shor's algorithm breaks ECC even faster than RSA
- Post-quantum alternatives being developed
- Current advice: still secure against classical computers

