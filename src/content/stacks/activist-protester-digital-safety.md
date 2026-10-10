---
title: "Digital Security for Protesters and Activists"
slug: activist-protester-digital-safety
description: "A before/during/after field kit for protesters and organizers — the real tools that harden your phone, protect your messages, strip identifying metadata, and keep a device search from unraveling your network."
category: Threat-Model Stacks
difficulty: intermediate
timeToComplete: "30 minutes"
publishedAt: "2026-07-07"
updatedAt: "2026-07-07"
author: Default Privacy
tags:
  - protest
  - activism
  - threat-model
  - messaging
  - mobile-os
  - metadata
relatedTools:
  - name: Signal
    href: /directory/signal
  - name: Briar
    href: /directory/briar
  - name: GrapheneOS
    href: /directory/grapheneos
  - name: Mullvad
    href: /directory/mullvad
  - name: ExifEraser
    href: /directory/exiferaser
---

# Digital Security for Protesters and Activists

**A field kit for anyone who shows up in person — set it up before you march, use it in the crowd, and clean up after you get home.**

## Who this is for and what it defends against

You organize, you protest, you show up. That puts a specific set of adversaries on your device: a **seized or searched phone** at a stop or arrest, **cell-site surveillance** that logs which phones were in a location, **photo metadata** that quietly names the people standing next to you, and **network shutdowns** that kill normal comms right when you need them.

This stack structures your phone to survive those. It does **not** make you invisible, and it will not defeat a targeted, well-resourced investigation aimed at you specifically. It shrinks your exposure to the routine, dragnet risks that catch most people — and it makes an on-the-spot device search far less revealing.

Work the layers in order: **harden the device → compartmentalize identity → lock down comms → scrub what you share.**

## Layer 1 — Harden the device (before you leave)

The phone in your pocket is the single richest source an adversary can pull. Start there.

### [GrapheneOS](/directory/grapheneos)
`open-source (GitHub)`

Hardened Android for Pixel devices. **Why it's here:** it ships with strong full-disk encryption and a locked-down security model, so a phone that's powered off before a search is far harder to extract. Set a long alphanumeric passphrase — not just biometrics — and power the phone **fully off** before any situation where it could be taken. A powered-off phone sits in a much stronger encryption state than one that's merely locked.

### [CalyxOS](/directory/calyxos)
`open-source (GitHub)`

A private Android build that keeps more app compatibility than a fully de-Googled setup. **Why it's here:** it's the pragmatic alternative when you need certain apps to just work and can't fully commit to GrapheneOS's stricter model. Same core payoff — a hardened OS you control.

> **Physical layer, no app required:** the most reliable way to stop cell-site tracking and remote pings is to remove the phone from the network — power it off, or carry it in a signal-blocking (faraday) pouch. We don't list a specific pouch product; treat it as a tactic, not a purchase. Airplane mode is weaker than fully powered off.

## Layer 2 — Compartmentalize your identity

Don't tie your protest activity to the number and accounts that carry your real name.

### [MoneroSMS](/directory/monerosms)

Private SMS numbers you pay for with cryptocurrency. **Why it's here:** it lets you register apps and receive verification codes without handing a phone carrier a receipt that links your name to the account.

### [Hushed](/directory/hushed)

Disposable phone numbers you can spin up and discard. **Why it's here:** a separate, throwaway number for organizing keeps your primary identity off the flyers, group threads, and sign-up sheets.

## Layer 3 — Lock down communications

What you say, and the pattern of who you say it to, both matter. Pick based on whether the network is up.

### [Signal](/directory/signal)
`open-source (GitHub)`

End-to-end encrypted messaging that keeps minimal metadata. **Why it's here:** it's the baseline for private group coordination. Turn on **disappearing messages** and a **registration lock** so a seized phone doesn't spill your history. It still needs a working network — which is its limit during a shutdown.

### [Briar](/directory/briar)
`open-source`

Peer-to-peer messaging over Tor, or directly over Bluetooth and Wi-Fi when there's no internet at all. **Why it's here:** it's your fallback when the network goes down. Messages sync device-to-device, so an intentional shutdown doesn't fully silence a crowd.

### [Session](/directory/session)
`open-source (GitHub)`

Messaging with no phone number and minimal metadata. **Why it's here:** it removes the phone-number identifier entirely, so there's no number to subpoena or correlate. The tradeoff is a smaller network and no burner-number linkage to lean on.

## Layer 4 — Network and browsing

### [Mullvad](/directory/mullvad)
`audited` · `GitHub`

A VPN that requires no account or email — you get an anonymous account number instead. **Why it's here:** it shields your traffic from the local network and hides your real IP from the sites you use to organize. Being audited and account-free matters here: there's less identifying data for anyone to demand later.

