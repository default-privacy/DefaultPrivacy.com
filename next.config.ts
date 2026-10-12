import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drop the X-Powered-By: Next.js fingerprint header.
  poweredByHeader: false,
  // Playwright must NOT be bundled. It resolves its own driver and internals from
  // real files on disk at runtime; webpack/turbopack rewriting those paths breaks the
  // client even when it is only used to CONNECT to a remote browser (no local
  // Chromium). Marking it external makes Next trace the real package into the
  // serverless function instead.
  serverExternalPackages: ["playwright", "playwright-core"],
  // Conservative, non-breaking security headers for all routes. The CSP is
  // intentionally limited to frame-ancestors (clickjacking control) — an
  // enforcing script-src/default-src would require nonce middleware and break
  // Next's inline runtime.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      // The homepage and /directory render per URL (filters and page number are in the query),
      // which Next marks "never cache". Let the CDN keep each URL's copy for a minute so repeat
      // visits and bots stop re-running the page. The page holds nothing personal: the IP
      // banner loads separately from /api/whoami. Not for the MCP host, which also serves "/".
      {
        source: "/",
        missing: [{ type: "host", value: "mcp.defaultprivacy.com" }],
        headers: [{ key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" }],
      },
      {
        source: "/directory",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" }],
      },
    ]
  },
  // /:path*.md → /llm-mirror/:path*  (Stripe / Vercel pattern)
  // Per-page markdown mirrors for AI agents. The public URL stays
  // /<path>.md; the handler at src/app/llm-mirror/[...slug]/route.ts
  // renders text/markdown with x-robots-tag: noindex.
  async rewrites() {
    return {
      // mcp.defaultprivacy.com is the short address for the MCP server: its root IS /api/mcp.
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "mcp.defaultprivacy.com" }],
          destination: "/api/mcp",
        },
        {
          source: "/mcp",
          has: [{ type: "host", value: "mcp.defaultprivacy.com" }],
          destination: "/api/mcp",
        },
      ],
      afterFiles: [
        {
          source: "/:path*.md",
          destination: "/llm-mirror/:path*",
        },
      ],
      fallback: [],
    }
  },
  async redirects() {
    const retiredGuideSlugs = [
      "anonymous-llc-cheap-llc-trap",
      "anonymous-llc-content-creators",
      "anonymous-llc-delaware",
      "anonymous-llc-digital-nomads",
      "anonymous-llc-high-risk-individuals",
      "anonymous-llc-new-business",
      "anonymous-llc-new-homeowners",
      "anonymous-llc-new-mexico",
      "anonymous-llc-real-estate-investors",
      "anonymous-llc-wyoming",
      "asset-protection-before-lawsuit",
      "boi-reporting-explained",
      "business-llc-vs-asset-llc",
      "certification-of-trust-explained",
      "charging-order-protection",
      "check-llc-on-secretary-of-state",
      "cta-11th-circuit-2026",
      "ein-without-ssn",
      "entity-trust-continuity",
      "new-mexico-holding-company",
      "ny-llc-transparency-act-2026",
      "privacy-stack-llc",
      "s-corp-election-llc",
      "series-llc-operations",
      "trust-vs-llc-for-privacy",
      "trustee-selection",
      "what-anonymous-llc-does-not-do",
      "what-anonymous-llc-means",
      "when-you-do-not-need-an-ein",
      "why-cheap-nominee-services-fail",
      "will-boi-return-2026",
      "wyoming-llc-privacy",
      "wyoming-vs-new-mexico-vs-delaware-anonymous-llc",
      "wyoming-vs-new-mexico",
    ]
    return [
      // Formation playbook and the LLC/trust guide pile are off the public site.
      { source: "/playbook", destination: "/guides", permanent: true },
      { source: "/playbook/:slug", destination: "/guides", permanent: true },
      ...retiredGuideSlugs.map((slug) => ({
        source: `/guides/${slug}`,
        destination: "/guides",
        permanent: true,
      })),
      ...[
        "anonymous-llc",
        "asset-protection",
        "beneficial-owner",
        "beneficial-ownership-information",
        "boi",
        "corporate-transparency-act",
        "living-trust",
        "management-agreement",
        "nominee-director",
        "nominee-manager",
        "nominee-services",
        "nominee-shareholder",
        "offshore-trust",
        "registered-agent",
        "ultimate-beneficial-owner",
        "wyoming-llc",
      ].map((slug) => ({
        source: `/glossary/${slug}`,
        destination: "/glossary",
        permanent: true,
      })),
      // Retired trust marketing page. The trust guide is no longer published.
      {
        source: "/trusts",
        destination: "/guides",
        permanent: true,
      },
      // Retired nominee-signing marketing page. There is no formation product
      // in the hub; send stale inbound links to the directory.
      {
        source: "/nominee",
        destination: "/directory",
        permanent: true,
      },
      // Retired emergency-asset-protection marketing page (unenforceable
      // referral SLA) → education-only fraudulent-transfer guide.
      {
        source: "/emergency-asset-protection",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/check",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/llc-scanner",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/scan",
        destination: "/scanner",
        permanent: false,
      },
      // v1 → v4 SEO preservation: /resources/{slug} → /directory/{slug}
      {
        source: "/resources/:slug",
        destination: "/directory/:slug",
        permanent: true,
      },
      // v1 resource index → v4 directory
      {
        source: "/resources",
        destination: "/directory",
        permanent: true,
      },
      // v1 categories → v4 directory (categories are now filters, not routes)
      {
        source: "/categories/:slug",
        destination: "/directory",
        permanent: true,
      },
      {
        source: "/categories",
        destination: "/directory",
        permanent: true,
      },
      // v1 blog posts → homepage (v4 has guides, not blog)
      {
        source: "/blog/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      // v1 static pages → v4 equivalents
      {
        source: "/contact",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/donate",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/submission",
        destination: "/directory",
        permanent: true,
      },
      {
        source: "/affiliate",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
