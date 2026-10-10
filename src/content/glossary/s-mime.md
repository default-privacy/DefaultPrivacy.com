---
term: "S/MIME"
slug: "s-mime"
definition: "A standard for public key encryption and signing of email messages, supported natively by most email clients."
category: "Email"
relatedTerms:
  - "pgp"
  - "end-to-end-encryption"
  - "public-key-cryptography"
---

S/MIME (Secure/Multipurpose Internet Mail Extensions) provides email encryption and digital signatures using X.509 certificates.

## S/MIME vs PGP

- **S/MIME**: Uses certificate authority (CA) infrastructure. Built into most email clients (Outlook, Apple Mail, Thunderbird).
- **PGP**: Uses web of trust. Requires separate software or extensions.
- Both provide encryption and signing
- S/MIME is more common in enterprise; PGP is more common in privacy communities

## How It Works

1. Obtain an S/MIME certificate (from a CA or self-signed)
2. Install the certificate in your email client
3. Send signed emails (recipients can verify your identity)
4. Exchange certificates with contacts to enable encrypted email

## Limitations

- Requires certificate management
- Only encrypts the message body — subject line, headers, and metadata are visible
- Key management can be complex at scale
- Certificates expire and need renewal
