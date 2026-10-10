---
term: "Chat Control"
slug: "chat-control"
definition: "An EU legislative proposal that would require messaging services to scan all user communications for child sexual abuse material (CSAM), raising concerns about end-to-end encryption and mass surveillance."
category: "Legal"
relatedTerms:
  - "encryption-ban"
  - "earn-it-act"
  - "end-to-end-encryption"
  - "client-side-scanning"
---

Chat Control (formally the EU Regulation on Child Sexual Abuse) is a controversial proposal that would mandate automated scanning of private messages, photos, and videos across messaging apps to detect CSAM.

## How It Would Work

- **Client-side scanning** — Software on your device would scan content before or after encryption
- **Server-side scanning** — Providers would scan unencrypted content on their servers
- **Hash matching** — Known CSAM hashes compared against uploaded content
- **AI detection** — Machine learning models to detect new or unknown material

## The Encryption Problem

End-to-end encryption means only the sender and recipient can read messages. To scan content, either:

1. **Break encryption** — Remove or weaken E2EE so providers can read messages (defeats the purpose of private messaging)
2. **Scan before encryption** — Client-side scanning on the user's device before messages are sent (still invasive; creates a backdoor)
3. **Scan after decryption** — Only possible if the provider holds the keys (not true E2EE)

Privacy advocates argue that any mandatory scanning creates a surveillance infrastructure that can be expanded beyond its stated purpose.

## Related Legislation

- **EARN IT Act (US)** — Similar push to require scanning; would weaken Section 230 and encryption
- **UK Online Safety Act** — Already law; may require content scanning with similar implications
- **Encryption bans** — Several countries have proposed or passed laws requiring access to encrypted content

## Status

As of 2026, Chat Control remains under negotiation in the EU. Multiple drafts have been revised. The European Parliament has pushed back on mandatory client-side scanning. The outcome will affect Signal, WhatsApp, iMessage, and other E2EE services used by billions.
