---
term: "Encrypted Messaging"
slug: "encrypted-messaging"
definition: "Messaging services that use end-to-end encryption to ensure only the sender and recipient can read messages, protecting against eavesdropping by anyone including the service provider."
category: "Email"
relatedTerms:
  - "end-to-end-encryption"
  - "signal-protocol"
  - "forward-secrecy-messaging"
  - "sealed-sender"
---

End-to-end encrypted messaging means not even the company running the service can read your messages.

## Recommended Messengers (Ranked)

1. **Signal**: Gold standard. Open source, minimal metadata, sealed sender, disappearing messages.
2. **Briar**: Peer-to-peer, works over Tor/WiFi/Bluetooth. No central server.
3. **Wire**: Good for teams. Swiss jurisdiction. Open source.
4. **Threema**: Swiss, no phone number required, paid app.
5. **Element (Matrix)**: Self-hostable, federated, open standard.

## Partially Encrypted

- **WhatsApp**: Signal Protocol, but owned by Meta. Collects extensive metadata.
- **iMessage**: Encrypted Apple-to-Apple, but Apple holds the key for iCloud backups.
- **Telegram**: Only encrypted in "Secret Chats" — regular chats are not E2EE.

## What to Look For

- **Default E2EE**: Encryption should be on by default, not opt-in
- **Open source**: Both client and server should be auditable
- **Minimal metadata**: Who you talk to matters as much as what you say
- **Disappearing messages**: Automatic deletion after a set time
- **No phone number requirement**: Reduces identity linkage

## The Metadata Problem

Encrypting message content is solved. The remaining challenge is metadata — who talks to whom, when, how often. Signal's sealed sender and Briar's peer-to-peer design address this.