### [Tor Browser](/directory/tor-browser)
`open-source`

Routes your browsing over the Tor network with strong anti-fingerprinting. **Why it's here:** for reading, researching, and posting where you don't want the destination to see where you came from. Slower than a VPN — use it when unlinkability matters more than speed.

## Layer 5 — Scrub what you share

A protest photo can expose the people in it through metadata alone — GPS coordinates, timestamps, device IDs — before anyone even looks at faces.

### [ExifEraser](/directory/exiferaser)

Strips metadata from images on Android. **Why it's here:** run every photo through it before posting. It removes the location and device fingerprints baked into the file. (It does not blur faces — that's on you.)

### [Mat2](/directory/mat2)

Removes metadata from a wide range of file types, not just images. **Why it's here:** for documents, PDFs, and mixed media you plan to publish or hand off.

## Tradeoffs — where these overlap

Every layer costs something. Know the friction before you rely on it.

```
Choice             Pick             Cost you accept
-----------------  ---------------  ------------------------
OS hardening       GrapheneOS       Pixel-only; app friction
Comms (network up) Signal           Needs a live network
Comms (shutdown)   Briar            Small network; setup ahead
No-number comms    Session          Fewer contacts on it
Network privacy    Mullvad          Paid; small speed hit
```

The recurring theme: the stronger the protection, the more it asks of you up front. **Set all of this up on a calm day** — not in the street. A hardened OS you configured last week beats a perfect plan you try to execute during an arrest.

## Frequently asked questions

### How do I protect my phone from a police search?
Power it fully off before any situation where it could be taken — a powered-off, encrypted phone (like [GrapheneOS](/directory/grapheneos) with a strong passphrase) is in the hardest state to extract. Use a long alphanumeric passphrase rather than only a fingerprint or face unlock, and know your local rights around device searches.

### What's the most secure messaging app for a protest?
[Signal](/directory/signal) for everyday encrypted coordination when the network is up, and [Briar](/directory/briar) as a fallback because it works peer-to-peer over Bluetooth and Wi-Fi during a shutdown. [Session](/directory/session) is the pick if you want no phone number attached at all.

### Can my photos identify other protesters?
Yes — image files carry metadata like GPS location and timestamps that can place people even before faces are recognized. Strip it with [ExifEraser](/directory/exiferaser) on Android or [Mat2](/directory/mat2) for other file types before you post, and blur identifying faces separately.

### Do I need a burner phone or just a burner number?
A separate number from [MoneroSMS](/directory/monerosms) or [Hushed](/directory/hushed) keeps your real identity off organizing accounts and is enough for most people. A fully separate device is a bigger commitment for higher-risk roles — start with the number and a hardened OS.

### Does a VPN keep me anonymous at a protest?
No. A VPN like [Mullvad](/directory/mullvad) hides your traffic and IP from the local network and the sites you visit, but it does not stop cell-site location tracking or a device search. It's one layer — pair it with a hardened phone and disciplined comms.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Digital Security for Protesters and Activists",
  "description": "A before/during/after field kit of real privacy tools for protesters and organizers: hardened phones, encrypted messaging, burner numbers, and metadata removal.",
  "author": { "@type": "Organization", "name": "Default Privacy" },
  "publisher": { "@type": "Organization", "name": "Default Privacy" },
  "datePublished": "2026-07-07",
  "dateModified": "2026-07-07"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I protect my phone from a police search?", "acceptedAnswer": { "@type": "Answer", "text": "Power it fully off before any situation where it could be taken; a powered-off, encrypted phone is hardest to extract. Use a long alphanumeric passphrase rather than only biometrics, and know your local rights around device searches." } },
    { "@type": "Question", "name": "What's the most secure messaging app for a protest?", "acceptedAnswer": { "@type": "Answer", "text": "Signal for encrypted coordination when the network is up, and Briar as a fallback because it works peer-to-peer over Bluetooth and Wi-Fi during a shutdown. Session is the pick if you want no phone number attached." } },
    { "@type": "Question", "name": "Can my photos identify other protesters?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Image files carry metadata like GPS location and timestamps. Strip it with ExifEraser on Android or Mat2 for other file types before posting, and blur identifying faces separately." } },
    { "@type": "Question", "name": "Do I need a burner phone or just a burner number?", "acceptedAnswer": { "@type": "Answer", "text": "A separate number from MoneroSMS or Hushed keeps your identity off organizing accounts and is enough for most people. A fully separate device is a bigger commitment for higher-risk roles." } },
    { "@type": "Question", "name": "Does a VPN keep me anonymous at a protest?", "acceptedAnswer": { "@type": "Answer", "text": "No. A VPN like Mullvad hides your traffic and IP from the local network and destination sites, but does not stop cell-site location tracking or a device search. It is one layer among several." } }
  ]
}
</script>
