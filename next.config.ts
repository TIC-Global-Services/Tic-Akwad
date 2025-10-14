import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    domains: ["ik.imagekit.io"], // 👈 allow this external domain
  },
};

export default nextConfig;
