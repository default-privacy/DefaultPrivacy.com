---
term: "Quantum Key Distribution"
abbr: "QKD"
slug: "quantum-key-distribution"
definition: "A method of using quantum mechanics to securely distribute encryption keys, where any eavesdropping attempt physically disturbs the quantum state and is detectable."
category: "Encryption"
relatedTerms:
  - "post-quantum-cryptography"
  - "key-exchange"
  - "quantum-computing-threat"
aliases:
  - "QKD"
---

QKD uses the fundamental properties of quantum physics to create theoretically unbreakable key exchange.

## How It Works

- Photons are sent with random polarizations encoding key bits
- Measuring a photon changes its state (Heisenberg uncertainty principle)
- If an eavesdropper intercepts photons, the disturbance is detectable
- Only undisturbed transmissions are used for the key

## Limitations

- Requires specialized hardware (quantum optical equipment)
- Limited range (~100km over fiber without quantum repeaters)
- Expensive and not widely deployed
- Vulnerable to implementation attacks (not theoretical attacks)

## Current Status

- China has deployed a QKD network spanning thousands of kilometers
- Several European QKD testbeds are operational
- Not practical for consumer use in the near future
- Post-quantum cryptography (software-based) is the practical solution for now
