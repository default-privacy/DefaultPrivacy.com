---
term: "Encryption at Rest"
slug: "encryption-at-rest"
definition: "Encryption applied to data stored on disks, databases, or other storage media. When data is 'at rest' (not actively being transmitted), encryption protects it from unauthorized access if storage devices are stolen or compromised."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "aes"
aliases:
  - "Data at Rest Encryption"
  - "Storage Encryption"
keywords:
  - "disk encryption"
  - "database encryption"
  - "stored data"
  - "full disk encryption"
---

Encryption at rest protects your data when it's sitting on a drive—whether your laptop gets stolen, a server is breached, or old hardware is improperly disposed of. The data remains unreadable without the key.

## What "At Rest" Means

### At Rest
- Stored on hard drives
- In databases
- On backup tapes
- In cloud storage
- Not currently being processed

### vs In Transit
- Moving across networks
- Being transmitted
- TLS/HTTPS protection

### vs In Use
- Actively being processed
- In memory
- Hardest to protect

## Types of Encryption at Rest

### Full Disk Encryption (FDE)
- Entire drive encrypted
- BitLocker (Windows)
- FileVault (Mac)
- LUKS (Linux)
- Transparent to user

### File-Level Encryption
- Individual files encrypted
- More granular control
- Can have different keys per file
- VeraCrypt, Cryptomator

### Database Encryption
- Transparent Data Encryption (TDE)
- Column-level encryption
- Application-level encryption
- Key management critical

### Cloud Storage Encryption
- Provider-managed keys
- Customer-managed keys
- Client-side encryption

## Who Holds the Keys?

### You Hold Keys
- Maximum protection
- Provider can't access
- You're responsible for key management
- Loss means data loss

### Provider Holds Keys
- Easier management
- Provider can access (and may be compelled)
- Still protects against physical theft
- Common default

### Hybrid
- Provider manages, you control
- Bring Your Own Key (BYOK)
- Balance of convenience and control

## Benefits

- Protection if device is stolen
- Compliance requirements satisfied
- Data breach mitigation
- Secure decommissioning

## Limitations

- Doesn't protect from authorized users
- Keys in memory during use
- Doesn't protect data in transit
- Key management complexity

