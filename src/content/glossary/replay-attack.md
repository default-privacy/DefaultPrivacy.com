---
term: "Replay Attack"
slug: "replay-attack"
definition: "An attack where valid data transmission is maliciously repeated or delayed. The attacker captures legitimate encrypted data and retransmits it later to trick the system into unauthorized actions, even without decrypting the content."
category: "Security"
relatedTerms:
  - "nonce"
  - "encryption"
  - "man-in-the-middle"
aliases:
  - "Playback Attack"
keywords:
  - "retransmission attack"
  - "captured data"
  - "authentication bypass"
---

In a replay attack, the attacker doesn't need to break encryption—they just record a legitimate transaction and play it back. If you capture someone's encrypted "transfer $100" message, you can replay it repeatedly.

## How Replay Attacks Work

1. **Attacker intercepts** valid encrypted message
2. **Stores the message** without decrypting
3. **Retransmits later** to same or different target
4. **System accepts** as legitimate (it was, originally)
5. **Unauthorized action** is performed

## Real-World Examples

### Garage Door Replay
- Old garage openers used fixed codes
- Attacker records signal
- Replays to open garage anytime

### Authentication Replay
- Capture login credential hash
- Replay to authenticate without password
- "Pass the hash" attacks

### Financial Transactions
- Record signed transaction
- Replay to repeat payment
- Why cryptocurrency uses nonces

## Defense Mechanisms

### Nonces (Numbers Used Once)
- Include unique value in each message
- Server rejects duplicate nonces
- Each request cryptographically unique

### Timestamps
- Include time in message
- Reject old messages
- Requires synchronized clocks

### Session Tokens
- Unique token per session
- Changes after use
- Can't replay old tokens

### Sequence Numbers
- Incrementing counter
- Reject out-of-sequence messages
- Track per sender

### Challenge-Response
- Server sends random challenge
- Client must respond to current challenge
- Previous responses invalid

## Protocols with Replay Protection

### Kerberos
- Timestamps and sequence numbers
- Ticket expiration

### TLS
- Session-specific keys
- Sequence numbers in MAC

### IPSec
- Anti-replay windows
- Sequence number tracking

### Cryptocurrency
- Transaction nonces
- One-time use signatures

