---
term: "HTTPS"
slug: "https"
definition: "Hypertext Transfer Protocol Secure is the encrypted version of HTTP, the protocol used to transfer data between your browser and websites. HTTPS uses TLS encryption to protect the confidentiality and integrity of data in transit, preventing eavesdropping and tampering."
category: "Networking"
relatedTerms:
  - "tls"
  - "encryption"
  - "certificate"
aliases:
  - "HTTP Secure"
  - "HTTP over TLS"
---

HTTPS is the encrypted foundation of the modern web. When you see the padlock in your browser's address bar, your connection to that website is encrypted.

## What HTTPS Protects

### Confidentiality
- Your ISP can't see page contents (only the domain)
- Attackers on public WiFi can't read your traffic
- Passwords and credit cards are encrypted in transit

### Integrity
- Data can't be modified en route
- No ad injection by ISPs
- No malware injection by attackers

### Authentication
- Verifies you're connected to the real website
- Certificate proves site identity
- Prevents man-in-the-middle attacks

## What HTTPS Doesn't Protect

- **Domain visibility**: ISP can see you visited "bank.com" (but not which pages)
- **Metadata**: Connection timing, data amounts still visible
- **Site content**: HTTPS encrypts transit, not storage
- **Server security**: Site can still be hacked or malicious

## How HTTPS Works

1. **Browser requests HTTPS connection**
2. **Server presents certificate** (proving identity)
3. **Browser verifies certificate** with Certificate Authority
4. **Key exchange** using asymmetric crypto
5. **Symmetric encryption** protects all data transfer

## The Padlock Isn't Enough

A padlock only means the connection is encrypted—not that the site is trustworthy:
- Phishing sites can have HTTPS
- Malicious sites can get certificates
- Always verify the domain name

## Best Practices

1. **Look for HTTPS**: Don't enter sensitive data on HTTP sites
2. **Check certificate warnings**: Don't bypass them carelessly
3. **Verify domains**: "bankofamerica.com" vs "bank0famerica.com"

For what to use, see [Private browsers compared](/guides/private-browsers-compared).
