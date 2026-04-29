import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles output automatically */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ggpht.com",
      },
    ],
  },
};

export default nextConfig;
