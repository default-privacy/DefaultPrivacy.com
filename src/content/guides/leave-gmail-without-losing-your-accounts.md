---
title: "How to Leave Gmail Without Losing Your Accounts"
slug: leave-gmail-without-losing-your-accounts
description: "Moving to a private email provider takes an afternoon. Moving every account that uses your Gmail address takes weeks. Here is the order that works: pick the new inbox, forward and copy your mail, re-point your logins one by one, and keep Gmail alive as a safety net."
category: Privacy
difficulty: beginner
timeToComplete: "1 hour to start, a few weeks to finish"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - gmail
  - email
  - switch email provider
  - email forwarding
  - proton mail
  - tuta
  - google takeout
  - email alias
relatedGuides:
  - proton-mail-vs-tuta
  - email-aliases-simplelogin-vs-addy
  - move-2fa-codes-to-a-new-app-or-phone
  - privacy-where-to-start
relatedTools:
  - name: Proton Mail
    href: /directory/proton-mail
  - name: Tuta
    href: /directory/tuta
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Proton Pass
    href: /directory/protonpass
  - name: Breach check
    href: /breach-check
---

**Last checked: October 2026** · Each claim links to the provider's own help page. Menus change, so follow the page for the current steps.

You don't leave Gmail in one step. You set up the new inbox, start forwarding, copy your old mail, and then change the email address on your accounts one at a time over a few weeks. Gmail stays alive in the background as a safety net, and you can close it last, or not at all.

This guide is the how-to for the move. For choosing the new inbox, see [Proton Mail vs Tuta](/guides/proton-mail-vs-tuta).

## The Short Answer

You leave Gmail slowly, and keep it as a safety net. Set up the new inbox first.

1. Create the new account. Turn on two-step login and save its recovery codes.
2. Forward new Gmail mail to it, and keep Gmail's copy at first.
3. Copy your old mail with the new provider's import tool or Google Takeout.
4. Change the email on your accounts one at a time. Start with money accounts. If an account says "Continue with Google", set a separate email-and-password login first.
5. Keep Gmail alive and sign in now and then. Google may delete an account unused for 2 years.

---

## Step 1: Pick the new inbox and an alias plan

Create the new account first, and turn on two-step login and save its recovery codes right away. See [how to move your 2FA codes](/guides/move-2fa-codes-to-a-new-app-or-phone) for the recovery-code habit.

Then decide how you will give out addresses from now on. If you use [aliases](/guides/email-aliases-simplelogin-vs-addy), every account you move gets its own alias that forwards to the new inbox. That way the next move is a setting change, not another migration.

---

## Step 2: Forward new mail

Gmail can forward all new messages to another address. In Gmail settings, under Forwarding, you add the address. Google then sends a verification link to that address, and you click it to confirm. After that, Gmail forwards every new message except spam. You choose whether Gmail keeps a copy, and Google recommends keeping Gmail's copy in the inbox ([Gmail Help](https://support.google.com/mail/answer/10957)).

