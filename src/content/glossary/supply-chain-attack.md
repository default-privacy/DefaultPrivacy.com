---
term: "Supply Chain Attack"
slug: "supply-chain-attack"
definition: "An attack that compromises a target by infiltrating a trusted supplier, vendor, or software dependency in their supply chain."
category: "Attacks"
relatedTerms:
  - "malware"
  - "backdoor"
  - "open-source"
---

Supply chain attacks exploit trust relationships — if you trust a software library or hardware vendor, compromising them compromises you.

## Software Supply Chain

- **SolarWinds (2020)**: Russian hackers inserted malware into a software update used by 18,000 organizations including US government agencies
- **event-stream (2018)**: A popular npm package was compromised to steal cryptocurrency
- **xz Utils (2024)**: A sophisticated backdoor was inserted into a critical Linux compression library

## Hardware Supply Chain

- Intercepting devices during shipping to implant surveillance hardware
- Compromising chip manufacturers to insert hardware backdoors
- Counterfeit components with hidden functionality

## Protection

1. Keep software updated (but verify updates when possible)
2. Use software with reproducible builds
3. Prefer open-source dependencies that are widely audited
4. Implement Software Bill of Materials (SBOM) tracking
5. For hardware: buy from trusted vendors, inspect for tampering
