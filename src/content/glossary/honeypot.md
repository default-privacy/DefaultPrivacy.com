---
term: "Honeypot"
slug: "honeypot"
definition: "A decoy system designed to attract attackers, allowing security teams to study attack methods and detect intrusions."
category: "Networking"
relatedTerms:
  - "port-scanning"
  - "darknet"
---

Honeypots are intentionally vulnerable systems deployed to lure and observe attackers.

## Types

- **Low-interaction**: Simulates services on open ports, logs connection attempts
- **High-interaction**: Full operating system that attackers can explore
- **Honeynets**: Networks of honeypots simulating an entire infrastructure
- **Honey tokens**: Fake credentials planted in databases to detect breaches

## Privacy Use

- Detect if your network is being probed
- Identify compromised devices on your network (they'll try to connect to the honeypot)
- Some password managers include "canary" entries that alert if accessed

## Caution

Operating a honeypot means intentionally attracting attackers. Ensure it's properly isolated so a compromised honeypot can't be used to attack other systems.
