import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the logo to keep its fine lines crisp.
    qualities: [75, 90],
  },
};

export default nextConfig;
