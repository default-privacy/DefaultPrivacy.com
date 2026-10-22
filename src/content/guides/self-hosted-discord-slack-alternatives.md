---
title: "Totally Private, Self-Hosted Discord or Slack Alternative?"
slug: self-hosted-discord-slack-alternatives
description: "Matrix with Element is the only option here whose private rooms are encrypted end to end by default, so even your own server can't read them. Rocket.Chat offers it as an opt-in; Zulip, Mattermost and Stoat keep readable text on your server. What each one encrypts, which have voice and video, licences, and what totally private honestly takes."
category: Privacy
difficulty: advanced
timeToComplete: "10 minutes"
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
author: Default Privacy
tags:
  - self-hosted chat
  - discord alternative
  - slack alternative
  - matrix
  - element
  - zulip
  - mattermost
  - rocket.chat
  - stoat
  - revolt
  - end-to-end encryption
relatedGuides:
  - signal-vs-simplex
  - run-your-own-vpn-wireguard
  - private-dns-and-ad-blocking
relatedTools:
  - name: Matrix
    href: /directory/matrix
  - name: Element
    href: /directory/element
  - name: Zulip
    href: /directory/zulip
  - name: Mattermost
    href: /directory/mattermost
  - name: Rocket.Chat
    href: /directory/rocket-chat
  - name: Stoat (formerly Revolt)
    href: /directory/stoat
  - name: Snikket
    href: /directory/snikket
---

**Last checked: October 2026** · Each claim links to the project's own docs or code. General information, not legal advice.

If you want a Discord or Slack replacement where even your own server can't read the messages, use Matrix with the Element app. Of the options here it is the one whose private rooms are encrypted end to end by default, meaning only the people in the chat can read them. Zulip, Mattermost and Stoat keep readable text on your server, and so does Rocket.Chat unless you turn on its optional encrypted rooms. Self-hosting moves the trust from a company to you. It does not make a chat "totally private" by itself.

---

## Two kinds of "private"

- **Private from the company.** You run the server, so Slack or Discord never sees the chat. Every option below does this.
- **Private from the server.** Messages are scrambled on your device and only the people in the chat can unscramble them. Then a hacked or seized server still has no readable text. Few of these do this.

Zulip's own security docs say it plainly: whoever controls the server can read messages, because the server needs the text to do things like search the whole history ([Zulip security model](https://zulip.readthedocs.io/en/10.2/production/security-model.html)). If you are the only admin, that person is you, so it may be fine. It matters when someone else can get into the machine.

---

## The options side by side

| | Messages encrypted end to end? | Voice and video | Licence |
|---|---|---|---|
| [Matrix](/directory/matrix) + [Element](/directory/element) | Yes in private rooms, by default in Element | Element Call, needs an extra LiveKit server | Synapse server: AGPL or paid; Element Web: AGPL, GPL or paid |
| [Zulip](/directory/zulip) | No (only push notifications) | Adds a call link using Jitsi, Zoom and others | Apache 2.0 |
| [Mattermost](/directory/mattermost) | No end-to-end option found in its docs | Calls, not end to end | Open core: MIT builds, AGPL source, paid editions |
| [Rocket.Chat](/directory/rocket-chat) | Optional, direct messages and private rooms | Jitsi or BigBlueButton on the free Community plan | MIT, except a paid "ee" folder |
| [Stoat](/directory/stoat) (formerly Revolt) | No | Voice via LiveKit in the self-host setup | AGPL |
| [Snikket](/directory/snikket) | Yes, per its site (we could not confirm group chats) | Audio and video calls | Open source |

Sources for each row are in the sections below.

---

## Matrix and Element

Matrix is the chat protocol. Synapse is the most common server and Element is the main app. Rooms look like Discord channels and Slack workspaces, and Element groups them into Spaces.

