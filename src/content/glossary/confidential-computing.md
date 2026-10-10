---
term: "Confidential Computing"
slug: "confidential-computing"
definition: "A technology that protects data while it's being processed by encrypting it in a hardware-protected area (enclave) that even the system administrator cannot access."
category: "Cloud"
relatedTerms:
  - "secure-enclave"
  - "homomorphic-encryption"
  - "encryption-at-rest"
---

Confidential computing solves the "data in use" problem — protecting data not just at rest and in transit, but during processing.

## The Three States of Data

- **At rest**: Encrypted on disk (solved)
- **In transit**: Encrypted via TLS (solved)
- **In use**: Previously unencrypted in RAM during processing (confidential computing solves this)

## How It Works

- Hardware-based Trusted Execution Environments (TEEs) create encrypted enclaves
- Code and data inside the enclave are encrypted even in memory
- The cloud provider, OS, and hypervisor cannot access enclave contents
- Remote attestation proves the enclave is running the expected code

## Technologies

- **Intel SGX**: Software Guard Extensions
- **AMD SEV-SNP**: Secure Encrypted Virtualization with Secure Nested Paging
- **ARM CCA**: Confidential Compute Architecture

## Cloud Availability

- Azure Confidential Computing (Intel SGX, AMD SEV)
- Google Cloud Confidential VMs (AMD SEV)
- AWS Nitro Enclaves
