---
term: "Sybil Attack"
slug: "sybil-attack"
definition: "A Sybil attack is a security exploit in which a single adversary creates many fake identities to gain disproportionate influence or control over a decentralized network, voting system, or trust mechanism."
category: "Networking"
relatedTerms:
  - "identity-theft"
  - "synthetic-identity-fraud"
  - "surveillance"
  - "blockchain-surveillance"
aliases:
  - "Sybil resistance"
  - "fake identity attack"
keywords:
  - "what is a Sybil attack"
  - "Sybil attack blockchain"
  - "Sybil resistance"
  - "fake identity network attack"
---

A Sybil attack is a type of attack against distributed or decentralized systems in which an adversary subverts the system by creating many fake identities — often called "Sybil nodes" or "Sybil identities" — to gain control, manipulate outcomes, or undermine trust. The name comes from the 1973 book *Sybil*, about a woman with dissociative identity disorder, used here as a metaphor for a single entity pretending to be many.

## Why Sybil Attacks Matter

Most distributed systems — peer-to-peer networks, blockchains, voting systems, reputation platforms, and anonymous networks like Tor — are designed to trust aggregate behavior. Majority decisions, consensus mechanisms, and reputation scores assume that most participants are distinct, independent entities. A Sybil attack exploits this assumption: if one entity can cheaply create hundreds or thousands of apparent participants, it can fabricate a majority.

The attack is fundamentally about identity at scale. In a physical community, creating many fake identities requires significant effort. In digital systems, creating fake accounts or nodes is often trivially cheap — making Sybil resistance a core design challenge.

## How Sybil Attacks Work

An attacker creates multiple pseudonymous or fully fake identities within a target system. How those identities are then exploited depends on the system:

**Blockchain and cryptocurrency networks:**
In a proof-of-work blockchain, Sybil attacks are costly because each node's voting power is tied to computational work. But in proof-of-stake systems with weak identity requirements, or in systems with reputation-based consensus, an attacker with many fake nodes can influence transaction ordering, double-spend, or disrupt the network.

**Tor and anonymous networks:**
Tor's anonymity depends on traffic being routed through multiple independent relays. An adversary who controls a large fraction of Tor nodes — through a Sybil attack — can perform traffic correlation analysis to de-anonymize users. This is a documented, ongoing concern for Tor's threat model.

**Online reputation and review systems:**
Creating fake accounts to post reviews, ratings, or votes manipulates trust scores that other users rely on. This is the commercial variant of astroturfing — fake Amazon reviews, fake app store ratings, fake Yelp reviews all exploit the same underlying Sybil vulnerability.

**Decentralized governance (DAOs):**
Decentralized autonomous organizations (DAOs) that use token-weighted voting may be resistant to Sybil attacks if tokens are scarce, but governance systems that weight votes by address count (one address, one vote) are directly vulnerable to an attacker minting many addresses.

**Federated social networks:**
In federated social protocols (ActivityPub, Nostr), Sybil attacks can flood networks with fake activity, inflate follower counts, or manipulate trending topics.

## Sybil Resistance Mechanisms

Designing against Sybil attacks requires making identity creation costly or bounded:

**Proof of work:** Computing power required per identity. Effective but energy-intensive and excludes low-resource legitimate participants.

**Proof of stake:** Economic stake required per identity. Creating thousands of fake identities requires owning thousands of shares of the staked asset — economically prohibitive at scale.

**Proof of personhood:** Linking identities to real humans through social verification (vouching networks), biometric verification, government ID, or cryptographic attestations. Projects like Worldcoin (iris scanning) and BrightID (social graph) attempt this. The privacy tradeoff is significant.

**Economic barriers:** Registration fees, deposits, or resource requirements that make mass fake identity creation expensive.

**Behavioral analysis:** Detecting inauthentic behavior patterns — activity timing, linguistic similarity, network clustering — to identify and exclude Sybil nodes. Used extensively by social platforms and fraud detection systems.

## Sybil Attacks and Privacy

There is a fundamental tension between Sybil resistance and privacy. The most robust Sybil resistance mechanisms require verifiable, often biometric, identity — the opposite of pseudonymity. Systems that want both strong Sybil resistance and meaningful privacy for users face difficult design tradeoffs.

Zero-knowledge proof systems offer a potential path: an individual can prove they are a unique person (satisfying Sybil resistance) without revealing which person they are (preserving privacy). Iden3, Semaphore, and similar systems are exploring this approach, though practical deployment at scale remains an open problem.

For privacy-preserving systems like Tor or cryptocurrency networks, the threat of Sybil attacks and traffic analysis attacks run together: an adversary who can flood the network with controlled nodes gains both influence and a surveillance advantage.
