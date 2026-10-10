---
term: "Tor Network"
slug: "tor-network"
definition: "A free, open-source software and network that enables anonymous communication by directing Internet traffic through a worldwide volunteer overlay network of thousands of relays. Tor conceals users' locations and usage from surveillance and traffic analysis."
category: "Anonymity"
relatedTerms:
  - "onion-routing"
  - "vpn"
  - "ip-address"
aliases:
  - "Tor"
  - "The Onion Router"
seeAlso:
  - name: "Tor Browser"
    slug: "tor-browser"
---

Tor (The Onion Router) is the gold standard for anonymous internet browsing. It routes your traffic through multiple volunteer-operated servers worldwide, making it extremely difficult to trace your online activity back to you.

## How Tor Works

1. **Entry Node**: Your traffic enters the Tor network (knows your IP, but not destination)
2. **Middle Relay(s)**: Traffic passes through intermediate nodes (knows neither source nor destination)
3. **Exit Node**: Traffic exits to the internet (knows destination, but not your IP)

Each layer is encrypted like the layers of an onion, hence "onion routing."

## Use Cases

- **Journalists**: Protecting sources and researching sensitive topics
- **Activists**: Organizing in repressive regimes
- **Privacy-conscious users**: Avoiding surveillance and tracking
- **Researchers**: Studying censorship and surveillance

## Limitations

- **Slower speeds**: Multiple hops add latency
- **Exit node vulnerability**: Unencrypted traffic can be seen by exit nodes
- **Not for torrenting**: Puts strain on the network and may leak IP
- **Fingerprinting**: Browser fingerprinting can still identify you

## Best Practices

1. Always use the official Tor Browser (not just the network)
2. Don't maximize the browser window (aids fingerprinting)
3. Don't install additional plugins
4. Use HTTPS sites when possible
5. Don't log into personal accounts that could identify you

