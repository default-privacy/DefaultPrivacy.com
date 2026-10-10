---
term: "Secure Enclave"
slug: "secure-enclave"
definition: "An isolated, hardware-protected area within a processor that handles sensitive operations like biometric data and encryption keys, separate from the main operating system."
category: "Hardware"
relatedTerms:
  - "tpm"
  - "hsm"
  - "biometrics"
---

Secure enclaves create a trusted execution environment that even a compromised operating system cannot access.

## Implementations

- **Apple Secure Enclave**: Handles Face ID, Touch ID, and Apple Pay
- **ARM TrustZone**: Used in Android devices for key storage
- **Intel SGX**: Software Guard Extensions for server-side secure computation
- **AMD SEV**: Secure Encrypted Virtualization for cloud workloads

## What They Protect

- Biometric templates (fingerprints, face maps) — never leave the enclave
- Encryption keys for device storage
- Payment credentials
- DRM keys

## Privacy Benefits

- Your fingerprint data is never accessible to apps or the OS
- Even if your phone is compromised, biometric data remains protected
- Keys are tied to the specific hardware — can't be cloned

## Limitations

- Side-channel attacks have successfully extracted data from some enclaves
- Users must trust the manufacturer's implementation
- Closed-source firmware means limited independent verification
