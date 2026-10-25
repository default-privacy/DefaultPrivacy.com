---
term: "Single Sign-On"
abbr: "SSO"
slug: "single-sign-on"
definition: "An authentication method allowing users to access multiple applications with one set of credentials. While convenient for users and administrators, SSO creates a single point of failure—compromise one account, compromise them all."
category: "Authentication"
relatedTerms:
  - "oauth"
  - "two-factor-authentication"
aliases:
  - "SSO"
keywords:
  - "centralized login"
  - "federated identity"
  - "SAML"
  - "enterprise login"
  - "identity provider"
---

Single Sign-On means one login for everything. Sign into your Google account once, and you're automatically signed into Gmail, YouTube, Google Drive, and dozens of other services.

## How SSO Works

1. **User accesses application**
2. **Application redirects** to identity provider (IdP)
3. **User authenticates** (if not already)
4. **IdP issues assertion** (proof of identity)
5. **Application grants access**
6. **Subsequent apps** skip authentication (already logged in)

## SSO Protocols

### SAML (Security Assertion Markup Language)
- Enterprise standard
- XML-based
- Common in corporate environments

### OpenID Connect
- Modern, built on OAuth 2.0
- JSON-based
- Consumer and enterprise use

### Kerberos
- Network authentication
- Active Directory integration
- On-premise systems

## Advantages

### For Users
- One password to remember
- Faster access to services
- Consistent login experience
- Less password fatigue

### For Organizations
- Centralized access control
- Easier user provisioning
- Better audit trails
- Reduced helpdesk tickets

## Security Implications

### Single Point of Failure
- One compromised password = everything compromised
- Attacker gains access to all linked services
- Higher value target

### Mitigations
- Strong authentication on IdP (mandatory 2FA)
- Session timeouts
- Anomaly detection
- Risk-based authentication

## Privacy Considerations

### Identity Provider Tracking
- IdP knows every service you use
- When you access each service
- Can build detailed profile

### Centralized Control
- IdP can lock you out of everything
- Account suspension = lose all access
- Terms of service violations cascade

## Best Practices

1. **Enable 2FA** on identity provider (critical!)
2. **Use strong, unique password** for SSO account
3. **Review connected applications** regularly
4. **Have backup access** methods
5. **Consider privacy** of identity provider choice

