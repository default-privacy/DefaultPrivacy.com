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

## Trade-offs

- Server-side search is impossible (provider can't read file contents)
- Sharing requires the recipient to have the decryption key
- If you lose your password and recovery key, your data is permanently lost
- Generally slower than non-encrypted alternatives

For what to use, see [De-Google your life](/stacks/de-google-your-life).
