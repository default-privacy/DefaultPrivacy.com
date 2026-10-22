---
title: "Email Aliases: SimpleLogin vs Addy, and How to Use Them"
slug: email-aliases-simplelogin-vs-addy
description: "An email alias is a throwaway address that forwards to your real inbox, so each site gets its own address. SimpleLogin and Addy are the two main alias services. Here is what each one's own documents say about limits, prices, ownership, open source and what the provider can see, plus how to set up and switch gradually."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - email alias
  - simplelogin
  - addy.io
  - anonaddy
  - firefox relay
  - hide my email
  - duckduckgo email protection
  - custom domain
  - spam
  - data breach
relatedGuides:
  - proton-mail-vs-tuta
  - was-my-phone-number-in-a-data-breach
  - privacy-where-to-start
relatedTools:
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Addy
    href: /directory/addy
  - name: Firefox Private Relay
    href: /directory/firefox-private-relay
  - name: Proton Mail
    href: /directory/proton-mail
  - name: Tuta
    href: /directory/tuta
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Proton Pass
    href: /directory/protonpass
  - name: Breach check
    href: /breach-check
  - name: Email security check
    href: /email-security
---

**Last checked: October 2026** · Each claim links to the provider's own site, policy or code. Prices and limits change, so check each pricing page before you pay.

An email alias is a second address that forwards to your real inbox. You give each website its own alias, so the site never learns your real address, and you can switch an alias off if it starts getting spam. [SimpleLogin](/directory/simplelogin) and [Addy](/directory/addy) are the two main alias services. Both are open source and both have a free plan, but the free plans are small, and the alias company still handles your mail on its way to you.

In our review of topic titles on the former Techlore privacy forum, SimpleLogin was among the most-named tools. This guide pairs with [Proton Mail vs Tuta](/guides/proton-mail-vs-tuta), which covers the inbox the aliases forward to.

## The Short Answer

An email alias is a second address that forwards to your real inbox, so each site gets its own. SimpleLogin and Addy are the two main services, and both are open source with small free plans.

1. Choose a service. Start free, or go straight to a paid plan if you want your own domain.
2. Add your real inbox as the destination, and turn on two-step login on the alias account.
3. Install the browser extension and test it with a harmless sign-up.
4. Move accounts gradually: new sign-ups first, then shops and newsletters, then banking and email last.

An alias does not make you anonymous.

---

## What an alias protects, and what it doesn't

An alias helps in four ways, which the services themselves give as their reasons to use one:

