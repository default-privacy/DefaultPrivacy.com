---
term: "AES"
slug: "aes"
definition: "Advanced Encryption Standard is a symmetric encryption algorithm adopted by the U.S. government and used worldwide. It's the gold standard for encrypting sensitive data, used in everything from HTTPS to disk encryption."
category: "Encryption"
relatedTerms:
  - "symmetric-encryption"
  - "encryption"
aliases:
  - "Advanced Encryption Standard"
  - "Rijndael"
keywords:
  - "AES-128"
  - "AES-256"
  - "block cipher"
  - "NIST encryption"
  - "military grade encryption"
---

AES replaced the aging DES standard in 2001 after a public competition. The winning algorithm, Rijndael, became AES and has proven unbreakable through two decades of intense scrutiny.

## Key Sizes

- **AES-128**: 128-bit key (sufficient for most uses)
- **AES-192**: 192-bit key (rarely used)
- **AES-256**: 256-bit key (classified/top-secret grade)

All three are considered secure. The difference is future-proofing, not current vulnerability.

## How AES Works

1. **Block Processing**: Divides data into 128-bit blocks
2. **Rounds**: Each block goes through multiple transformation rounds
   - AES-128: 10 rounds
   - AES-192: 12 rounds
   - AES-256: 14 rounds
3. **Operations per round**:
   - SubBytes (substitution)
   - ShiftRows (permutation)
   - MixColumns (mixing)
   - AddRoundKey (XOR with key)

## Modes of Operation

AES encrypts fixed-size blocks. Modes handle larger data:

- **GCM** (Galois/Counter Mode): Authenticated encryption, most recommended
- **CBC** (Cipher Block Chaining): Common but needs careful IV handling
- **CTR** (Counter Mode): Turns block cipher into stream cipher
- **ECB** (Electronic Codebook): **Never use** - patterns leak

## Where You Encounter AES

- **HTTPS/TLS**: Web traffic encryption
- **Disk encryption**: BitLocker, FileVault, VeraCrypt
- **File encryption**: 7-Zip, most archive tools
- **Messaging**: Signal, WhatsApp (part of the protocol)
- **WiFi**: WPA2/WPA3 security

## "Military-Grade Encryption"

Marketing often claims "military-grade encryption." This usually means AES-256, which is:
- Approved for U.S. classified information
- Practically unbreakable through brute force
- The actual standard, not marketing fluff

## Performance

AES is extremely fast, especially with hardware acceleration:
- Modern CPUs have AES-NI instructions
- Can encrypt at gigabytes per second
- Negligible performance impact

