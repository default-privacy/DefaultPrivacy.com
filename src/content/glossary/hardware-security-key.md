---
term: "Hardware Security Key"
slug: "hardware-security-key"
definition: "A physical device used for authentication that provides the strongest form of two-factor authentication. Hardware keys are immune to phishing attacks because they cryptographically verify the legitimacy of the website before responding."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "fido2"
  - "webauthn"
aliases:
  - "Security Key"
  - "U2F Key"
  - "FIDO Key"
seeAlso:
  - name: "YubiKey"
    slug: "yubikey"
  - name: "Nitrokey"
    slug: "nitrokey"
---

Hardware security keys are physical devices that provide the gold standard in authentication security. Unlike codes that can be phished, a hardware key cryptographically verifies you're on the real website before responding.

## Why Hardware Keys Are Superior

### Phishing Immune
When you try to log in:
1. The key checks the website's actual domain
2. If it's a fake site (phishing), the key won't respond
3. You're protected even if you don't notice the fake URL

### No Shared Secrets
- Traditional 2FA: Server and your device both know the code
- Hardware keys: Only your key has the private key
- Nothing to steal from a server breach

### No Batteries, No Connectivity
- Works without internet or cellular
- No battery to die at a critical moment
- Simple, reliable, durable

## How They Work

1. **Registration**: Key generates a unique keypair for each site
2. **Authentication**: Site sends a challenge, key signs it with private key
3. **Verification**: Site verifies signature with public key
4. **Origin binding**: Key only responds to the legitimate domain

## Types of Hardware Keys

- **USB-A**: Traditional USB connector
- **USB-C**: Modern USB connector
- **NFC**: Tap to authenticate with phones
- **Lightning**: For Apple devices
- **Bluetooth**: Wireless option (less secure)

## Best Practices

1. Buy at least two keys (one primary, one backup)
2. Register both keys with important accounts
3. Store backup key in a secure location
4. Start with email—it's the master key to other accounts

## Limitations

- **Cost**: $25-70+ per key
- **Physical requirement**: Must have key with you
- **Compatibility**: Not all services support them yet
- **Loss risk**: Losing keys without backup = lockout

