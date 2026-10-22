---
title: "Is Ente Auth Safe? What It Protects and What It Doesn't"
slug: is-ente-auth-safe
description: "Ente Auth is open source, encrypts your 2FA codes on your device before they sync, and works without an account. Its 2023 outside audit covered Ente's Photos app, not Auth. Here is what is audited, what the trade-offs are, and how it compares with Aegis, 2FAS and Proton Authenticator."
category: Privacy
difficulty: beginner
timeToComplete: "8 minutes"
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
author: Default Privacy
tags:
  - ente auth
  - is ente auth safe
  - ente authenticator
  - authenticator app
  - 2fa app
  - two-factor authentication
  - totp
  - open source authenticator
  - aegis vs ente auth
  - proton authenticator
relatedGuides:
  - move-2fa-codes-to-a-new-app-or-phone
  - bitwarden-vs-proton-pass
  - how-to-build-your-threat-model
relatedTools:
  - name: Ente Auth
    href: /directory/ente-auth
  - name: Aegis Authenticator
    href: /directory/aegis-authenticator
  - name: 2FAS
    href: /directory/2fas
  - name: Proton Authenticator
    href: /directory/proton-authenticator
  - name: Ente
    href: /directory/ente
---

**Last checked: October 2026** · Each claim links to the maker's own pages, its code or the audit report. General information, not legal advice.

Yes, Ente Auth is a reasonable choice for most people. It is open source, and Ente says it encrypts your codes on your device before they sync, so its servers hold only scrambled copies. The honest limits: the 2023 outside audit of Ente's encryption covered the Photos app and its web version, not Auth by name. A 2025 server audit does cover Auth, according to Ente. If you want no cloud at all, a local-only app such as Aegis or 2FAS has less to trust.

---

## What Ente Auth is

