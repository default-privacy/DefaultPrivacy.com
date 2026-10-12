---
term: "Two-Factor Authentication"
slug: "two-factor-authentication"
definition: "A security method requiring two different types of identification to access an account: something you know (password) plus something you have (phone, hardware key) or something you are (biometric). This significantly reduces the risk of unauthorized access even if your password is compromised."
category: "Authentication"
relatedTerms:
  - "hardware-security-key"
  - "password-manager"
  - "authentication"
aliases:
  - "2FA"
  - "MFA"
  - "Multi-Factor Authentication"
  - "Two-Step Verification"
seeAlso:
  - name: "Aegis Authenticator"
    slug: "aegis"
  - name: "YubiKey"
    slug: "yubikey"
---

Two-Factor Authentication (2FA) adds a second layer of security beyond your password. Even if someone steals your password, they can't access your account without the second factor.

## The Three Factors

1. **Something you know**: Password, PIN
2. **Something you have**: Phone, hardware key, smart card
3. **Something you are**: Fingerprint, face, iris

True 2FA requires two *different* types—two passwords isn't 2FA.

## Types of 2FA

### Hardware Security Keys
- Physical devices like YubiKey
- Immune to phishing
- No batteries or connectivity needed

### Authenticator Apps
- Time-based one-time password (TOTP) apps
- Works offline
- Resistant to SIM swapping

### Push Notifications
- Approve login via app notification
- Convenient but requires internet
- Can be susceptible to fatigue attacks

### SMS Codes
- Vulnerable to SIM swapping
- Can be intercepted
- Better than nothing, but barely

## Why SMS 2FA Is Dangerous

Attackers can:
1. Call your carrier pretending to be you
2. Transfer your number to their SIM
3. Receive your 2FA codes
4. Access all your accounts

This "SIM swapping" attack has cost victims millions.

## Best Practices

1. Use hardware keys for critical accounts (email, financial)
2. Use authenticator apps for everything else
3. Save backup codes securely (password manager)
4. Avoid SMS when other options exist
5. Enable 2FA on your email first—it's the key to everything

For moving codes between apps, see [Move 2FA Codes to a New App or Phone](/guides/move-2fa-codes-to-a-new-app-or-phone).

