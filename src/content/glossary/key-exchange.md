---
term: "Key Exchange"
slug: "key-exchange"
definition: "A cryptographic protocol that allows two parties to establish a shared secret key over an insecure channel. This shared key can then be used for symmetric encryption, enabling secure communication without prior contact."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "perfect-forward-secrecy"
  - "tls"
aliases:
  - "Key Agreement"
  - "Key Negotiation"
keywords:
  - "Diffie-Hellman"
  - "ECDH"
  - "key derivation"
  - "shared secret"
  - "handshake"
---

Key exchange solves a fundamental problem: how can two people who've never met establish a shared secret while communicating over a channel that attackers can observe?

## The Classic Problem

Alice and Bob want to communicate securely. They need a shared key for symmetric encryption. But how do they agree on a key without Eve (the eavesdropper) learning it too?

## Diffie-Hellman: The Breakthrough

In 1976, Diffie and Hellman solved this with mathematical magic:

1. Alice and Bob agree on public parameters (g, p)
2. Alice picks secret 'a', computes A = g^a mod p, sends A
3. Bob picks secret 'b', computes B = g^b mod p, sends B
4. Alice computes s = B^a mod p
5. Bob computes s = A^b mod p
6. Both arrive at the same shared secret 's'!

Eve sees A and B but can't compute 's' without 'a' or 'b'.

## Modern Key Exchange Protocols

### ECDH (Elliptic Curve Diffie-Hellman)
- Same concept, elliptic curve math
- Smaller keys, faster operations
- Most common in modern TLS

### X25519
- ECDH using Curve25519
- Designed for security and performance
- Used by Signal, WireGuard, modern TLS

### Kyber (Post-Quantum)
- Lattice-based key exchange
- Resistant to quantum computers

## Key Exchange in Practice

### TLS/HTTPS Handshake
1. Client sends supported algorithms
2. Server picks algorithm, sends certificate
3. Key exchange establishes shared secret
4. Symmetric encryption begins

### Signal Protocol
1. Initial key exchange using X3DH
2. Ongoing key rotation (Double Ratchet)
3. Forward secrecy for every message

## Why Forward Secrecy Matters

Ephemeral key exchange (new keys each session) means:
- Past communications stay secure even if long-term keys leak
- No single point of compromise