Ente Auth is the 2FA (one-time code) app from Ente, the company behind the Ente Photos backup service. Ente describes it as "an end-to-end encrypted, cross platform and free app for storing your 2FA codes with cloud backups" that "works offline" ([Ente Auth README](https://github.com/ente-io/ente/blob/main/mobile/apps/auth/README.md)). It runs on iPhone, Android, Windows, Mac and Linux ([Ente Auth](https://ente.io/auth)), and there is a web page where you can view your codes but not add them ([Ente Auth README](https://github.com/ente-io/ente/blob/main/mobile/apps/auth/README.md)).

## Is it open source?

Yes. The code lives in Ente's public repository under the AGPL-3.0 licence ([GitHub](https://github.com/ente-io/ente), [LICENSE](https://raw.githubusercontent.com/ente-io/ente/main/LICENSE)). The Android app on GitHub is built from that source, and you can also get it from Play Store or F-Droid ([README](https://github.com/ente-io/ente/blob/main/mobile/apps/auth/README.md)). Open source lets outsiders check the code. It does not prove the app on your phone matches it.

## How your codes are protected when they sync

Your device makes a master key. A key derived from your password locks it, and only the locked copy goes to Ente's servers ([Ente architecture](https://github.com/ente-io/ente/blob/main/architecture/README.md)). Each code is locked with its own key. Those keys are locked with an "auth key", which is locked with your master key. Ente's document says that "only you have access to your `masterKey`" ([Ente architecture, token encryption](https://github.com/ente-io/ente/blob/main/architecture/README.md)).

In plain words: if the design works as written, Ente cannot read your codes. Ente's help page says to keep your recovery key safe so you can get back in if you forget your password ([Ente Auth FAQ](https://ente.io/help/auth/faq/)), so treat that key as your way back in.

## What has been audited

- **March 2023, Cure53 and Symbolic Software.** Nine days of review of Ente's encryption design and code. Cure53 found four issues, none Critical, and one High: the web app accepted empty passwords ([Cure53 report](https://ente.io/blog/cryptography-audit/ente-audit-report.pdf)). Ente says it fixed that and the auditors verified it ([Ente](https://ente.io/blog/cryptography-audit)). The report's scope lists the Photos app and Photos web, not Auth. It also reviewed Ente's general encryption design, which Ente's architecture page says Auth uses too ([Ente architecture](https://github.com/ente-io/ente/blob/main/architecture/README.md)), but not Auth's own app code ([Cure53 report](https://ente.io/blog/cryptography-audit/ente-audit-report.pdf)).
- **October 2025, Cure53, sponsored by CERN.** A test of Ente's server code and infrastructure by four people over fourteen evaluation days. It found fifteen issues, and Ente fixed twelve, including all Critical and High ones ([Cure53 report](https://ente.io/reports/Cure53-Audit-Report-Oct-2025.pdf)). Ente says this covered Photos, Auth and Locker "since the same code and infrastructure powers the entire platform" ([Ente](https://ente.io/blog/cern-audit/)). The report itself does not name Auth. It also flagged a possible remote code execution flaw in the desktop app, outside the audit's scope, which it says was fixed and checked ([Cure53 report](https://ente.io/reports/Cure53-Audit-Report-Oct-2025.pdf)).

We found no audit of the Auth app's own code. Ente's claim that its "cryptography has been externally audited" ([Ente Auth](https://ente.io/auth)) is true of the 2023 work, but that work looked at Photos and the shared design.

## Using it without an account

Choose "Use without backups" and your codes stay on that device, are not synced and cannot be restored from Ente. The local vault is encrypted with a key held in the device's secure storage ([Ente offline mode](https://ente.io/help/auth/features/offline-mode)). Ente warns that device transfers and OS backups are not supported ways to recover offline codes, so make an encrypted export first ([Ente offline mode](https://ente.io/help/auth/features/offline-mode)). Desktop and direct-download Android builds may still contact Ente to check for updates ([Ente offline mode](https://ente.io/help/auth/features/offline-mode)).

With an account, Ente collects your email address and a user ID. Without one, Ente says it collects no data by default ([Ente privacy disclosure](https://ente.io/help/auth/faq/privacy-disclosure/)).

## Export and backup

In Settings, Data, Export, pick Encrypted and set a password. Ente cannot recover that password ([Ente export help](https://ente.io/help/auth/migration/export)). Ente Auth can also keep daily local backups, five at a time, in a folder you choose ([Ente export help](https://ente.io/help/auth/migration/export)). Test the import on another install before you delete anything. The steps for moving between apps are in [Move your 2FA codes to a new app or phone](/guides/move-2fa-codes-to-a-new-app-or-phone).

---

## How it compares

| | Ente Auth | Aegis | 2FAS | Proton Authenticator |
|---|---|---|---|---|
| Platforms | Phone, desktop, view-only web ([Ente](https://ente.io/auth), [README](https://github.com/ente-io/ente/blob/main/mobile/apps/auth/README.md)) | Android only ([Aegis](https://github.com/beemdevelopment/Aegis)) | Phone ([2FAS](https://2fas.com/auth/)) | Phone and desktop ([Proton](https://proton.me/authenticator)) |
| Open source | AGPL-3.0 | GPL-3.0 ([Aegis](https://github.com/beemdevelopment/Aegis)) | Yes, says 2FAS ([2FAS](https://2fas.com/auth/)) | Yes, says Proton ([Proton](https://proton.me/authenticator)) |
| Account needed | No, only for sync | No | No | No, only for sync |
| Sync | Ente's servers, encrypted | No built-in sync; automatic backups to a place you choose ([Aegis](https://github.com/beemdevelopment/Aegis)) | Your own iCloud or Google Drive ([2FAS](https://2fas.com/auth/)) | Your Proton account ([Proton](https://proton.me/authenticator)) |

The trade-off is simple. Aegis keeps your codes on your phone and 2FAS says it is local-first ([2FAS](https://2fas.com/)), so no company's servers need to hold them, and a lost phone with no backup means lost codes. Ente Auth and Proton Authenticator add synced backups that survive a lost phone, in return for trusting a company's encryption and a password you must not forget. Ente's own [Enteception](https://ente.io/help/auth/faq/enteception/) page warns that keeping your Ente account's 2FA inside Ente Auth can lock you out.

Whichever you pick, save each site's recovery codes somewhere else. If you are unsure how much sync risk you want, start with [how to build your threat model](/guides/how-to-build-your-threat-model).

---

## FAQ

**Is Ente Auth safer than Google Authenticator?**

On privacy design, Ente Auth's codes are encrypted before they leave your device and its code is public ([Ente architecture](https://github.com/ente-io/ente/blob/main/architecture/README.md), [GitHub](https://github.com/ente-io/ente)). We have not compared security audits of the two, so we can't call it safer in every way.

**Can Ente read my 2FA codes?**

Ente says it cannot. It says its servers store only encrypted copies of your codes and master key ([Ente Auth FAQ](https://ente.io/help/auth/faq/)). That rests on the design working as published, which outside reviewers checked in 2023 for Photos.

**Does Ente Auth work without internet or an account?**

Yes. Codes are made on your device, and "Use without backups" needs no account ([Ente offline mode](https://ente.io/help/auth/features/offline-mode)).

**What if I forget my Ente password?**

Your recovery key is the way back in. Ente says to keep it safe ([Ente Auth FAQ](https://ente.io/help/auth/faq/)). Ente also suggests writing it on paper and keeping an encrypted export ([Enteception](https://ente.io/help/auth/faq/enteception/)).

**Which should I pick?**

If you have an Android phone and want no cloud, try [Aegis](/directory/aegis-authenticator). On iPhone with no cloud, try [2FAS](/directory/2fas). If you want synced backups across phone and desktop, [Ente Auth](/directory/ente-auth) or [Proton Authenticator](/directory/proton-authenticator).

---

## Keep reading

- [Move your 2FA codes to a new app or phone](/guides/move-2fa-codes-to-a-new-app-or-phone)
- [How to build your threat model](/guides/how-to-build-your-threat-model)
- [Bitwarden vs Proton Pass](/guides/bitwarden-vs-proton-pass)
