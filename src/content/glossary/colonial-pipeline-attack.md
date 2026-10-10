---
term: "Colonial Pipeline Attack"
slug: "colonial-pipeline-attack"
definition: "A May 2021 ransomware attack by the DarkSide group that shut down the largest fuel pipeline in the United States for six days, causing fuel shortages across the East Coast and demonstrating how cyberattacks can disrupt critical infrastructure."
category: "Attacks"
relatedTerms:
  - "ransomware"
  - "ransomware-defense"
  - "data-breach"
  - "solarwinds-attack"
aliases:
  - "Colonial Pipeline Hack"
  - "Colonial Pipeline Ransomware"
  - "DarkSide Ransomware Attack"
keywords:
  - "Colonial Pipeline attack"
  - "Colonial Pipeline ransomware"
  - "critical infrastructure cyberattack"
  - "DarkSide ransomware"
  - "fuel pipeline hack"
  - "infrastructure ransomware"
---

The Colonial Pipeline attack proved that a cyberattack can cause real-world, physical consequences — fuel shortages, gas station lines, and panic buying across the entire US East Coast.

## What Happened

- **May 7, 2021**: DarkSide ransomware group breached Colonial Pipeline via a **compromised VPN password** (no multi-factor authentication)
- Colonial Pipeline carries **45% of the East Coast's fuel supply** (2.5 million barrels/day)
- The company **shut down the entire pipeline** as a precaution — the first full shutdown in its 57-year history
- Fuel shortages spread across southeastern states within days
- Colonial Pipeline paid **$4.4 million in Bitcoin** ransom (FBI later recovered $2.3 million)
- Pipeline resumed operations on **May 12** after 6 days offline

## Real-World Impact

- **Gas stations ran dry** across the Southeast — 71% of stations in North Carolina had no fuel
- **Panic buying** caused lines and hoarding
- **Fuel prices spiked** to highest levels since 2014
- Airlines rerouted flights due to fuel concerns
- Emergency declarations in 17 states and Washington DC
- **A single password** took down critical infrastructure for 100 million Americans

## How the Attack Started

The entry point was a **single compromised VPN credential** — likely from a password reused on another site that had been breached. The VPN account:
- Had no multi-factor authentication
- Was no longer actively used but hadn't been deactivated
- Gave the attackers direct access to Colonial's network

## Aftermath

- DarkSide **shut down operations** after intense US government pressure
- President Biden issued an **Executive Order on Cybersecurity** (EO 14028)
- Mandatory cybersecurity standards for pipeline operators enacted
- FBI recovered **63.7 Bitcoin** ($2.3 million) from DarkSide's wallet
- Highlighted the need for **critical infrastructure protection** regulations

## Lessons

1. **Multi-factor authentication is not optional** — a single password shut down half the East Coast's fuel
2. **Deactivate unused accounts** — the compromised VPN account was no longer in use
3. **Critical infrastructure is vulnerable** — pipelines, power grids, and water systems are targets
4. **Ransomware has physical consequences** — it's not just about data anymore
5. **Password reuse kills** — the credential was likely from a previous breach
