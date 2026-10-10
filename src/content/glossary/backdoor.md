---
term: "Backdoor"
slug: "backdoor"
definition: "A hidden method of bypassing normal authentication or encryption in a computer system. Backdoors may be intentionally built in (for maintenance or surveillance) or secretly inserted by attackers. In privacy contexts, backdoors refer to deliberate weaknesses that allow authorities to access encrypted data."
category: "Security"
relatedTerms:
  - "encryption"
  - "open-source"
  - "end-to-end-encryption"
aliases:
  - "Back Door"
  - "Encryption Backdoor"
---

A backdoor is a secret way into a system that bypasses normal security. In privacy debates, governments often demand backdoors in encryption to catch criminals—but backdoors fundamentally undermine security for everyone.

## Types of Backdoors

### Intentional (Authorized)
- Built by developers for maintenance
- Required by governments for surveillance
- "Lawful intercept" capabilities

### Malicious (Unauthorized)
- Inserted by hackers
- Hidden in compromised software
- Supply chain attacks

### Architectural
- Weak key escrow systems
- Master keys held by third parties
- "Trusted" third-party access

## The Backdoor Debate

### Government Argument
- Need access to catch terrorists, criminals
- "Responsible encryption" with lawful access
- Only for authorized law enforcement

### Security Expert Response
- A backdoor for "good guys" is a backdoor for everyone
- Criminals will just use non-backdoored encryption
- Discovery/theft of backdoor keys = catastrophic breach
- Weakens security for billions to catch a few

## Why "Secure Backdoors" Are Impossible

1. **Mathematics doesn't negotiate**: Encryption is either secure or it isn't
2. **Keys can be stolen**: Any master key is a target
3. **Scope creep**: Access expands beyond original purpose
4. **International**: Other countries demand same access
5. **Criminal adaptation**: Bad actors switch to secure alternatives

## Historical Examples

- **Crypto AG**: Swiss company sold backdoored encryption to governments
- **Juniper Networks**: NSA-linked backdoor discovered in firewalls
- **Dual EC DRBG**: Backdoored random number generator in standards

## Protecting Yourself

- Use open-source encryption (backdoors harder to hide)
- Prefer decentralized systems (no central point for backdoors)
- Check security audits
- Avoid closed-source, government-influenced encryption

