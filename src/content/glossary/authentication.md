---
term: "Authentication"
slug: "authentication"
definition: "The process of verifying that someone or something is who or what they claim to be. Authentication answers 'Are you who you say you are?'—distinct from authorization, which answers 'What are you allowed to do?'"
category: "Security"
relatedTerms:
  - "two-factor-authentication"
  - "zero-knowledge-proof"
  - "password-reuse"
aliases:
  - "Auth"
  - "Identity verification"
---

Authentication is the gatekeeper. Without it, anyone could pretend to be you.

## Authentication Factors

### Something You Know
- Passwords, PINs, security questions
- Weakest factor—can be stolen, guessed, or phished

### Something You Have
- Phone (SMS, authenticator app)
- Hardware security key (YubiKey)
- Smart card

### Something You Are
- Fingerprint, face, iris
- Biometrics—convenient but can't be changed if compromised

## Multi-Factor Authentication (MFA)

Using two or more factors dramatically improves security:
- **2FA**: Password + phone or authenticator app
- **Phishing-resistant MFA**: FIDO2/WebAuthn keys that can't be phished
- **Passwordless**: Biometric + hardware key, no password at all

## Authentication and Privacy

Authentication can conflict with privacy:
- **Centralized auth**: Google, Facebook login—they know everywhere you sign in
- **Federated identity**: Sign in with one provider across many sites
- **Self-sovereign**: You control your identity, minimal disclosure
- **Anonymous auth**: Prove you're human or have permission without revealing identity (zero-knowledge proofs)
