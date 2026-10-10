FROM oven/bun:1-alpine

WORKDIR /app

COPY server.ts .

EXPOSE 53/udp
EXPOSE 8053/tcp

ENV DNS_LEAK_DOMAIN=leak.defaultprivacy.com
ENV HTTP_PORT=8053

CMD ["bun", "run", "server.ts"]