- **Encryption.** Element says it uses end-to-end encryption by default ([Element](https://element.io/en/features/end-to-end-encryption)). The Matrix spec says encrypted rooms are not decryptable or interceptable on any participating server ([Matrix spec](https://spec.matrix.org/latest/client-server-api/#end-to-end-encryption)). Element also lets you create unencrypted rooms, so check the lock on each room.
- **Voice and video.** Element Call runs on LiveKit and is end-to-end encrypted ([Element Call](https://github.com/element-hq/element-call)). If you run Synapse yourself, each deployment needs its own LiveKit server for calls ([Element Call](https://github.com/element-hq/element-call)). That is the hardest part of the setup.
- **Licence.** Synapse is free under the AGPL, or you can buy a commercial licence from Element ([Synapse](https://github.com/element-hq/synapse)). Element Web is offered under the AGPL, the GPL or a paid licence ([Element Web](https://github.com/element-hq/element-web)). Element also sells a paid server bundle, ESS Pro, and has a free ESS Community bundle for small to mid-sized, non-commercial use ([Synapse README](https://github.com/element-hq/synapse)).
- **The catch.** Encryption covers the message text, not the envelope. The server still sees who sent an event, because `sender` stays in the clear on encrypted events ([Matrix spec](https://spec.matrix.org/latest/client-server-api/modules/end_to_end_encryption/)). Expect it to also know room members and timing. We did not find a primary Matrix source listing every field, so treat that as likely, not proven.

---

## Zulip

Best Slack replacement here if you want threaded conversations. Every message belongs to a topic, which keeps busy channels readable.

- **Encryption.** Messages are not end-to-end encrypted. Zulip's end-to-end encryption covers push notification content only, so Apple, Google and Zulip's push service can't read it ([Zulip security](https://zulip.com/security/)).
- **Voice and video.** Zulip puts a call link in your message and uses the call provider your admin chose, such as Jitsi or Zoom ([Zulip help](https://zulip.com/help/start-a-call)). By default that is Jitsi Meet, and admins can point it at their own Jitsi ([Zulip help](https://zulip.com/help/configure-call-provider)). It is not a Discord-style voice channel.
- **Licence.** Apache 2.0 ([Zulip README](https://github.com/zulip/zulip)).

---

## Mattermost

Built for companies, Slack-like. Check what you get for free.

- **Encryption.** Mattermost says it does not encrypt inside the database, so that search and compliance reports keep working. It relies on disk encryption instead ([Mattermost docs](https://docs.mattermost.com/deployment-guide/encryption-options)). We found no end-to-end option for messages in its docs.
- **Voice and video.** Calls and screen sharing exist, but Mattermost says calls are not end to end encrypted because all media goes through the Mattermost server ([Mattermost docs](https://docs.mattermost.com/end-user-guide/collaborate/make-calls)).
- **Licence.** Mattermost calls itself open core and releases compiled MIT builds monthly ([Mattermost README](https://github.com/mattermost/mattermost)). If you build from source, the code is AGPL or a paid commercial licence ([Mattermost licence](https://github.com/mattermost/mattermost/blob/master/LICENSE.txt)).

---

## Rocket.Chat

- **Encryption.** It supports end-to-end encryption for private rooms and direct messages, once an admin turns it on. Encrypted messages don't show in search, can't be audited, and bots may not be able to read them ([Rocket.Chat docs](https://docs.rocket.chat/docs/configure-e2e-encryption)). It is not available for public channels ([Rocket.Chat docs](https://docs.rocket.chat/docs/end-to-end-encryption-user-guide)).
- **Voice and video.** The free Community plan lists Jitsi and BigBlueButton for video calls ([Rocket.Chat plans](https://docs.rocket.chat/docs/our-plans)).
- **Licence.** MIT, except files in the `ee` folders, which fall under a separate paid licence ([Rocket.Chat licence](https://github.com/RocketChat/Rocket.Chat/blob/develop/LICENSE)). The Community plan is capped at 100 concurrent users and core messaging ([Rocket.Chat plans](https://docs.rocket.chat/docs/our-plans)).

---

## Stoat (formerly Revolt)

The closest to Discord in look and feel: servers, channels, roles.

- **Encryption.** Messages are not end-to-end encrypted today. A team member wrote in September 2026 that the plan is to add it using OpenMLS ([Stoat issue 1009](https://github.com/stoatchat/stoatchat/issues/1009)). Until then, assume the server can read everything.
- **Voice and video.** The self-hosting setup includes a LiveKit server for voice ([Stoat self-hosted](https://github.com/stoatchat/self-hosted)).
- **Licence.** The backend is AGPL, though individual parts may carry their own licences ([Stoat backend](https://github.com/stoatchat/stoatchat)). If you modify it and run it in production, you must publish your changes ([Stoat FAQ](https://developers.stoat.chat/faq)).
- **Limits.** The self-hosting guide says most official apps don't support self-hosted servers yet, and the web app works well ([Stoat self-hosted](https://github.com/stoatchat/self-hosted)).

---

## Also worth knowing: Snikket

[Snikket](/directory/snikket) is a small-group option for family and friends. It says its app uses end-to-end encryption and supports audio and video calls, and that it needs no phone number ([Snikket](https://snikket.org/features/)). Its FAQ answers "yes and no" to whether a Snikket server is like a Discord server, and groups within one instance are "circles" ([Snikket FAQ](https://snikket.org/faq/)). Each Snikket server hosts a single domain ([Snikket FAQ](https://snikket.org/faq/)), so it suits a family or friend group more than a big public community.

---

## What "totally private" honestly takes

- **You hold the server.** Whoever has root on it can read anything the server can read. Put it somewhere only you control, and lock down who can log in.
- **Pick end-to-end for anything sensitive.** On Zulip, Mattermost and Stoat, a stolen database dump means readable chats. For that reason, Matrix or Rocket.Chat's encrypted rooms are the choice if the content is sensitive.
- **Metadata lives on your server.** Even with encryption, the server sees who sent each message ([Matrix spec](https://spec.matrix.org/latest/client-server-api/modules/end_to_end_encryption/)) and, in practice, which room and when. That is yours to protect.
- **Federation leaks.** Matrix servers share rooms with each other. Synapse recommends turning federation off with an empty `federation_domain_whitelist` if you don't want it ([Synapse docs](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html#federation_domain_whitelist)). Other servers keep their own copy of anything they receive.
- **Backups.** Synapse's docs call good backups critical ([Synapse backups](https://element-hq.github.io/synapse/latest/usage/administration/backups.html)). Encrypt them, because a backup of a Zulip or Mattermost database is readable text. Matrix's end-to-end keys live on your devices. Key backup stores encrypted copies of them on the server ([Matrix spec](https://spec.matrix.org/latest/client-server-api/modules/end_to_end_encryption/)); without a backup or another logged-in device, you may not be able to read old messages.
- **Updates.** Chat servers face the internet and get security fixes. Zulip's 12.3 release in September 2026 fixed a critical issue and three others ([Zulip blog](https://blog.zulip.com/2026/09/21/zulip-server-12-3-security-release/)). Stoat's self-hosting guide lists its own security advisories ([Stoat self-hosted](https://github.com/stoatchat/self-hosted)). Plan to patch.
- **Your IP and your host.** A server in your home exposes your home address. A cloud server means the host can see the machine. Neither is private by default.

---

## Which one for whom

| You want | Pick | Watch out for |
|---|---|---|
| Messages the server can't read | Matrix + Element | Voice needs extra setup, metadata still visible |
| Slack for a team, threads | Zulip | Server can read everything |
| Slack with company features | Mattermost | Paid editions, no end-to-end option found |
| Encrypted option inside a Slack-like tool | Rocket.Chat | Encrypted rooms lose search and bots |
| Closest to Discord | Stoat | No encryption, app support for self-hosting is limited |
| Family and friends, simple | Snikket | One domain per server |

---

## FAQ

**Is there a self-hosted Discord alternative that is end-to-end encrypted?**

Matrix with Element is the main one. Private rooms are encrypted by default in Element, and calls are encrypted too ([Element](https://element.io/en/features/end-to-end-encryption); [Element Call](https://github.com/element-hq/element-call)). Stoat, the closest to Discord in feel, has no end-to-end encryption yet.

**Is self-hosting more private than Signal?**

Not necessarily. You trade a company's trust for your own ability to run and patch a server. See [Signal vs SimpleX](/guides/signal-vs-simplex) for apps that need no server of yours.

**Can the server admin read my messages?**

On Zulip, yes: anyone with control of the server can read them ([Zulip security model](https://zulip.readthedocs.io/en/10.2/production/security-model.html)). In Matrix encrypted rooms, no ([Matrix spec](https://spec.matrix.org/latest/client-server-api/#end-to-end-encryption)), though they can still see metadata.

**Is open source the same as free?**

No. Mattermost and Rocket.Chat keep some features in paid editions ([Mattermost](https://github.com/mattermost/mattermost); [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat/blob/develop/LICENSE)). Synapse is also sold under a commercial licence ([Synapse](https://github.com/element-hq/synapse)).

**Can I run Matrix without federation?**

Yes. Synapse documents an empty `federation_domain_whitelist` as the way to turn it off ([Synapse docs](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html#federation_domain_whitelist)).

**Which one is easiest to set up?**

We haven't tested installs, so we can't rank them. Matrix voice and video is the part its own guides treat as extra work. Snikket says its server software can be easily self-hosted ([Snikket](https://snikket.org/features/)).

---

## Keep reading

- [Signal vs SimpleX](/guides/signal-vs-simplex)
- [Run your own VPN with WireGuard](/guides/run-your-own-vpn-wireguard)
- [Private DNS and ad blocking](/guides/private-dns-and-ad-blocking)
