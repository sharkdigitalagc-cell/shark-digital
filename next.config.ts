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
};

export default nextConfig;
