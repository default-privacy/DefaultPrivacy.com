---
term: "Web Application Firewall"
slug: "web-application-firewall"
definition: "A security tool that monitors and filters HTTP traffic between a web application and the internet, protecting against common web attacks."
category: "Cloud"
relatedTerms:
  - "content-security-policy"
  - "ddos"
aliases:
  - "WAF"
---

WAFs protect web applications from attacks that network firewalls can't detect.

## What It Blocks

- SQL injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- File inclusion attacks
- Automated scanners and bots

## Providers

- **Cloudflare WAF**: Widely used, free tier available
- **AWS WAF**: For AWS-hosted applications
- **ModSecurity**: Open-source WAF

## Privacy Consideration

WAFs terminate TLS connections to inspect traffic content. This means the WAF provider can see all traffic, including sensitive data. For privacy-critical applications, self-hosted WAFs (ModSecurity) avoid this third-party exposure.
