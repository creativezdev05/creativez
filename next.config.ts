import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
  allowedDevOrigins: ['untapped-stitch-impending.ngrok-free.dev'],
  
};

export default nextConfig;
