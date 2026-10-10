---
title: "How to Live Privately: Elliot Alderson"
slug: how-to-live-privately-elliot-alderson
description: "Elliot Alderson encrypts what he keeps, destroys what he's finished with and trusts no device. Here is each of his Mr. Robot habits beside a legal version you can copy this week."
category: Privacy
difficulty: beginner
timeToComplete: "14 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - live privately
  - mr robot
  - elliot alderson
  - threat model
  - encryption
  - password manager
  - two-factor authentication
  - tor
  - stalkerware
relatedGuides:
  - how-to-live-privately-jack-reacher
  - remove-name-from-data-brokers
relatedTools:
  - name: Bitwarden
    href: /directory/bitwarden
  - name: VeraCrypt
    href: /directory/veracrypt
  - name: Ente Auth
    href: /directory/ente-auth
  - name: YubiKey
    href: /directory/yubikey
  - name: Tor Browser
    href: /directory/tor-browser
  - name: Tails
    href: /directory/tails
---

**Published 2026-10-09 · Last checked: October 2026 · General information, not legal advice**

Elliot Alderson, the hacker at the center of Sam Esmail's *Mr. Robot* ([GeekWire](https://www.geekwire.com/2016/mr-robot-creator-sam-esmail-interview/)), treats every device he owns as something that could be used against him. Most of what he does to other people is illegal, and his precautions are built for someone who fears getting caught. Turned around, his habits and his victims' mistakes make a practical checklist, so each one below comes with a second half: the legal version you can copy this week.

*Default Privacy is not affiliated with or endorsed by Mr. Robot's creators, USA Network or NBCUniversal. We use the character as commentary. Light spoilers for seasons 1 and 3.*

---

## The habits

### 1. He builds everything around one fear

**What Elliot does:** His precautions assume that one day someone will search his apartment and his computers. Reviewing season 3, episode 8 for GeekWire, security executive Corey Nachreiner pointed out that the files Elliot keeps on people he has hacked would count as evidence if he were ever caught, and that his hiding method meant anyone who found them would see only music ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)).

**The legal version you can copy this week:** For most people the threats are ordinary: a scammer after your bank login, a data broker selling your address, a thief with your laptop, or someone at home who knows your passcode. Spend ten minutes on the Electronic Frontier Foundation's [security plan](https://ssd.eff.org/module/your-security-plan) (last reviewed October 2023). Write down what you want to protect, who you want to protect it from, how bad it would be if you failed, how likely that is, how much effort you're willing to spend, and who can help you. Then pick the habits below that answer your list and skip the rest.

**Why it matters:** A plan tells you which precautions are worth the effort for you. Without one, you either do nothing or copy someone else's paranoia.

### 2. He encrypts what he keeps

**What Elliot does:** He burns his files, along with real music, to CDs labeled like albums ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)). For a scene at the end of season 1, episode 8, the show's chief technical adviser, Kor Adana, used a real program called DeepSound, and described Elliot as "encrypting and hiding" images inside an audio track on a CD ([Rolling Stone](https://www.rollingstone.com/culture/culture-news/mr-robot-four-of-the-shows-best-hacks-explained-180924/)).

**The legal version you can copy this week:** You don't need to hide files inside songs. Encryption does the protecting. Start with the whole disk. Macs with Apple silicon or a T2 chip encrypt data automatically, and turning on FileVault means nobody gets at the data without your login password. On older Macs without either chip, FileVault is what encrypts the disk in the first place. When you turn it on, let your iCloud account unlock the disk or keep the recovery key somewhere other than the Mac. Apple warns that if you forget your password and lose the key, your files are lost for good ([Apple](https://support.apple.com/guide/mac-help/protect-data-on-your-mac-with-filevault-mh11785/mac)). On Windows, Device Encryption turns on when you set up the PC with a Microsoft account; check it under Settings > Privacy & security > Device encryption ([Microsoft](https://support.microsoft.com/en-us/windows/device-encryption-in-windows-cf7e2b6f-3e70-4882-9532-18633605b7df)), and keep a copy of the recovery key somewhere safe. For a folder of sensitive documents, [VeraCrypt](/directory/veracrypt) creates an encrypted virtual disk inside a single file ([VeraCrypt](https://veracrypt.io/en/Home.html)), and [Cryptomator](/directory/cryptomator) encrypts files on your device before they reach a cloud drive ([Cryptomator](https://cryptomator.org/)).

