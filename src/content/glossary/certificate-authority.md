---
term: "Certificate Authority"
abbr: "CA"
slug: "certificate-authority"
definition: "An organization trusted to issue digital certificates that verify the identity of websites, enabling HTTPS encrypted connections."
category: "Encryption"
relatedTerms:
  - "tls"
  - "https"
  - "public-key-cryptography"
aliases:
  - "CA"
---

Certificate Authorities (CAs) are the foundation of trust on the web. When you see the padlock icon in your browser, a CA has vouched for the website's identity.

## How It Works

1. Website operator generates a key pair
2. Sends a Certificate Signing Request (CSR) to a CA
3. CA verifies the operator's identity and domain ownership
4. CA signs the certificate with their private key
5. Browsers trust certificates signed by recognized CAs

## Trust Issues

- Browsers trust ~100+ root CAs by default
- Any CA can issue a certificate for any domain
- If a CA is compromised, all certificates it issued are suspect
- Government-controlled CAs exist (China, Kazakhstan have attempted interception)

## Let's Encrypt

Let's Encrypt provides free, automated certificates, making HTTPS accessible to everyone. It issues ~3 million certificates per day.

## Certificate Transparency

Public logs of all issued certificates let domain owners detect unauthorized certificate issuance for their domains.
