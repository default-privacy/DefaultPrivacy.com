---
term: "Air-Gapped Computer"
slug: "air-gapped-computer"
definition: "A computer that is physically isolated from the internet and all other networks, used for handling the most sensitive data and cryptographic operations."
category: "Hardware"
relatedTerms:
  - "air-gap"
  - "cold-boot-attack"
  - "operational-security"
---

An air-gapped computer has no physical connection to any network — no WiFi, no Ethernet, no Bluetooth.

## Use Cases

- **Cryptocurrency cold storage**: Sign transactions offline
- **Key ceremonies**: Generate and manage root cryptographic keys
- **Classified systems**: Military and government secrets
- **Sensitive document handling**: Journalistic sources, legal documents

## How to Create One

1. Use a dedicated device (never connected to internet)
2. Disable or physically remove wireless hardware
3. Transfer data only via physically verified USB drives or QR codes
4. Consider removing the hard drive entirely (run from RAM only)

## Limitations

- Data must be manually transferred (USB, QR codes)
- Acoustic, electromagnetic, and thermal side-channel attacks exist but require physical proximity
- Human error (connecting to WiFi "just once") destroys the air gap
- USB drives can carry malware (Stuxnet crossed air gaps via USB)
