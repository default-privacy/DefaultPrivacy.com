---
term: "Canary Trap"
slug: "canary-trap"
definition: "A method for identifying information leaks by providing slightly different versions of sensitive information to each suspected source."
category: "OpSec"
relatedTerms:
  - "warrant-canary"
  - "operational-security"
---

A canary trap (also called a barium meal) identifies who leaked information by making each copy unique.

## How It Works

1. Create multiple versions of a document with subtle differences
2. Give each version to a different person
3. If the information leaks, the unique differences identify the source

## Digital Variants

- **Invisible differences**: Vary whitespace, synonym choices, or sentence structure
- **Steganographic watermarks**: Embed invisible identifiers in documents or images
- **Unique URLs**: Give each person a different link to the same content
- **Font-based encoding**: Use barely different fonts to encode recipient identity

## Historical Use

- Tom Clancy popularized the term in "Patriot Games"
- Intelligence agencies have used the technique for decades
- Modern corporate leak investigations use digital canary traps

## Defense

If you suspect a canary trap, compare your version with someone else's. Differences indicate embedded identifiers. Retype or screenshot content rather than sharing the original document.
