---
term: "Infrastructure as Code"
slug: "infrastructure-as-code"
definition: "Managing and provisioning computing infrastructure through machine-readable configuration files rather than manual processes, enabling reproducible and auditable deployments."
category: "Cloud"
relatedTerms:
  - "immutable-infrastructure"
  - "zero-trust-architecture"
aliases:
  - "IaC"
---

IaC treats infrastructure configuration like software — versioned, reviewed, and reproducible.

## Privacy/Security Benefits

- **Auditable**: Every configuration change is in version control
- **Reproducible**: Deployments are identical every time
- **Reviewable**: Security settings can be peer-reviewed before deployment
- **No drift**: Systems match their defined configuration exactly

## Tools

- **Terraform**: Multi-cloud infrastructure provisioning
- **Ansible**: Configuration management and automation
- **Pulumi**: IaC using programming languages
- **Docker Compose**: Container orchestration

## For Privacy Projects

IaC is especially valuable for privacy infrastructure (VPN servers, email servers, Tor relays) because it ensures consistent security configuration and makes it easy to rebuild from scratch if compromised.
