---
term: "Certificate Transparency"
slug: "certificate-transparency"
definition: "A public logging system for TLS certificates that allows domain owners to detect unauthorized certificates issued for their domains."
category: "Encryption"
relatedTerms:
  - "certificate-authority"
  - "tls"
  - "certificate-pinning"
---

Certificate Transparency (CT) is a defense against rogue or compromised Certificate Authorities.

## How It Works

- CAs must log every certificate they issue in publicly auditable CT logs
- Domain owners can monitor logs for unauthorized certificates
- Browsers can reject certificates not found in CT logs

## Why It Matters

- A compromised CA could issue fake certificates for any website
- CT makes unauthorized certificate issuance detectable
- Major browsers (Chrome, Safari) require CT for all new certificates

## Monitoring

- **crt.sh**: Search CT logs for any domain
- Facebook's CT monitoring tool
- Various automated monitoring services
