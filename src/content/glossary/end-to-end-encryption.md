---
term: "End-to-End Encryption"
abbr: "E2EE"
slug: "end-to-end-encryption"
definition: "A method of secure communication where only the communicating users can read the messages. In principle, it prevents potential eavesdroppers – including telecom providers, Internet providers, and even the provider of the communication service – from being able to access the cryptographic keys needed to decrypt the conversation."
category: "Encryption"
relatedTerms:
  - "encryption"
  - "public-key-cryptography"
  - "signal-protocol"
aliases:
  - "E2EE"
  - "E2E Encryption"
seeAlso:
  - name: "Signal"
    slug: "signal"
  - name: "ProtonMail"
    slug: "protonmail"
---

End-to-End Encryption (E2EE) ensures that your messages, calls, and files can only be read by you and the intended recipient. Even the service provider cannot access the content.

## How It Works

1. **Key Generation**: Each user generates a pair of cryptographic keys (public and private)
2. **Key Exchange**: Users exchange public keys
3. **Encryption**: Messages are encrypted using the recipient's public key
4. **Decryption**: Only the recipient's private key can decrypt the message

## Why It Matters

Without E2EE, your communications pass through servers where they could potentially be:
- Read by the service provider
- Accessed by hackers if servers are breached
- Handed over to governments via subpoena

## Common Misconceptions

- **"E2EE means the app can't see anything"**: Metadata (who you talk to, when, how often) may still be visible
- **"All encrypted apps are E2EE"**: Some apps only encrypt data in transit to their servers, not end-to-end

## Red Flags

Be cautious of services that:
- Claim E2EE but don't publish their code for verification
- Store encryption keys on their servers
- Can "recover" your messages if you lose your password

