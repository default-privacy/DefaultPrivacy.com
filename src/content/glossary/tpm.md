---
term: "Trusted Platform Module (TPM)"
slug: "tpm"
definition: "A specialized security chip built into most modern computers that provides hardware-based cryptographic functions and secure key storage."
category: "Hardware"
relatedTerms:
  - "hsm"
  - "encryption-at-rest"
  - "hardware-security-key"
---

TPM is a security chip soldered to your computer's motherboard that handles sensitive cryptographic operations in hardware.

## Capabilities

- Secure key generation and storage
- Platform integrity measurement (detecting tampering)
- Disk encryption key management (BitLocker, LUKS)
- Random number generation
- Hardware-backed authentication

## Privacy Considerations

- **Positive**: Protects disk encryption keys from software attacks
- **Positive**: Enables secure boot to prevent rootkits
- **Concern**: TPM has a unique identifier (Endorsement Key) that could theoretically be used for hardware tracking
- **Concern**: Remote attestation could be used to prevent running modified software

## TPM 2.0

Windows 11 requires TPM 2.0. This has pushed TPM adoption but also raised concerns about hardware DRM and reduced user control over their own devices.
