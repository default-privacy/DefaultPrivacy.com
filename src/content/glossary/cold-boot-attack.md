---
term: "Cold Boot Attack"
slug: "cold-boot-attack"
definition: "A technique for extracting encryption keys from a computer's RAM by physically accessing the memory chips after a shutdown, exploiting the fact that RAM doesn't clear instantly."
category: "Attacks"
relatedTerms:
  - "encryption-at-rest"
  - "air-gap"
---

RAM retains data for seconds to minutes after power is removed. Cooling the chips with compressed air can extend this to hours.

## How It Works

1. Target computer is running with encrypted disk (keys in RAM)
2. Attacker gains physical access
3. Cools the RAM modules with compressed air or liquid nitrogen
4. Reboots into a minimal OS or transplants RAM to another machine
5. Reads the still-present encryption keys from memory
6. Uses the keys to decrypt the disk

## Real-World Use

- Law enforcement forensics on seized computers
- Demonstrated against BitLocker, FileVault, and LUKS

## Countermeasures

1. **Shut down** (don't just sleep/hibernate) when physically threatened
2. Use a BIOS password and secure boot
3. Store keys in TPM/HSM rather than RAM when possible
4. Some systems now scrub RAM on shutdown
5. Full memory encryption (AMD SME/SEV, Intel TME) protects against physical RAM reads
