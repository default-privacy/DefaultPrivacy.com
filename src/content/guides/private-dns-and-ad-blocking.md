---
title: "Private DNS and Network-Wide Ad Blocking: NextDNS, Control D or Pi-hole"
slug: private-dns-and-ad-blocking
description: "What your DNS provider can see, what encrypted DNS does and doesn't hide, and how to set up NextDNS, Control D, Pi-hole, AdGuard Home or Technitium on a phone, a computer and a router. Includes what each logs and what DNS blocking can't stop."
category: Privacy
difficulty: intermediate
timeToComplete: "20 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - dns
  - private dns
  - dns over https
  - ad blocking
  - nextdns
  - control d
  - pi-hole
  - adguard home
  - technitium
  - home network
relatedGuides:
  - privacy-where-to-start
  - run-your-own-vpn-wireguard
  - mullvad-vs-proton-vpn
  - how-to-build-your-threat-model
relatedTools:
  - name: NextDNS
    href: /directory/nextdns
  - name: Control D
    href: /directory/control-d
  - name: Pi-Hole
    href: /directory/pi-hole
  - name: AdGuard
    href: /directory/adguard
  - name: Technitium
    href: /directory/technitium
  - name: Quad9
    href: /directory/quad9
  - name: uBlock Origin
    href: /directory/ublock-origin
  - name: uBlock Origin Lite
    href: /directory/ublock-origin-lite
  - name: Mullvad
    href: /directory/mullvad
---

**Last checked: October 2026** · Each claim links to the vendor's or project's own page, or to a standard.

Your DNS provider sees the name of every site your devices look up. Switching to a private DNS service (NextDNS or Control D) or running your own (Pi-hole, AdGuard Home or Technitium) lets you choose who that is and block ad and tracker domains on every device at once. It does not hide the sites you visit from your internet provider, is not anonymity, and it can't remove ads that are served from the same domain as the content.

Home network, DNS and ad blocking was among the most asked topics on the former Techlore privacy forum. This guide covers what people kept asking.

---

## The Short Answer

Your DNS provider sees every site your devices look up. A private DNS service, or your own blocker, lets you choose who that is and block ad and tracker domains on every device. It is not anonymity.

1. Want it on phone and laptop anywhere, with little upkeep? Pick NextDNS or Control D.
2. Mostly care about home, with no company holding your logs? Self-host Pi-hole, AdGuard Home or Technitium. You handle updates.
3. Set it on each device or on the router, then check your provider's log or status page.
4. Start with one ad list. If a site breaks, allow the one blocked name.

## What DNS is and what your DNS provider can see

DNS is the phone book of the internet. When you open a site, your device asks a DNS server for the site's address. Control D describes the usual route as your device, then your router, then a DNS provider, which could be your internet provider or a third party such as Cloudflare or Google ([Control D](https://docs.controld.com/docs/getting-started.md)).

