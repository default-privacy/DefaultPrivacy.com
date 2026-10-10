---
term: "ChaCha20-Poly1305"
slug: "chacha20-poly1305"
definition: "A modern authenticated encryption algorithm that provides both confidentiality and integrity, widely used as an alternative to AES-GCM."
category: "Encryption"
relatedTerms:
  - "aes"
  - "symmetric-encryption"
  - "tls"
---

ChaCha20-Poly1305 combines the ChaCha20 stream cipher with the Poly1305 message authentication code. It was designed by Daniel Bernstein.

## Advantages Over AES

- **No hardware dependency**: Performs well on devices without AES hardware acceleration
- **Simpler implementation**: Less prone to side-channel attacks
- **Fast on mobile**: Particularly efficient on ARM processors
- **Constant-time**: Naturally resistant to timing attacks

## Where It's Used

- TLS 1.3 (preferred cipher suite on many servers)
- WireGuard VPN protocol
- Signal Protocol (messaging)
- SSH (OpenSSH)
- Google Chrome (for connections to Google servers)

## How It Works

- ChaCha20 encrypts the data (confidentiality)
- Poly1305 generates an authentication tag (integrity)
- Together they form an AEAD (Authenticated Encryption with Associated Data) scheme

This is one of the most trusted modern cipher suites in use today.
