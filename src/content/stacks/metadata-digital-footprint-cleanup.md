---
title: "Scrub Your Metadata: The Digital Footprint Cleanup Stack"
slug: metadata-digital-footprint-cleanup
description: "A threat-model stack for the three moments your files leak you — scrub metadata on share, encrypt what you keep, and securely wipe drives before you dispose of them."
category: Threat-Model Stacks
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-07-07"
author: Default Privacy
tags:
  - metadata-removal
  - exif
  - secure-erase
  - file-encryption
  - threat-model
relatedTools:
  - name: Mat2
    href: /directory/mat2
  - name: ExifEraser
    href: /directory/exiferaser
  - name: Cryptomator
    href: /directory/cryptomator
  - name: Picocrypt
    href: /directory/picocrypt
  - name: 7-Zip
    href: /directory/7-zip
  - name: BleachBit
    href: /directory/bleachbit
---

# Scrub Your Metadata: The Digital Footprint Cleanup Stack

Every photo you share can carry your GPS coordinates. Every drive you sell can be un-deleted. This stack closes the gaps in the files you send and the devices you retire.

## Who this is for, and what it defends against

This is for anyone who shares files or photos and does not want embedded location and identity data riding along, plus anyone disposing of old drives and phones.

It defends against three quiet leaks:

- **EXIF and geolocation in shared media** — a single photo can carry GPS coordinates, a device serial, and a timestamp.
- **Document metadata** — office files embed your name, edit history, and sometimes deleted text.
- **Recoverable data on discarded devices** — 'deleted' files are trivially recovered from a drive you sell or donate.

Think of it as three moments: **scrub on share, encrypt what you keep, wipe on dispose.**

**What it does not cover, honestly:** this cleans files *you* still control. Metadata already published somewhere else is a takedown and broker-removal problem, not a scrub. And some cloud platforms strip metadata on upload only to add their own — assume nothing is clean until you have cleaned it yourself.

## Scrub before you share

Clean the file before it ever leaves your machine.

### [Mat2](/directory/mat2)
Strips metadata from a wide range of file types — images, PDFs, office documents, audio — in one pass. The default tool for cleaning anything before it leaves your desktop.

### [ExifEraser](/directory/exiferaser)
Removes image metadata on Android, so photos are clean before they reach a chat or an upload. This is where most leaks actually happen — straight from the phone.

## Encrypt what you keep and send

Metadata is one leak; the file contents are another. Lock the sensitive ones.

### [Cryptomator](/directory/cryptomator)
Client-side, zero-knowledge encryption for files you put in someone else's cloud — the provider stores only ciphertext, never your readable data. **Open-source (GitHub).**

### [Picocrypt](/directory/picocrypt)
A tiny, strong file-encryption tool for locking a single file or folder before you send or archive it — minimal surface, nothing to misconfigure. **Open-source (GitHub).**

### [7-Zip](/directory/7-zip)
The archiver most people already have, with AES-256 encryption built in — a practical way to encrypt a bundle for someone who only has a password and no special software.

## Wipe before you dispose

### [BleachBit](/directory/bleachbit)
Securely wipes free space and shreds files so 'deleted' data cannot be recovered from a drive you are selling, donating, or recycling.

## Where these overlap — and what it costs

Each tool owns a moment. Do not expect one to do another's job.

```
Choice          Pick for…                Alternative     Cost / caveat
─────────────   ──────────────────────   ─────────────   ─────────────────
Mat2            desktop, all file types  ExifEraser      command-line comfort
ExifEraser      photos from your phone   Mat2            Android only
Cryptomator     ongoing cloud sync       Picocrypt       setup overhead
Picocrypt       one-off strong lock      7-Zip           recipient needs it
7-Zip           universal compatibility  Picocrypt       older cipher options
BleachBit       wiping HDD free space    full-disk crypto unreliable on SSD
```

