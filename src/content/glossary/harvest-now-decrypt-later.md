---
term: "Harvest Now, Decrypt Later"
slug: "harvest-now-decrypt-later"
definition: "A surveillance strategy where intelligence agencies intercept and store encrypted communications today, planning to decrypt them in the future when quantum computers become powerful enough to break the encryption."
category: "Encryption"
relatedTerms:
  - "quantum-computing-threat"
  - "post-quantum-cryptography"
  - "nist-pqc-standards"
  - "five-eyes-alliance"
  - "mass-surveillance"
aliases:
  - "HNDL"
  - "Store Now Decrypt Later"
  - "Retrospective Decryption"
keywords:
  - "harvest now decrypt later"
  - "NSA storing encrypted data"
  - "quantum decryption future"
  - "encrypted data stored for quantum"
---

The most chilling implication of quantum computing isn't future surveillance — it's that the surveillance has already happened, and encrypted data captured years ago may eventually be read.

## How It Works

1. Intelligence agencies intercept encrypted internet traffic (they already do this — see PRISM, Upstream collection)
2. They can't decrypt it today — AES, RSA, and TLS are still secure against classical computers
3. They store the encrypted data in massive data centers (NSA's Utah Data Center holds exabytes)
4. When sufficiently powerful quantum computers arrive, they run Shor's algorithm to break the public-key encryption
5. TLS session keys are recovered, and all the stored traffic becomes readable

## Why It's Credible

- **NSA's Utah Data Center**: Built in 2014, estimated 3-12 exabytes of storage. What's it storing?
- **Five Eyes partnerships**: Shared data collection across US, UK, Canada, Australia, New Zealand
- **Budget**: NSA's classified budget is estimated at $10+ billion annually
- **Documented precedent**: Snowden leaks confirmed the NSA stores encrypted communications
- **China**: Also known to be stockpiling encrypted data
- **Cost of storage**: Decreasing exponentially — storing petabytes is increasingly trivial

## What's at Risk

Any communication captured today that used RSA or ECC for key exchange could potentially be decrypted:

- **TLS-encrypted web traffic** from before post-quantum migration
- **VPN tunnel data** using RSA or ECDH key exchange
- **Encrypted emails** using PGP with RSA keys
- **Secure messaging** that hadn't yet implemented post-quantum protocols
- **Financial transactions** sent over encrypted channels
- **Corporate communications** — trade secrets, M&A discussions, legal strategy

## Timeline

- **Quantum computers capable of breaking RSA-2048**: Estimated 10-20 years (2035-2045)
- **But**: If your secrets need protection for 10+ years, the threat is effectively **now**
- Government secrets, corporate IP, personal medical data, and legal communications all have multi-decade relevance

## What You Can Do

1. **Use AES-256** for local file encryption — symmetric encryption is quantum-resistant
2. **Migrate to post-quantum TLS** as it becomes available
3. **Assume intercepted communications will be readable** in 10-20 years — act accordingly for long-lived secrets
4. **Use forward secrecy** — Protocols that generate new keys per session limit what one compromised key reveals
5. **Support rapid PQ migration** in the tools and services you use

For what to use, see [Secure messaging stack](/stacks/secure-messaging-stack).
