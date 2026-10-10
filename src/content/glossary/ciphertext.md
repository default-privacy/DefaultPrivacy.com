---
term: "Ciphertext"
slug: "ciphertext"
definition: "The encrypted, unreadable output produced when plaintext is processed through an encryption algorithm with a key. Ciphertext appears as random data and can only be converted back to plaintext with the correct decryption key."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "cipher"
aliases:
  - "Encrypted Text"
  - "Encrypted Data"
keywords:
  - "encrypted output"
  - "scrambled data"
  - "plaintext vs ciphertext"
---

Ciphertext is what encryption produces—data transformed into an unreadable format that looks like random noise. Without the key, ciphertext reveals nothing about the original message.

## Plaintext → Ciphertext → Plaintext

```
Original message (plaintext):
"Meet me at noon"

After encryption (ciphertext):
"7x9kL2mN4pQ8rS"

After decryption (plaintext again):
"Meet me at noon"
```

## Properties of Good Ciphertext

### Indistinguishable from Random
- No patterns visible
- Statistical tests can't differentiate from random data
- No information leaks about plaintext

### Fixed or Predictable Length
- Length may reveal plaintext length
- Some schemes pad to hide this
- Overhead from authentication tags

### Integrity Protection (Authenticated Encryption)
- Detect if ciphertext was modified
- Reject tampered data
- Prevents malleability attacks

## What Ciphertext Reveals

Even "secure" ciphertext can leak information:

### Length
- Encrypted "yes" is shorter than encrypted "no, thank you"
- Traffic analysis uses message sizes

### Timing
- When messages are sent
- Frequency patterns

### Metadata
- Who communicates with whom
- Not protected by encryption alone

## Ciphertext Security Levels

### Semantic Security
- Ciphertext reveals nothing about plaintext
- Even partial information is impossible to extract

### Chosen-Ciphertext Security (CCA)
- Secure even if attacker can decrypt chosen messages
- Strongest practical security level

## Common Misconceptions

- **"Longer ciphertext = more secure"**: Not true, security depends on algorithm and key
- **"Ciphertext is permanently unreadable"**: Only without the key
- **"Double encryption is safer"**: Often provides no additional security