The caveat worth internalizing: on solid-state drives, per-file shredding is unreliable because wear-leveling scatters copies the tool cannot reach. The durable answer for SSDs is not wiping after the fact — it is encrypting the whole drive before you ever write to it, so retired data is unreadable by default. Scrubbing is prudence; whole-disk encryption is architecture.

## FAQ

### How do I remove location data from a photo before sharing?
Run it through a metadata stripper first. [Mat2](/directory/mat2) clears EXIF — including GPS coordinates — from images on the desktop, and [ExifEraser](/directory/exiferaser) does the same on Android before the photo ever leaves your phone.

### Does deleting a file actually erase it?
No. A normal delete just removes the pointer; the data sits on disk until it is overwritten and is recoverable with free tools. To make a file unrecoverable, shred it and wipe free space with [BleachBit](/directory/bleachbit).

### How do I securely wipe an SSD before selling it?
Carefully — per-file shredding is unreliable on SSDs because of wear-leveling. The dependable approach is to have used full-disk encryption from the start, so the retired data is already unreadable, or to use the drive's built-in secure-erase. [BleachBit](/directory/bleachbit) is the right tool for traditional hard drives.

### What metadata is hidden in a PDF or Word document?
More than you would guess: author name, organization, software versions, revision history, and sometimes deleted text or comments. [Mat2](/directory/mat2) strips these fields from documents before you send them.

### Is stripping EXIF enough to be private online?
It closes one leak, not all of them. Scrubbing metadata stops a file from betraying your location, but it does nothing about your IP address, account identifiers, or data already published. Treat it as one layer in a broader footprint-cleanup practice, not a finish line.

## Take this stack with you

Want the complete footprint-cleanup stack as a printable checklist — every tool, why it made the list, and the order to run them? No account. No tracking. We do not track opens, and we never share your address.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Scrub Your Metadata: The Digital Footprint Cleanup Stack",
  "description": "A threat-model stack for the three moments your files leak you: scrub metadata on share, encrypt what you keep, and securely wipe drives before disposal.",
  "author": { "@type": "Organization", "name": "Default Privacy" },
  "publisher": { "@type": "Organization", "name": "Default Privacy" },
  "datePublished": "2026-07-07",
  "mainEntityOfPage": "https://defaultprivacy.com/guides/metadata-digital-footprint-cleanup"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I remove location data from a photo before sharing?", "acceptedAnswer": { "@type": "Answer", "text": "Run it through a metadata stripper first. Mat2 clears EXIF, including GPS coordinates, from images on the desktop, and ExifEraser does the same on Android before the photo ever leaves your phone." } },
    { "@type": "Question", "name": "Does deleting a file actually erase it?", "acceptedAnswer": { "@type": "Answer", "text": "No. A normal delete just removes the pointer; the data sits on disk until overwritten and is recoverable with free tools. To make a file unrecoverable, shred it and wipe free space with BleachBit." } },
    { "@type": "Question", "name": "How do I securely wipe an SSD before selling it?", "acceptedAnswer": { "@type": "Answer", "text": "Carefully — per-file shredding is unreliable on SSDs because of wear-leveling. The dependable approach is full-disk encryption from the start so retired data is already unreadable, or the drive's built-in secure-erase. BleachBit is the right tool for traditional hard drives." } },
    { "@type": "Question", "name": "What metadata is hidden in a PDF or Word document?", "acceptedAnswer": { "@type": "Answer", "text": "More than you would guess: author name, organization, software versions, revision history, and sometimes deleted text or comments. Mat2 strips these fields from documents before you send them." } },
    { "@type": "Question", "name": "Is stripping EXIF enough to be private online?", "acceptedAnswer": { "@type": "Answer", "text": "It closes one leak, not all of them. Scrubbing metadata stops a file from betraying your location, but it does nothing about your IP address, account identifiers, or data already published. Treat it as one layer, not a finish line." } }
  ]
}
</script>
