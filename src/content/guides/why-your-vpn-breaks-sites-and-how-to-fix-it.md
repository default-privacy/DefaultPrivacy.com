---
title: "Why Your VPN Breaks Sites and Devices, and How to Fix It"
slug: why-your-vpn-breaks-sites-and-how-to-fix-it
description: "A VPN can cause CAPTCHAs, blocked sites, a printer that disappears, a second VPN that won't connect, and a DNS filter that stops working. Here is why each one happens, what to try, and what each fix costs you in privacy. Based on Mullvad, Proton VPN and Tailscale's own documentation."
category: Privacy
difficulty: intermediate
timeToComplete: "20 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - vpn
  - captcha
  - split tunneling
  - local network
  - tailscale
  - mullvad
  - proton vpn
  - dns
  - troubleshooting
relatedGuides:
  - mullvad-vs-proton-vpn
  - private-dns-and-ad-blocking
  - run-your-own-vpn-wireguard
  - privacy-where-to-start
relatedTools:
  - name: Mullvad VPN
    href: /directory/mullvad
  - name: Proton VPN
    href: /directory/protonvpn
  - name: Tailscale
    href: /directory/tailscale
  - name: NextDNS
    href: /directory/nextdns
---

**Last checked: October 2026** · Each claim links to the provider's own documentation. Menus change, so follow the linked page for current steps.

A VPN changes where your traffic appears to come from and who answers your DNS lookups. Most breakage comes from one of those two changes. Sites see a shared address and get suspicious, your home devices are no longer on the same network as your computer, or the VPN takes over the DNS settings you set yourself.

Each fix below has a privacy cost. The guide says what it is.

---

## Problem 1: CAPTCHAs and blocked sites

