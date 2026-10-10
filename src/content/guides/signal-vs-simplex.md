---
title: "Signal vs SimpleX: Which Private Messenger Should You Use?"
slug: signal-vs-simplex
description: "Signal is the easier pick for most people, but it ties your account to a phone number. SimpleX has no user IDs at all, at a cost in convenience. A sourced comparison of identifiers, metadata, encryption, audits, servers, devices and groups."
category: Privacy
difficulty: beginner
timeToComplete: "12 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - signal
  - simplex
  - simplex chat
  - private messenger
  - encrypted messaging
  - metadata
  - phone number privacy
  - end-to-end encryption
relatedGuides:
  - what-still-works-after-switching-to-grapheneos
relatedTools:
  - name: Signal
    href: /directory/signal
  - name: SimpleX Chat
    href: /directory/simplex-chat
  - name: Molly
    href: /directory/molly
---

**Last checked: October 2026** · Each claim links to Signal's or SimpleX's own documentation, support pages, blog or source code, or to published research.

For most people, Signal is the better choice. It finds your contacts for you, runs on your phone and computer at the same time, and handles large groups. SimpleX suits people who want no account identifier at all, not even a username, and who can accept one main device, smaller groups and swapping a link for every new contact.

Signal or SimpleX was one of the most asked messenger questions on the former Techlore privacy forum. Both protect private messages with closely related end-to-end encryption, so the real differences are what each service can learn about you and how much convenience you give up.

---

## Side by side

