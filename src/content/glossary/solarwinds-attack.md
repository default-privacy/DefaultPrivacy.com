---
term: "SolarWinds Attack"
slug: "solarwinds-attack"
definition: "A sophisticated 2020 supply chain attack where Russian-linked hackers compromised SolarWinds' Orion software update mechanism, infiltrating 18,000+ organizations including US Treasury, Commerce, Homeland Security, and major corporations."
category: "Attacks"
relatedTerms:
  - "supply-chain-attack"
  - "supply-chain-transparency"
  - "backdoor"
  - "zero-day-exploit"
  - "nation-state-threat"
aliases:
  - "SolarWinds Hack"
  - "SUNBURST Attack"
  - "Solorigate"
keywords:
  - "SolarWinds hack"
  - "SolarWinds supply chain attack"
  - "SUNBURST malware"
  - "government supply chain hack"
  - "SolarWinds breach"
---

The SolarWinds attack demonstrated that you don't need to hack your target directly — you can hack the software they trust. By compromising a single software update, attackers gained access to the US government's most sensitive networks.

## How It Worked

1. **Attackers infiltrated SolarWinds** build environment (likely as early as October 2019)
2. Malicious code ("SUNBURST") was injected into **routine software updates** for SolarWinds Orion
3. **18,000+ organizations** downloaded the compromised update between March–June 2020
4. The trojanized update gave attackers a **backdoor** into each organization's network
5. Attackers selectively activated the backdoor in high-value targets
6. **FireEye** (a cybersecurity firm) discovered the breach in December 2020 — after 9+ months of undetected access

## Who Was Compromised

### US Government Agencies
- Department of the Treasury
- Department of Commerce (NTIA)
- Department of Homeland Security
- Department of State
- Parts of the Pentagon
- Department of Energy (including nuclear weapons agency NNSA)
- National Institutes of Health

### Private Sector
- FireEye, Microsoft, Intel, Cisco, Deloitte
- Estimated **100+ organizations** were actively exploited out of 18,000 who downloaded the update

## Why It Was So Dangerous

- **Trusted update channel** — Organizations thought they were installing a legitimate patch
- **9+ months of undetected access** — Attackers moved slowly and carefully
- **Government networks** — The most sensitive data in the country was exposed
- **Scale** — A single compromised vendor gave access to thousands of organizations
- **Attribution** — Linked to Russian intelligence (SVR/Cozy Bear)

## Lessons for Everyone

1. **Supply chain attacks target trust** — even legitimate software updates can be compromised
2. **Zero trust architecture** matters — don't assume internal traffic is safe
3. **Software bills of materials (SBOM)** help identify vulnerable dependencies
4. **Network segmentation** limits blast radius when a breach occurs
5. **Government cybersecurity is inadequate** — SolarWinds exposed systemic vulnerabilities
