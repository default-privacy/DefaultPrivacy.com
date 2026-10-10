---
title: "The Journalist's Privacy Stack: Protect Your Sources and Yourself"
slug: journalist-privacy-stack
description: "A curated stack for working journalists and investigative reporters — the tools that insulate a source from contact through storage, so metadata, seized devices, and network surveillance can't unmask them."
category: Threat-Model Stacks
difficulty: intermediate
timeToComplete: "20 minutes"
publishedAt: "2026-07-07"
author: Default Privacy
tags:
  - journalism
  - source-protection
  - threat-model
  - encryption
  - privacy
relatedTools:
  - name: Signal
    href: /directory/signal
  - name: Tor Browser
    href: /directory/tor-browser
  - name: Tuta
    href: /directory/tuta
  - name: Cryptomator
    href: /directory/cryptomator
  - name: Mat2
    href: /directory/mat2
  - name: Mullvad
    href: /directory/mullvad
---

Protect a source from first contact through final storage — a layered stack, not a single app.

## Who this is for / Threat model

You're a working journalist, investigative reporter, or freelancer handling material that could burn a source if it leaked. The adversary here is serious: **source de-anonymization, a subpoena aimed at your "no-logs" provider, a seized or borrowed device, metadata that quietly reveals who you met and when, and network surveillance by an employer or a state.**

This stack structures your workflow into three layers — **contact, transfer, storage** — so a failure in one doesn't collapse the others. It does **not** make you invincible. It won't defeat a targeted device implant, a hidden camera, or your own operational mistakes. Treat it as prudence and compartmentalization, not a magic cloak.

---

## Layer 1 — Contact: reach a source without a metadata trail

The first rule of source protection is that the *fact* of contact is often as sensitive as its content. Minimize who can see that you two ever spoke.

### [Signal](/directory/signal) — the default secure channel
**Badges: open-source, public GitHub.** End-to-end encrypted messaging and calls that collect minimal metadata. It's the baseline because it's ubiquitous, audited by reputation, and easy enough that a non-technical source will actually use it. Tradeoff: it's tied to a phone number, which is an identifier — pair it with a number that isn't your daily one.

### [Session](/directory/session) — messaging with no phone number
**Badges: open-source, public GitHub.** When a source can't or won't hand over a phone number, Session routes messages over an onion-style network and identifies users by a random account ID instead. The friction: a smaller network and no phone-number discovery, so both sides must exchange IDs out of band.

### [Briar](/directory/briar) — for hostile or offline environments
**Badges: open-source.** Briar syncs messages peer-to-peer over Tor, or directly via Wi-Fi/Bluetooth with no internet at all. This is the tool for a protest, a border crossing, or an internet shutdown. Tradeoff: it's the least convenient of the three and best reserved for when the network itself is the threat.

---

## Layer 2 — Encrypted email and PGP: for the paper trail you keep

Some correspondence has to be email — a formal records request, a tip line, a document exchange with a lawyer.

### [Tuta](/directory/tuta) — encrypted mailbox by default
**Badges: open-source, public GitHub.** End-to-end encrypted email, calendar, and contacts with the provider unable to read your inbox. A strong default for a dedicated reporting address kept separate from your personal mail. [Proton](/directory/proton) is a comparable privacy-by-default alternative if you prefer its ecosystem.

### [Mozilla Thunderbird](/directory/mozilla-thunderbird) — PGP for source-to-source encryption
**Badges: open-source.** When you need true end-to-end PGP with a source on a different provider, Thunderbird has built-in OpenPGP key management. Tradeoff: PGP is genuinely hard — key handling is where most people slip — so reserve it for correspondents who can manage a keypair, and lean on Signal for everything else.

---

## Layer 3 — Scrub metadata before anything leaves your hands

A leaked PDF or photo can carry the author's name, GPS coordinates, edit history, and device serials. Strip it before you publish, share, or even store it.

### [Mat2](/directory/mat2) — strip metadata from files
Removes hidden metadata from documents, images, and archives in one pass. Run every source document through it before it touches your archive or your editor.

