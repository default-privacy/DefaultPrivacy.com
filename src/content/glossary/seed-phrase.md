---
term: "Seed Phrase"
slug: "seed-phrase"
definition: "A series of 12-24 words that serves as the master backup for a cryptocurrency wallet, from which all private keys can be regenerated."
category: "Blockchain"
relatedTerms:
  - "non-custodial-wallet"
  - "shamirs-secret-sharing"
aliases:
  - "Recovery Phrase"
  - "Mnemonic Phrase"
---

Your seed phrase IS your wallet. Anyone who has it has full access to your funds.

## How It Works

- Based on BIP-39 standard (for Bitcoin-derived wallets)
- Words are selected from a standardized list of 2,048 words
- The phrase deterministically generates all your private keys
- 12 words = 128 bits of entropy; 24 words = 256 bits

## Security Rules

1. **Never store digitally**: No photos, no notes app, no cloud storage
2. **Write on paper or metal**: Paper in a fireproof safe; metal plates survive fires
3. **Never share**: No legitimate service will ever ask for your seed phrase
4. **Split storage**: Consider Shamir's Secret Sharing for high-value wallets
5. **Test recovery**: Verify you can restore the wallet before depending on the backup

## Common Scams

- "Enter your seed phrase to verify your wallet" — ALWAYS a scam
- Fake wallet apps that harvest seed phrases
- Phishing emails claiming your wallet needs "re-verification"
- Social engineering targeting seed phrases is the #1 crypto theft method
