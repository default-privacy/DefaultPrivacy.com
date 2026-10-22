---
title: "How to Choose a Password Manager: Four Questions and Your Options"
slug: how-to-choose-a-password-manager
description: "Any reputable password manager beats reusing passwords. This guide helps you choose between cloud-synced managers (Bitwarden, Proton Pass, 1Password), a local-file manager (KeePassXC, KeePassium) and the ones built into Apple and Chrome, using four questions and what each maker says about itself."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - password manager
  - bitwarden
  - proton pass
  - keepassxc
  - 1password
  - passkeys
  - master password
relatedGuides:
  - bitwarden-vs-proton-pass
  - move-2fa-codes-to-a-new-app-or-phone
  - privacy-where-to-start
  - email-aliases-simplelogin-vs-addy
relatedTools:
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Proton Pass
    href: /directory/protonpass
  - name: KeePassXC
    href: /directory/keepass-xc
  - name: KeePassium
    href: /directory/keepassium
  - name: 1Password
    href: /directory/1password
  - name: Password check
    href: /password-check
---

**Last checked: October 2026** · Everything below is what each maker says about its own product, with a link. We have not tested these apps for this guide, and prices and features change, so check each pricing page.

The best password manager is one you will actually use for every account. If you want your passwords to sync across devices, Bitwarden or Proton Pass is a good place to start. If you want no company holding your passwords, use KeePassXC. If you only want to stop reusing passwords today, the manager already built into your phone or browser is better than nothing.

The US Cybersecurity and Infrastructure Security Agency (CISA) says to use long, random, unique passwords for every account, and says a password manager is one of the easiest ways to do it ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)).

## The Short Answer

The best password manager is the one you will actually use for every account. Pick by where you want your passwords to live.

1. Pick Bitwarden or Proton Pass if you want sync across devices. Pick KeePassXC if you want no company holding your passwords.
2. To stop reusing passwords today, use the manager built into your phone or browser.
3. Make the master password long and unique, and turn on two-step login for the manager. Save its recovery codes.
4. Start with email, banking and anything with money. Then add a few accounts a week.
5. Back up your vault or export file.

---

## Four questions to ask

**1. Where does the vault live?** In the company's cloud, synced across your devices, or in a file you control? Cloud sync is easier. A file means no company holds it, but you handle syncing and backups yourself.

**2. What happens if you forget your master password?** If a manager cannot read your vault, it generally cannot reset your master password either. Know the recovery steps before you need them. Our [Bitwarden vs Proton Pass](/guides/bitwarden-vs-proton-pass) guide covers this for those two.

**3. Can you leave?** Check that you can export your passwords in a standard format before you commit. Moving later is straightforward if the export works, and painful if it does not.

**4. Is the code public, and has it been audited?** Open source lets others inspect the code. An audit is a report from an outside firm, and it covers a specific version at a specific time. Neither is a guarantee, and we flag only what the makers say.

---

## The options

### Cloud-synced: Bitwarden and Proton Pass

