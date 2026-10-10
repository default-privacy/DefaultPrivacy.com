---
term: "Plausible Deniability"
slug: "plausible-deniability"
definition: "The ability to credibly deny knowledge of or responsibility for something, especially when encrypted data could be explained as random noise or when hidden volumes within encrypted containers cannot be proven to exist."
category: "Security"
relatedTerms:
  - "encryption"
  - "steganography"
aliases:
  - "Deniable Encryption"
keywords:
  - "hidden volume"
  - "deniable"
  - "rubber hose"
  - "VeraCrypt"
  - "duress password"
---

In adversarial situations, it may not be enough that your data is encrypted—you might need to deny that sensitive data exists at all. Plausible deniability provides this crucial protection.

## Why Plausible Deniability Matters

### Rubber Hose Cryptanalysis
- Coercion to reveal passwords
- Legal compulsion in some jurisdictions
- Physical threats
- "Wrench attack"

If they know encrypted data exists, they can force you to decrypt it. If they can't prove it exists, you can deny it.

## Hidden Volume Technique

### How It Works
1. Create encrypted outer volume
2. Fill with decoy sensitive data
3. Create hidden volume inside
4. Fill with truly sensitive data
5. Two different passwords

### Under Coercion
- Give outer volume password
- Decoy data appears
- Hidden volume is indistinguishable from random data
- Cannot prove hidden volume exists

### Tools Supporting This
- **VeraCrypt**: Hidden volumes and OS
- **Tomb**: Linux encrypted directories
- **LUKS**: Detached headers

## Types of Deniable Encryption

### Hidden Volumes
- Secret partition within encrypted space
- Outer volume has decoy data
- Random data could be empty space or hidden volume

### Deniable File Systems
- Multiple "views" of same data
- Different passwords show different content
- Rubberhose (historical)

### Steganography
- Data hidden in innocent files
- Images, audio, video
- Existence of message hidden

## Limitations

### Forensic Analysis
- Usage patterns might betray hidden volume
- Timestamps, access logs
- Anti-forensic measures needed

### Legal Jurisdiction
- Some countries: can compel all passwords
- UK: failure to decrypt is criminal
- Contempt of court for non-compliance

### Practical Issues
- Accidentally overwriting hidden volume
- Remembering multiple passwords
- Maintaining decoy content

## Best Practices

### If Using Hidden Volumes
- Keep outer volume realistic
- Update decoy data regularly
- Don't leak hidden volume's existence
- Consider jurisdiction laws

