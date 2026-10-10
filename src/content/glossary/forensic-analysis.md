---
term: "Forensic Analysis"
slug: "forensic-analysis"
definition: "The scientific examination of digital devices and data to recover evidence, used by law enforcement and incident responders."
category: "Attacks"
relatedTerms:
  - "anti-forensics"
  - "encryption-at-rest"
  - "cold-boot-attack"
---

Digital forensics can recover an extraordinary amount of data from devices, even after deletion.

## What Can Be Recovered

- Deleted files (from unallocated disk space)
- Browser history and cached pages
- Chat messages and email
- File access timestamps
- USB device connection history
- WiFi network connection history
- GPS location data

## Tools

- **Autopsy/Sleuth Kit**: Open-source forensic suite
- **Cellebrite**: Mobile device forensics (used by law enforcement)
- **GrayKey**: iPhone unlocking tool
- **EnCase**: Enterprise forensic platform

## Defense

1. Full-disk encryption (data unreadable without key)
2. Secure deletion of sensitive files
3. Encrypted messaging (no server-side content to seize)
4. Tails OS (leaves no trace on the host computer)
5. Assume any unencrypted data on a seized device WILL be recovered
