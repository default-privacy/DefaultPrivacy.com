---
term: "Encrypted USB Drive"
slug: "encrypted-usb-drive"
definition: "A portable storage device with built-in hardware encryption that protects data even if the drive is lost or stolen."
category: "Hardware"
relatedTerms:
  - "encryption-at-rest"
  - "air-gap"
---

Hardware-encrypted USB drives protect data with on-device encryption that can't be bypassed by connecting the drive to a different computer.

## Hardware vs Software Encryption

- **Hardware**: Encryption chip on the drive itself. No software needed on the host computer. Faster, harder to attack.
- **Software**: Uses VeraCrypt or BitLocker. Requires software installation. More flexible but potentially vulnerable to keyloggers.

## Features to Look For

- AES-256 hardware encryption
- PIN or biometric authentication
- Auto-wipe after N failed attempts
- FIPS 140-2/3 certification
- Tamper-evident design

## Use Cases

- Transporting sensitive documents
- Air-gapped data transfer
- Backup of cryptographic keys
- Secure "dead drop" data exchange
