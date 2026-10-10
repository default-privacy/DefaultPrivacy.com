---
term: "Hardware Kill Switch"
slug: "hardware-kill-switch"
definition: "A physical switch that electrically disconnects a component like the camera, microphone, WiFi, or cellular radio, providing a hardware guarantee that it cannot be activated."
category: "Hardware"
relatedTerms:
  - "faraday-cage"
  - "baseband-processor"
---

Hardware kill switches provide a guarantee that no software — no matter how compromised — can activate a disabled component.

## Why Software Switches Aren't Enough

- A software "off" can be overridden by malware or a compromised OS
- Pegasus spyware can activate microphones on compromised phones
- Remote access tools can enable cameras without the indicator light
- Software controls ultimately rely on trusting the software

## Devices with Kill Switches

- **Purism Librem 5**: Switches for WiFi/Bluetooth, cellular, camera/microphone
- **Purism Librem 14**: Switches for WiFi/Bluetooth, camera, microphone
- **Pine64 PinePhone**: DIP switches for modem, WiFi, microphone, speaker, cameras
- **Nitrokey NitroPad**: Hardware modifications for camera disable

## Use Cases

- Meetings where phone surveillance is a concern
- Crossing borders (disable cellular before entering Faraday bag)
- Activists and journalists in hostile environments
- Anyone who wants verifiable hardware control over their devices