Both sync your vault across devices. Bitwarden says its apps are under the GPL 3.0 licence and its main server under AGPL 3.0, with a few business modules that are source-available only ([Bitwarden licence FAQ](https://github.com/bitwarden/server/blob/main/LICENSE_FAQ.md)). Proton says it published the Pass source code and had Pass audited by Cure53 ([Proton](https://proton.me/blog/pass-open-source-security-audit)). Our [full comparison](/guides/bitwarden-vs-proton-pass) covers plans, passkeys, self-hosting, aliases and recovery. See [Bitwarden](/directory/bitwarden) and [Proton Pass](/directory/protonpass).

### Cloud-synced: 1Password

1Password secures your account with two layers: an account password it says it never stores, and a Secret Key of 34 letters and numbers created on your device. 1Password says it has no record of your Secret Key and cannot recover it, and that the Secret Key is not a backup code: it does not let you sign in if you forget your account password ([1Password](https://support.1password.com/secret-key-security/)). It says it publishes the results of independent audits on its website ([1Password](https://1password.com/security/)). We did not find a statement on those pages that its apps are open source. See [1Password](/directory/1password).

### A file you control: KeePassXC and KeePassium

KeePassXC is free and open source under the GPLv3 licence, and runs on Windows, macOS and Linux. It stores your information in an offline, encrypted file that can be kept in any location, including a cloud folder you choose, and says no data is stored on remote servers ([KeePassXC](https://keepassxc.org/)). It says it was awarded a Security Visa by the French national cybersecurity agency ANSSI ([KeePassXC](https://keepassxc.org/)). For iPhone, iPad and Mac, KeePassium is a KeePass app under the GPL v3 licence that works with offline and online databases and can sync with your own cloud storage ([KeePassium](https://www.keepassium.com/)). See [KeePassXC](/directory/keepass-xc) and [KeePassium](/directory/keepassium).

**The trade:** you decide where the file lives and how it syncs. Nobody else can reset it or restore it for you, so back it up.

### Built into your phone or browser

- **Apple Passwords.** From iOS 18, iPadOS 18 and macOS Sequoia, the Passwords app stores passwords, passkeys and verification codes, syncs through iCloud Keychain, and alerts you to weak, reused or leaked passwords ([Apple](https://support.apple.com/en-us/120758)). It is for Apple devices.
- **Google Password Manager in Chrome.** When you are signed in to Chrome, passwords can be saved to your Google Account and used across devices. When you are not signed in, Chrome stores them locally on your device ([Google](https://support.google.com/chrome/answer/95606)).

These are easy, and the right first step if you reuse passwords today. The trade is that they tie your passwords to one company's ecosystem, so check how you would export them before you rely on them.

---

## Picking one

| You want | Start with |
|---|---|
| Sync across devices, simple to use | Bitwarden or Proton Pass |
| Passwords that never leave your control | KeePassXC (and KeePassium on iPhone) |
| To stop reusing passwords right now, with no new app | Apple Passwords or Chrome's manager |
| A commercial manager with a Secret Key design | 1Password |

**Our reading:** for most people, one of the two cloud-synced open-source managers is the simplest choice that is also easy to leave. KeePassXC suits people who are comfortable managing a file. We did not rank them on security, because we did not test them.

**Strongest case against a cloud manager:** your whole vault sits on a company's servers. The makers say it is encrypted so they cannot read it, but that is their claim. A local file avoids the question at the cost of more work.

---

## Setting it up

1. **Make the master password long.** CISA suggests a passphrase of 4 to 7 unrelated words as one way to make a strong, memorable password ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)). Use one you have never used elsewhere.
2. **Turn on two-step login for the manager itself,** and save its recovery codes. See [how to move your 2FA codes](/guides/move-2fa-codes-to-a-new-app-or-phone).
3. **Start with email, banking and anything with money.** Then work outward, a few accounts a week. Our [starter guide](/guides/privacy-where-to-start) has the order.
4. **Use the generator** for every new password, and give new sign-ups an [email alias](/guides/email-aliases-simplelogin-vs-addy).
5. **Back it up.** Know where your export or vault file is, and keep a copy off your main device.

Our [password check](/password-check) runs in your browser and does not send your password to our server.

---

## FAQ

**Is a password manager safe?**

CISA recommends using one to keep long, random, unique passwords ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)). Safety depends on a strong master password, two-step login and a backup. No manager protects you if your device itself is compromised.

**Which password manager is best?**

There is no single best. For sync and ease, Bitwarden or Proton Pass. For no cloud, KeePassXC. We compare the first two in [Bitwarden vs Proton Pass](/guides/bitwarden-vs-proton-pass).

**Can I use my browser's built-in manager?**

Yes, and it is better than reusing passwords. Chrome saves to your Google Account when you are signed in and to your device when you are not ([Google](https://support.google.com/chrome/answer/95606)). The main downside is being tied to one ecosystem.

**What if I forget my master password?**

It depends on the manager. 1Password says its Secret Key does not let you sign in if you forget your account password ([1Password](https://support.1password.com/secret-key-security/)). Read your manager's recovery steps before you need them.

**Do I still need two-factor codes?**

Yes. A password manager protects your passwords. Two-step login protects accounts if a password leaks. See [how to move your 2FA codes](/guides/move-2fa-codes-to-a-new-app-or-phone).

**Can I keep passkeys in a password manager?**

Apple's Passwords app stores passkeys alongside passwords ([Apple](https://support.apple.com/en-us/120758)), and our [Bitwarden vs Proton Pass](/guides/bitwarden-vs-proton-pass) comparison covers how those two handle them. Before you rely on a manager for passkeys, check that you can back them up or export them.
