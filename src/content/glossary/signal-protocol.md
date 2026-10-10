---
term: "Signal Protocol"
slug: "signal-protocol"
definition: "A cryptographic protocol that provides end-to-end encryption for voice and instant messaging conversations. Developed by Open Whisper Systems, it combines the Double Ratchet Algorithm, prekeys, and a triple Diffie-Hellman handshake to provide forward secrecy and future secrecy."
category: "Encryption"
relatedTerms:
  - "end-to-end-encryption"
  - "perfect-forward-secrecy"
  - "double-ratchet"
aliases:
  - "TextSecure Protocol"
  - "Double Ratchet Protocol"
seeAlso:
  - name: "Signal"
    slug: "signal"
---

The Signal Protocol is widely considered the gold standard for secure messaging. It's used by Signal, WhatsApp, Facebook Messenger (secret conversations), and Google Messages.

## Key Features

### Perfect Forward Secrecy
- Each message uses unique keys
- Compromising one key doesn't reveal past messages
- Historical conversations remain protected

### Future Secrecy (Self-Healing)
- If a key is compromised, future messages remain secure
- The protocol automatically recovers
- Attacker loses access after key rotation

### Deniable Authentication
- You can verify who you're talking to
- But transcripts can't cryptographically prove anything
- Protects against coerced disclosure

## How It Works

### The Double Ratchet
1. **Diffie-Hellman Ratchet**: Generates new shared secrets
2. **Symmetric-Key Ratchet**: Derives message keys
3. **Together**: Provides both forward and future secrecy

### Key Exchange
- Uses X3DH (Extended Triple Diffie-Hellman)
- Works even if recipient is offline
- Prekeys allow asynchronous initial contact

## Why It's Trusted

- **Open source**: Fully auditable code
- **Peer reviewed**: Academic security analysis
- **Battle tested**: Used by billions of users
- **Independent audits**: Multiple third-party reviews

## Limitations

- **Metadata**: Doesn't hide who you're talking to
- **Backup security**: Cloud backups may not be encrypted
- **Trust in app**: Protocol is secure, but app could have flaws
- **Sealed sender**: Only Signal has this metadata protection

## Adoption

The protocol is so well-designed that even Facebook and Google use it, acknowledging that rolling your own crypto is dangerous.

