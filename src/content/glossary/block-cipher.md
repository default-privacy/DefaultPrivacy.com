---
term: "Block Cipher"
slug: "block-cipher"
definition: "An encryption algorithm that processes data in fixed-size blocks, used as the foundation for most symmetric encryption systems."
category: "Encryption"
relatedTerms:
  - "aes"
  - "symmetric-encryption"
---

Block ciphers encrypt data in chunks (blocks) of a fixed size, typically 128 or 256 bits.

## Common Block Ciphers

- **AES**: 128-bit blocks. The global standard.
- **Twofish**: 128-bit blocks. AES finalist, still considered secure.
- **Serpent**: 128-bit blocks. Most conservative AES finalist.
- **Blowfish**: 64-bit blocks. Aging, replaced by Twofish.
- **DES/3DES**: 64-bit blocks. Obsolete.

## Modes of Operation

Block ciphers need a "mode" to encrypt data larger than one block:

- **ECB**: Encrypts each block independently. Insecure — reveals patterns.
- **CBC**: Chains blocks together. Secure but sequential.
- **CTR**: Turns block cipher into a stream cipher. Parallelizable.
- **GCM**: CTR + authentication. Recommended for most uses.

## Why It Matters

The mode is as important as the cipher. AES-ECB is insecure despite using AES. AES-GCM is excellent. Always check the full algorithm specification, not just the cipher name.