- **Your real address stays off the site.** Mail goes to the alias and is forwarded to you. You can reply without revealing your real address, as long as you reply from the inbox you added as the destination. On Addy, a reply sent from any other address just comes back to you as ordinary forwarded mail ([SimpleLogin](https://simplelogin.io/faq/); [Addy](https://addy.io/faq/)).
- **Spam is easy to stop.** If an alias starts getting junk, you deactivate or delete it ([Addy](https://addy.io/)).
- **You can see who leaked or sold your address.** With one alias per site, junk arriving at the "groupon" alias points at Groupon ([Addy](https://addy.io/faq/)).
- **A breach is less useful to attackers.** A different address on every site makes it harder to cross-reference your accounts ([Addy](https://addy.io/faq/)).

An alias does not make you anonymous. It points at your inbox, and the alias company knows where. Sites can still link you through your name, payment details, phone number or IP address. Treat an alias as a way to limit spam and cut the link between your accounts, not as a disguise.

### Why not just use the plus trick?

Gmail and some other providers let you add `+shop` to your address. SimpleLogin lists the downsides: you can't reply from the plus address, some sites refuse addresses with a `+`, and anyone can delete the `+` part to get your real address ([SimpleLogin](https://simplelogin.io/faq/)).

---

## What the alias company can see

Forwarding means your mail passes through the alias company's servers. Mail from a website arrives as ordinary email, so the alias company has to handle it before passing it on. What each one says it does with it:

- **SimpleLogin** says it doesn't store your emails. A message is deleted from its servers once it reaches your mailbox, and undeliverable mail is kept for 7 days. It says it can see metadata such as sender and recipient addresses, the subject and send times, and that it scans unencrypted incoming messages for spam and viruses. It doesn't keep permanent IP logs by default, and deletes server logs after 7 days ([SimpleLogin privacy policy](https://simplelogin.io/privacy/), updated September 2025).
- **Addy** says it stores an email only if delivery fails and you have switched that option on. It keeps web-server logs with IP addresses, rotated daily and kept for 3 days ([Addy privacy policy](https://addy.io/privacy/), updated September 2026; [Addy FAQ](https://addy.io/faq/)).

Both can encrypt forwarded mail with a PGP key you provide, so only you can read it in your inbox, including attachments ([SimpleLogin pricing](https://simplelogin.io/pricing/); [Addy FAQ](https://addy.io/faq/)). That protects the copy sitting in your mailbox, not the moment the message passes through the alias company. Neither forwarder is an end-to-end encrypted service.

---

## SimpleLogin vs Addy

| | SimpleLogin | Addy (addy.io) |
|---|---|---|
| Free plan | 10 aliases, 1 mailbox, reply from alias, unlimited bandwidth ([SimpleLogin](https://simplelogin.io/pricing/)) | Unlimited standard aliases, 10 active shared-domain aliases, 1 recipient, 10 MB bandwidth a month. Reply and send is paid only ([Addy](https://addy.io/)) |
| Paid plans | Premium: $36 a year or $4 a month, as of October 2026. Existing Premium subscribers keep their earlier $30 a year rate ([SimpleLogin](https://simplelogin.io/pricing/); [SimpleLogin blog](https://simplelogin.io/blog/), November 2024) | Lite: $1 a month billed yearly. Pro: $3 a month billed yearly, or $4 monthly ([Addy](https://addy.io/)) |
| Custom domains | Unlimited, on Premium ([SimpleLogin](https://simplelogin.io/pricing/)) | 1 on Lite, 20 on Pro ([Addy](https://addy.io/)) |
| Reply from an alias | Yes, free and paid ([SimpleLogin](https://simplelogin.io/pricing/)) | Paid only. 50 a day on Lite, 200 on Pro ([Addy](https://addy.io/)) |
| Start a new email from an alias | Premium ([SimpleLogin](https://simplelogin.io/pricing/)) | Paid plans ([Addy](https://addy.io/)) |
| PGP encryption | Premium ([SimpleLogin](https://simplelogin.io/pricing/)) | Bring your own key. Can also hide and encrypt the subject ([Addy](https://addy.io/)) |
| Open source | Yes, AGPL-3.0 ([GitHub](https://github.com/simple-login/app)) | Yes, AGPL-3.0 ([GitHub](https://github.com/anonaddy/anonaddy)) |
| Self-hosting | Yes. The repo's README has instructions ([GitHub](https://github.com/simple-login/app)) | Yes, with Postfix and a Docker image ([Addy FAQ](https://addy.io/faq/)) |
| Apps and extensions | Chrome, Firefox and Safari extensions, iOS and Android apps ([SimpleLogin](https://simplelogin.io/pricing/)) | Firefox, Chrome, Edge and Safari extensions, iOS and Android apps, both open source ([Addy](https://addy.io/)) |
| Who runs it | Proton AG ([SimpleLogin](https://simplelogin.io/privacy/)) | One developer, Will Browning, UK ([Addy FAQ](https://addy.io/faq/)) |
| Servers | Proton and UpCloud, in Germany, Switzerland, the Netherlands and France ([SimpleLogin](https://simplelogin.io/privacy/)) | Amsterdam with Greenhost, backup in Warsaw with UpCloud ([Addy FAQ](https://addy.io/faq/)) |

### Who owns them

SimpleLogin joined Proton in April 2022. Its founder wrote that it would stay open source and stay compatible with any email provider ([SimpleLogin blog](https://simplelogin.io/blog/simplelogin-join-proton/)). Its privacy policy now names Proton AG, registered in Switzerland, as the operator ([SimpleLogin](https://simplelogin.io/privacy/)). Since November 2024, Premium also includes Proton Pass premium features ([SimpleLogin blog](https://simplelogin.io/blog/)). That means one company can see your alias metadata and, if you use [Proton Mail](/directory/proton-mail), your inbox. Some people want that split across two companies.

Addy says it is independently run with no venture capital, paid for by subscriptions ([Addy FAQ](https://addy.io/faq/)). That keeps ownership simple, but it is one person. The FAQ says someone is in place to keep the servers and domains paid for if the developer is gone, without naming them, and that every Addy domain is registered for more than 5 years ahead ([Addy FAQ](https://addy.io/faq/)). That is the company's own statement, not something we have checked.

---

## Built-in alternatives

These come from companies you may already use. Each is simpler, with fewer controls.

- **Firefox Relay** (Mozilla). Free gives you 5 email masks, a browser extension and email tracker removal. Unlimited masks, replying anonymously and a Relay email domain are on paid plans, and Relay Premium is only available in a list of countries on that page ([Firefox Relay](https://relay.firefox.com/)). Mozilla says not to use masks for your bank, doctor or lawyer, or for mail where you must receive attachments, and to give those your true address ([Firefox Relay FAQ](https://relay.firefox.com/)). Mozilla says it doesn't read or store message content, and keeps undeliverable mail for at most three days ([Mozilla Relay privacy notice](https://www.mozilla.org/en-US/privacy/firefox-relay/)). The code is public ([GitHub](https://github.com/mozilla/fx-private-relay)). See [Firefox Private Relay](/directory/firefox-private-relay).
- **Apple Hide My Email.** Makes random addresses that forward to your inbox. Apple says it doesn't read or process the content except for standard spam filtering, and deletes messages from its relay servers after delivery, usually within seconds ([Apple](https://support.apple.com/en-us/105078)). We only verified the Sign in with Apple version of this feature, which is what that page describes.
- **DuckDuckGo Email Protection.** A free forwarding service that removes email trackers and lets you create unlimited private addresses ([DuckDuckGo](https://duckduckgo.com/duckduckgo-help-pages/email-protection/what-is-duckduckgo-email-protection/)).

Pick one of these if you want zero setup and live inside Firefox or Apple's ecosystem. Pick SimpleLogin or Addy if you want a custom domain, which is what lets you switch providers later.

---

## Set it up

1. **Choose a service.** Start on a free plan to see how it feels. If you plan to use your own domain, go straight to a paid plan, because both services put custom domains behind one. Read the lapsed-plan warning under "Limits to know about" before you rely on a custom domain.
2. **Add your real inbox as the destination.** Use an inbox you control, such as [Proton Mail or Tuta](/guides/proton-mail-vs-tuta). Turn on two-step login on the alias account too, since whoever gets into it can read the mapping between your aliases and your inbox. SimpleLogin supports TOTP and security keys ([SimpleLogin](https://simplelogin.io/pricing/)).
3. **Install the browser extension.** Both have one, so you can make an alias in a couple of clicks while signing up ([SimpleLogin](https://simplelogin.io/pricing/); [Addy](https://addy.io/)).
4. **Test it.** Make an alias, sign up to something harmless, and confirm the mail arrives. Then reply from the inbox you added as the destination, and check the recipient sees the alias, not your inbox.
5. **Optional: connect your password manager.** [Bitwarden](/directory/bitwarden)'s username generator has a "Forwarded email alias" type, so it can create aliases while you save a login ([Bitwarden](https://bitwarden.com/help/generator/)). [Proton Pass](/directory/protonpass) is bundled with SimpleLogin's plans ([SimpleLogin](https://simplelogin.io/pricing/)).

### A naming scheme that holds up

Name the alias after the site, not after you: `amazon`, `bank-main`, `newsletter-nyt`. Then a leak or sale is obvious from the address in the "To" line. On a shared domain, use random aliases for throwaway sites. Addy's FAQ notes that an alias tied to your username can be linked to your other aliases, so it suggests random aliases or separate usernames if that worries you ([Addy FAQ](https://addy.io/faq/)).

Keep a note, or let the alias dashboard hold it, of which alias belongs to which account. You will need it when a site asks for the email you signed up with.

---

## Move your existing accounts gradually

Don't change everything in one afternoon. A mistake on a bank or work account is hard to undo.

1. **Check what is already exposed.** Look up your current address with our [breach check](/breach-check). It doesn't see your email: it sends you to Have I Been Pwned, where you type it. Accounts that show up are the first to move. The same idea for a phone number is in [Was my phone number in a data breach?](/guides/was-my-phone-number-in-a-data-breach).
2. **Start with new sign-ups.** Every new account gets a fresh alias from today.
3. **Move the noisy ones next.** Shops, newsletters and forums. When a site's login email can be changed in settings, replace your real address with an alias.
4. **Move important accounts last.** Email, banking, health and anything that sends password resets. Before you change one, make sure you can still receive its mail, and keep the old address working for a few weeks.
5. **Retire the old address slowly.** Once the alias dashboard shows mail from a site, you can stop using the old address there. Keep the old address alive. You need it for resets until every account has moved.

---

## If your alias provider disappears

Aliases tied to a provider's own domains, such as `name@addy.io`, are gone if the provider is gone. Aliases on a domain you own are not, because you can point that domain at a new provider. This is the one reason to use a custom domain.

- **Buy a domain** from a registrar, add the DNS records your provider asks for, and create aliases on it. Addy lists them: a TXT record to verify ownership, an MX record to receive mail, and a few more to send ([Addy FAQ](https://addy.io/faq/)).
- **Use a subdomain, such as `mail.example.com`,** if the main domain already handles mail somewhere else. A domain can only send mail to one mail server at a time ([Addy FAQ](https://addy.io/faq/)).
- **To switch,** add the domain to the new provider, change the MX record, and recreate your aliases there. Catch-all, where any address on your domain is accepted, makes this easier because old addresses keep working.
- **After you set it up,** run your domain through our [email security check](/email-security). It reads the domain's public SPF, DKIM and DMARC records, which affect whether the mail you send from an alias is accepted, and gives an A to F grade. It can miss a DKIM record if your provider uses a different selector name, so treat a DKIM fail as a prompt to check, not as proof.

Be honest with yourself about the cost. A domain is something you must renew and keep the account for. If you lose control of it, someone else can receive mail sent to your old aliases, including password resets. Turn on auto-renew and two-step login at the registrar.

On a provider's domain, you rely on the provider's own plan for a shutdown. Addy says someone would keep it running and announce it ([Addy FAQ](https://addy.io/faq/)). We found no equivalent statement from SimpleLogin.

---

## Limits to know about

- **Banks and government.** Some institutions ask for your real contact details by law or policy. SimpleLogin says it uses aliases for its own business, tax and bank operations ([SimpleLogin FAQ](https://simplelogin.io/faq/)), but if an institution wants the address you are legally reachable at, give it. Aliases are for limiting spam and linkage, not for avoiding identity checks.
- **Free plans are small.** SimpleLogin's free plan stops at 10 aliases ([SimpleLogin](https://simplelogin.io/pricing/)). Addy's free plan stops at 10 active shared-domain aliases and 10 MB of bandwidth a month, and a cancelled paid plan drops custom domains and extra recipients ([Addy FAQ](https://addy.io/faq/)).
- **A lapsed paid plan can lose mail.** Addy says that when a paid plan ends, custom domains and aliases on paid-only domains are deactivated, and a deactivated alias silently discards mail with no bounce. Resubscribing within 90 days reverts this ([Addy FAQ](https://addy.io/faq/)). That can block password resets. Before you cancel or let a plan lapse, switch every account on a custom-domain alias back to a real address. SimpleLogin says aliases keep working after a plan ends, but you cannot create new ones past 10 ([SimpleLogin pricing](https://simplelogin.io/pricing/)).
- **One more company in the chain.** If the alias service fails, mail to your aliases can be delayed or lost. SimpleLogin says undeliverable mail is kept for 7 days and suggests a backup mailbox ([SimpleLogin FAQ](https://simplelogin.io/faq/); [privacy policy](https://simplelogin.io/privacy/)).
- **Your inbox is the weak point.** Every alias ends there. Protect that account first.

---

## FAQ

**What is the difference between SimpleLogin and Addy?**

Both forward mail from aliases to your inbox, both are open source, and both support custom domains and PGP. SimpleLogin is owned by Proton AG and lets you reply from an alias on the free plan. Addy is run by one developer, has lower-priced entry plans (Lite is $1 a month billed yearly, against SimpleLogin's $36 a year; Lite allows 1 custom domain and 50 replies a day, so compare features on both pricing pages) and keeps replying and custom domains behind a subscription ([SimpleLogin](https://simplelogin.io/pricing/); [Addy](https://addy.io/)).

**Is SimpleLogin owned by Proton?**

Yes. It joined Proton in April 2022, and its privacy policy names Proton AG as the operator ([SimpleLogin blog](https://simplelogin.io/blog/simplelogin-join-proton/); [privacy policy](https://simplelogin.io/privacy/)).

**Can the alias company read my email?**

It handles your mail as it forwards it. SimpleLogin says it doesn't store emails and can see metadata such as sender, recipient and subject ([SimpleLogin](https://simplelogin.io/privacy/)). Addy says it stores mail only after a failed delivery, if you enable that option ([Addy](https://addy.io/privacy/)). PGP protects the forwarded copy, not the hop into the service.

**Can I reply from an alias without revealing my real address?**

Yes. On SimpleLogin you reply from your inbox and it sends the reply from the alias ([SimpleLogin FAQ](https://simplelogin.io/faq/)). Addy does the same, but only on paid plans, and only when you reply from an address verified as a recipient on your account; otherwise the message just comes back to you ([Addy](https://addy.io/); [Addy FAQ](https://addy.io/faq/)).

**Do I need a custom domain?**

No, but it is the only way to switch providers without changing every account. Without one, your aliases live on the provider's domain.

**Can I self-host?**

Yes. Both publish their code under AGPL-3.0 with self-hosting instructions ([SimpleLogin](https://github.com/simple-login/app); [Addy](https://github.com/anonaddy/anonaddy)). You run the mail server yourself, which takes more care than it sounds.

**Are Firefox Relay, Hide My Email and DuckDuckGo good enough?**

For many people, yes. They do the main job: hide your address and stop spam ([Firefox Relay](https://relay.firefox.com/); [Apple](https://support.apple.com/en-us/105078); [DuckDuckGo](https://duckduckgo.com/duckduckgo-help-pages/email-protection/what-is-duckduckgo-email-protection/)). They are tied to one company's ecosystem and don't offer a custom domain that you can move.

**Can a bank or government accept an alias?**

Some will, but the decision is theirs. SimpleLogin says it uses aliases for its own bank and tax matters ([SimpleLogin FAQ](https://simplelogin.io/faq/)). If you must be reachable at a specific address, give your real one.
