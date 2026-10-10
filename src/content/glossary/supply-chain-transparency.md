---
term: "Supply Chain Transparency"
slug: "supply-chain-transparency"
definition: "The ability to verify the origin, integrity, and security of every component in a technology product, from hardware manufacturing to software dependencies."
category: "Emerging Threats"
relatedTerms:
  - "supply-chain-attack"
  - "open-source"
  - "reproducible-builds"
---

You can only trust what you can verify. Supply chain transparency aims to make the full provenance of technology products verifiable.

## Software

- **SBOM (Software Bill of Materials)**: Lists every component and dependency in a software product
- **Reproducible builds**: Anyone can verify that the binary matches the source code
- **Code signing**: Cryptographic proof that software comes from the claimed developer
- **Dependency auditing**: Automated checking for known vulnerabilities in dependencies

## Hardware

- **Open hardware**: Designs publicly available for verification (RISC-V, Nitrokey)
- **Supply chain audits**: Physical verification of manufacturing processes
- **Tamper-evident packaging**: Physical seals that show if a device was opened

## Why It Matters for Privacy

- A compromised component at any level undermines all privacy protections built on top
- Closed-source firmware (like baseband processors) is a trust-me-or-else situation
- The xz Utils backdoor (2024) showed how a single compromised dependency can affect millions of systems

## What You Can Do

1. Prefer open-source software with reproducible builds
2. Verify software signatures before installing
3. Support open hardware initiatives
4. Choose vendors who publish transparency reports and audits
