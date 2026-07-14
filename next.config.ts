import type { NextConfig } from "next";

// Content-Security-Policy. This is a static portfolio with no user-generated
// HTML, so the XSS surface is already minimal; the policy locks every resource
// to same-origin. `'unsafe-inline'` is kept for script/style because Next's App
// Router injects inline hydration scripts and the app uses inline styles — a
// nonce-based policy would require middleware and buys little here.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Clickjacking: also covered by frame-ancestors above, kept for older UAs.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework/version.
  poweredByHeader: false,
  images: {
    // Next 16 only generates the qualities listed here, and warns on any other
    // value. The headshot is the one image where the extra fidelity is worth the
    // bytes — it's large, and 75 leaves visible artefacts in the film grain.
    qualities: [75, 95],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
