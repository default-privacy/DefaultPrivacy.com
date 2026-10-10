---
term: "Tor Hidden Service Protocol"
slug: "tor-hidden-service-protocol"
definition: "The protocol by which Tor onion services establish and maintain their hidden network presence, using introduction points and rendezvous points."
category: "Networking"
relatedTerms:
  - "onion-service"
  - "tor-network"
  - "onion-routing"
---

The hidden service protocol ensures that neither the server's location nor the client's identity is revealed during connection.

## Steps

1. **Service setup**: The hidden service connects to introduction points in the Tor network
2. **Service descriptor**: Published to the Tor distributed hash table, containing introduction point info
3. **Client request**: Client downloads the descriptor and chooses a rendezvous point
4. **Introduction**: Client sends a message through an introduction point asking the service to connect to the rendezvous point
5. **Rendezvous**: Both parties connect to the rendezvous point through separate Tor circuits
6. **Communication**: Data flows through the rendezvous point, with neither party knowing the other's IP

## Security Properties

- 6 Tor relays total (3 per side) between client and service
- No single relay knows both endpoints
- Traffic is encrypted at every hop