### [ExifEraser](/directory/exiferaser) — clean image metadata on mobile
For photos captured or received on Android, ExifEraser wipes EXIF data — including the GPS tag that can pinpoint where a picture was taken. Essential before a field image goes anywhere.

---

## Layer 4 — Transfer and storage: assume the device gets seized

Plan for the day a laptop or phone is taken at a border or served with a warrant. Encrypt at rest so seizure yields ciphertext, not sources.

### [Cryptomator](/directory/cryptomator) — encrypt files before the cloud
**Badges: public GitHub.** Client-side, zero-knowledge encryption for anything you sync to Dropbox, Drive, or similar. The cloud provider — and anyone who subpoenas it — sees only encrypted blobs.

### [Picocrypt](/directory/picocrypt) — strong encryption for a single sensitive file
**Badges: public GitHub.** Small, focused, strong file encryption for a one-off — an interview recording or a document dump you want locked before transfer. [7-Zip](/directory/7-zip) is a widely available fallback with strong AES archive encryption.

> **On anonymous file drops:** a full SecureDrop-style intake system is its own infrastructure and isn't part of this directory's stack. Until you run one, treat inbound documents as untrusted: receive them over Briar or an encrypted container, scrub with Mat2, and store inside Cryptomator.

---

## Layer 5 — Network: shield where you connect from

### [Tor Browser](/directory/tor-browser) — anonymous research and access
**Badges: open-source.** When you research a target, visit a sensitive site, or reach an .onion service, Tor Browser breaks the link between your IP and your reading history and resists browser fingerprinting. This is the tool when *who is looking* must stay unknown.

### [Mullvad](/directory/mullvad) — a VPN that can't identify you
**Badges: audited, public GitHub.** Mullvad requires no account or email — you get a random number, not a profile — which means there's very little for a subpoena to compel. Use it to keep an employer's or a public network's eyes off your traffic when full Tor is impractical. [Mullvad Browser](/directory/mullvad-browser) pairs Tor's anti-fingerprinting hardening with a normal connection when you don't need onion routing.

---

## Tradeoffs at a glance

Where tools overlap, here's the call and the cost.

| Need | Pick | Alternative | Cost of the pick |
|------|------|-------------|------------------|
| Reach any source | Signal | Session | Ties to a phone number |
| No phone number | Session | Briar | Smaller network |
| Network is hostile | Briar | Tor Browser | Least convenient |
| Hide who you are online | Tor Browser | Mullvad | Slower browsing |
| Hide traffic, keep speed | Mullvad | ProtonVPN | Not full anonymity |
| Encrypt at rest | Cryptomator | Picocrypt | Setup per vault |

The honest friction: this is four or five tools, not one. The payoff is that no single seizure, subpoena, or leaked metadata field unmasks a source on its own.

---

## FAQ

### What are the best privacy tools for journalists?
A layered set beats any single app: Signal for source contact, Tuta or Proton for encrypted email, Thunderbird for PGP, Mat2 and ExifEraser to scrub metadata, Cryptomator to encrypt storage, and Tor Browser plus Mullvad for the network layer. Each removes a specific way a source can be exposed.

### How do I protect a source digitally?
Compartmentalize by stage. Make first contact over a metadata-minimal channel like Signal or Session, scrub every document with Mat2 before storing it, keep the archive inside encrypted storage like Cryptomator, and research over Tor Browser so your interest isn't logged against your IP.

### Can a subpoena force my VPN to hand over my activity?
A provider can only surrender what it holds. Mullvad requires no account or email and keeps no activity logs, so there is very little for a legal order to compel. That is different from a provider that ties your subscription to your identity — choose accordingly.

### Do I still need Tor if I use a VPN?
They solve different problems. A VPN hides your traffic from the local network and your ISP but the provider still sees a connection. Tor Browser breaks the link between you and the sites you visit and resists fingerprinting. For research where *who is looking* must stay unknown, use Tor.

### Why does metadata matter if the file looks clean?
Because the sensitive part is invisible. A document can embed the author's name and edit history; a photo can carry GPS coordinates and a device serial. Mat2 and ExifEraser strip those hidden fields so a "clean-looking" file doesn't quietly identify your source.
