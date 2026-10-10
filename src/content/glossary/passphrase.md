---
term: "Passphrase"
slug: "passphrase"
definition: "A sequence of words used as a password, typically longer and more memorable than traditional passwords. Passphrases like 'correct horse battery staple' provide strong security while being easier to remember than random character strings."
category: "Authentication"
relatedTerms:
  - "password-manager"
  - "two-factor-authentication"
aliases:
  - "Pass Phrase"
  - "Word Password"
keywords:
  - "diceware"
  - "word list"
  - "memorable password"
  - "long password"
---

A passphrase trades complexity for length. Instead of `P@ssw0rd!23` (which is actually weak), use `correct horse battery staple` (which is much stronger and easier to remember).

## Why Passphrases Work

### Math of Password Strength

**8-character complex password:**
- 95 possible characters per position
- 95^8 = 6.6 quadrillion combinations
- Crackable in hours with modern hardware

**4-word passphrase:**
- 7776 words in standard Diceware list
- 7776^4 = 3.6 quadrillion combinations
- Similar strength, much easier to remember

**6-word passphrase:**
- 7776^6 = 221 trillion trillion combinations
- Effectively uncrackable

## Generating Good Passphrases

### Diceware Method
1. Roll 5 dice (or use random number generator)
2. Look up resulting number in word list
3. Repeat 5-7 times
4. Result: `bloom atlas cactus merit rely globe`

### Key Requirements
- True randomness (not "your" random)
- Use established word lists
- Don't modify or "improve" output
- At least 5-6 words

## Good vs Bad Passphrases

### Strong
- `holster crepe stunt exert daybed` (random)
- `mercury envelope pizza submarine` (random)

### Weak
- `ilovemycatfluffy` (predictable)
- `tobeonottobe` (famous quote)
- `password123456` (common pattern)
- Song lyrics, book quotes, etc.

## When to Use Passphrases

### Perfect For
- Master password for password manager
- Full disk encryption
- Encryption keys you must memorize
- Accounts where you can't use password manager

### Less Ideal For
- Sites with length limits
- Systems requiring special characters
- Frequently-entered passwords (typing fatigue)

## Passphrase Best Practices

1. **Generate truly randomly** (don't pick words yourself)
2. **Use at least 5-6 words**
3. **Don't reuse** across accounts
4. **Consider adding random element** (`mercury7envelope#pizza`)
5. **Store backup** in password manager

