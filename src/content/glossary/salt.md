---
term: "Salt"
slug: "salt"
definition: "Random data added to a password before hashing to ensure identical passwords produce different hashes. Salting defeats rainbow table attacks and prevents attackers from identifying users with the same password."
category: "Encryption"
relatedTerms:
  - "hash-function"
  - "password-manager"
aliases:
  - "Password Salt"
  - "Cryptographic Salt"
keywords:
  - "rainbow table"
  - "password hashing"
  - "unique hash"
  - "bcrypt"
  - "argon2"
---

A salt is random data that makes password hashing secure. Without it, the same password always produces the same hash—a critical vulnerability.

## The Problem Without Salt

If passwords are hashed without salt:
- "password123" always hashes to the same value
- Attackers can pre-compute hashes for common passwords
- One breach reveals everyone using common passwords

## How Salting Works

```
Without salt:
password → hash("password") → 5e884898da28...

With salt:
password + "x7Kj9" → hash("passwordx7Kj9") → 2cf24dba5fb0...
password + "mN3pQ" → hash("passwordmN3pQ") → 9f86d081884c...
```

Same password, different salts = completely different hashes.

## Requirements for Good Salts

### Unique
- Different salt for every password
- Never reuse salts

### Random
- Cryptographically secure random generation
- Unpredictable

### Sufficient Length
- At least 16 bytes (128 bits)
- Longer is fine

### Stored with Hash
- Salt isn't secret
- Store alongside the hash in database

## Rainbow Table Attacks

Without salts, attackers can:
1. Pre-compute hashes for millions of common passwords
2. Look up hashes in the table instantly
3. Crack passwords without any computation

With salts:
- Each salt requires a new rainbow table
- Pre-computation becomes impractical
- Attackers must brute-force each password individually

## Modern Password Hashing

Proper password hashing uses salt + work factor:

### bcrypt
- Automatic salt generation
- Configurable cost factor
- Time-tested standard

### Argon2
- Winner of Password Hashing Competition
- Memory-hard (resists GPU attacks)
- Modern recommendation

### PBKDF2
- Older but still acceptable
- Used by many standards
- Needs sufficient iterations

## Salt vs Pepper

- **Salt**: Unique per password, stored with hash
- **Pepper**: Secret value, same for all passwords, stored separately
- Using both adds defense in depth