| | Signal | SimpleX |
|---|---|---|
| Sign-up | A phone number that can receive an SMS or a call ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number)). A number-free option is in Android beta ([Signal Support, October 2026](https://support.signal.org/hc/en-us/articles/11197884108826-Phone-Numberless-Registration-for-Android-beta)) | No account. Your profile is stored only on your device ([privacy policy](https://simplex.chat/privacy/#user-profiles)) |
| How people reach you | Your number, if you allow it, or an optional username ([Signal Support](https://support.signal.org/hc/en-us/articles/6712070553754-Phone-Number-Privacy-and-Usernames)) | A one-time link or QR code, or a public SimpleX address ([FAQ](https://simplex.chat/faq/#how-do-i-connect-to-people)) |
| Encryption | PQXDH key agreement and the Double Ratchet, now joined by a post-quantum ratchet ([Signal specifications](https://signal.org/docs/)) | A double ratchet with an added post-quantum key exchange, plus extra encryption layers ([privacy policy](https://simplex.chat/privacy/#introduction)) |
| Servers | One central service run by Signal ([Signal blog, 2016](https://signal.org/blog/the-ecosystem-is-moving/)) | Relays run by SimpleX Chat Ltd, Flux, other operators or you ([privacy policy](https://simplex.chat/privacy/#general-principles), [SimpleX blog, 2024](https://simplex.chat/blog/20241210-simplex-network-v6-2-servers-by-flux-business-chats.html)) |
| Phone and computer | Up to 5 linked devices ([Signal Support](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices)) | The desktop app uses your phone's profile over the same local network ([FAQ](https://simplex.chat/faq/#can-i-use-the-same-profile-on-desktop-do-messages-sync-cross-platform)) |
| Groups | Up to 1,000 members ([Signal Support](https://support.signal.org/hc/en-us/articles/360007319331-Group-chats)) | Peer-to-peer groups that don't scale to large audiences, plus channels in beta ([channels overview, April 2026](https://github.com/simplex-chat/simplex-chat/blob/stable/docs/protocol/channels-overview.md)) |
| Published reviews | Peer-reviewed protocol analysis and formal verification ([IACR ePrint 2016/1013](https://eprint.iacr.org/2016/1013), [Signal blog, 2025](https://signal.org/blog/spqr/)) | Two published Trail of Bits reviews (2022, 2024). SimpleX says a third, from 2026, is not yet published ([security page](https://simplex.chat/security/), [SimpleX blog, August 2026](https://simplex.chat/blog/20260819-simplex-chat-crowdfunding.html)) |
| Who runs it | The Signal Foundation, a US nonprofit funded by grants and donations ([Signal blog, 2018](https://signal.org/blog/signal-foundation/), [Signal Support](https://support.signal.org/hc/en-us/articles/5286774014362-Cost-to-use-Signal)) | SimpleX Chat Ltd (UK) and SimpleX Chat, Inc. (Delaware), funded by investors and donations ([transparency report](https://simplex.chat/transparency/), [SEC filing, 2026](https://www.sec.gov/Archives/edgar/data/2140143/000214014326000004/0002140143-26-000004-index.htm), [FAQ](https://simplex.chat/faq/#how-are-you-funded)) |

---

## Identifiers: phone numbers, usernames and no IDs at all

**Signal** registers you with a phone number that can receive an SMS or a call ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number)). Since February 2024 you can keep that number from the people you chat with ([Signal blog](https://signal.org/blog/phone-number-privacy-usernames/)):

- By default your number is hidden from anyone who doesn't already have it saved in their phone's contacts. People who have it saved still see it ([Signal Support](https://support.signal.org/hc/en-us/articles/6712070553754-Phone-Number-Privacy-and-Usernames)).
- If you set **Who can find me by my number** to Nobody, someone who types your number into Signal can't message you or even see that you're on Signal ([Signal blog](https://signal.org/blog/phone-number-privacy-usernames/)). People you message, or already have a chat with, can still reach you ([Signal Support](https://support.signal.org/hc/en-us/articles/6712070553754-Phone-Number-Privacy-and-Usernames)).
- A username lets people start a chat without your number. It isn't shown in chats, must end in two or more digits, and can be changed or deleted at any time ([Signal blog](https://signal.org/blog/phone-number-privacy-usernames/)). If someone you've chatted with by number messages your username, the two chats merge and they learn it's you ([Signal Support](https://support.signal.org/hc/en-us/articles/6712070553754-Phone-Number-Privacy-and-Usernames)).

Hiding your number from other users doesn't remove it from your account: you register one when you sign up ([Signal privacy policy](https://signal.org/legal/)). As of October 2026, Signal's Android beta (version 8.28 or later) offers an optional account with no phone number, for a one-time $2.99 fee paid with Apple Pay or Google Pay. You get an account ID and a recovery key in place of the number. If you lose both, Signal can't recover the account, and if you don't create a username, nobody can find you ([Signal Support](https://support.signal.org/hc/en-us/articles/11197884108826-Phone-Numberless-Registration-for-Android-beta)).

**SimpleX** has no user IDs of any kind. Its privacy policy says the protocol has no user profile IDs, "not even random numbers, cryptographic keys or hashes that identify the users" ([privacy policy](https://simplex.chat/privacy/#introduction)). Each contact gets its own set of one-way message queues, and no identifier or credential is reused between them ([SimpleX whitepaper](https://github.com/simplex-chat/simplexmq/blob/stable/protocol/overview-tjr.md)). Your profile is a local record on your device, and creating it puts nothing on any server ([privacy policy](https://simplex.chat/privacy/#user-profiles)).

You can keep several profiles in one app ([SimpleX README](https://github.com/simplex-chat/simplex-chat#roadmap)), and incognito mode generates a new random profile name for each new contact or group ([FAQ](https://simplex.chat/faq/#whats-incognito-profile)). As of October 2026, SimpleX is testing optional public names that point to a channel or a contact address. SimpleX says names are only for those who want to be found. You register one from an Ethereum wallet such as MetaMask, and the name is held on the Ethereum blockchain ([SimpleX blog, July 2026](https://simplex.chat/blog/20260722-simplex-public-names.html)), which is a public database ([ethereum.org](https://ethereum.org/en/developers/docs/intro-to-ethereum/)). A name can therefore link the wallet that registered it to your SimpleX address.

---

## Metadata: what each service can see

Encryption hides what you say. Metadata is who you talk to, when and from where.

**Signal**

- The app checks which of your contacts use Signal without revealing your address book to the service ([Signal Support](https://support.signal.org/hc/en-us/articles/360007061452-Does-Signal-send-my-number-to-my-contacts)).
- The service has no record of your group memberships, group names or group avatars ([Signal Support](https://support.signal.org/hc/en-us/articles/360007319331-Group-chats)).
- Sealed sender, introduced in 2018, aims to keep the sender of a message hidden from the service. The service still needs to know where each message is going, and Signal described resisting "traffic correlation via timing attacks and IP addresses" as ongoing work ([Signal blog, October 2018](https://signal.org/blog/sealed-sender/)).
- Signal says the only account data it can produce in response to a subpoena is when an account registered and the last date it connected. Its most recent published response is dated March 2026 ([Signal](https://signal.org/bigbrother/)).

**SimpleX**

- Servers host no user accounts, profiles or contact lists ([privacy policy](https://simplex.chat/privacy/#introduction)).
- When you message someone whose server your app doesn't already know, the app forwards the message through a server it does know. The destination server doesn't see your IP address, and the forwarding server can't see which address on that server the message is for. You can turn this on for every server in the network settings ([FAQ](https://simplex.chat/faq/#does-simplex-protect-my-ip-address)).
- SimpleX's preset servers don't log the IP addresses of connecting devices ([privacy policy](https://simplex.chat/privacy/#private-message-delivery)), and delete messages once delivered or after 21 days ([privacy policy](https://simplex.chat/privacy/#storage-of-messages-and-files-on-the-servers)). The policy adds that servers may store IP addresses for a short time to stop overload or attacks ([privacy policy](https://simplex.chat/privacy/#another-information-stored-on-the-servers)), and that hosting and network providers may log them ([privacy policy](https://simplex.chat/privacy/#information-preset-server-operators-may-share)). It suggests a VPN or Tor if you want to hide your IP address from servers ([privacy policy](https://simplex.chat/privacy/#private-message-delivery)).
- SimpleX's whitepaper names the limits. A server could record the queues you use over one connection and piece together part of who you talk to. And the design doesn't stop someone who watches both people's own network traffic from proving they communicate ([SimpleX whitepaper](https://github.com/simplex-chat/simplexmq/blob/stable/protocol/overview-tjr.md)).
- SimpleX reports 12 law enforcement requests in 2025, with no responsive information identified or provided ([transparency report](https://simplex.chat/transparency/)).

In short: Signal keeps very little, but it does hold the phone number you registered. SimpleX is built so its servers have no account to hold.

---

## Encryption

Both apps use the double ratchet, an algorithm Signal published ([Signal specification](https://signal.org/docs/specifications/doubleratchet/)). SimpleX's privacy policy calls its version "also known as Signal algorithm" and lists forward secrecy and break-in recovery among its properties: a stolen key exposes little of the past, and later messages become safe again ([privacy policy](https://simplex.chat/privacy/#introduction)). Each app has added protection against future quantum computers:

- **Signal** added a post-quantum key agreement, PQXDH, in September 2023 ([Signal blog](https://signal.org/blog/pqxdh/)). In October 2025 it began rolling out the Triple Ratchet, which adds a Sparse Post-Quantum Ratchet (SPQR) to the Double Ratchet. Existing chats move over without any action from you ([Signal blog](https://signal.org/blog/spqr/)).
- **SimpleX** added a post-quantum key exchange (sntrup761) inside its double ratchet in March 2024 ([SimpleX blog](https://simplex.chat/blog/20240314-simplex-chat-v5-6-quantum-resistance-signal-double-ratchet-algorithm.html)). It became the default for direct chats in April 2024. At that time groups did not support it yet ([SimpleX blog, April 2024](https://simplex.chat/blog/20240426-simplex-legally-binding-transparency-v5-7-better-user-experience.html)).

---

## Audits and published reviews

**SimpleX** has published two reviews by the security firm Trail of Bits:

- **November 2022.** Two engineers spent one week on simplexmq, the library that handles SimpleX's cryptography and networking. They found 2 medium and 2 low severity issues, all needing a high-difficulty attack, and SimpleX said 3 were fixed in v4.2 ([SimpleX blog](https://simplex.chat/blog/20221108-simplex-chat-v4.2-security-audit-new-website.html), [full report](https://github.com/trailofbits/publications/blob/master/reviews/SimpleXChat.pdf)).
- **July 2024.** A cryptographic review of SimpleX's protocol designs, including messaging, file transfer and push notifications. It found 3 medium, 1 low and 3 informational issues ([SimpleX blog, October 2024](https://simplex.chat/blog/20241014-simplex-network-v6-1-security-review-better-calls-user-experience.html), [report](https://github.com/simplex-chat/simplex-chat/blob/stable/docs/SimpleX_Design_Review_2024_Summary_Report_12_08_2024.pdf)).

SimpleX said in August 2026 that Trail of Bits audited it again in 2026, with the report still to be published ([SimpleX blog, August 2026](https://simplex.chat/blog/20260819-simplex-chat-crowdfunding.html)). No 2026 report was posted on its [security page](https://simplex.chat/security/) when we checked in October 2026.

**Signal**'s protocol has been studied in peer-reviewed research, including a formal security analysis published at IEEE EuroS&P 2017 ([IACR ePrint 2016/1013](https://eprint.iacr.org/2016/1013)) and the 2025 Triple Ratchet paper its new ratchet builds on ([IACR ePrint 2025/078](https://eprint.iacr.org/2025/078)). Signal says it modelled the new ratchet in the ProVerif tool and re-runs formal verification of its Rust code every time a developer pushes a change ([Signal blog, October 2025](https://signal.org/blog/spqr/)).

The two cover different ground. Signal's published work covers its protocols and, for the new ratchet, one code library. SimpleX's reviews covered one library in 2022 and its protocol designs in 2024.

---

## Servers and running your own

**Signal** is one central service. In 2016 Signal explained that it chose not to federate, arguing that federated protocols are too slow to change ([Signal blog, May 2016](https://signal.org/blog/the-ecosystem-is-moving/)). Its server code is published under an open-source licence ([GitHub](https://github.com/signalapp/Signal-Server)).

**SimpleX** works more like email: you choose which relay servers your app uses, including your own ([privacy policy](https://simplex.chat/privacy/#general-principles)). Since December 2024 the app has offered preset servers from two companies, SimpleX Chat Ltd and Flux ([SimpleX blog](https://simplex.chat/blog/20241210-simplex-network-v6-2-servers-by-flux-business-chats.html)). With more than one operator enabled, the app prefers to forward your messages through a different operator from the destination's, so the destination server can't tie your messages together ([privacy policy](https://simplex.chat/privacy/#private-message-delivery)).

To run your own, SimpleX publishes setup guides for its messaging and file servers ([SMP server](https://simplex.chat/docs/server.html), [XFTP server](https://simplex.chat/docs/xftp-server.html)). Three things to know:

- Your own server receives the messages sent to you. Your contacts choose the servers you send to ([privacy policy](https://simplex.chat/privacy/#private-message-delivery)).
- New servers apply to new contacts only. Existing contacts have to be switched one by one ([FAQ](https://simplex.chat/faq/#how-to-change-servers-to-my-own)).
- On iPhone, push notifications can only come through SimpleX Chat Ltd's servers for now ([privacy policy](https://simplex.chat/privacy/#general-principles)).

---

## Phone, computer and moving to a new phone

**Signal** lets you link up to 5 devices, including computers, tablets and phones, to your main phone. Linking can copy your chats and the last 45 days of media. Your phone has to come online at least once every 30 days, or the linked devices are unlinked ([Signal Support](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices)).

To move phones, Signal offers device-to-device transfer on the same platform and optional Secure Backups ([Signal Support](https://support.signal.org/hc/en-us/articles/10074659364122-Backups-and-Device-Transfers-on-Signal)). Secure Backups are end-to-end encrypted with a 64-character recovery key that Signal never sees. Text and the last 45 days of media are included; storing up to 100 GB of media costs $1.99 a month ([Signal Support](https://support.signal.org/hc/en-us/articles/9708267671322-Signal-Secure-Backups)).

**SimpleX** keeps each profile on one device. The desktop app can use your phone's profile, but both must be on the same local network, and on iPhone the app has to stay open. While the desktop app is using the profile, you can't use the phone app ([SimpleX blog, November 2023](https://simplex.chat/blog/20231125-simplex-chat-v5-4-link-mobile-desktop-quantum-resistant-better-groups.html)). SimpleX says it knows of no messenger that syncs one account across devices without weakening end-to-end encryption, and it has chosen to wait for a safer design ([FAQ](https://simplex.chat/faq/#why-cant-i-use-the-same-profile-on-different-devices)).

To move phones, you migrate the whole chat database by scanning a QR code on the new device ([SimpleX blog, March 2024](https://simplex.chat/blog/20240323-simplex-network-privacy-non-profit-v5-6-quantum-resistant-e2e-encryption-simple-migration.html)). If you delete the app with no backup, your contacts and messages are gone for good ([privacy policy](https://simplex.chat/privacy/#user-profiles)).

---

## Groups

**Signal** groups hold up to 1,000 members, with invite links and admin controls ([Signal Support](https://support.signal.org/hc/en-us/articles/360007319331-Group-chats)).

**SimpleX** groups are peer-to-peer. Your app sends each message to every member, which SimpleX calls "very costly for traffic and battery in large groups" ([SimpleX blog, January 2025](https://simplex.chat/blog/20250114-simplex-network-large-groups-privacy-preserving-content-moderation.html)). In April 2026 it said these groups "cannot scale to large audiences" ([channels overview, April 2026](https://github.com/simplex-chat/simplex-chat/blob/stable/docs/protocol/channels-overview.md)) and launched channels, in beta, for one-to-many publishing ([SimpleX blog, April 2026](https://simplex.chat/blog/20260430-simplex-channels-v6-5-consortium-crowdfunding-freedom-of-speech.html)). Channel posts travel through relays, and relay operators can read them, because public channel content isn't end-to-end encrypted ([channels overview](https://github.com/simplex-chat/simplex-chat/blob/stable/docs/protocol/channels-overview.md)).

---

## Getting your contacts to join

**Signal** checks your address book privately and shows which of your contacts already use it ([Signal Support](https://support.signal.org/hc/en-us/articles/360007061452-Does-Signal-send-my-number-to-my-contacts)). New contacts can reach you by number or username.

**SimpleX** can't do that, by design. For each new contact you share a one-time link or QR code, in person, on a video call or through another app, or you publish a reusable SimpleX address ([FAQ](https://simplex.chat/faq/#how-do-i-connect-to-people)). The link is safe to send over an insecure channel as long as that channel didn't swap it for another. You can check by comparing security codes in the app ([privacy policy](https://simplex.chat/privacy/#connection-links-privacy)).

---

## Who runs and pays for each

**Signal** is run by the Signal Foundation, a US 501(c)(3) nonprofit launched in 2018 with $50 million in funding from Brian Acton ([Signal blog, February 2018](https://signal.org/blog/signal-foundation/)). The app has no ads or tracking and is paid for by grants and donations ([Signal Support](https://support.signal.org/hc/en-us/articles/5286774014362-Cost-to-use-Signal)). In 2023 Signal estimated it would cost about $50 million a year to run by 2025 ([Signal blog, November 2023](https://signal.org/blog/signal-is-expensive/)).

**SimpleX** is built by SimpleX Chat Ltd, a UK company ([transparency report](https://simplex.chat/transparency/)), funded by private investors, venture capital and donations ([FAQ](https://simplex.chat/faq/#how-are-you-funded)). In 2024 it raised a $1.3 million pre-seed round led by Jack Dorsey ([SimpleX blog, August 2024](https://simplex.chat/blog/20240814-simplex-chat-vision-funding-v6-private-routing-new-user-experience.html)). Its 2026 equity crowdfunding is offered by SimpleX Chat, Inc., a Delaware company formed in February 2026 ([SEC filing](https://www.sec.gov/Archives/edgar/data/2140143/000214014326000004/0002140143-26-000004-index.htm)). SimpleX says it aims to be a profitable business paid for by its users, with the protocols governed by nonprofits ([SimpleX blog, March 2024](https://simplex.chat/blog/20240323-simplex-network-privacy-non-profit-v5-6-quantum-resistant-e2e-encryption-simple-migration.html)). Recent steps:

- **April 2026:** announced a consortium agreement with a new nonprofit, the SimpleX Network Foundation, to govern the protocols ([SimpleX blog](https://simplex.chat/blog/20260430-simplex-channels-v6-5-consortium-crowdfunding-freedom-of-speech.html)).
- **July 2026:** said the consortium was established, between the foundation and SimpleX Chat, Inc. ([SimpleX blog](https://simplex.chat/blog/20260722-simplex-public-names.html)).
- **August 2026:** equity crowdfunding, open to anyone, users included ([SimpleX blog](https://simplex.chat/blog/20260819-simplex-chat-crowdfunding.html)).
- **September 2026:** paid supporter badges in the beta app, which raise file-size limits ([SimpleX blog](https://simplex.chat/blog/20260919-simplex-supporter-badges.html)).

---

## Who should pick which

**Pick Signal if:**

- You want the people you already text to move over without swapping links.
- You use a computer or tablet alongside your phone.
- You're in large groups.
- You're comfortable with Signal holding your phone number, or you'll hide it from others with a username and the Nobody settings.

**Pick SimpleX if:**

- You don't want any account identifier on any server, not even a username.
- You want separate identities for different parts of your life, or a fresh random name for each contact.
- You want to run your own servers.
- You mostly talk one to one or in small groups, from one phone.

You can also install both apps and use each for different people.

If you use Android and pick Signal, [Molly](/directory/molly) is an independent, hardened version of the Signal app. It connects to Signal's servers, so you can chat with your Signal contacts ([Molly on GitHub](https://github.com/mollyim/mollyim-android)).

---

## FAQ

**Is SimpleX more private than Signal?**

By design, SimpleX servers hold less about you: no account and no user ID ([SimpleX privacy policy](https://simplex.chat/privacy/#introduction)), while Signal holds the phone number you registered ([Signal privacy policy](https://signal.org/legal/)). Both have metadata limits, covered above. For one-to-one chats, both use the double ratchet with post-quantum additions ([Signal blog](https://signal.org/blog/spqr/), [SimpleX blog, April 2024](https://simplex.chat/blog/20240426-simplex-legally-binding-transparency-v5-7-better-user-experience.html)). Signal gives you more convenience in return: contact discovery, linked devices and large groups.

**Does Signal still need a phone number?**

The regular app does ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number)). A username and the Nobody settings keep your number from other users ([Signal Support](https://support.signal.org/hc/en-us/articles/6712070553754-Phone-Number-Privacy-and-Usernames)). As of October 2026, an Android beta lets you register without a number for a one-time $2.99 fee ([Signal Support](https://support.signal.org/hc/en-us/articles/11197884108826-Phone-Numberless-Registration-for-Android-beta)).

**Can I use SimpleX on my phone and computer at the same time?**

Not both at once. The desktop app can use your phone's profile when both are on the same local network ([FAQ](https://simplex.chat/faq/#can-i-use-the-same-profile-on-desktop-do-messages-sync-cross-platform)), but you can't use the phone app while it does ([SimpleX blog, November 2023](https://simplex.chat/blog/20231125-simplex-chat-v5-4-link-mobile-desktop-quantum-resistant-better-groups.html)). Signal supports up to 5 linked devices per account ([Signal Support](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices)).

**Can I run my own SimpleX server?**

Yes. SimpleX publishes setup guides for its messaging and file servers ([SMP server](https://simplex.chat/docs/server.html), [XFTP server](https://simplex.chat/docs/xftp-server.html)). Your server receives the messages sent to you. To message others, your app still uses the servers they chose ([privacy policy](https://simplex.chat/privacy/#private-message-delivery)).

**Have Signal and SimpleX been audited?**

SimpleX has published two Trail of Bits reviews, from 2022 and 2024 ([security page](https://simplex.chat/security/)). It says a third, from 2026, is not yet published ([SimpleX blog, August 2026](https://simplex.chat/blog/20260819-simplex-chat-crowdfunding.html)). Signal's protocol has peer-reviewed security analysis and formal verification ([IACR ePrint 2016/1013](https://eprint.iacr.org/2016/1013), [Signal blog, October 2025](https://signal.org/blog/spqr/)).

**What data can Signal and SimpleX give to authorities?**

Signal says it can provide only the time an account registered and the last date it connected ([Signal](https://signal.org/bigbrother/)). SimpleX reports 12 law enforcement requests in 2025, with no responsive information identified or provided ([transparency report](https://simplex.chat/transparency/)).

**What happens if I lose my phone?**

On Signal, you can restore your messages with your 64-character recovery key only if you turned on Secure Backups beforehand. They're opt-in ([Signal Support](https://support.signal.org/hc/en-us/articles/9708267671322-Signal-Secure-Backups)). On SimpleX, your data lives only on your device. Set a database passphrase, which you need before you can export, then export your chat database regularly ([SimpleX docs](https://simplex.chat/docs/guide/managing-data.html)). Without a backup, your SimpleX contacts and messages are gone ([privacy policy](https://simplex.chat/privacy/#user-profiles)).

**Which is easier to get my family to use?**

Signal. It shows which of your contacts already use it ([Signal Support](https://support.signal.org/hc/en-us/articles/360007061452-Does-Signal-send-my-number-to-my-contacts)), while SimpleX needs a link or QR code for every new contact ([FAQ](https://simplex.chat/faq/#how-do-i-connect-to-people)).

---

## Keep reading

- [What still works after switching to GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos)
- [Signal in the directory](/directory/signal)
- [SimpleX Chat in the directory](/directory/simplex-chat)
- [Use Default Privacy in your AI assistant](/ai)
