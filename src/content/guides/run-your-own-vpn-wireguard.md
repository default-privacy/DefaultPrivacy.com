---
title: "How to Run Your Own VPN with WireGuard"
slug: run-your-own-vpn-wireguard
description: "Stop trusting VPN companies with your traffic. Set up your own WireGuard VPN server on a $5/month VPS in under 30 minutes — full control over the server, with honest limits on what it hides."
category: Self-Hosting
difficulty: intermediate
timeToComplete: "30 minutes"
publishedAt: "2026-03-07"
updatedAt: "2026-10-11"
author: Default Privacy
tags:
  - vpn
  - wireguard
  - self-hosting
  - networking
  - privacy
relatedTools:
  - name: Website Privacy Scanner
    href: /scanner
---

## Why Run Your Own VPN?

Commercial VPN providers ask you to trust them with **all of your internet traffic**. They promise "no logs," but you can't verify that yourself.

Running your own VPN **moves that trust, it doesn't remove it**. The VPS company owns the machine your traffic leaves from, can see where it goes, and knows who pays for the server. Here is what you do get:

- **You control the software** — no VPN company's app or logging policy sits in the middle
- **You control the logs** — WireGuard keeps none of your browsing (your VPS host's own network logs are outside your control)
- **You control the jurisdiction** — pick a VPS in any country you want
- **You control the cost** — $4–6/month for a VPS vs $10–13/month for a commercial VPN
- **You learn how it works** — understanding your tools is the foundation of real privacy

### When a Commercial VPN Is Still Better

Self-hosting isn't always the right call. A commercial VPN is better when you need:

- **IP diversity** — your self-hosted VPN has one IP address. Services can block it. Commercial VPNs rotate through thousands.
- **Streaming unblocking** — Netflix, Hulu, etc. actively block VPS IP ranges. Commercial VPNs invest in circumventing this.
- **One-click mobile apps** — if you want zero configuration on every device.
- **Multi-hop / obfuscation** — for censorship circumvention in restrictive countries.

**One more trade-off:** every site you visit sees a single IP address that only you use, and it's tied to the account that pays for the VPS. A commercial VPN shares one IP among many users, which makes you harder to single out.

So self-hosting is a good fit for **keeping your traffic from your ISP and from public Wi-Fi**. It is a poor fit for hiding who you are from the sites you visit.

---

## What You'll Need

| Item | Details |
|------|---------|
| **VPS provider** | Hetzner, Vultr, DigitalOcean, or any provider with a $4–6/month tier |
| **Operating system** | Ubuntu 24.04 LTS (this guide assumes Ubuntu) |
| **SSH access** | Terminal on macOS/Linux, or PuTTY/Windows Terminal on Windows |
| **~30 minutes** | Most of that is waiting for DNS propagation if you use a custom domain |

### Choosing a VPS Provider (Privacy Considerations)

Not all VPS providers are equal from a privacy standpoint:

| Provider | Jurisdiction | Crypto Payment | Notes |
|----------|-------------|----------------|-------|
| **Hetzner** | Germany/Finland | No | Excellent performance, GDPR-compliant |
| **Vultr** | USA (global DCs) | Yes (crypto) | Accepts Bitcoin, good global coverage |
| **1984 Hosting** | Iceland | Yes | Privacy-focused, accepts Monero |
| **Njalla** | Nevis | Yes | Privacy-first, domain + VPS, accepts Monero |
| **BuyVM** | USA/Luxembourg | No | Affordable, DDoS protection included |

For maximum privacy, choose a provider that accepts cryptocurrency and is in a jurisdiction with strong privacy laws.

---

## Step 1: Provision Your VPS

Spin up a new VPS with these minimum specs:

- **1 vCPU, 1 GB RAM, 20 GB SSD** (the smallest tier is fine — WireGuard is extremely lightweight)
- **Ubuntu 24.04 LTS**
- **SSH key authentication** (do not use password auth)

Once your VPS is running, note the **public IP address**. We'll call it `YOUR_SERVER_IP` throughout this guide.

### SSH Into Your Server

```bash
ssh root@YOUR_SERVER_IP
```

If you set up an SSH key during provisioning, this should connect without a password.

---

## Step 2: Secure the Server (Do This First)

Before installing anything, lock down the basics.

### Update the System

```bash
apt update && apt upgrade -y
```

### Create a Non-Root User

```bash
adduser vpnuser
usermod -aG sudo vpnuser
```

### Disable Root SSH Login

```bash
# Copy your SSH key to the new user
mkdir -p /home/vpnuser/.ssh
cp ~/.ssh/authorized_keys /home/vpnuser/.ssh/
chown -R vpnuser:vpnuser /home/vpnuser/.ssh

# Edit SSH config
nano /etc/ssh/sshd_config
```

Find and change these lines:

```
PermitRootLogin no
PasswordAuthentication no
```

Restart SSH:

```bash
systemctl restart sshd
```

**Important:** Open a new terminal and verify you can SSH in as `vpnuser` before closing your root session.

```bash
ssh vpnuser@YOUR_SERVER_IP
```

### Set Up the Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp        # SSH
sudo ufw allow 51820/udp     # WireGuard
sudo ufw enable
```

---

## Step 3: Install WireGuard

```bash
sudo apt install wireguard -y
```

That's it. WireGuard is in the Linux kernel since 5.6, so on Ubuntu 24.04 it's a single package install.

### Generate Server Keys

```bash
wg genkey | sudo tee /etc/wireguard/server_private.key | wg pubkey | sudo tee /etc/wireguard/server_public.key
sudo chmod 600 /etc/wireguard/server_private.key
```

Save the private key — you'll need it in the next step:

```bash
sudo cat /etc/wireguard/server_private.key
```

---

## Step 4: Configure the Server

Create the WireGuard config file:

```bash
sudo nano /etc/wireguard/wg0.conf
```

Paste the following, replacing `SERVER_PRIVATE_KEY` with the key from the previous step:

```ini
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = SERVER_PRIVATE_KEY

# Enable IP forwarding and NAT
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
```

> **Note:** If your server's main network interface isn't `eth0`, check with `ip a` and replace accordingly (common alternatives: `ens3`, `enp1s0`).

### Enable IP Forwarding

```bash
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf
echo "net.ipv6.conf.all.forwarding = 1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Start WireGuard

```bash
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

Verify it's running:

```bash
sudo wg show
```

You should see the interface `wg0` with your public key and listening port.

---

## Step 5: Add Your First Client (Peer)

Each device that connects to your VPN is a "peer." You need to generate a key pair for each one.

### Generate Client Keys (On Your Local Machine)

```bash
# macOS/Linux
wg genkey | tee client_private.key | wg pubkey > client_public.key
```

On macOS, install WireGuard tools first:

```bash
brew install wireguard-tools
```

### Add the Client to the Server

Back on your server:

```bash
sudo wg set wg0 peer CLIENT_PUBLIC_KEY allowed-ips 10.0.0.2/32
```

Replace `CLIENT_PUBLIC_KEY` with the contents of `client_public.key`.

To make this persistent across reboots, add it to the config file:

```bash
sudo nano /etc/wireguard/wg0.conf
```

Add at the bottom:

```ini
[Peer]
PublicKey = CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32
```

### Create the Client Config File

On your local machine, create `wg0.conf`:

```ini
[Interface]
PrivateKey = CLIENT_PRIVATE_KEY
Address = 10.0.0.2/24
DNS = 1.1.1.1, 9.9.9.9

[Peer]
PublicKey = SERVER_PUBLIC_KEY
Endpoint = YOUR_SERVER_IP:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
```

Replace:
- `CLIENT_PRIVATE_KEY` — contents of `client_private.key`
- `SERVER_PUBLIC_KEY` — the server's public key from Step 3
- `YOUR_SERVER_IP` — your VPS IP address

> **DNS choice matters.** We use Cloudflare (`1.1.1.1`) and Quad9 (`9.9.9.9`) here. For maximum privacy, consider running your own DNS resolver (a topic for a future guide) or using a privacy-focused resolver like `194.242.2.2` (Mullvad DNS).

---

## Step 6: Connect

### macOS / iOS / Android

1. Download the [WireGuard app](https://www.wireguard.com/install/)
2. Import the `wg0.conf` file (or scan a QR code — see below)
3. Toggle the connection on

### Generate a QR Code (For Mobile)

On your local machine:

```bash
qrencode -t ansiutf8 < wg0.conf
```

Install `qrencode` first if needed:

```bash
# macOS
brew install qrencode

# Ubuntu/Debian
sudo apt install qrencode -y
```

Scan the QR code with the WireGuard mobile app to import the config instantly.

### Linux

```bash
sudo cp wg0.conf /etc/wireguard/wg0.conf
sudo systemctl start wg-quick@wg0
```

### Verify the Connection

Once connected, check your IP address:

```bash
curl https://ifconfig.me
```

It should show your **VPS IP address**, not your home IP.

Run a DNS leak test to make sure your DNS queries are also going through the tunnel.

---

## Step 7: Hardening (Optional but Recommended)

### Automatic Security Updates

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Fail2Ban for SSH

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Kill Switch (Client-Side)

Add these lines to your **client** `wg0.conf` under `[Interface]`:

```ini
PostUp = iptables -I OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
PreDown = iptables -D OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
```

This blocks all traffic if the VPN connection drops — preventing accidental IP leaks.

---

## Step 8: Adding More Devices

For each new device, repeat the client steps:

1. Generate a new key pair
2. Assign the next IP in the range (`10.0.0.3/32`, `10.0.0.4/32`, etc.)
3. Add the peer to the server config
4. Create a client config with the new keys

A typical setup might look like:

| Device | VPN IP |
|--------|--------|
| Laptop | 10.0.0.2 |
| Phone | 10.0.0.3 |
| Tablet | 10.0.0.4 |
| Partner's phone | 10.0.0.5 |

---

## Troubleshooting

### Can't connect?

1. **Check the firewall:** `sudo ufw status` — port 51820/udp must be open
2. **Check WireGuard is running:** `sudo wg show` — should show the interface
3. **Check IP forwarding:** `sysctl net.ipv4.ip_forward` — should return `1`
4. **Check the network interface name:** `ip a` — make sure `eth0` in the config matches your actual interface

### Connected but no internet?

- The NAT/masquerade rule might reference the wrong interface. Check `ip route | grep default` for the correct interface name.
- Verify IP forwarding is enabled: `cat /proc/sys/net/ipv4/ip_forward` should output `1`.

### DNS leaks?

- Make sure your client config specifies DNS servers under `[Interface]`
- Run a DNS leak test to verify
- Consider using DNS over HTTPS (DoH) or DNS over TLS (DoT) for additional protection

---

## What's Next?

Now that you have your own VPN, consider these next steps:

- **Run your own DNS resolver** — Pi-hole or AdGuard Home on the same VPS for ad-blocking + DNS privacy
- **Add WireGuard to your router** — protect your entire home network without per-device configs
- **Set up monitoring** — use `vnstat` or `iftop` to monitor bandwidth usage
- **Automate with Ansible** — if you manage multiple servers, automate the WireGuard setup

### How This Connects to Your Privacy Stack

Your self-hosted VPN is one layer of a complete privacy strategy. Build a threat model to identify what other layers you need, and audit your own exposure to see where you stand.

---

## Summary

| What | Details |
|------|---------|
| **Time** | ~30 minutes |
| **Cost** | $4–6/month (VPS) |
| **Difficulty** | Intermediate (basic terminal skills required) |
| **Privacy gain** | Hides your traffic from your ISP and public Wi-Fi; moves trust from a VPN company to your VPS host |
| **Maintenance** | Minimal — automatic updates handle most of it |

You now have a VPN that **you own and control**. Your VPS host can still see the traffic that leaves it, so pick that host as carefully as you would a VPN.
