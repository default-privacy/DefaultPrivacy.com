---
term: "Dead Drop"
slug: "dead-drop"
definition: "A method of passing information between two parties without them ever meeting or communicating directly, originally a spy technique now adapted for digital use."
category: "OpSec"
relatedTerms:
  - "operational-security"
  - "compartmentalization"
---

Dead drops allow information exchange without creating a direct connection between the communicating parties.

## Physical Dead Drops

- A pre-arranged location where one party leaves information
- The other party retrieves it at a different time
- No direct contact, no communication, no meeting

## Digital Dead Drops

- **SecureDrop**: Used by journalists to receive tips from anonymous sources
- **OnionShare**: Share files over Tor without cloud storage
- **Shared cloud accounts**: Both parties access the same anonymous account
- **Steganography**: Hide messages in publicly posted images

## Why It Matters

- Communication metadata (who contacted whom, when) is often more revealing than content
- Dead drops break the metadata chain
- Even with end-to-end encryption, the fact that two parties communicated is visible

## Digital Consideration

No digital dead drop is perfect. Timing analysis, access patterns, and IP addresses can potentially link the parties. Use Tor and randomize access times.
