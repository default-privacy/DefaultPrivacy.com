---
term: "Hardware Security Module (HSM)"
slug: "hsm"
definition: "A tamper-resistant physical device that manages and protects cryptographic keys, performing encryption operations in a secure environment."
category: "Hardware"
relatedTerms:
  - "hardware-security-key"
  - "encryption"
  - "key-wrapping"
---

HSMs are dedicated hardware devices that safeguard the most sensitive cryptographic operations.

## What They Do

- Generate, store, and manage cryptographic keys
- Perform encryption/decryption operations internally
- Keys never leave the HSM in plaintext
- Tamper-resistant — physical attacks destroy the keys

## Where They're Used

- Certificate Authorities (signing SSL certificates)
- Banks (processing financial transactions)
- Cloud providers (managing customer encryption keys)
- Government agencies (classified communications)
- Cryptocurrency exchanges (securing hot wallets)

## Consumer Equivalents

- **YubiKey**: A miniature HSM for personal authentication
- **Trezor/Ledger**: Hardware wallets are essentially HSMs for cryptocurrency keys
- **TPM (Trusted Platform Module)**: An HSM built into most modern computers

## Why It Matters

Software-based key storage is vulnerable to malware, memory dumps, and side-channel attacks. HSMs provide a hardware root of trust that software alone cannot achieve.
