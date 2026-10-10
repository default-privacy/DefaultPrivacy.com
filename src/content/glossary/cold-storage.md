---
term: "Cold Storage"
slug: "cold-storage"
definition: "Keeping cryptographic keys or digital assets offline, disconnected from the internet. Cold storage prioritizes security over convenience—keys can't be hacked remotely because they're not connected to any network."
category: "Security"
relatedTerms:
  - "air-gap"
  - "encryption"
  - "offline-security"
---

Cold storage is the digital equivalent of a safe deposit box. Your keys exist, but they're physically isolated from online threats.

## Why Cold Storage

- **No remote attack surface**: Hackers can't reach what isn't connected
- **Protection from malware**: Keyloggers and trojans can't exfiltrate offline keys
- **Long-term preservation**: Paper or metal backups survive decades
- **Crypto and sensitive data**: Standard practice for significant holdings

## Cold Storage Methods

### Hardware Wallets
- Dedicated devices (Ledger, Trezor) that never expose keys to a computer
- Sign transactions offline, broadcast only the signed result
- Balance between security and usability

### Paper Wallets
- Private key printed or written on paper
- Must be kept physically secure and legible
- No recovery if lost or damaged

### Metal Backups
- Fire- and water-resistant engraving of seed phrases
- Survives disasters that destroy paper
- Products: Cryptosteel, Billfodl

### Air-Gapped Computers
- Dedicated machine never connected to the internet
- Generate and sign keys in complete isolation
- Maximum security, maximum inconvenience

## Cold Storage and Operational Security

- Store in multiple geographic locations
- Use multi-sig so no single key controls assets
- Test recovery procedures before you need them
- Balance: too convenient = less secure; too secure = risk of loss
