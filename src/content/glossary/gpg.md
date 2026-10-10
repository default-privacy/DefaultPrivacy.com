---
term: "GPG"
slug: "gpg"
definition: "GNU Privacy Guard—a free, open-source implementation of the OpenPGP standard. GPG provides encryption, digital signatures, and key management. It's the most widely used tool for PGP-compatible email encryption and file signing."
category: "Encryption"
relatedTerms:
  - "pgp"
  - "encryption"
  - "public-key-cryptography"
aliases:
  - "GnuPG"
  - "GNU Privacy Guard"
---

GPG is PGP for everyone. Where PGP was originally proprietary, GPG is free software—and the de facto standard for OpenPGP operations.

## GPG vs. PGP

- **PGP**: Original commercial product, now owned by Broadcom. The standard.
- **GPG (GnuPG)**: Free, open-source implementation. Fully compatible with PGP.
- **OpenPGP**: The standard both implement. RFC 4880 and successors.
- In practice: "PGP" and "GPG" are used interchangeably for the same capabilities.

## What GPG Does

### Encryption
- Encrypt files so only the recipient can read them
- Encrypt email (with mail client integration)
- Asymmetric (public/private key) or symmetric (passphrase only)

### Signing
- Digitally sign files or messages to prove authenticity
- Recipients verify the signature with your public key
- Tampering breaks the signature

### Key Management
- Generate key pairs
- Import/export public keys
- Revoke compromised keys
- Build and maintain your web of trust

## Using GPG

### Command Line
- `gpg --encrypt file.txt` — Encrypt for a recipient
- `gpg --sign file.txt` — Sign a file
- `gpg --verify file.txt.sig` — Verify a signature

### With Email
- Thunderbird + OpenPGP extension
- Enigmail (legacy)
- Or use ProtonMail/Tutanota for built-in PGP without GPG setup

### Key Servers
- Public keys published to keys.openpgp.org or keyservers
- Others can find your key to encrypt to you
- Consider key expiration and revocation certificates
