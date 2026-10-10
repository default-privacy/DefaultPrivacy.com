---
term: "Certificate"
slug: "certificate"
definition: "A digital document that binds a cryptographic key to an identity (person, organization, or device). Certificates enable trusted encryption and verification—they're the foundation of HTTPS and secure communications."
category: "Encryption"
relatedTerms:
  - "https"
  - "tls"
  - "encryption"
aliases:
  - "Digital certificate"
  - "SSL certificate"
  - "X.509 certificate"
---

Certificates create trust on the internet. When you see the padlock, a certificate is verifying that the website is who it claims to be.

## How Certificates Work

1. **Certificate Authority (CA)** verifies the entity's identity
2. **CA signs** a certificate binding a public key to that identity
3. **Your browser** trusts the CA and thus trusts the certificate
4. **TLS handshake** uses the certificate to establish encrypted connection

## What's In a Certificate

- **Subject**: Who the certificate is for (domain name, organization)
- **Public key**: Used to encrypt data to that entity
- **Validity period**: Start and end date
- **Issuer**: Which CA signed it
- **Signature**: Cryptographic proof the CA vouched for it

## Certificate Types

- **DV (Domain Validation)**: CA verified you control the domain—basic encryption
- **OV (Organization Validation)**: CA verified the organization exists
- **EV (Extended Validation)**: Stricter verification—green bar in old browsers
- **Wildcard**: Covers *.example.com

## Privacy Considerations

- **Certificate Transparency**: Public logs of issued certificates—detect misissuance
- **CAs see your traffic metadata**: They know which sites requested certificates
- **Let's Encrypt**: Free, automated certificates—no payment/identity required for basic DV
