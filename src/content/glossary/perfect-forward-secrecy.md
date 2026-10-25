---
term: "Perfect Forward Secrecy"
abbr: "PFS"
slug: "perfect-forward-secrecy"
definition: "A feature of key-agreement protocols that ensures session keys cannot be compromised even if the server's long-term private key is compromised. Each session uses unique keys, so past communications remain secure even if future keys are exposed."
category: "Encryption"
relatedTerms:
  - "end-to-end-encryption"
  - "signal-protocol"
  - "tls"
aliases:
  - "PFS"
  - "Forward Secrecy"
seeAlso:
  - name: "Signal"
    slug: "signal"
---

Perfect Forward Secrecy (PFS) protects past sessions against future compromises of secret keys. If someone steals a server's private key tomorrow, they still can't decrypt yesterday's conversations.

## How It Works

1. Each communication session generates new, temporary (ephemeral) keys
2. These keys are used only for that session, then discarded
3. The long-term keys are only used to authenticate, not encrypt
4. Even if long-term keys leak, past session keys remain unknown

## Why It's Critical

### Without PFS
An attacker could:
1. Record encrypted traffic today
2. Steal the server's private key years later
3. Decrypt all historical communications

### With PFS
- Each session's keys are unique and ephemeral
- No single key compromise unlocks historical data

## Where to Look for PFS

- **Messaging apps**: Signal, WhatsApp, Wire use PFS
- **Websites**: Check for ECDHE or DHE in the cipher suite
- **VPNs**: WireGuard and modern OpenVPN configurations support PFS

## Technical Details

PFS is typically implemented using:
- **Diffie-Hellman Ephemeral (DHE)**
- **Elliptic Curve Diffie-Hellman Ephemeral (ECDHE)**

