---
term: "Certificate Pinning"
slug: "certificate-pinning"
definition: "A security technique where an application only accepts specific TLS certificates for a given server, preventing man-in-the-middle attacks using forged certificates."
category: "Authentication"
relatedTerms:
  - "certificate-authority"
  - "tls"
  - "man-in-the-middle"
---

Certificate pinning hardcodes expected certificate information into an application, so even a compromised CA can't forge a trusted certificate.

## How It Works

- The app stores the expected certificate's public key hash
- During TLS connection, the server's certificate is checked against the pin
- If it doesn't match, the connection is refused
- Even a valid CA-signed certificate will be rejected if it doesn't match the pin

## Where It's Used

- Mobile banking apps
- Messaging apps (Signal)
- High-security web applications

## Limitations

- Makes certificate rotation complex
- Can lock users out if pinning is misconfigured
- Being phased out in browsers in favor of Certificate Transparency
- Still valuable in mobile apps where the developer controls both ends
