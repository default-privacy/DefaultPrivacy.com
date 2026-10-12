---
term: "Brute Force Attack"
slug: "brute-force"
definition: "A trial-and-error method of cracking passwords or encryption by systematically trying every possible combination until the correct one is found. While simple in concept, brute force becomes impractical against sufficiently long, random secrets."
category: "Security"
relatedTerms:
  - "passphrase"
  - "encryption"
  - "hash-function"
aliases:
  - "Brute Force Cracking"
  - "Exhaustive Search"
keywords:
  - "password cracking"
  - "exhaustive attack"
  - "dictionary attack"
  - "credential stuffing"
---

Brute force is the sledgehammer of hacking—no finesse, just try everything until something works. It's mathematically guaranteed to succeed eventually, but "eventually" might be longer than the age of the universe.

## How Brute Force Works

### Pure Brute Force
Try every possible combination:
- a, b, c, ... aa, ab, ac, ... aaa, aab...
- Time grows exponentially with length

### Dictionary Attack
- Try common passwords first
- Word lists, leaked passwords
- Much faster for weak passwords

### Hybrid Attack
- Dictionary words + modifications
- password → p@ssw0rd, P@SSWORD, password123
- Catches common substitutions

### Rainbow Tables
- Pre-computed hashes
- Trade storage for time
- Defeated by salting

## Time to Crack

### Short Password (8 chars, lowercase only)
- 26^8 = 208 billion combinations
- At 10 billion/sec: 21 seconds

### Longer Password (12 chars, mixed)
- 95^12 = 540 sextillion combinations
- At 10 billion/sec: 1.7 million years

## Defense Strategies

### For Passwords
- Length over complexity
- Truly random generation
- Use password manager
- Never reuse passwords

### For Systems
- Account lockout after N attempts
- CAPTCHAs
- Rate limiting
- 2FA/MFA

### For Encryption
- Sufficient key length (AES-256)
- Strong key derivation (Argon2)
- Modern algorithms

## Why Brute Force Still Works

### Weak Passwords
- "password", "123456" cracked instantly
- Dictionary words fail quickly
- Short passwords = small search space

### Password Reuse
- Breach one account, try everywhere
- Credential stuffing attacks
- Automated tools make this easy

### Poor Implementation
- No rate limiting
- Fast hash functions
- No account lockout

