---
term: "Client-Side Scanning"
slug: "client-side-scanning"
definition: "Scanning content on a user's device — before or after encryption — to detect prohibited material, often proposed for child safety but criticized as a backdoor that undermines end-to-end encryption."
category: "Encryption"
relatedTerms:
  - "chat-control"
  - "earn-it-act"
  - "encryption-ban"
  - "end-to-end-encryption"
---

Client-side scanning (CSS) means running detection software on the user's phone or computer, rather than on a server. The goal: find prohibited content (e.g., child sexual abuse material) without the provider ever seeing the user's messages. The problem: it still requires access to the content, which conflicts with strong end-to-end encryption.

## How It Works

1. **Before send** — When you attach an image or file, software on your device hashes it or runs a detection model. If it matches known CSAM or triggers an alert, the upload can be blocked or reported before encryption.
2. **After receive** — Similar process when content is decrypted on your device. The client scans before displaying.
3. **Hash matching** — Compare against a database of known abuse material hashes. Fast, but only catches previously identified content.
4. **AI detection** — Machine learning models try to detect new or unknown material. Higher false positive risk; raises questions about what the model "sees" and who controls it.

## The Encryption Conflict

End-to-end encryption (E2EE) means only the sender and recipient have the keys. The provider cannot read the message. Client-side scanning requires *something* to read or analyze the content — either:

- The user's device (which has the keys after decryption), or
- A process that runs before encryption (so the content is in the clear at least momentarily)

Privacy advocates argue that any mandatory scanning creates a surveillance capability. The same mechanism that checks for CSAM could be extended to other content — terrorism, dissent, copyright — or abused by malicious actors who compromise the scanning software.

## Legislative Context

- **Chat Control (EU)** — Proposes mandatory client-side scanning for messaging apps. Heavily debated; multiple revisions.
- **EARN IT Act (US)** — Would pressure platforms to adopt scanning or lose liability protections. Could effectively mandate CSS for some services.
- **UK Online Safety Act** — Requires platforms to address child safety; may lead to scanning requirements with similar implications.

## Apple's 2021 Proposal

Apple proposed scanning iCloud Photos for CSAM hashes on-device before upload. The proposal illustrated the tension: even "privacy-preserving" scanning (hashing on-device, only reporting matches) was seen as a dangerous precedent that could be expanded or exploited.
