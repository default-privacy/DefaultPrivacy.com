---
term: "SAML"
slug: "saml"
definition: "An XML-based standard for exchanging authentication data between an identity provider and a service provider, commonly used in enterprise single sign-on."
category: "Authentication"
relatedTerms:
  - "oauth"
  - "single-sign-on"
---

SAML (Security Assertion Markup Language) allows you to log in once with an identity provider and access multiple services without re-authenticating.

## How It Works

1. User tries to access a service (Service Provider)
2. Service redirects to Identity Provider (IdP)
3. User authenticates with the IdP
4. IdP sends a signed SAML assertion back to the service
5. Service grants access based on the assertion

## Privacy Considerations

- The Identity Provider knows every service you access
- SAML assertions can contain extensive user attributes
- Minimizing shared attributes improves privacy

## SAML vs OAuth/OIDC

- SAML is XML-based and older (2005)
- OAuth 2.0/OIDC is JSON-based and more modern
- SAML is still dominant in enterprise environments
- OAuth/OIDC is preferred for consumer applications
