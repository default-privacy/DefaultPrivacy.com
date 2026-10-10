---
term: "Double Ratchet"
slug: "double-ratchet"
definition: "A cryptographic protocol that provides end-to-end encryption with forward secrecy and break-in recovery. Used by Signal and adopted by WhatsApp, Facebook Messenger, and Google Messages. Each message gets a unique key; compromising one doesn't expose past or future messages."
category: "Encryption"
relatedTerms:
  - "signal-protocol"
  - "end-to-end-encryption"
  - "encryption"
aliases:
  - "Signal Protocol"
  - "Axolotl ratchet"
---

The Double Ratchet is why Signal (and apps that use its protocol) can promise "no one can read your messages"—not even the company running the service.

## How It Works

Two "ratchets" (one-way key derivation chains) work together:

1. **Symmetric key ratchet**: Derives a new key for each message from the previous one. Compromising one message doesn't reveal others (forward secrecy).
2. **Diffie-Hellman ratchet**: When either party sends a message, they perform a new DH exchange, updating the shared secret. Provides break-in recovery—if keys are stolen, future messages use new keys the attacker doesn't have.

## Key Properties

- **Forward secrecy**: Past messages stay secure even if keys are compromised later
- **Break-in recovery**: Future messages stay secure even if keys are compromised now
- **Asynchronous**: Works when parties are offline—no need for both to be online
- **No key escrow**: Keys exist only on devices; server never has them

## Adoption

- **Signal**: Original implementation
- **WhatsApp**: Full E2EE using Signal Protocol
- **Facebook Messenger**: Opt-in "Secret Conversations"
- **Google Messages**: RCS with E2EE (Signal Protocol)
- **Skype**: Private conversations

The Double Ratchet made strong encryption practical for billions of users.
