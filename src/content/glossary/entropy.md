---
term: "Entropy"
slug: "entropy"
definition: "A measure of randomness or unpredictability in data, particularly important in cryptography for generating secure keys and passwords."
category: "Encryption"
relatedTerms:
  - "nonce"
  - "brute-force"
  - "passphrase"
---

In cryptography, entropy measures how unpredictable a value is. Higher entropy means harder to guess.

## Password Entropy

- Entropy is measured in bits
- Each bit doubles the number of possibilities
- A truly random 8-character lowercase password: ~37 bits of entropy
- A random 4-word passphrase from a 7,776-word list: ~51 bits
- AES-256 key: 256 bits of entropy

## Why It Matters

- A password with 40 bits of entropy can be cracked in seconds
- A password with 80 bits of entropy would take billions of years
- The strength of encryption depends entirely on the entropy of the key

## Sources of Entropy

- **Good**: Hardware random number generators, mouse movements, disk timing
- **Bad**: Current time, process ID, sequential numbers
- **Critical**: Never use predictable sources for cryptographic randomness

## The /dev/urandom Debate

On Linux, `/dev/urandom` is suitable for all cryptographic purposes. The old advice to use `/dev/random` instead is outdated.