You can also forward only some mail, by turning off automatic forwarding and using a filter for the senders you want ([Gmail Help](https://support.google.com/mail/answer/10957)). That is useful if you want to move one account at a time and keep the rest where it is.

Keep Gmail's copy at first. Forwarding is a convenience, not a backup.

---

## Step 3: Copy your old mail

Two routes, and you can use both:

- **Import into the new provider.** Proton's Easy Switch transfers emails, calendars and contacts from an external account into Proton Mail. It works with any provider that uses IMAP, and it runs in the background while you use your computer. Start it from Settings, then All settings, then Import via Easy Switch ([Proton Support](https://proton.me/support/easy-switch)). If you picked a different provider, look for its own import tool in its help pages before you assume one exists.
- **Download a copy yourself.** Google Takeout lets you export your email, documents, calendar and more as an archive you keep. Downloading does not delete anything from Google ([Google Account Help](https://support.google.com/accounts/answer/3024190)). Note that the file may not include changes made between when you request it and when it is created.

Treat a downloaded archive like a bank statement. It holds years of mail, including password-reset messages. Store it encrypted, and delete it when you no longer need it.

Before you leave, look at what Google has filed you under. My Ad Center shows the ad topics and brands it uses, and Google says its ads draw on details like your age and gender "that you've provided in your Google Account or that Google has estimated about you" ([My Ad Center Help](https://support.google.com/My-Ad-Center-Help/answer/12155656)). Leaving Gmail stops new mail feeding it. Your other Google accounts and activity still can.

---

## Step 4: Re-point your accounts, one at a time

This is the long step. Every account you made with your Gmail address needs a new email, or it keeps sending its mail, and its password resets, to Gmail.

1. **Make the list.** Start from your password manager's saved logins ([Bitwarden](/directory/bitwarden) or [Proton Pass](/directory/protonpass) both keep one). Then search Gmail for words like "welcome", "verify", "receipt" and "password" to find accounts you never saved.
2. **Check your exposure first.** Use our [breach check](/breach-check) on your Gmail address. It sends you to Have I Been Pwned, where you type the address yourself. Accounts that show up there are the first to move.
3. **Move the important ones first:** your bank, your phone account, anything with money, and your password manager. Then the shops, then the newsletters, then the rest.
4. **For each account:** log in, open its account or security settings, change the email address, and confirm the verification mail that arrives in the new inbox. Use a fresh alias for the address if you can.
5. **Check how the account signs in.** If it says "Continue with Google", set a separate email-and-password login on the site before you change anything, and use that site's help page for the exact steps.
6. **Update the recovery email too.** Many sites keep a second address for resets. If it is your Gmail, change it, or the reset mail still goes there.
7. **Cross it off.** Keep the list and mark each account done as it passes a test login.

Do a few each week. A mistake on a bank account is much harder to undo than a mistake on a newsletter.

---

## Step 5: Replying from the new address

You will want to send mail from the new address from now on. Gmail lets you send as another address, but Google says that starting January 2027 Gmail will no longer support "Send as" for third-party addresses such as Yahoo or Outlook ([Gmail Help](https://support.google.com/mail/answer/22370)). Don't build your setup around it. Send from the new provider's own app or web page.

---

## Step 6: Keep Gmail alive as a safety net

Don't delete Gmail when you finish. Some old account will always turn up, and the reset mail for it will still go there.

Google says it may delete a Google Account that has not been used or signed into for at least 2 years, including the Gmail inside it ([Google blog](https://blog.google/technology/safety-security/updating-our-inactive-account-policies/), May 2023). So the safety net only works if you sign in at least once in a while. Put a reminder in your calendar twice a year.

If you do decide to close Gmail later, first run the list one more time and check that nothing important still sends mail to it.

---

## FAQ

**Do I have to delete my Gmail account?**

No. Most people keep it as a forwarding address and a safety net, and sign in occasionally so it isn't deleted for inactivity ([Google blog](https://blog.google/technology/safety-security/updating-our-inactive-account-policies/)). Deleting is a separate decision for the end.

**Will forwarding keep working forever?**

It works as long as the Gmail account does, so keep the account active. You can turn it off at any time under Gmail's forwarding settings ([Gmail Help](https://support.google.com/mail/answer/10957)).

**What does Google keep after I download my data?**

Google says downloading your data does not delete it from Google's servers ([Google Account Help](https://support.google.com/accounts/answer/3024190)). Deleting the account is a separate action.

**Can I move my calendar and contacts too?**

Proton's Easy Switch can import calendars and contacts as well as email, depending on the provider ([Proton Support](https://proton.me/support/easy-switch)). Google Takeout can export your calendar ([Google Account Help](https://support.google.com/accounts/answer/3024190)).

**How long does the whole move take?**

The setup takes about an hour. Re-pointing accounts takes as long as you let it, and a few weeks is typical. There is no deadline except the one you set.

**What about accounts I can no longer log in to?**

Leave them. They will keep sending mail to Gmail, and that is one more reason to keep Gmail alive. If the account matters, use the site's account recovery while you still control the old address.
