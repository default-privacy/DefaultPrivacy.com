---
term: "Data Exfiltration"
slug: "data-exfiltration"
definition: "The unauthorized transfer of data from an organization's network, the primary goal of most data breaches."
category: "Cloud"
relatedTerms:
  - "data-breach"
  - "encryption-at-rest"
---

Data exfiltration is how stolen data actually leaves an organization during a breach.

## Methods

- **Network transfer**: Upload to cloud storage, email, or remote server
- **DNS tunneling**: Encode data in DNS queries to bypass firewalls
- **Steganography**: Hide data in images or files uploaded to legitimate services
- **Physical**: Copy to USB drives, printed documents, photos of screens
- **Encrypted channels**: Use HTTPS or VPN tunnels to hide the transfer

## Detection Challenges

- Encrypted traffic is hard to inspect without breaking encryption
- Cloud service usage is normal — distinguishing legitimate from malicious is hard
- Insider threats can exfiltrate data slowly over time
- Small amounts of highly valuable data (credentials, keys) are easy to hide

## Prevention

1. Data Loss Prevention (DLP) tools monitor for sensitive data leaving the network
2. Network segmentation limits what an attacker can reach
3. Endpoint detection monitors for suspicious file access
4. Encryption at rest means stolen files are useless without keys
5. Zero-trust architecture limits lateral movement
