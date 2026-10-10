---
term: "Secure Boot"
slug: "secure-boot"
definition: "A firmware security feature that ensures only cryptographically signed software can run during the boot process, preventing rootkits and boot-level malware."
category: "Hardware"
relatedTerms:
  - "tpm"
  - "firmware-security"
---

Secure Boot creates a chain of trust from firmware to operating system, ensuring nothing has been tampered with.

## How It Works

1. UEFI firmware verifies the bootloader's digital signature
2. Bootloader verifies the kernel's signature
3. Kernel verifies drivers and modules
4. Any unsigned or tampered component stops the boot process

## Controversy

- **Microsoft control**: Microsoft holds the root signing keys for most PCs
- **Linux compatibility**: Can be challenging but most major distros support it
- **User freedom**: Some see Secure Boot as restricting which software you can run

## Privacy Perspective

Secure Boot protects against firmware-level malware that could surveil you persistently. However, it relies on trusting Microsoft's (or another vendor's) signing authority. The ideal is Secure Boot with user-controlled keys.
