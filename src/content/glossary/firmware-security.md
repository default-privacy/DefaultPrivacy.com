---
term: "Firmware Security"
slug: "firmware-security"
definition: "The security of low-level software embedded in hardware devices, which runs before the operating system and can be compromised to create persistent, undetectable backdoors."
category: "Hardware"
relatedTerms:
  - "baseband-processor"
  - "tpm"
  - "supply-chain-attack"
---

Firmware occupies the most privileged position in any computing system — it controls the hardware directly.

## Why Firmware Matters

- Runs before the OS loads
- Has full hardware access
- Often not scanned by antivirus
- Updates are infrequent
- Compromise persists through OS reinstalls

## Attack Vectors

- **BIOS/UEFI rootkits**: Survive OS reinstallation and disk formatting
- **Baseband exploits**: Compromise the cellular modem
- **USB firmware**: BadUSB attacks reprogram USB device firmware
- **SSD firmware**: Malware in storage controller firmware

## Protection

1. Enable Secure Boot (verifies firmware integrity)
2. Keep firmware updated (BIOS, SSD, router)
3. Use hardware with open-source firmware when possible (Coreboot)
4. Physical security — firmware attacks often require physical access
