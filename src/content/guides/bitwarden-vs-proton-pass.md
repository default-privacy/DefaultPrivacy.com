---
title: "Bitwarden vs Proton Pass: Which Password Manager Should You Use?"
slug: bitwarden-vs-proton-pass
description: "Both are open source, independently audited and solid choices. Bitwarden is cheaper to upgrade and can run on your own server. Proton Pass builds in email aliases. Here is how they compare on price, passkeys, aliases, self-hosting and jurisdiction."
category: Privacy
difficulty: beginner
timeToComplete: "10 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - bitwarden
  - proton pass
  - password manager
  - passkeys
  - email aliases
  - vaultwarden
  - self-hosting
  - comparison
relatedGuides:
  - privacy-where-to-start
  - how-to-live-privately-jack-reacher
relatedTools:
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Proton Pass
    href: /directory/protonpass
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Addy
    href: /directory/addy
  - name: KeePassXC
    href: /directory/keepass-xc
  - name: Account breach check
    href: /breach-check
---

**Last checked: October 2026** · Each claim links to Bitwarden's or Proton's own pages, their code repositories or a published audit.

Both are open source, independently audited and a sound choice for most people. Pick Bitwarden if you want the cheaper paid plan, the widest browser support or the option to run your own server. Pick Proton Pass if you want email aliases built in, or you already use Proton.

Bitwarden or Proton Pass was among the most asked password questions on the former Techlore privacy forum. Here is how the two compare as of October 2026.

---

## At a glance

