---
term: "SNI (Server Name Indication)"
slug: "sni"
definition: "A TLS extension that reveals which website you're connecting to in plaintext, even when the connection is encrypted."
category: "Networking"
relatedTerms:
  - "tls"
  - "https"
  - "dns-over-https"
---

When you connect to an HTTPS website, SNI tells the server which site you want before encryption begins. This leaks the domain name to anyone watching your traffic.

## Why SNI Exists

- Multiple websites can share a single IP address
- The server needs to know which site you want to serve the right certificate
- This negotiation happens before the encrypted tunnel is established

## Privacy Impact

- Your ISP can see every HTTPS site you visit via SNI
- Censors can selectively block specific sites while allowing others on the same IP
- A VPN hides SNI from your ISP but the VPN provider can still see it

## Encrypted Client Hello (ECH)

- Formerly called ESNI (Encrypted SNI)
- Encrypts the SNI field so observers can't see which site you're connecting to
- Supported in Firefox and Chrome with compatible servers
- Not yet widely deployed
