---
term: "Deniable Encryption"
slug: "deniable-encryption"
definition: "An encryption scheme where the existence of encrypted data cannot be proven, or where decryption can produce different plausible plaintexts."
category: "Encryption"
relatedTerms:
  - "plausible-deniability"
  - "encryption"
  - "encryption-at-rest"
---

Deniable encryption protects you in scenarios where you may be compelled to reveal your encryption keys.

## How It Works

- **Hidden volumes**: A VeraCrypt container can have two passwords — one reveals innocent data, the other reveals the real data
- **Steganography**: Hide encrypted data inside ordinary files (images, audio)
- **Multiple decryption**: The same ciphertext produces different valid plaintexts depending on the key

## Use Cases

- Crossing borders where authorities demand device passwords
- Operating in countries where encryption itself is illegal
- Protecting sensitive journalistic sources

## Tools

- **VeraCrypt**: Hidden volumes within encrypted containers
- **OpenStego**: Steganographic data hiding in images

## Limitations

- Sophisticated forensic analysis may detect hidden volumes
- Rubber-hose cryptanalysis (physical coercion) remains a threat
- Legal jurisdictions vary on whether you can be compelled to reveal all keys