**Why it happens.** Each VPN server has one IP address, shared by everyone connected to it. If a website gets many requests from one address, it sometimes mistakes VPN users for bots or spammers and shows a CAPTCHA. Switching servers often and refreshing pages repeatedly can also look suspicious ([Proton VPN](https://protonvpn.com/support/avoid-captchas)).

**What to try, in order:**

1. Use a less crowded server. Proton VPN says servers with lower load mean fewer CAPTCHAs ([Proton VPN](https://protonvpn.com/support/avoid-captchas)).
2. Pick one server and stay on it. Don't change servers or refresh a page over and over ([Proton VPN](https://protonvpn.com/support/avoid-captchas)).
3. Clear your cookies, or try a private window, or turn off browser extensions, or try another browser ([Proton VPN](https://protonvpn.com/support/avoid-captchas)).
4. For a site that outright refuses VPNs, use split tunneling for that app (below).

### Split tunneling, and what it costs

Mullvad describes split tunneling as excluding some apps from the VPN so they use your regular internet connection and your own IP address. It says this can let you reach websites that block VPN services ([Mullvad](https://mullvad.net/en/help/split-tunneling-with-the-mullvad-app)). Mullvad includes it in its Windows, Linux, macOS and Android apps. Proton VPN also has a split tunneling feature ([Proton VPN](https://protonvpn.com/support/protonvpn-features/split-tunneling)).

The cost is stated plainly by Mullvad: traffic in the excluded apps does not go through the VPN, and your own IP address will be exposed ([Mullvad](https://mullvad.net/en/help/split-tunneling-with-the-mullvad-app)). So exclude one app, such as a banking browser, and not your whole system. Don't exclude an app you use for anything private.

On Windows, Mullvad says some other VPN apps can interfere with its split tunneling driver, and it lists Mozilla VPN, Amnezia VPN and Urban VPN. Uninstall them and restart if you see a driver error ([Mullvad](https://mullvad.net/en/help/split-tunneling-with-the-mullvad-app)).

---

## Problem 2: Your printer, TV or file server vanishes

**Why it happens.** With a VPN on, your computer sends its traffic through the tunnel. Devices on your home network, like a printer or media server, are not reachable that way unless the VPN lets local traffic through.

Proton VPN has a setting for this. When "Allow LAN connections" is on, connections to devices on your local network are not routed through the VPN tunnel, so your computer can reach printers, speakers and media servers. Proton says the setting is available on paid plans and is on by default ([Proton VPN](https://protonvpn.com/support/lan-connections)).

**The cost.** Local traffic is outside the tunnel, which is the point. On Android, Proton also offers a direct device connection that lets two devices connect over Wi-Fi without a router, for smart TVs, Android Auto and printers. It advises turning it on only when you connect to those devices ([Proton VPN](https://protonvpn.com/support/lan-connections)). The general rule is to leave local access on at home and think twice on a public network.

---

## Problem 3: Two VPNs won't run together

**Why it happens.** Two VPN apps both try to control your network traffic and can fight over it. Mullvad's Windows split-tunneling page names other VPN apps that conflict with its driver ([Mullvad](https://mullvad.net/en/help/split-tunneling-with-the-mullvad-app)).

**Tailscale and Mullvad in particular.** Before September 2023, customers had to choose one or the other. Mullvad then announced a partnership that lets Tailscale users send their outbound traffic through Mullvad's servers while still reaching their own devices over Tailscale. It works through the Tailscale app and is not available in the Mullvad VPN app ([Mullvad](https://mullvad.net/en/blog/tailscale-has-partnered-with-mullvad)). Tailscale's documentation says this is a beta feature, needs the Mullvad VPN add-on, and has limitations ([Tailscale](https://tailscale.com/kb/1258/mullvad-exit-nodes)). Read that page before relying on it.

---

## Problem 4: Your DNS filter stops working

**Why it happens.** If you set up NextDNS, Pi-hole or a similar filter, the VPN may replace it. By default, your DNS lookups are answered by your ISP, but when you use Proton VPN they usually go through its tunnel to be answered by Proton VPN ([Proton VPN](https://protonvpn.com/support/custom-dns)). Mullvad does the same: its app sends your DNS requests to its own non-logging resolver, and it says the app can't prevent DNS leaks if you use DNS over HTTPS or TLS ([Mullvad](https://mullvad.net/en/help/all-about-dns-servers-and-privacy)).

**Your options:**

- **Use the VPN's own blocker.** Proton VPN's NetShield blocks domains known for malware, ads and trackers at its DNS servers ([Proton VPN](https://protonvpn.com/support/netshield)). It is a paid-plan feature.
- **Use a custom DNS server in the VPN app.** Proton VPN's Custom DNS lets you choose a third-party resolver, available on paid plans. Proton says NetShield can't be used at the same time, and also won't work if your operating system is set to a third-party resolver ([Proton VPN](https://protonvpn.com/support/custom-dns)).
- **Pick one filter.** Running two layers of blocking is how sites break and you can't tell which layer did it. See [private DNS and ad blocking](/guides/private-dns-and-ad-blocking) for how to choose and how to allow a blocked name.

**The cost.** If you send DNS to a third party through the VPN, that third party sees the names you look up. Proton says queries to a third-party resolver appear to come from the VPN server's address, not yours ([Proton VPN](https://protonvpn.com/support/custom-dns)).

---

## A way to find the cause

Change one thing at a time, and test after each:

1. **Turn the VPN off.** If the problem goes away, the VPN is involved. If not, it's your network or the site.
2. **Turn on one thing.** Reconnect with no extras: no custom DNS, no ad blocker, no split tunneling.
3. **Change the server.** Try another server in the same country, then another country.
4. **Add features back one by one.** The one that brings the problem back is the cause.
5. **Flush your DNS cache** if a site still fails after a change. Proton VPN has instructions for each operating system ([Proton VPN](https://protonvpn.com/support/flush-dns-cache)).

---

## FAQ

**Why does my VPN show CAPTCHAs on almost every site?**

You share an IP address with everyone on that server, and sites treat busy addresses as likely bots. Try a server with less load and stay on it ([Proton VPN](https://protonvpn.com/support/avoid-captchas)).

**Is it safe to exclude one app from my VPN?**

It is safe for that app only if you accept that its traffic uses your real IP address. Mullvad's own page says so ([Mullvad](https://mullvad.net/en/help/split-tunneling-with-the-mullvad-app)). Don't exclude browsers or messengers you use for private things.

**Can I reach my printer while the VPN is on?**

Only if the VPN lets local traffic through. Proton VPN's Allow LAN connections setting does this ([Proton VPN](https://protonvpn.com/support/lan-connections)).

**Can I use Tailscale and Mullvad together?**

Yes, through Tailscale's Mullvad add-on, which sends your outbound traffic through Mullvad servers. It is a beta feature and needs the add-on ([Tailscale](https://tailscale.com/kb/1258/mullvad-exit-nodes)).

**Why doesn't my DNS filter work with the VPN on?**

The VPN usually answers your DNS lookups itself, so your own filter is skipped ([Proton VPN](https://protonvpn.com/support/custom-dns); [Mullvad](https://mullvad.net/en/help/all-about-dns-servers-and-privacy)). Use the VPN's blocker or its custom DNS setting instead of running both.

**Should I leave the VPN on all the time?**

That depends on why you use it. See [Mullvad vs Proton VPN](/guides/mullvad-vs-proton-vpn) for what a VPN does and doesn't protect, and [how to build your threat model](/guides/how-to-build-your-threat-model) to decide what you need.
