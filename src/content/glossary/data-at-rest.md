---
term: "Data At Rest"
slug: "data-at-rest"
definition: "Data stored on a device or server that is not actively being transmitted or processed, requiring encryption to protect against unauthorized access."
category: "Data Protection"
relatedTerms:
  - "encryption-at-rest"
  - "e2ee-cloud-storage"
---

Data at rest is vulnerable to theft through physical access, breaches, or insider threats.

## Where Data Rests

- Hard drives and SSDs
- Database servers
- Cloud storage
- Backup tapes and drives
- USB drives and portable storage
- Mobile devices

## Protection

- **Full-disk encryption**: BitLocker (Windows), FileVault (macOS), LUKS (Linux)
- **File-level encryption**: VeraCrypt containers, Cryptomator
- **Database encryption**: Transparent Data Encryption (TDE)
- **Cloud encryption**: Provider-managed keys or customer-managed keys (better: E2EE)