| | Bitwarden | Proton Pass |
|---|---|---|
| Open source | Apps GPL 3.0, main server AGPL 3.0; a few business modules are source-available only ([license FAQ](https://github.com/bitwarden/server/blob/main/LICENSE_FAQ.md)) | Apps and browser extension GPL 3.0 ([apps](https://github.com/protonpass), [extension and web](https://github.com/ProtonMail/WebClients)); server code isn't listed ([Proton](https://proton.me/community/open-source)) |
| Published audits | Every year from 2020 to 2025, plus 2018 ([Bitwarden](https://bitwarden.com/help/is-bitwarden-audited/)) | 2023 and 2026 ([2023](https://proton.me/blog/pass-open-source-security-audit), [2026](https://proton.me/business/blog/proton-pass-audit-2026)) |
| Free plan | Unlimited passwords and devices, passkeys, alias integrations, sharing with one person ([pricing](https://bitwarden.com/pricing/)) | Unlimited logins and devices, passkeys, 10 aliases, weak-password alerts, two vaults shared with up to two people ([pricing](https://proton.me/pass/pricing)) |
| Paid, one person | Premium, $19.80 a year ([pricing](https://bitwarden.com/pricing/)) | Pass Plus, $35.88 a year or $4.99 a month ([pricing](https://proton.me/pass/pricing)) |
| Family, six people | $47.88 a year ([pricing](https://bitwarden.com/pricing/)) | $59.88 a year or $6.99 a month ([pricing](https://proton.me/pass/pricing)) |
| Self-hosting | Yes, official server or the unofficial Vaultwarden ([Bitwarden](https://bitwarden.com/help/self-host-bitwarden/), [Vaultwarden](https://github.com/dani-garcia/vaultwarden)) | No ([Proton](https://proton.me/pass/alternatives/bitwarden-alternative)) |
| Email aliases | Connects to six outside alias services ([Bitwarden](https://bitwarden.com/help/generator/)) | Built in, powered by SimpleLogin ([Proton](https://proton.me/pass/aliases)) |
| Company | Bitwarden, Inc., Santa Barbara, California ([privacy policy](https://bitwarden.com/privacy/)) | Proton AG, Geneva, Switzerland ([Proton](https://proton.me/pass/pricing)) |

Prices are in US dollars as listed in October 2026. Bitwarden's are annual and exclude tax ([pricing](https://bitwarden.com/pricing/)).

---

## Open source and audits

**Bitwarden.** The apps for browser, desktop, mobile and command line are licensed GPL 3.0, and the main server AGPL 3.0. A few modules built for larger organizations use Bitwarden's own source-available license, which Bitwarden says doesn't qualify as open source under the Open Source Initiative's definition ([license FAQ](https://github.com/bitwarden/server/blob/main/LICENSE_FAQ.md)).

Bitwarden lists published audits for every year from 2020 to 2025, and one by Cure53 in 2018. In 2025 alone, Cure53 tested the browser extension, desktop app, web vault and core code, the Applied Cryptography Group at ETH Zurich reviewed its cryptography, and Unit 42 by Palo Alto Networks tested the mobile apps ([Bitwarden](https://bitwarden.com/help/is-bitwarden-audited/)).

**Proton Pass.** By July 2023 Proton had published the Pass source code ([Proton](https://proton.me/blog/pass-open-source-security-audit)). The Android, iOS and command-line apps are GPL 3.0 on GitHub ([protonpass](https://github.com/protonpass)), and the browser extension, web app and desktop app sit in Proton's main web repository, also GPL 3.0 ([WebClients](https://github.com/ProtonMail/WebClients)). Proton's open-source page lists the apps, not the servers ([Proton](https://proton.me/community/open-source)).

Cure53 audited the Pass mobile apps, browser extensions and API in May and June 2023. Proton fixed every issue except one medium-severity Android issue it couldn't resolve because of an Android limitation ([Proton, July 2023](https://proton.me/blog/pass-open-source-security-audit); [report](https://res.cloudinary.com/dbulfrlrz/images/v1707561557/wp-pme/Cure53-proton-pass-20230717/Cure53-proton-pass-20230717.pdf)). Recurity Labs tested the browser extensions, mobile and desktop apps and the command-line tool between January and April 2026. Proton reports no remote exploits and no encryption bypasses, and says the desktop memory-handling issues the auditors raised were fixed by the retest ([Proton, May 2026](https://proton.me/business/blog/proton-pass-audit-2026)).

Bitwarden has the longer public record. Both publish their reports, so you can read them yourself.

---

## Free plans

**Bitwarden Free** includes unlimited passwords and devices, passkeys, the password and username generator, email alias integration, encrypted export, and sharing with one other person through a free two-person organization ([pricing](https://bitwarden.com/pricing/)).

**Proton Pass Free** includes unlimited logins, notes and cards on unlimited devices, passkeys, 10 email aliases, alerts for weak and reused passwords, and two vaults you can share with up to two other people ([pricing](https://proton.me/pass/pricing)).

The differences that matter:

- **Password health.** Proton flags weak and reused passwords for free. Bitwarden's vault health reports come with Premium ([Bitwarden pricing](https://bitwarden.com/pricing/); [Proton pricing](https://proton.me/pass/pricing)).
- **Aliases.** Proton gives you 10 without any other account. Bitwarden's generator works with alias services you sign up for separately, and Bitwarden notes that some of them [require a subscription](https://bitwarden.com/help/generator/).
- **Two-factor codes.** Both keep built-in one-time codes for paid plans. Both companies also make a free standalone authenticator app: [Bitwarden Authenticator](https://bitwarden.com/download/) and [Proton Authenticator](https://proton.me/authenticator).

---

## Paid plans

**Bitwarden Premium** costs $19.80 a year and adds the built-in authenticator, 5 GB of file attachments, emergency access and vault health reports. **Families** costs $47.88 a year for six people with unlimited sharing ([pricing](https://bitwarden.com/pricing/)).

**Pass Plus** costs $35.88 a year or $4.99 a month. It adds unlimited aliases, built-in two-factor codes, item and link sharing, dark web monitoring, file attachments, emergency access, your own domain for aliases and the command-line tool. **Pass Family** covers six people for $59.88 a year or $6.99 a month. **Proton Unlimited**, at $119.88 a year, bundles Pass Plus with Proton Mail, Calendar, VPN and Drive ([pricing](https://proton.me/pass/pricing)).

---

## Self-hosting

**Bitwarden** publishes its server, and you can run it yourself with Docker on Linux or Windows ([Bitwarden](https://bitwarden.com/help/self-host-bitwarden/)). The lighter option, Bitwarden lite, is a single container "intended for personal use and home-labs" that runs on ARM hardware such as a Raspberry Pi or NAS. It still needs an installation ID and key from Bitwarden ([Bitwarden lite](https://bitwarden.com/help/install-and-deploy-lite/)). Premium features on your own server need a license file from a paid Bitwarden subscription ([licensing](https://bitwarden.com/help/licensing-on-premise/)). Bitwarden rates even the lite version as intermediate, assuming you know the Linux command line and Docker ([Bitwarden](https://bitwarden.com/help/self-host-bitwarden/)).

**Vaultwarden** is a separate server written in Rust that works with the official Bitwarden apps ([Vaultwarden](https://github.com/dani-garcia/vaultwarden)). Know what you're getting:

- It is "not associated with Bitwarden or Bitwarden, Inc.", and its maintainers ask you to report problems to them, never to Bitwarden support.
- Its feature list includes attachments and emergency access, which are Premium on Bitwarden's own service.
- Its README mentions no security audit, says the project can't be held liable for data loss and recommends regular backups.
- It publishes security fixes often: 11 advisories on October 3, 2026 alone, and seven rated high earlier in 2026. Update promptly ([advisories](https://github.com/dani-garcia/vaultwarden/security/advisories)).

**Proton Pass** can't be self-hosted. Proton says Pass, like its other services, "isn't designed to be self hosted due to its complex architecture" ([Proton](https://proton.me/pass/alternatives/bitwarden-alternative)).

---

## Passkeys

Both store and fill passkeys on their free plans ([Bitwarden pricing](https://bitwarden.com/pricing/); [Proton pricing](https://proton.me/pass/pricing)). Both do it in the browser extension, on iOS 17 or later and on Android 14 or later ([Bitwarden](https://bitwarden.com/help/storing-passkeys/); [Proton](https://proton.me/support/pass-use-passkeys)). Proton notes that Firefox on iPhone and iPad doesn't support passkeys yet.

Moving passkeys is where they differ. Bitwarden includes passkeys in its JSON exports, and on iOS 26 or later and Android 14 or later it can hand them straight to another app that also supports the FIDO Credential Exchange Protocol ([Bitwarden](https://bitwarden.com/help/storing-passkeys/)). Proton's export guide doesn't say whether passkeys are included ([Proton](https://proton.me/support/pass-export)), so check after any move.

---

## Email aliases

An alias is a forwarding address you give to a site in place of your real email. If it starts getting spam, you switch it off ([Proton](https://proton.me/pass/aliases)).

**Proton Pass** creates aliases itself, powered by SimpleLogin by Proton, and you can also manage them in [SimpleLogin](/directory/simplelogin) ([Proton](https://proton.me/pass/aliases)). Free accounts get 10. Pass Plus adds unlimited aliases, your own domain, extra mailboxes and sending from an alias ([pricing](https://proton.me/pass/pricing)).

**Bitwarden's** generator can create an alias with [SimpleLogin](/directory/simplelogin), [Addy](/directory/addy), [Firefox Relay](/directory/firefox-private-relay), [Fastmail](/directory/fastmail), [Forward Email](/directory/forwardemail) or [DuckDuckGo Email Protection](/directory/duckduckgo). The mobile apps support four of those: SimpleLogin, Addy, Forward Email and Firefox Relay ([Bitwarden](https://bitwarden.com/help/generator/)). You need an account with the alias service.

---

## Platforms

**Bitwarden** has browser extensions for Chrome, Edge, Firefox, Safari, Opera, Brave, Vivaldi, DuckDuckGo (on Mac) and Tor Browser; desktop apps for Windows, macOS and Linux; apps for iOS and Android; a web app; and a command-line tool. It runs its own F-Droid repository, though that build can't receive push notifications, so you sync the vault by hand ([downloads](https://bitwarden.com/download/)).

**Proton Pass** has apps for Windows, macOS, Linux, Android and iOS, a web app, and extensions for Chrome, Safari, Firefox, Edge and Brave ([downloads](https://proton.me/pass/download)). Proton says the Chrome extension also works in Chromium-based browsers such as Opera and Vivaldi ([Proton](https://proton.me/support/pass-browser-extension)). Its command-line tool comes with Pass Plus ([pricing](https://proton.me/pass/pricing)). The Android app is also on [F-Droid](https://f-droid.org/en/packages/proton.android.pass.fdroid/).

---

## Moving between them

**Bitwarden to Proton Pass.** Export your vault as a .json file from the Bitwarden browser extension or desktop app ([Bitwarden](https://bitwarden.com/help/export-your-data/)). Then import it in the Proton Pass browser extension, choosing Bitwarden and the .json format ([Proton](https://proton.me/support/pass-import-bitwarden)). Proton's guide says the import brings over logins and notes, so check cards, identities, attachments and passkeys by hand before you close the Bitwarden account.

**Proton Pass to Bitwarden.** Export from the Proton Pass browser extension, web app or Windows app; the mobile apps can't export ([Proton](https://proton.me/support/pass-export)). Bitwarden's importer has a ProtonPass (zip/json) option ([Bitwarden source](https://github.com/bitwarden/clients/blob/main/libs/importer/src/models/import-options.ts)), and you can import from the Bitwarden browser extension, desktop app or command-line tool ([Bitwarden](https://bitwarden.com/help/import-data/)).

An unencrypted export holds every password in plain text. Bitwarden's advice applies to both: don't store it or send it over insecure channels such as email, and delete it immediately after use ([Bitwarden](https://bitwarden.com/help/export-your-data/)). Do the move on your own computer, compare item counts, check your passkeys, and keep the old account until everything works.

The same steps apply if you move between Bitwarden's US and EU regions. Bitwarden can't move an account between them for you ([Bitwarden](https://bitwarden.com/help/server-geographies/)).

---

## Company and jurisdiction

**Bitwarden** is Bitwarden, Inc., based in Santa Barbara, California ([privacy policy](https://bitwarden.com/privacy/)). You choose whether your vault is stored in its United States or European Union region ([Bitwarden](https://bitwarden.com/help/server-geographies/)).

**Proton Pass** is run by Proton AG in Geneva ([Proton](https://proton.me/pass/pricing)). Since June 2024 the non-profit Proton Foundation has been Proton's primary shareholder, and no change of control can happen without its consent ([Proton](https://proton.me/blog/proton-non-profit-foundation)). In July 2025 Proton said it was moving most of its physical infrastructure out of Switzerland, citing legal uncertainty over Swiss surveillance proposals ([Proton](https://proton.me/blog/lumo-ai)).

Both encrypt your vault on your device. Bitwarden says it has no way to access, retrieve or reset your master password ([Bitwarden](https://bitwarden.com/help/forgot-master-password/)), and Proton describes Pass as end-to-end encrypted ([Proton](https://proton.me/pass/pricing)). Jurisdiction matters most for the account information each company holds outside your vault. Each privacy policy lists what that is: [Bitwarden](https://bitwarden.com/privacy/), [Proton](https://proton.me/legal/privacy).

---

## If you forget your password

**Bitwarden** can't reset your master password. Your options are a password hint, emergency access, an app still logged in that you can unlock with a PIN or biometrics, signing in on a device you've already approved, or a login passkey with encryption turned on (an ordinary login passkey won't do). If none of those work, you delete the account and start again ([Bitwarden](https://bitwarden.com/help/forgot-master-password/)).

**Proton Pass** runs on your Proton account. If you reset your Proton password by email or SMS, you might not be able to read your Pass items afterwards. A recovery phrase, a recovery file, a trusted signed-in device, contact-assisted recovery or your old password brings them back, but only if you set it up before the reset ([Proton](https://proton.me/support/recover-encrypted-messages-files)). Set up a [recovery phrase](https://proton.me/support/recovery-phrase) before you need it.

Whichever you choose, write your recovery details down and keep them offline.

---

## Who should pick which

**Pick Bitwarden if you:**

- want to run your own server, officially or with Vaultwarden
- want the cheaper paid plan: $19.80 a year against $35.88 ([Bitwarden](https://bitwarden.com/pricing/); [Proton](https://proton.me/pass/pricing))
- use Tor Browser or the DuckDuckGo browser on a Mac ([downloads](https://bitwarden.com/download/); [DuckDuckGo integration](https://bitwarden.com/help/duckduckgo-macos-browser-integration/))
- already use an alias service other than SimpleLogin

**Pick Proton Pass if you:**

- want aliases built in, with 10 free
- want weak and reused password alerts without paying
- already pay for Proton Unlimited, which includes Pass Plus ([pricing](https://proton.me/pass/pricing))
- prefer a Swiss company whose main shareholder is a non-profit foundation

**If you'd rather have no cloud account at all,** [KeePassXC](/directory/keepass-xc) keeps your passwords in an encrypted file you store wherever you like. It is free, open source and runs on Windows, macOS and Linux ([KeePassXC](https://keepassxc.org/)).

Whichever you pick, run your email through the [breach check](/breach-check) and change the passwords for accounts that have leaked first.

---

## FAQ

**Is Bitwarden or Proton Pass more secure?**

Both publish their app code and their audit reports. Bitwarden lists audits for every year from 2020 to 2025 ([Bitwarden](https://bitwarden.com/help/is-bitwarden-audited/)). Proton Pass was audited by Cure53 in 2023 and Recurity Labs in 2026 ([2023](https://proton.me/blog/pass-open-source-security-audit), [2026](https://proton.me/business/blog/proton-pass-audit-2026)). For most people, a unique password on every account and two-factor login on email matter more than the choice between these two.

**Is the free version good enough?**

For most people, yes. Both free plans store unlimited passwords on unlimited devices and support passkeys ([Bitwarden](https://bitwarden.com/pricing/); [Proton](https://proton.me/pass/pricing)). Pay if you want built-in two-factor codes, file attachments or emergency access.

**Can I self-host Proton Pass?**

No. Proton says Pass "isn't designed to be self hosted due to its complex architecture" ([Proton](https://proton.me/pass/alternatives/bitwarden-alternative)). Bitwarden publishes its server, including a single-container version for personal use ([Bitwarden lite](https://bitwarden.com/help/install-and-deploy-lite/)).

**Is Vaultwarden safe to use?**

It isn't Bitwarden. The project says it is "not associated with Bitwarden or Bitwarden, Inc.", its README mentions no security audit, and it recommends regular backups ([Vaultwarden](https://github.com/dani-garcia/vaultwarden)). It also publishes security fixes often ([advisories](https://github.com/dani-garcia/vaultwarden/security/advisories)). If you run it, prompt updates and backups are your job.

**Do Bitwarden and Proton Pass support passkeys?**

Yes, on free plans, in the browser extension and on iOS 17 or later and Android 14 or later ([Bitwarden](https://bitwarden.com/help/storing-passkeys/); [Proton](https://proton.me/support/pass-use-passkeys)).

**How do I move from Bitwarden to Proton Pass?**

Export a .json file from the Bitwarden browser extension or desktop app, then import it in the Proton Pass browser extension ([Bitwarden](https://bitwarden.com/help/export-your-data/); [Proton](https://proton.me/support/pass-import-bitwarden)). Delete the export file as soon as the import finishes.

**What happens if I forget my master password?**

Bitwarden can't reset it. Without a hint, emergency access, an app you're still logged in to, an approved device or a login passkey with encryption enabled, you start a new account ([Bitwarden](https://bitwarden.com/help/forgot-master-password/)). With Proton, a password reset by email or SMS can leave your Pass items unreadable unless you have a recovery phrase, recovery file, trusted device or your old password ([Proton](https://proton.me/support/recover-encrypted-messages-files)).

**Does it matter that Bitwarden is American and Proton is Swiss?**

Less than you might think for your passwords, since both encrypt your vault on your device ([Bitwarden](https://bitwarden.com/help/forgot-master-password/); [Proton](https://proton.me/pass/pricing)). It matters for the account information each company holds outside the vault, so read their privacy policies: [Bitwarden](https://bitwarden.com/privacy/), [Proton](https://proton.me/legal/privacy).

---

## Keep reading

- [Where to start with privacy: the first 10 changes](/guides/privacy-where-to-start)
- [How to live privately: Jack Reacher](/guides/how-to-live-privately-jack-reacher)
- [Bitwarden in the directory](/directory/bitwarden)
- [Proton Pass in the directory](/directory/protonpass)