**Why it matters:** A stolen laptop with an encrypted disk costs you the hardware. Without encryption, it costs you every file on it.

### 3. He destroys hardware he's finished with

**What Elliot does:** In season 1, episode 2, afraid an E Corp executive could use his latest hack against him, Elliot microwaves his chips and SIM cards and tears apart his hard drive and motherboard ([Avast](https://blog.avast.com/2015/07/07/mr-robot-review-ones-and-zer0s/)). In season 3 he repeats the routine: he securely deletes his files, drills through his hard drive and snaps his memory chips ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)).

**The legal version you can copy this week:** To sell, donate or recycle a device, use its built-in erase. On an iPhone, back up, sign out of iCloud, then use Erase All Content and Settings ([Apple](https://support.apple.com/en-us/109511)). A Mac with Apple silicon or a T2 chip running macOS Monterey or later has the same option ([Apple](https://support.apple.com/en-us/102773)). On Android, back up and run a factory reset, which erases all your data ([Google](https://support.google.com/android/answer/6088915)). On a Windows PC, use Reset this PC, choose Remove everything and turn on Clean data, the option Microsoft recommends if you plan to donate, recycle or sell the PC ([Microsoft](https://support.microsoft.com/en-us/windows/reset-your-pc-0ef73740-b927-549b-b7c9-e6f2b48d275e)). Take out the SIM card and any memory card before the device leaves your hands.

**Why it matters:** Whatever is still on a device when you hand it over goes with it.

### 4. He guesses passwords from what people share

**What Elliot does:** In the first episode he gets into his therapist's accounts because her password is her favorite singer plus her birth year written backwards. Kaspersky's write-up of the episode notes that he only needs to know a little about a person, or read what they post publicly ([Kaspersky](https://www.kaspersky.com/blog/mr-robot-safety-tips/19713/)).

**Don't copy this part.** Getting into someone else's account without permission can be a federal crime in the US ([18 U.S.C. § 1030](https://www.law.cornell.edu/uscode/text/18/1030)).

**The legal version you can copy this week:** Make every password something nobody could research. The Cybersecurity and Infrastructure Security Agency (CISA) says a strong password is at least 16 characters, random and different for every account, and it names birthdays and pet names as unsafe ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)). A password manager generates and fills those passwords in, so you only have to remember one ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)). [Bitwarden](/directory/bitwarden) and [KeePassXC](/directory/keepass-xc) are two options. Which password manager to pick was among the most discussed questions on the former Techlore privacy forum. Change the most exposed passwords first: the [breach check](/breach-check) shows whether your email appeared in known data breaches.

**Why it matters:** A password built from your life can be guessed by anyone who reads about your life. A random one can't.

### 5. He calls pretending to be the bank

**What Elliot does:** In the same episode, he asks the therapist's boyfriend if he can borrow his phone to make a call, and calls himself to get the man's number. Then he rings him posing as the bank, gets him to confirm his address and answer his security questions, and uses what he learns to guess the man's password ([Kaspersky](https://www.kaspersky.com/blog/mr-robot-safety-tips/19713/), [Avast](https://blog.avast.com/what-consumers-can-learn-about-cybersecurity-from-season-one-of-mr-robot)).

**Don't copy this part.** Posing as someone's bank to get their account information out of them is illegal under US federal law ([15 U.S.C. § 6821](https://www.law.cornell.edu/uscode/text/15/6821)).

**The legal version you can copy this week:** When someone calls "from your bank", hang up and call the number on the back of your card. The Federal Trade Commission gives the same advice: hang up, don't give personal or financial information to unknown callers, and call a number you know is real, because scammers can make any name or number appear on caller ID ([FTC](https://consumer.ftc.gov/articles/phone-scams), August 2023). Treat security questions as extra passwords. Give a random answer and store it in your password manager, so nothing you post or say on the phone can answer them ([EFF](https://ssd.eff.org/module/creating-strong-passwords)). The less about you is public, the less a caller has to work with: [the data broker removal guide](/guides/remove-name-from-data-brokers) walks through the opt-outs.

**Why it matters:** Security questions can reset your password, so their answers deserve the same protection as the password itself.

### 6. Two-factor login stops him until the phone is left alone

**What Elliot does:** In season 1, episode 8, Elliot already knows his boss's password ([GeekWire](https://www.geekwire.com/2015/geekwire-radio-behind-the-scenes-of-mr-robot-understanding-the-tools-and-tactics-of-a-hacker/)) but can't log in as him without a one-time code from his boss's phone. He only gets the code after arranging for the phone to be left unattended. GeekWire's reviewer called the show's portrayal of the codes, including their short time limit, accurate ([GeekWire](https://www.geekwire.com/2015/mr-robot-rewind-mostly-accurate-tech-in-a-mind-blowing-episode-8/)).

**The legal version you can copy this week:** CISA's advice is to turn on two-factor login for every account that offers it ([CISA](https://www.cisa.gov/secure-our-world/turn-mfa)). Start with your email and your bank. An authenticator app is safer than text messages because its codes can't be stolen with a SIM swap, and a security key such as [YubiKey](/directory/yubikey) is the strongest option ([FTC](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts)). [Ente Auth](/directory/ente-auth) runs on phones and computers and keeps an end-to-end encrypted backup of your codes ([Ente](https://ente.com/auth/)); [Aegis Authenticator](/directory/aegis-authenticator) is an open-source option for Android ([Aegis](https://getaegis.app/)). Plan for a lost phone or key. When a site offers backup codes, keep a copy somewhere safe, such as with your passport. Google offers them in case you lose your phone ([Google](https://support.google.com/accounts/answer/1187538)). With security keys, register at least two and keep one in a different place. Apple requires two and warns that losing every key and trusted device can lock you out for good ([Apple](https://support.apple.com/en-us/102637)). Then close the gap Elliot used. Lock your phone, keep it with you, and stop codes showing on the lock screen: on an iPhone, set Show Previews to When Unlocked ([Apple](https://support.apple.com/guide/iphone/change-notification-settings-iph7c3d96bab/ios)); on Android, hide sensitive notifications on the lock screen ([Google](https://support.google.com/android/answer/9079661)).

**Why it matters:** With two-factor login on, a stolen password stops being enough. The second factor only holds while the device carrying it stays in your hands.

### 7. He snoops on a café's Wi-Fi

**What Elliot does:** The first episode opens with Elliot confronting a café owner. Curious why the café's Wi-Fi was so fast, Elliot had snooped on it and found the owner running an illegal site over Tor. He tells the owner he could see the traffic because he controlled the exit nodes ([GeekWire](https://www.geekwire.com/2015/mr-robot-rewind-a-cybersecurity-geek-analyzes-the-popular-new-tv-show/)).

**Don't copy this part.** Intercepting other people's communications without permission can be a federal crime in the US ([18 U.S.C. § 2511](https://www.law.cornell.edu/uscode/text/18/2511)).

**The legal version you can copy this week:** On any shared network, make sure the sites you use load over HTTPS. Tor Browser's HTTPS-Only Mode upgrades connections to HTTPS and warns you before it loads a site that can't be encrypted ([Tor Project](https://support.torproject.org/tor-browser/features/secure-connections/)). [Tor Browser](/directory/tor-browser) itself stops websites learning your location, and stops people watching your local network, such as whoever runs the café Wi-Fi, from seeing what you fetch ([Tor Project](https://support.torproject.org/about-tor/introduction/protections/)). The same page warns that there are situations where Tor can't fully protect you. The scene shows one: whoever runs the last relay on your connection, the exit relay, can monitor traffic that isn't encrypted ([Tor Project](https://community.torproject.org/relay/community-resources/eff-tor-legal-faq/)), so keep HTTPS-Only Mode on. For a whole session that leaves nothing on the computer, [Tails](/directory/tails) starts from a USB stick, sends everything through Tor and forgets it all when you shut down ([Tails](https://tails.net/about/index.en.html)).

**Why it matters:** You share public Wi-Fi with strangers, and you can't tell which of them is curious.

### 8. He checks his computer from outside it

**What Elliot does:** In season 3, episode 2, Elliot suspects his computer has been tampered with. He restarts it from a USB stick running a different system and scans his usual system for rootkits, which is malware built to hide from the system it infects. GeekWire's reviewer called it a realistic portrayal of how a security expert checks a suspect machine. The scan comes back clean, and it's wrong: someone close to him had tampered with his monitor while he slept ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-backdooring-monitor-fbi-surveillance-episode-two/)).

**The legal version you can copy this week:** On Windows, Microsoft Defender's offline scan is the everyday version. It restarts the PC and scans before Windows loads, so persistent malware has a harder time hiding. Open Windows Security, go to Virus & threat protection, then Scan options, and choose Microsoft Defender Antivirus (offline scan) ([Microsoft](https://support.microsoft.com/en-us/windows/help-protect-my-pc-with-microsoft-defender-offline-9306d528-64bf-4668-5b80-ff533f183d6c)). If the worry is a person rather than malware, the FTC's guide to stalkerware lists signs such as fast battery drain, unusual data use, and someone knowing where you are or what you've said without being told. It advises contacting the National Domestic Violence Hotline at 1-800-799-7233 from a different device before you remove anything, because someone monitoring you may escalate if they think you're cutting off their access ([FTC](https://consumer.ftc.gov/articles/stalkerware-what-know), June 2026).

**Why it matters:** Malware is built to hide from the system it runs on, and the people with the easiest access to your devices are the ones you live with.

### 9. He uses encrypted email

**What Elliot does:** His email is Proton Mail. Proton says the show's team contacted it in June 2015 while researching which secure email service a character like Elliot would use, and the service appears in season 1 ([Proton](https://proton.me/blog/protonmail-mr-robot-secure-email), August 2015). In the last scene of season 3, episode 8, he logs in to Proton Mail to find a message waiting ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)).

**The legal version you can copy this week:** Consider an encrypted provider such as [Proton](/directory/proton) or [Tuta](/directory/tuta), and know what it covers. Proton encrypts messages end to end between Proton users and stores your mailbox with zero-access encryption, so Proton itself can't read your message contents. Mail you send to other providers is protected in transit with TLS, but the recipient's provider may be able to read it once it arrives. Subject lines and the sender and recipient addresses aren't end-to-end encrypted ([Proton](https://proton.me/support/proton-mail-encryption-explained)). Pair the new inbox with aliases from [SimpleLogin](/directory/simplelogin) or [Addy](/directory/addy), so shops and sign-ups never see your main address.

**Why it matters:** Your inbox can reset every other account you own. Who can read it matters more than almost any other setting.

---

## Where Elliot's way breaks down for real people

**He's protecting evidence.** Most of his routine exists because what he keeps could be used against him in court. GeekWire's reviewer pointed out that keeping the files at all was the risk ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)). Your plan is built around scammers, brokers and thieves, and it needs far less.

**Destroying hardware is wasted money.** Reviewing that season 1 episode, Avast's reviewer said Elliot could have destroyed just the hard drive and some of the memory, and that physical destruction isn't needed unless you fear someone will come after you in person ([Avast](https://blog.avast.com/2015/07/07/mr-robot-review-ones-and-zer0s/)). The built-in erase covers a resale.

**One skipped step undoes a routine.** In season 3, episode 8, Elliot burns two new discs without hiding the files, and GeekWire's reviewer noted that unprotected discs could make someone look harder at the rest ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-social-engineering-saves-episode-8/)). Simple habits you keep beat elaborate ones you skip.

**His scan missed what a person did.** The clean result in season 3, episode 2 came while he was being watched through his own monitor ([GeekWire](https://www.geekwire.com/2017/mr-robot-rewind-backdooring-monitor-fbi-surveillance-episode-two/)). Software checks can't see everything someone with physical access can do.

Elliot gets his privacy by trusting nothing, including his own machines. You can get most of yours with a written plan, an encrypted disk, a password manager and two-factor login.

---

## Start this week

- [ ] Answer the EFF's [security plan](https://ssd.eff.org/module/your-security-plan) questions for yourself, in writing.
- [ ] Check that FileVault or Windows Device Encryption is on, and save the recovery key.
- [ ] Install a password manager such as [Bitwarden](/directory/bitwarden) and change your email password to a generated one.
- [ ] Turn on two-factor login with an authenticator app or a security key for your email and your bank, and save the backup codes.
- [ ] Save your bank's number from the back of your card, and set your lock screen to hide notification previews.

---

## FAQ

**Is the hacking in Mr. Robot realistic?**

Mostly. Rolling Stone reported the show's rule that a hack that can't be done in real life doesn't appear, with technical adviser Kor Adana responsible for getting it right ([Rolling Stone](https://www.rollingstone.com/culture/culture-news/mr-robot-four-of-the-shows-best-hacks-explained-180924/)). GeekWire's episode reviews found most scenes accurate and flagged shortcuts, such as parts of the season 1 two-factor scene ([GeekWire](https://www.geekwire.com/2015/mr-robot-rewind-mostly-accurate-tech-in-a-mind-blowing-episode-8/)).

**Do I need to destroy my old hard drive like Elliot?**

No. Before you sell or recycle a device, use its built-in erase: Erase All Content and Settings on an iPhone or on a Mac with Apple silicon or a T2 chip, a factory reset on Android ([Apple](https://support.apple.com/en-us/109511), [Apple](https://support.apple.com/en-us/102773), [Google](https://support.google.com/android/answer/6088915)). Avast's reviewer said physical destruction is only worth it if you fear someone will come after you in person ([Avast](https://blog.avast.com/2015/07/07/mr-robot-review-ones-and-zer0s/)).

**Should I hide my files inside music like Elliot?**

There's no need. DeepSound hides files inside other files so they're hard to spot ([Rolling Stone](https://www.rollingstone.com/culture/culture-news/mr-robot-four-of-the-shows-best-hacks-explained-180924/)). Encryption is what keeps them unreadable: FileVault or Device Encryption for the whole disk, and VeraCrypt or Cryptomator for a set of files.

**Do I need Tor or Tails?**

Not for everyday browsing. Tor Browser hides your location from the sites you visit and hides what you fetch from your local network ([Tor Project](https://support.torproject.org/about-tor/introduction/protections/)). Tails is for a session that should leave nothing behind on the computer ([Tails](https://tails.net/about/index.en.html)).

**Is Proton Mail end-to-end encrypted?**

Between Proton users, yes. Mail to other providers is encrypted in transit with TLS, but the recipient's provider may be able to read it once it arrives. Subject lines and the sender and recipient addresses aren't end-to-end encrypted, so don't put anything sensitive in a subject line ([Proton](https://proton.me/support/proton-mail-encryption-explained)).

**What should I do if someone close to me might be monitoring my phone?**

Use a different device to contact the National Domestic Violence Hotline (1-800-799-7233, or text START to 88788) before you remove anything. The FTC warns that someone using stalkerware may escalate if they suspect you're cutting off their access ([FTC](https://consumer.ftc.gov/articles/stalkerware-what-know)).

**Which step matters most?**

Two-factor login on your main email. Elliot already had his boss's password and still needed the phone ([GeekWire](https://www.geekwire.com/2015/mr-robot-rewind-mostly-accurate-tech-in-a-mind-blowing-episode-8/)). Your email can reset every other account, so it gets the strongest protection you have.

## Keep reading

- [How to Live Privately: Jack Reacher](/guides/how-to-live-privately-jack-reacher)
- [Remove your name from data brokers](/guides/remove-name-from-data-brokers)

---

*General information, not legal advice.*
