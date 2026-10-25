---
term: "Access Control List"
abbr: "ACL"
slug: "access-control-list"
definition: "A list of permissions that specifies which users or systems can access a resource and what operations they can perform."
category: "Cloud"
relatedTerms:
  - "zero-trust-architecture"
aliases:
  - "ACL"
---

ACLs are the fundamental mechanism for controlling who can do what in a system.

## Types

- **Filesystem ACLs**: Control read/write/execute permissions on files
- **Network ACLs**: Firewall rules that allow or deny traffic
- **Application ACLs**: Determine which users can access features

## Privacy Relevance

- Misconfigured ACLs are a leading cause of data breaches
- Cloud storage buckets with public ACLs have exposed billions of records
- Principle of least privilege: grant only the minimum access needed
