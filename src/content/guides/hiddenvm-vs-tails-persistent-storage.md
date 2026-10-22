---
title: "HiddenVM or Tails Persistent Storage: Which Should You Use?"
slug: hiddenvm-vs-tails-persistent-storage
description: "HiddenVM has not had a release since July 2024 and only lists Tails up to 6.5, so use Tails Persistent Storage, or a separate Tails stick per task. What each one does, what the deniability claim covers and what the Tails project warns about."
category: Privacy
difficulty: advanced
timeToComplete: "9 minutes"
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
author: Default Privacy
tags:
  - hiddenvm
  - tails persistent storage
  - tails os
  - veracrypt hidden volume
  - plausible deniability
  - run virtualbox in tails
  - amnesic operating system
  - tails persistence alternative
relatedGuides:
  - how-to-build-your-threat-model
  - getting-online-where-the-internet-is-censored
  - switch-to-linux-for-privacy
relatedTools:
  - name: Tails
    href: /directory/tails
  - name: VeraCrypt
    href: /directory/veracrypt
  - name: VirtualBox
    href: /directory/virtualbox
  - name: Tor
    href: /directory/tor
---

**Last checked: October 2026** · Each claim links to the project's own docs or code. General information, not legal advice.

Use Tails Persistent Storage, or a second Tails stick, not HiddenVM. HiddenVM looks unmaintained. Its last release was v1.53 on 18 July 2024, its [supported-versions file](https://raw.githubusercontent.com/aforensics/HiddenVM/master/SUPPORTED_TAILS_VERSIONS) stops at Tails 6.5, and the current Tails is 7.15 ([Tails news](https://tails.net/news/index.en.html)). Tails says it [does not currently provide a solution for running a virtual machine inside Tails](https://tails.net/doc/advanced_topics/virtualization/index.en.html). HiddenVM can still make sense if you need a full second operating system, a deniability story and an old Tails, but you would be running a stale, unofficial add-on.

---

## What Tails Persistent Storage is

Tails forgets everything when you shut down. Persistent Storage is an optional encrypted partition on the Tails USB stick where you keep some files and settings, such as documents, Wi-Fi passwords and browser bookmarks ([Tails docs](https://tails.net/doc/persistent_storage/index.en.html)).

Its limits, in the Tails docs' own words:

- It uses LUKS, the standard Linux disk encryption, with default settings ([Tails docs](https://tails.net/doc/persistent_storage/index.en.html)).
- It is not hidden. Tails says an attacker holding your stick can know a Persistent Storage exists, and you could be forced or tricked into giving up the passphrase ([Tails docs](https://tails.net/doc/persistent_storage/index.en.html)).
- Only a fixed list of features can be saved. Tails says it is often asked to add more, such as Tor Browser preferences, and points to its issue list ([Tails docs](https://tails.net/doc/persistent_storage/configure/index.en.html)).
- A forgotten passphrase cannot be recovered ([Tails docs](https://tails.net/doc/persistent_storage/create/index.en.html)).
- You can add Debian software through its Additional Software feature, but Tails only allows network connections through Tor, so extra software must be set up to use Tor or it is blocked ([Tails docs](https://tails.net/doc/persistent_storage/additional_software/index.en.html)).

## What HiddenVM is

[HiddenVM](https://github.com/aforensics/HiddenVM) is a community app outside the Tails project. It installs [VirtualBox](/directory/virtualbox) inside a running Tails session so you can run another operating system, such as Windows or Linux, as a virtual machine. You keep HiddenVM, VirtualBox and your virtual machines inside a [VeraCrypt](/directory/veracrypt) hidden volume on the computer's drive or another disk, and mount it only while Tails is running ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).

Two design choices to know about. The virtual machine uses normal internet by default, so Tails' Tor connection doesn't cover it. Also, it needs lots of memory because Tails already runs in RAM; the README suggests at least 16 GB ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).

## Is HiddenVM still maintained

Probably not.

- Last release: v1.53, 18 July 2024. Last commit the same day, "Update to compatibility with Tails 6.5" ([GitHub releases API](https://api.github.com/repos/aforensics/HiddenVM/releases), [commits API](https://api.github.com/repos/aforensics/HiddenVM/commits?per_page=3)).
- Before that it shipped about monthly. A user asked in December 2024 whether it was abandoned and said they were still on an old Tails to keep using it ([issue 45](https://github.com/aforensics/HiddenVM/issues/45)). In June 2026 another commenter suggested someone fork it. We found no reply from the maintainers.
- The README says that if Tails updates before HiddenVM does, you can go back to an older Tails ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)). The README calls this temporary and says it is not unsafe unless the newer Tails fixes a flaw that affects how you use it. The README is written for a short wait; here the wait has been over two years. We did not test HiddenVM on newer versions. Running an old Tails means going without that release's fixes, so check the Tails release notes first.

We read the repository on 21 October 2026. A repo can be quiet and still fine, but here the supported list stops at Tails 6.5 and the current release is 7.15.

## The deniability claim and where it stops

HiddenVM says that with a hidden VeraCrypt volume, someone who sees your computer turned off sees only a blank Tails stick and a wiped-looking drive ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)). It says Persistent Storage gives no such cover because LUKS is recognizable. That second point is fair: Tails agrees Persistent Storage is not hidden.

The limits:

- VeraCrypt says it should be impossible to prove a hidden volume exists, but only if you follow its security precautions ([VeraCrypt docs](https://veracrypt.io/en/Plausible%20Deniability.html)). Tails notes that deniable encryption might not protect you if you are forced to reveal that the volume exists ([Tails docs](https://tails.net/doc/encryption_and_privacy/veracrypt/index.en.html)).
- A VeraCrypt file container is not enough by itself, because VeraCrypt says there is practically no plausible explanation for a file holding only random data ([VeraCrypt docs](https://veracrypt.io/en/Plausible%20Deniability.html)).
- HiddenVM says its own claim "might not apply to your particular scenario", and that your data is not hidden while the volume is unlocked ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).
- Whether a court, border agent or abuser believes a decoy is a legal and human question that technology can't settle. Ask a lawyer where you live.

## What the Tails project warns about

- Tails says it does not currently provide a solution for running a virtual machine inside Tails ([Tails docs](https://tails.net/doc/advanced_topics/virtualization/index.en.html)). That page covers Tails inside a VM, where it warns that a VM can leave traces on the host disk and that the host and VM software can watch what you do. It is not about HiddenVM, but it shows how Tails thinks about stacking layers.
- Adding software needs care. Tails says adding extra software sources might break the security built into Tails and might install software Debian has not approved, so be even more careful with what you install ([Tails docs](https://tails.net/doc/persistent_storage/additional_software/index.en.html)).
- HiddenVM says to keep normal Tails use to a minimum while it runs, because it widens the attack surface of Tails ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).
- Tails says some activities can reveal your identity, and that if you worry files in Persistent Storage could link your activities, use a different Tails stick for each activity ([Tails docs](https://tails.net/doc/about/warnings/index.en.html)).

## Which to pick

- **You want to save a few files, keys or Wi-Fi passwords:** Persistent Storage. It is official and covered by the Tails docs. Choose a long random passphrase.
- **You do different things you must keep apart:** a separate Tails stick per task, as Tails suggests.
- **You need to hide that you keep anything at all:** keep nothing on the stick. Carry files separately on a [VeraCrypt](/directory/veracrypt) hidden volume made on a different device, and read VeraCrypt's precautions first.
- **You need another operating system for work Tails can't do:** use that system on its own, not inside Tails. Our [Linux guide](/guides/switch-to-linux-for-privacy) is a start.
- **You already use HiddenVM and your threat model needs it:** you are on an old Tails by design. Decide whether the missing security fixes are a bigger risk than what you gain, and watch for a maintained fork.

Not sure what you are protecting against? Start with [how to build your threat model](/guides/how-to-build-your-threat-model).

---

## FAQ

**Is HiddenVM still supported?**
Its last release was v1.53 on 18 July 2024 and it lists Tails up to 6.5. The current Tails is 7.15. We saw no maintainer reply to a question asking if it is abandoned ([issue 45](https://github.com/aforensics/HiddenVM/issues/45)).

**Does HiddenVM send my virtual machine over Tor?**
No, not by default. The README says the VM gets normal internet and that you can link it to a Whonix-Gateway VM to use Tor ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).

**Is Tails Persistent Storage hidden?**
No. Tails says an attacker with your stick can know a Persistent Storage exists ([Tails docs](https://tails.net/doc/persistent_storage/index.en.html)).

**Can I use both?**
HiddenVM's README says not to use Tails' persistent volume feature alongside it ([HiddenVM README](https://raw.githubusercontent.com/aforensics/HiddenVM/master/README.rst)).

**Can I make a hidden volume inside Tails?**
Tails says to create new VeraCrypt volumes outside of Tails, but it can open existing ones ([Tails docs](https://tails.net/doc/encryption_and_privacy/veracrypt/index.en.html)).

---

## Keep reading

- [How to build your threat model](/guides/how-to-build-your-threat-model)
- [Getting online where the internet is censored](/guides/getting-online-where-the-internet-is-censored)
- [Switch to Linux for privacy](/guides/switch-to-linux-for-privacy)
