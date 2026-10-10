# DNS Leak Test Server

Lightweight authoritative DNS server + HTTP API for Default Privacy's DNS leak test.

## How It Works

1. The Next.js app generates a unique token and tells the user's browser to resolve `{token}-{1..5}.leak.defaultprivacy.com`
2. The user's DNS resolver queries this server (the authoritative nameserver for `leak.defaultprivacy.com`)
3. This server logs which resolver IP queried for each token
4. The Next.js app polls `GET /results/{token}` to retrieve the resolver IPs
5. The app compares resolver IPs against known VPN/ISP ranges to determine if there's a leak

## Prerequisites

- A VPS with a static IP (Hetzner CX22 ~4 EUR/mo works fine)
- UDP port 53 open (DNS)
- A TCP port for the HTTP API (default: 8053)
- NS records for `leak.defaultprivacy.com` pointing to the VPS IP

## DNS Setup

At your domain registrar or DNS provider, add:

```
leak.defaultprivacy.com.  NS  ns1.leak.defaultprivacy.com.
ns1.leak.defaultprivacy.com.  A  <VPS_IP_ADDRESS>
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SHARED_SECRET` | Yes | - | Authenticates HTTP API requests from the Next.js app |
| `DNS_LEAK_DOMAIN` | No | `leak.defaultprivacy.com` | Base domain for leak test queries |
| `HTTP_PORT` | No | `8053` | Port for the HTTP results API |
| `TOKEN_TTL_MS` | No | `300000` (5 min) | How long to keep token/resolver data |

## Run Locally

```bash
SHARED_SECRET=dev-secret bun run server.ts
```

Note: Port 53 requires root/sudo on most systems:

```bash
sudo SHARED_SECRET=dev-secret bun run server.ts
```

## Run with Docker

```bash
docker build -t dp-dns-leak .

docker run -d \
  --name dp-dns-leak \
  -p 53:53/udp \
  -p 8053:8053 \
  -e SHARED_SECRET=your-secret-here \
  dp-dns-leak
```

## HTTP API

All endpoints except `/health` require `Authorization: Bearer <SHARED_SECRET>`.

### `GET /health`

Returns server status. No auth required.

```json
{
  "status": "ok",
  "domain": "leak.defaultprivacy.com",
  "activeTokens": 3,
  "uptime": 3600.5
}
```

### `GET /results/:token`

Returns the DNS resolver IPs that queried subdomains for this token.

```json
{
  "token": "abc12345",
  "resolvers": [
    {
      "ip": "1.1.1.1",
      "firstSeen": 1710000000000,
      "queryCount": 5
    }
  ],
  "resolverCount": 1
}
```

## Next.js Integration

Set these in the Next.js app's `.env`:

```
DNS_LEAK_SERVER_URL=http://<VPS_IP>:8053
DNS_LEAK_SERVER_SECRET=your-secret-here
```
