---
term: "Stream Cipher"
slug: "stream-cipher"
definition: "An encryption algorithm that encrypts data one bit or byte at a time using a continuous keystream, suitable for real-time encryption of streaming data."
category: "Encryption"
relatedTerms:
  - "chacha20-poly1305"
  - "symmetric-encryption"
---

Stream ciphers generate a pseudorandom keystream and XOR it with the plaintext to produce ciphertext.

## How It Works

1. A key and nonce (initialization vector) seed a pseudorandom generator
2. The generator produces a continuous stream of random-looking bytes
3. Each byte of plaintext is XORed with a byte of the keystream
4. The same keystream is used to decrypt (XOR is its own inverse)

## Common Stream Ciphers

- **ChaCha20**: Modern, fast, secure. Used in TLS, WireGuard, Signal.
- **Salsa20**: ChaCha20's predecessor. Still secure.
- **RC4**: Obsolete and broken. Was used in WEP, early TLS.

## Advantages Over Block Ciphers

- No padding needed
- Natural for streaming data (voice, video)
- Can encrypt arbitrary-length data

## Critical Rule

Never reuse a nonce with the same key. With stream ciphers, nonce reuse completely breaks the encryption — the XOR of two ciphertexts equals the XOR of the two plaintexts.
