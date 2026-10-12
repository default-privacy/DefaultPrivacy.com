---
term: "Brute Force Attack"
slug: "brute-force-attack"
definition: "An attack method that systematically tries every possible combination of characters to guess a password or encryption key."
category: "Attacks"
relatedTerms:
  - "brute-force"
  - "key-stretching"
  - "argon2"
---

Brute force is the most straightforward attack against passwords and encryption — try every possibility.

## Speed

- A modern GPU can try ~10 billion MD5 hashes per second
- An 8-character lowercase password: cracked in ~5 seconds
- An 8-character mixed-case + numbers + symbols: cracked in ~8 hours
- AES-256 key: heat death of the universe × trillions

## Password Defense

- **Length matters most**: Each additional character multiplies the search space
- **Use a passphrase**: 4-6 random words is stronger than 8 complex characters
- **Key stretching**: Argon2 makes each guess take milliseconds instead of nanoseconds

## Online vs Offline

- **Online**: Rate-limited by the server (10 guesses/minute)
- **Offline**: Attacker has the hash, can try billions per second
- Good key stretching makes offline brute force impractical
