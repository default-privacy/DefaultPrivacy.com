---
term: "Disk Encryption"
slug: "disk-encryption"
definition: "The process of encrypting an entire storage device so that all data is protected when the device is powered off or stolen."
category: "Encryption"
relatedTerms:
  - "encryption-at-rest"
  - "aes-gcm"
  - "tpm"
---

Full-disk encryption is one of the most important security measures for any device.

## Platform Options

- **macOS**: FileVault 2 (AES-XTS-128, hardware-accelerated)
- **Windows**: BitLocker (AES-128/256, requires TPM for best security)
- **Linux**: LUKS/dm-crypt (flexible, supports AES, Serpent, Twofish)
- **iOS**: Enabled by default when you set a passcode
- **Android**: Enabled by default on modern devices

## What It Protects Against

- Laptop/phone theft
- Border searches of powered-off devices
- Data recovery from disposed/recycled devices
- Physical forensic extraction (when device is off)

## What It Doesn't Protect Against

- Access while the device is unlocked/running
- Malware with root access
- Compelled decryption (legal, depending on jurisdiction)
- Cold boot attacks (in some configurations)
