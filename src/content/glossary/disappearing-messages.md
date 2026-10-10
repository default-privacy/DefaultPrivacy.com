---
term: "Disappearing Messages"
slug: "disappearing-messages"
definition: "A messaging feature that automatically deletes messages after a set time period, reducing the risk of data exposure if a device is compromised."
category: "Email"
relatedTerms:
  - "end-to-end-encryption"
  - "forward-secrecy-messaging"
  - "operational-security"
---

Disappearing messages provide automatic data minimization for conversations.

## How They Work

- Sender sets a timer (seconds to weeks)
- After the timer expires, messages are deleted from both devices
- Deletion happens automatically without user intervention

## Available In

- **Signal**: Configurable per-conversation, 1 second to 4 weeks
- **WhatsApp**: 24 hours, 7 days, or 90 days
- **Telegram**: Secret chats with custom timers
- **Wire**: Configurable timers

## What They Don't Protect Against

- Screenshots (the recipient can always capture the screen)
- Photos of the screen
- Forwarding/copying before deletion
- Device forensics before deletion occurs

## When to Use

Disappearing messages should be the default for most conversations. You rarely need a permanent record of casual messages, and every message stored is a message that could be exposed in a breach, seized device, or legal discovery.
