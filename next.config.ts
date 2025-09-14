import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Completely disable all development indicators
  devIndicators: false,
  reactStrictMode: false,
  // Disable all development overlays
  experimental: {
    // Disable any experimental features that might show overlays
  },
};

export default nextConfig;
