import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "**", // Allows images from any domain
      },
    ],
  },
};

export default nextConfig;
