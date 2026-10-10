---
term: "TLS"
slug: "tls"
definition: "Transport Layer Security is a cryptographic protocol designed to provide secure communication over a computer network. TLS encrypts the connection between your browser and web servers, ensuring privacy and data integrity. It's the technology behind HTTPS."
category: "Encryption"
relatedTerms:
  - "https"
  - "encryption"
  - "certificate"
aliases:
  - "Transport Layer Security"
  - "SSL"
  - "SSL/TLS"
---

TLS (Transport Layer Security) is the encryption protocol that secures your web browsing, email, and many other internet communications. When you see HTTPS, TLS is doing the heavy lifting.

## TLS vs SSL

- **SSL** (Secure Sockets Layer): Original protocol, now deprecated
- **TLS**: Successor to SSL, current standard
- **In practice**: "SSL" often used to mean TLS
- **Use TLS 1.2 or 1.3**: Older versions have vulnerabilities

## What TLS Provides

### Encryption
- Data encrypted in transit
- Unreadable to eavesdroppers
- Protects passwords, messages, financial data

### Authentication
- Server proves its identity via certificate
- Prevents connecting to imposters
- Certificate authorities vouch for sites

### Integrity
- Detects if data was modified
- Prevents tampering attacks
- Message Authentication Codes (MAC) verify content

## The TLS Handshake

1. **Client Hello**: Browser lists supported cipher suites
2. **Server Hello**: Server chooses cipher, sends certificate
3. **Key Exchange**: Both sides establish shared secret
4. **Secure Communication**: All further data encrypted

## TLS 1.3 Improvements

The latest version (TLS 1.3) brings:
- **Faster connections**: Reduced handshake round-trips
- **Better security**: Removed weak algorithms
- **Forward secrecy**: Mandatory, not optional
- **Simpler protocol**: Removed obsolete features

## Checking TLS Security

Look for:
- **TLS 1.2 or 1.3**: Older versions are insecure
- **Strong cipher suites**: AES-GCM, ChaCha20
- **Valid certificates**: Not expired, trusted issuer
- **HSTS**: Forces HTTPS on future visits

## Common Issues

- **Mixed content**: HTTPS page loading HTTP resources
- **Expired certificates**: Site hasn't renewed cert
- **Self-signed certificates**: Not verified by authority
- **Downgrade attacks**: Forcing older, weaker TLS

