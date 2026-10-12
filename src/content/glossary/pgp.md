---
term: "PGP"
slug: "pgp"
definition: "Pretty Good Privacy (PGP) is an encryption program that provides cryptographic privacy and authentication for data communication. It's used for signing, encrypting, and decrypting texts, emails, files, and directories, and is the gold standard for email encryption."
category: "Encryption"
relatedTerms:
  - "public-key-cryptography"
  - "encryption"
  - "gpg"
aliases:
  - "Pretty Good Privacy"
  - "GPG"
  - "GnuPG"
  - "OpenPGP"
seeAlso:
  - name: "ProtonMail"
    slug: "protonmail"
---

PGP (Pretty Good Privacy) has been protecting communications since 1991. Its open standard, OpenPGP, and free implementation, GPG (GNU Privacy Guard), remain essential tools for email encryption.

## Core Functions

### Email Encryption
- Encrypt message content so only recipient can read
- Protect attachments
- Works with any email provider

### Digital Signatures
- Prove you authored a message
- Verify message wasn't altered
- Non-repudiation: sender can't deny sending

### File Encryption
- Encrypt any file for secure storage or transfer
- Create encrypted archives
- Protect sensitive documents

## The Web of Trust

Unlike centralized authorities (CAs), PGP uses a decentralized trust model:
1. You verify someone's identity in person
2. You sign their public key
3. Others who trust you can trust keys you've signed
4. A web of trust connections builds organically

## Key Components

- **Public Key**: Share freely, others use to encrypt to you
- **Private Key**: Keep secret, used to decrypt and sign
- **Key ID**: Short identifier for your key
- **Fingerprint**: Full hash to verify key authenticity
- **Passphrase**: Protects your private key

## Modern Challenges

PGP has critics who argue:
- Key management is too complex for average users
- Metadata (to, from, subject) isn't encrypted
- No forward secrecy by default
- Email itself is an insecure medium

## Practical Usage

### Advanced Path
- Install GPG (GnuPG)
- Generate key pair
- Exchange public keys with contacts

For what to use, see [Escape Gmail: encrypted email and aliases](/stacks/escape-gmail-encrypted-email-aliases).
