
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oline-shop-backend.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        pathname: "/shopping",
      },
      {
        protocol: "https",
        hostname: "***",
      }
    ],
  },
};

export default nextConfig;