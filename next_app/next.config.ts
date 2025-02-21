import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cal.com",
      },
      {
        hostname: "www.datocms-assets.com",
      },
      {
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

export default nextConfig;
