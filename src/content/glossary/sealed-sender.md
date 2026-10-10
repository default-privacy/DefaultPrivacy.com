---
term: "Sealed Sender"
slug: "sealed-sender"
definition: "A messaging feature where the server cannot see who sent a message to whom, protecting sender identity metadata even from the service provider."
category: "Email"
relatedTerms:
  - "signal-protocol"
  - "end-to-end-encryption"
  - "metadata"
---

Signal's sealed sender feature hides the sender's identity from Signal's servers, addressing the metadata problem.

## The Metadata Problem

- End-to-end encryption protects message content
- But the server still knows: who messaged whom, when, how often
- This metadata reveals relationships and communication patterns
- "We kill people based on metadata" — former NSA director Michael Hayden

## How Sealed Sender Works

1. Sender encrypts a "delivery certificate" with the recipient's identity key
2. Message is sent without the sender's identity in the envelope
3. Signal's server delivers the message knowing only the recipient
4. Recipient decrypts the delivery certificate to see who sent it

## Limitations

- Recipient's identity is still known to the server (it needs to deliver the message)
- Timing analysis could theoretically correlate sender and recipient
- Only works between users who have established a Signal session

## Significance

Sealed sender is one of the most important privacy innovations in messaging. It demonstrates that metadata protection is possible, not just content protection.
