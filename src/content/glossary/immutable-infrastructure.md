---
term: "Immutable Infrastructure"
slug: "immutable-infrastructure"
definition: "A deployment model where servers are never modified after deployment — changes require building and deploying a new server, reducing the risk of persistent compromise."
category: "Cloud"
relatedTerms:
  - "zero-trust-architecture"
---

Immutable infrastructure treats servers like disposable containers rather than pets to be maintained.

## How It Works

- Servers are built from a known-good image
- No SSH access, no manual changes, no patches applied in-place
- If a change is needed, a new server is built and the old one is destroyed
- Configuration is defined in code (Infrastructure as Code)

## Privacy/Security Benefits

- **No persistent malware**: Any compromise is wiped on next deployment
- **Known state**: Every server matches its defined configuration exactly
- **Audit trail**: All changes are in version control, not ad-hoc server modifications
- **Reduced attack surface**: No SSH, no unnecessary services

## Tools

- **Docker**: Containerized deployments
- **Terraform**: Infrastructure as Code
- **Packer**: Build machine images
- **Kubernetes**: Orchestrate container deployments
