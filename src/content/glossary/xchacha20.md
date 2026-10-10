---
term: "XChaCha20"
slug: "xchacha20"
definition: "An extended-nonce variant of ChaCha20 that uses a 192-bit nonce, making it safer for situations where random nonce generation is necessary."
category: "Encryption"
relatedTerms:
  - "chacha20-poly1305"
  - "symmetric-encryption"
  - "nonce"
---

XChaCha20 extends the ChaCha20 cipher with a larger nonce size, reducing the risk of catastrophic nonce reuse.

## Why Extended Nonces Matter

- Standard ChaCha20 uses a 96-bit nonce — safe only if nonces are never reused
- XChaCha20 uses a 192-bit nonce — can safely generate random nonces
- The probability of a random collision with 192 bits is negligibly small

## Where It's Used

- Libsodium (the go-to cryptography library) uses XChaCha20 by default
- Age encryption tool
- Various secure messaging implementations

## Technical Detail

XChaCha20 uses the HChaCha20 hash function to derive a subkey and reduced nonce from the extended nonce and key. This is a well-understood construction called XSalsa20/XChaCha20.
