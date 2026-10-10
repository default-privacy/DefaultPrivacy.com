---
term: "End-to-End Encrypted Cloud Storage"
slug: "e2ee-cloud-storage"
definition: "Cloud storage where files are encrypted on your device before upload and can only be decrypted by you, not the storage provider."
category: "Cloud"
relatedTerms:
  - "encryption-at-rest"
  - "end-to-end-encryption"
  - "zero-knowledge-proof"
---

E2EE cloud storage means the provider stores your files but literally cannot read them.

## How It Differs from Regular Cloud

- **Regular cloud** (Google Drive, Dropbox): Provider encrypts data at rest, but holds the keys. They CAN read your files.
- **E2EE cloud** (Tresorit, Proton Drive): You encrypt before upload. Provider never has the keys. They CANNOT read your files.

## Providers

- **Tresorit**: Swiss, zero-knowledge. Business and personal plans.
- **Proton Drive**: Part of the Proton ecosystem. Swiss jurisdiction.
- **Filen**: Zero-knowledge, end-to-end encrypted. German company.
- **Cryptomator**: Not a provider — adds E2EE layer to any cloud (Dropbox, Google Drive).
- **Internxt**: Decentralized, E2EE storage.

## Trade-offs

- Server-side search is impossible (provider can't read file contents)
- Sharing requires the recipient to have the decryption key
- If you lose your password and recovery key, your data is permanently lost
- Generally slower than non-encrypted alternatives

## Recommendation

Use E2EE cloud storage for anything you wouldn't want on the front page of a newspaper. Use regular cloud for non-sensitive files where search and sharing convenience matter.
