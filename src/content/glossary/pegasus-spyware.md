---
term: "Pegasus Spyware"
slug: "pegasus-spyware"
definition: "A sophisticated spyware tool developed by NSO Group that can silently compromise smartphones through zero-click exploits, giving full access to the device."
category: "Surveillance"
relatedTerms:
  - "malware"
  - "keylogger"
  - "operational-security"
---

Pegasus is the most well-known commercial spyware, sold to governments worldwide for surveillance of journalists, activists, and political opponents.

## Capabilities

- Full access to all data on the phone
- Real-time microphone and camera activation
- Read encrypted messages (by accessing them after decryption on the device)
- GPS location tracking
- Keystroke logging
- Access to photos, contacts, call logs

## How It Infects

- **Zero-click exploits**: No user interaction needed — a specially crafted iMessage or WhatsApp call is enough
- **Spear phishing**: Targeted links sent via SMS or email
- **Network injection**: Redirecting web traffic to exploit pages

## Detection

- **Amnesty International's MVT** (Mobile Verification Toolkit) can detect infection
- Signs include unexpected battery drain, data usage, or device heating

## Protection

- Keep devices updated (patches close the exploits Pegasus uses)
- Use Lockdown Mode on iPhone
- Reboot your phone daily (some exploits don't survive reboots)
- High-risk individuals should use a dedicated, frequently-replaced device
