import type { NextConfig } from "next";

/** Applied to every response. Nothing here needs a nonce or blocks the site. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    // Harmless over http, required by preload lists over https.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Lets a verification build run in its own directory while `next dev` is
  // using .next. Defaults to normal behaviour when the var is unset.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  poweredByHeader: false,

  images: {
    // Declaring the quality levels the site actually asks for. Next 16 makes
    // this required, and without it every image logs a warning in dev.
    qualities: [75, 82],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Video and posters are large and change rarely, but the filenames are
        // not content-hashed — so cache hard, revalidate in the background,
        // and a replaced spot still reaches people within a day.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
