---
term: "Password Manager"
slug: "password-manager"
definition: "Software that securely stores and manages passwords and other credentials. Password managers generate strong, unique passwords for each account and encrypt them with a single master password, eliminating password reuse and the need to remember multiple complex passwords."
category: "Authentication"
relatedTerms:
  - "encryption"
  - "two-factor-authentication"
  - "zero-knowledge-proof"
aliases:
  - "Password Vault"
  - "Credential Manager"
seeAlso:
  - name: "Bitwarden"
    slug: "bitwarden"
  - name: "KeePassXC"
    slug: "keepassxc"
---

A password manager is one of the most impactful privacy tools you can use. It eliminates the main causes of account compromise: weak passwords and password reuse.

## The Problem They Solve

The average person has 100+ online accounts. Without a password manager:
- You reuse passwords (one breach = all accounts compromised)
- You use weak passwords (easier to remember = easier to crack)
- You forget passwords (leading to resets and frustration)

## How They Work

1. **Master password**: One strong password you remember
2. **Encrypted vault**: All credentials stored encrypted
3. **Autofill**: Passwords filled automatically in browsers/apps
4. **Generation**: Creates strong, random passwords

## Types of Password Managers

### Cloud-Based
- **Pros**: Sync across devices, easy setup
- **Cons**: Trust provider with encrypted data
- **Examples**: Bitwarden, 1Password

### Self-Hosted
- **Pros**: Full control, no third-party trust
- **Cons**: Technical setup, you handle backups
- **Examples**: Bitwarden (self-hosted), Vaultwarden

### Local-Only
- **Pros**: Data never leaves your device
- **Cons**: No sync, manual backups critical
- **Examples**: KeePassXC

## Privacy Considerations

Look for:
- **Zero-knowledge architecture**: Provider can't decrypt your data
- **Open source**: Verifiable security claims
- **End-to-end encryption**: Even with cloud sync
- **Security audits**: Independent verification
- **Local encryption**: Decryption happens on your device

## Best Practices

1. Use a strong, unique master password (passphrase recommended)
2. Enable 2FA on your password manager
3. Generate unique passwords for every account (20+ characters)
4. Regular backups of your vault
5. Review and remove unused accounts periodically