Ordinary DNS is sent in plain text. An observer on the path can read which sites you look up, and can alter the answers ([Pi-hole docs](https://docs.pi-hole.net/guides/dns/cloudflared/)). Whoever runs the resolver you point at sees every name you ask for. Choosing a DNS service moves that trust from your internet provider to someone else. It does not remove it. NextDNS says as much about running Pi-hole: your unblocked queries are still visible to whatever upstream DNS server Pi-hole forwards to ([NextDNS](https://help.nextdns.io/t/q6hmvay/what-is-the-advantage-of-using-nextdns-over-pi-hole)).

## What encrypted DNS does and doesn't hide

DNS over HTTPS (DoH) and DNS over TLS (DoT) wrap your lookups in encryption. That stops someone on the path from reading or tampering with them. The service you chose still sees them ([Pi-hole docs](https://docs.pi-hole.net/guides/dns/cloudflared/)). DoH travels on port 443 like ordinary web traffic, while DoT uses its own port, 853, which is easier to block ([NextDNS](https://help.nextdns.io/t/x2hmvas/what-is-dns-over-tls-dot-dns-over-quic-doq-and-dns-over-https-doh-doh3)).

Encrypted DNS does not hide where you connect:

- Your internet provider still sees the IP addresses you connect to. This is a limit of DNS privacy in general: DNS filtering is not anonymity. Cloudflare notes that a network observer can identify a site from its IP address, and that sharing an address with many other sites makes that guess much harder ([Cloudflare](https://blog.cloudflare.com/encrypted-client-hello/)).
- The server name in a normal HTTPS connection is also sent in the clear. Cloudflare describes the old TLS handshake as unintentionally leaky for this reason, and Encrypted Client Hello is a newer standard designed to close that gap ([Cloudflare](https://blog.cloudflare.com/encrypted-client-hello/)). The IETF's DNS privacy guidance lists the server name as one of the last cleartext identifiers of a connection target ([RFC 9076](https://www.rfc-editor.org/rfc/rfc9076.txt)).
- Without padding, the size and timing of encrypted messages can still be matched to unencrypted lookups upstream ([RFC 9076](https://www.rfc-editor.org/rfc/rfc9076.txt)).

Android's own help page puts it plainly: Private DNS secures only DNS questions and answers and can't protect anything else ([Google](https://support.google.com/android/answer/9654714)).

---

## Hosted or self-hosted

**Hosted** means a company runs the resolver and you point your devices at it.

- **NextDNS.** Apps and profiles for phones and computers, plus a dashboard for blocklists and logs. Its help center describes setup by app, by DoH or DoT, or by linking your home IP address ([NextDNS](https://help.nextdns.io/t/m1hmv0k/which-setup-type-to-use)). The free plan covers 300,000 queries a month. Past that limit it becomes a standard resolver with no filtering and no logging ([NextDNS](https://help.nextdns.io/t/p8hmvaw/what-happens-after-300k-queries)). [NextDNS in the directory](/directory/nextdns).
- **Control D.** Profiles with filters for ads, trackers and malware, applied to "endpoints" you create for each device or network ([Control D](https://docs.controld.com/docs/getting-started.md)). It also runs free community resolvers that need no account, with preset filters and no per-device settings ([Control D](https://docs.controld.com/docs/free-dns.md)). [Control D in the directory](/directory/control-d).
- **Quad9.** A public resolver that blocks connections to malicious domains ([Quad9](https://quad9.net/service/privacy/)). Its page describes malware blocking, not ad blocking. [Quad9 in the directory](/directory/quad9).
- **Mullvad's public DNS.** It offers ad, tracker and malware blocking options, but Mullvad says this public service ends on November 2, 2026 (page updated September 3, 2026) ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)). Its VPN is covered in [our VPN comparison](/guides/mullvad-vs-proton-vpn).

**Self-hosted** means software on a machine you control, such as a Raspberry Pi, a spare PC or a home server. Your devices ask that machine, which then asks an upstream resolver for anything it doesn't block.

- **Pi-hole.** A DNS sinkhole that blocks without client software. It runs on Alpine, Armbian, Debian, CentOS Stream, Fedora, Raspberry Pi OS and Ubuntu, needs about 512 MB of RAM and a fixed address for the machine ([Pi-hole docs](https://docs.pi-hole.net/main/prerequisites/)). [Pi-hole in the directory](/directory/pi-hole).
- **AdGuard Home.** Network-wide ad and tracker blocking that runs as a DNS server ([AdGuard Home](https://github.com/AdguardTeam/AdGuardHome)). AdGuard's own comparison table lists built-in encrypted upstream servers as an AdGuard Home feature and as something Pi-hole needs extra software for. That is the vendor's table, so check Pi-hole's current docs before relying on it ([AdGuard Home README](https://github.com/AdguardTeam/AdGuardHome#comparison-pi-hole)). The directory entry is for the [AdGuard](/directory/adguard) company, which also sells other products.
- **Technitium DNS Server.** Open source, runs on Windows, Linux, macOS and Raspberry Pi, blocks ads and malware from block list URLs, and can resolve names itself or forward over DoT, DoH or DoQ ([Technitium](https://github.com/TechnitiumSoftware/DnsServer)). [Technitium in the directory](/directory/technitium).

Self-hosting keeps your logs on your own hardware. It also makes you the one who patches it, keeps it running and decides what the upstream resolver is. Pi-hole's own docs warn that if the Pi-hole host uses Pi-hole as its upstream DNS server and Pi-hole fails, that host loses DNS resolution ([Pi-hole docs](https://docs.pi-hole.net/main/post-install/)). Our inference, not the docs' wording: other devices pointed at a Pi-hole that is down will lose DNS too. Our [self-hosted privacy homelab stack](/stacks/self-hosted-privacy-homelab) covers the wider setup.

One thing to know about Pi-hole's encrypted upstream: its guide for DoH through `cloudflared` carries a warning that Cloudflare deprecated the feature it relies on as of November 2025 and that new installs by that method are not recommended ([Pi-hole docs](https://docs.pi-hole.net/guides/dns/cloudflared/)).

---

## Set it up

### On a phone

- **Android.** Open Settings, then Network & internet, then Private DNS, choose "Private DNS provider hostname", enter the hostname and tap Save ([Google](https://support.google.com/android/answer/9654714)). A mistyped hostname, or a provider that shuts down, can leave the phone with no working internet. To undo it, go back to Settings, Network & internet, Private DNS and choose Automatic or Off (Google's page lists Off, Automatic and the hostname option). If you set Mullvad's public DNS as your Private DNS, switch it off before Mullvad discontinues that service on November 2, 2026 ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)). Your provider supplies the hostname. Control D's free Ads & Tracking resolver, for example, is listed as `p2.freedns.controld.com` ([Control D](https://docs.controld.com/docs/free-dns.md)). For NextDNS, copy the details from the setup tab of your account at [my.nextdns.io](https://my.nextdns.io).
- **iPhone and iPad.** Control D's setup downloads a `.mobileconfig` DNS profile in Safari, which you install from Settings under "Profile downloaded". Its advanced settings let you skip chosen Wi-Fi networks, such as your home network if the router already uses Control D, and bypass captive-portal sign-in pages ([Control D](https://docs.controld.com/docs/ios-platform.md)). NextDNS has an app, and its setup tab at [my.nextdns.io](https://my.nextdns.io) gives instructions for each platform ([NextDNS](https://help.nextdns.io/t/m1hmv0k/which-setup-type-to-use)).
- **Self-hosted at home.** Your phone only reaches Pi-hole, AdGuard Home or Technitium while it is on your home network, unless you add a VPN back home. NextDNS says the same limit is the main reason to choose a hosted service: it works on cellular and on other Wi-Fi networks through its apps ([NextDNS](https://help.nextdns.io/t/q6hmvay/what-is-the-advantage-of-using-nextdns-over-pi-hole)). To reach your own server away from home, see [running your own WireGuard VPN](/guides/run-your-own-vpn-wireguard).

### On a computer

- **Windows 11.** Control D documents `netsh` commands that register a DoH template and set the DNS address ([Control D](https://docs.controld.com/docs/platform-windows.md)). Control D also has a GUI setup utility ([Control D](https://docs.controld.com/docs/gui-setup-utility.md)).
- **macOS, Linux, Windows.** The NextDNS command-line client supports DoH on those systems, is open source, and needs your profile ID to install ([NextDNS CLI](https://github.com/nextdns/nextdns/wiki)). Control D offers an open source command-line daemon, `ctrld` ([Control D](https://docs.controld.com/docs/ctrld-1.md)).
- **Browsers can ignore your system setting.** Chrome and Firefox can switch on their own DoH, in which case your system DNS settings, and any blocking behind them, are skipped. Control D's fix is to turn the browser's Secure DNS off so it follows the system, or set your provider in the browser ([Control D](https://docs.controld.com/docs/browser-not-using-os-dns.md)). NextDNS says Firefox needs its strictest DoH mode (mode 3) so it never falls back to system DNS when a lookup is blocked ([NextDNS](https://help.nextdns.io/t/p8hmva1/why-is-mode-3-required-on-firefox)).

### On a router

Setting it on the router covers every device that uses the router's DNS, which can include smart TVs and anything you can't install an app on. Pi-hole's content blocking is described as working in "non-browser locations" such as ad-laden mobile apps and smart TVs ([Pi-hole](https://github.com/pi-hole/pi-hole)). One catch: a 2020 study of 220 US homes, using traffic from February 2018, found 68% of smart TVs accessing Google DNS, and the authors say many TVs use hard-coded Google DNS servers in place of the one the router hands out ([Mazhar and Shafiq](https://arxiv.org/pdf/2001.08288)). A router rule that redirects every outbound port-53 lookup to your blocker, plus blocking known public DNS servers, helps. LabZilla, which describes that setup, notes that encrypted DNS can still get past it ([LabZilla](https://labzilla.io/blog/force-dns-pihole)).

- **Pi-hole.** Before you change anything, write down your router's current DNS and DHCP settings. If the Pi-hole machine fails, putting those back (or switching the router's own DHCP back on) restores DNS for the household. After install, set your router's DHCP so clients use Pi-hole as their DNS server. If the router can't do that, turn off the router's DHCP and use Pi-hole's built-in DHCP server ([Pi-hole docs](https://docs.pi-hole.net/main/post-install/)). Install steps: [Pi-hole install docs](https://docs.pi-hole.net/main/basic-install/).
- **AdGuard Home.** Enter your AdGuard Home server's address in the router's DHCP/DNS settings. If your router won't take a custom DNS server, AdGuard Home can act as the DHCP server instead ([AdGuard Home setup](https://adguard-dns.io/kb/adguard-home/getting-started/)).
- **Technitium.** Install guide and docs are at [technitium.com/dns](https://technitium.com/dns/). Point the router's DNS at the machine as above.
- **Control D.** Most routers can't use DoH or DoT natively. If yours can, enter the resolvers there. Otherwise use Legacy DNS addresses, which suit a fixed home IP address, or install `ctrld` on supported routers such as OpenWrt, Asus Merlin, pfSense and OPNsense ([Control D](https://docs.controld.com/docs/routers-platform.md)).
- **NextDNS.** The plain-IP setup needs your home IP address linked to your profile, doesn't work behind carrier-grade NAT, and is not encrypted. The NextDNS app or CLI on a supported router encrypts it ([NextDNS](https://help.nextdns.io/t/m1hmv0k/which-setup-type-to-use)).

To check that a setup works, use something that doesn't depend on our site. Control D has a [status page](https://controld.com/status) that says whether you are using it ([Control D](https://docs.controld.com/docs/browser-not-using-os-dns.md)). With Pi-hole, open the admin interface and watch the query log while you load a page; your device's lookups should appear ([Pi-hole docs](https://docs.pi-hole.net/ftldns/privacylevels/)). NextDNS can show logs once logging is on ([NextDNS](https://help.nextdns.io/t/q6htmk9/how-to-download-logs)), as can Control D at the Full Analytics level ([Control D](https://docs.controld.com/docs/analytics-levels.md)). Then add a domain you don't use to your own denylist and confirm it no longer loads.

---

## Blocklists, and why they break sites

A DNS blocker answers "that name doesn't exist" for domains on its lists. Mullvad describes exactly this for its resolver ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)). The more domains a list blocks, the more likely it catches something a page needs to work.

- Control D's Ads & Trackers filter has three modes. Relaxed has the fewest false positives, Balanced is its recommended starting point, and Strict blocks every known ad and tracker domain "regardless of it breaking some websites" ([Control D](https://docs.controld.com/docs/ads-filter-modes.md)).
- NextDNS includes a newly registered domains list that blocks domains registered less than 30 days ago ([NextDNS](https://help.nextdns.io/t/q6hmvc6/i-found-a-domain-blocked-by-error)). Links in marketing emails and new shop pages are a common casualty.
- When a site breaks, find the blocked name in the log and allow it. Control D's Activity Log can turn a blocked query into a bypass rule, but only with Full Analytics on ([Control D](https://docs.controld.com/docs/false-positive-handling.md)). NextDNS shows which blocklist caused a block in its logs ([NextDNS](https://help.nextdns.io/t/q6hmvc6/i-found-a-domain-blocked-by-error)).

Start with one general ad and tracker list. Add more only when something stays unblocked. Each extra list is another thing that can break a checkout or a login.

---

## Logging and retention

Your DNS provider's log is a list of the sites you visited. This table comes from each service's own pages, checked October 2026 (the Pi-hole privacy-levels page is dated December 3, 2022). Settings change, so confirm in your account.

| Service | What it logs | Retention |
|---|---|---|
| NextDNS | Its privacy policy says: "If not specifically requested by the user, no data is logged." It also says you can choose what is logged, for how long and in which jurisdiction ([NextDNS privacy policy](https://nextdns.io/privacy)). Domain and client IP logging are separate options ([NextDNS](https://help.nextdns.io/t/q6htmk9/how-to-download-logs)). | Set by you ([NextDNS privacy policy](https://nextdns.io/privacy)). You can export or delete your data at any time ([NextDNS privacy policy](https://nextdns.io/privacy)). |
| Control D | Three levels per endpoint: no analytics, counts only, or full analytics with domains, times, source IP and destination IPs. Its docs state no default level ([Control D](https://docs.controld.com/docs/analytics-levels.md), [Control D](https://docs.controld.com/docs/analytics.md)). | Raw query logs 1 month. Other statistics 1 year, or until you delete them. Deletion can take up to 48 hours ([Control D](https://docs.controld.com/docs/analytics.md)). Its free community resolvers store no logs ([Control D](https://docs.controld.com/docs/free-dns.md)). |
| Pi-hole | Your own device holds the log. Privacy levels 0 to 3 go from level 0, "show everything", to anonymous mode, where the query log and long-term database are off ([Pi-hole docs](https://docs.pi-hole.net/ftldns/privacylevels/)). | You decide. Queries already hidden by a higher level can't be revealed by lowering it later ([Pi-hole docs](https://docs.pi-hole.net/ftldns/privacylevels/)). |

The self-hosted tools still send your unblocked lookups to an upstream resolver, and that company's logging policy applies to them. Pick the upstream deliberately, ideally one of the services above or a resolver whose policy you have read.

---

## What DNS blocking can't do

- **Ads served from the same domain as the content.** AdGuard's list of what a DNS blocker can't block includes YouTube and Twitch ads and sponsored posts on Facebook, Twitter and Instagram, and says any advertising that shares a domain with content can't be blocked at the DNS level ([AdGuard Home README](https://github.com/AdguardTeam/AdGuardHome#comparison-limitations)).
- **YouTube ads.** NextDNS says it is currently impossible to block them with DNS ([NextDNS](https://help.nextdns.io/t/g9hmvcq/why-cant-youtube-ads-be-blocked)). Mullvad says the same, and recommends the uBlock Origin browser extension for more ads and trackers ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)).
- **Hiding page elements.** A browser extension can remove the empty box where a blocked ad was. A DNS blocker can only stop the request.
- **Blocking on a browser that bypasses your DNS.** See the browser note above.

For the web browser, [uBlock Origin](/directory/ublock-origin) blocks inside the page. the Chrome Web Store removed the full version on August 31, 2026, Edge is mid-transition away from Manifest V2, and the Manifest V2 build is still on GitHub. The Manifest V3 version is [uBlock Origin Lite](/directory/ublock-origin-lite) ([uBlock Origin](https://github.com/gorhill/uBlock), [uBO Lite](https://github.com/uBlockOrigin/uBOL-home)). DNS blocking and a browser blocker work together and cover different things.

---

## DNS and a VPN do different jobs

A DNS service decides who answers your lookups and which domains get refused. A VPN sends your traffic through another server, so your internet provider sees the VPN connection, not the sites behind it. Neither replaces the other.

- Mullvad says that when you are already connected to its VPN, encrypted DNS adds little security, and the resolver on the VPN server is faster than an outside one ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)).
- If you use a VPN, its resolver is the one that should answer. Check your VPN app's DNS settings, and confirm the VPN provider's own resolver is the one in use according to its docs.
- If you want your own blocklists while on a VPN, check that your VPN app lets you set the DNS server. Control D has a "DNS Intercept Mode" for VPN software that fights it over DNS settings ([Control D](https://docs.controld.com/docs/dns-intercept.md)).

See [Mullvad vs Proton VPN](/guides/mullvad-vs-proton-vpn) and [run your own VPN with WireGuard](/guides/run-your-own-vpn-wireguard).

---

## Which one

- **You want it working on a phone and laptop wherever you are, with little upkeep.** A hosted service fits. NextDNS and Control D both document apps or profiles for phones and computers, per-device settings, and logs you can switch off or limit, as above.
- **You mostly care about the home network, including TVs and other devices with no apps, and you don't want a company holding your logs.** Self-host Pi-hole, AdGuard Home or Technitium on a machine that stays on. You take on updates, a fixed address for the server, and the choice of upstream resolver.
- **You mainly want fewer ads in the browser and don't want to set up a network service.** Start with [uBlock Origin](/directory/ublock-origin) or [uBlock Origin Lite](/directory/ublock-origin-lite). Add DNS filtering later if you want to cover other devices.

These can be combined. Not every reader needs all of them. Our [threat model guide](/guides/how-to-build-your-threat-model) helps decide how far to go.

---

## FAQ

**Does encrypted DNS stop my internet provider from seeing what sites I visit?**

No. It stops them reading your lookups. They still see the IP addresses you connect to, and normal HTTPS connections still send the server name in the clear ([Cloudflare](https://blog.cloudflare.com/encrypted-client-hello/)). A VPN changes who sees that traffic, because your provider then sees only the VPN connection.

**Is NextDNS or Control D more private?**

NextDNS's policy says "If not specifically requested by the user, no data is logged" ([NextDNS](https://nextdns.io/privacy)). Control D stores query domains only at the Full Analytics level, for up to a month ([Control D](https://docs.controld.com/docs/analytics.md)). You are trusting each company's word either way. Self-hosting removes that company, but your upstream resolver still sees unblocked lookups.

**Do I need a Raspberry Pi for Pi-hole?**

No. Pi-hole's docs list a minimum of 2 GB free space (4 GB recommended) and about 512 MB of RAM, and runs on any hardware with a supported operating system ([Pi-hole docs](https://docs.pi-hole.net/main/prerequisites/)). Technitium runs on Windows, Linux, macOS and Raspberry Pi ([Technitium](https://github.com/TechnitiumSoftware/DnsServer)).

**Why do some sites or links break after I turn on blocking?**

A blocked domain may be one the page needs, or a tracking link in an email. Lower the filter strength or allow the one blocked name. Control D's Strict mode is documented as willing to break sites ([Control D](https://docs.controld.com/docs/ads-filter-modes.md)).

**Can DNS blocking remove YouTube ads?**

No. NextDNS, Mullvad and AdGuard each say DNS blocking can't do it ([NextDNS](https://help.nextdns.io/t/g9hmvcq/why-cant-youtube-ads-be-blocked), [Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls), [AdGuard Home README](https://github.com/AdguardTeam/AdGuardHome#comparison-limitations)).

**Do I still need a DNS service if I use a VPN?**

Usually not. The VPN's own resolver should handle your lookups. Mullvad says encrypted DNS adds little when you are connected to its VPN ([Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)). Check your VPN app's DNS settings to confirm.

**What happens when NextDNS's free queries run out?**

Past 300,000 queries in a month it becomes a standard resolver with no filtering and no logging ([NextDNS](https://help.nextdns.io/t/p8hmvaw/what-happens-after-300k-queries)). Your lookups still go to NextDNS.

**How do I know my setup works?**

Look at your provider's side. Control D's [status page](https://controld.com/status) says whether you are using it ([Control D](https://docs.controld.com/docs/browser-not-using-os-dns.md)). With Pi-hole, watch the query log while you load a page. Or add a domain you don't use to your own denylist and confirm it stops loading.

---

## Keep reading

- [Where to start with privacy](/guides/privacy-where-to-start)
- [Run your own VPN with WireGuard](/guides/run-your-own-vpn-wireguard)
- [Mullvad vs Proton VPN](/guides/mullvad-vs-proton-vpn)
- [Self-hosted privacy homelab stack](/stacks/self-hosted-privacy-homelab)
