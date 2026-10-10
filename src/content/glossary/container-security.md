---
term: "Container Security"
slug: "container-security"
definition: "Practices for securing containerized applications, ensuring that the isolation, image integrity, and runtime behavior of containers protect against threats."
category: "Cloud"
relatedTerms:
  - "immutable-infrastructure"
  - "zero-trust-architecture"
---

Containers (Docker, Podman) provide isolation but aren't inherently secure — they share the host kernel.

## Key Risks

- **Container escape**: Exploiting kernel vulnerabilities to break out of the container
- **Malicious images**: Pulling pre-built images with embedded malware or backdoors
- **Privilege escalation**: Containers running as root can be more easily exploited
- **Secrets management**: Credentials hardcoded in images or environment variables

## Best Practices

1. Use minimal base images (Alpine, distroless)
2. Don't run as root inside containers
3. Scan images for vulnerabilities (Trivy, Grype)
4. Use read-only file systems where possible
5. Limit container capabilities (drop all, add only what's needed)
6. Keep secrets out of images — use secret management tools

## Privacy Connection

Containers are excellent for running self-hosted privacy services (VPN, email, DNS) because they're easy to deploy, update, and destroy without leaving residual data.
