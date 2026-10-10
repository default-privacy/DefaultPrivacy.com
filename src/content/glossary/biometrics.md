---
term: "Biometrics"
slug: "biometrics"
definition: "Authentication using unique physical or behavioral characteristics like fingerprints, facial features, iris patterns, or voice. While convenient, biometrics have a fundamental problem: you can't change them if compromised."
category: "Authentication"
relatedTerms:
  - "two-factor-authentication"
  - "passphrase"
aliases:
  - "Biometric Authentication"
  - "Biometric Security"
keywords:
  - "fingerprint"
  - "face recognition"
  - "iris scan"
  - "voice recognition"
  - "Touch ID"
  - "Face ID"
---

Your fingerprint is not a password—it's a username. Biometrics are convenient identifiers, but they fundamentally differ from secrets you can change.

## Types of Biometrics

### Physiological
- **Fingerprint**: Most common, widely deployed
- **Facial recognition**: Face ID, airport security
- **Iris/Retina**: High security, less common
- **Palm vein**: Used in some banking
- **DNA**: Ultimate identifier, impractical for auth

### Behavioral
- **Voice**: Call centers, banking
- **Typing patterns**: Continuous authentication
- **Gait**: How you walk
- **Signature**: Traditional but declining

## The Fundamental Problem

### Can't Be Changed
- Password leaked? Change it.
- Fingerprint leaked? You have 10. Forever.
- Once compromised, compromised for life.

### Can't Be Secret
- You leave fingerprints everywhere
- Face is publicly visible
- Photos can capture iris patterns
- Voice is recorded constantly

## Privacy Concerns

### Centralized Databases
- Breaches expose permanent identifiers
- Government databases growing
- Private company collections

### Surveillance
- Facial recognition everywhere
- Track individuals across locations
- No opt-out possible

### Forced Authentication
- Can be compelled physically
- Unconscious/deceased unlock possible
- Different legal protections than passwords

## Secure Biometric Use

### On-Device Processing
- Template stored only on device
- Never sent to server
- Apple's Secure Enclave approach

### As Second Factor Only
- Not replacement for password
- Convenience layer
- Fallback to password

### Local Authentication
- Unlock local device
- Not for remote authentication
- Attacker needs physical access

## Best Practices

1. **Use biometrics + password** (not instead of)
2. **Prefer on-device processing**
3. **Understand legal implications** in your jurisdiction
4. **Have password fallback** always enabled
5. **Consider disabling** for border crossings

