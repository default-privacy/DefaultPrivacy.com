---
term: "Forward Secrecy in Messaging"
slug: "forward-secrecy-messaging"
definition: "A property of messaging protocols where each message uses a unique encryption key, so compromising one key doesn't expose past or future messages."
category: "Email"
relatedTerms:
  - "perfect-forward-secrecy"
  - "signal-protocol"
  - "end-to-end-encryption"
---

Forward secrecy in modern messaging goes beyond traditional perfect forward secrecy by using ratcheting key mechanisms.

## The Double Ratchet

The Signal Protocol (used by Signal, WhatsApp, and others) uses a "double ratchet" that combines:

1. **Diffie-Hellman ratchet**: New DH key exchange with every message round
2. **Symmetric ratchet**: Chain keys that derive new message keys

## What This Means

- Every message has a unique encryption key
- Keys are deleted after use
- Compromising your device reveals only current messages, not past ones
- A compromised key can't decrypt future messages (self-healing)

## Which Apps Have It

- **Signal**: Full double ratchet
- **WhatsApp**: Signal Protocol implementation
- **Wire**: Proteus protocol (similar to Signal)
- **iMessage**: Partial forward secrecy
- **Telegram**: Only in "Secret Chats" (not default)

## What Doesn't Have It

- Regular email (PGP/S/MIME use static keys)
- Telegram default chats
- Most IRC and XMPP without OMEMO
