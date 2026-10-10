---
term: "SMTP Relay"
slug: "smtp-relay"
definition: "A server that forwards email on behalf of the sender, which can either protect the sender's identity or be exploited for spam and spoofing."
category: "Email"
relatedTerms:
  - "email-header-analysis"
  - "s-mime"
---

SMTP relays are intermediate servers that pass email between the sender and recipient's mail servers.

## Privacy Aspects

- **Open relays**: Historically exploited for anonymous spam (now mostly blocked)
- **Authenticated relays**: Services like SendGrid, Mailgun provide email sending without revealing your server's IP
- **Tor email**: Services like OnionMail relay email through Tor

## Header Privacy

- Each relay adds a "Received" header, creating a traceable path
- Some privacy-focused providers strip identifying headers
- Using a relay adds a hop between you and the recipient, partially anonymizing the origin

## For Privacy

- Use a privacy-focused email provider that strips identifying headers
- Consider that email is inherently not private — use encrypted messaging for sensitive communications
- If you must use email, encrypt with PGP and understand that metadata is still visible
