import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static site (folder `out/`) for hosts without
// a Node server. The contact API route is not included in that build.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: staticExport,
    // 90 is used for the logo to keep its fine lines crisp.
    qualities: [75, 90],
  },
  // The CRM is a single static page (public/crm/index.html) served at /crm.
  // Rewrites and headers need a server, so they are skipped in the static export.
  ...(staticExport
    ? {}
    : {
        async rewrites() {
          return [{ source: "/crm", destination: "/crm/index.html" }];
        },
        async headers() {
          const crmHeaders = [
            { key: "X-Robots-Tag", value: "noindex, nofollow" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "same-origin" },
            { key: "Cache-Control", value: "no-cache" },
          ];
          return [
            { source: "/crm", headers: crmHeaders },
            { source: "/crm/:path*", headers: crmHeaders },
          ];
        },
      }),
};

export default nextConfig;
