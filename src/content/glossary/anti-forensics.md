---
term: "Anti-Forensics"
slug: "anti-forensics"
definition: "Techniques used to prevent, disrupt, or mislead digital forensic investigations by destroying evidence or making analysis difficult."
category: "OpSec"
relatedTerms:
  - "operational-security"
  - "deniable-encryption"
  - "tails-os"
---

Anti-forensics aims to make digital evidence unrecoverable or unreliable.

## Techniques

- **Secure deletion**: Overwriting files so they can't be recovered
- **Encryption**: Making data unreadable without the key
- **Steganography**: Hiding data within innocent-looking files
- **Log manipulation**: Altering or deleting system logs
- **Timestomping**: Changing file timestamps to mislead investigators
- **Memory-only malware**: Leaves no disk artifacts

## Legitimate Uses

- Protecting trade secrets during device disposal
- Ensuring personal data is truly deleted
- Journalists protecting source identities

## Tools

- **BleachBit**: Secure file deletion and system cleaning
- **Tails**: Leaves no trace on the host computer
- **VeraCrypt**: Encrypted containers with plausible deniability
