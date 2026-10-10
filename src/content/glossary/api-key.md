---
term: "API Key"
slug: "api-key"
definition: "A unique identifier used to authenticate requests to an API, which if leaked can grant unauthorized access to services and data."
category: "Authentication"
relatedTerms:
  - "oauth-2"
  - "multi-factor-authentication"
---

API keys are the most common — and most commonly leaked — form of machine authentication.

## Security Risks

- Accidentally committed to Git repositories (the #1 cause of API key leaks)
- Embedded in client-side code (visible to anyone)
- Shared in plain text via email or chat
- No expiration by default on many services

## Best Practices

1. Never commit API keys to version control
2. Use environment variables or secret management tools
3. Rotate keys regularly
4. Use scoped keys with minimum required permissions
5. Monitor for unauthorized usage
