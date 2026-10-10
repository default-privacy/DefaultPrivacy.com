---
term: "Shamir's Secret Sharing"
slug: "shamirs-secret-sharing"
definition: "A cryptographic method for splitting a secret into multiple parts so that a defined threshold of parts are needed to reconstruct it."
category: "Encryption"
relatedTerms:
  - "key-exchange"
  - "public-key-cryptography"
---

Shamir's Secret Sharing divides a secret (like an encryption key or seed phrase) into N parts, where any K parts can reconstruct the secret but K-1 parts reveal nothing.

## How It Works

- Uses polynomial interpolation over a finite field
- A secret is encoded as the constant term of a random polynomial
- Each share is a point on that polynomial
- Any K points can reconstruct the polynomial; fewer cannot

## Practical Example

- Split a Bitcoin wallet seed into 5 shares (N=5)
- Require any 3 shares to reconstruct (K=3)
- Distribute shares to trusted people or secure locations
- Any 3 can recover the wallet; losing 2 shares doesn't matter

## Tools

- **ssss** (Shamir's Secret Sharing Scheme): Command-line implementation
- **Horcrux**: User-friendly file splitting tool
- Some hardware wallets support Shamir backup natively (Trezor)

## Important

Shares should be stored in different physical locations. If all shares are in the same place, the splitting provides no benefit.
