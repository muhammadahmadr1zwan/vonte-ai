import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  // Non-secret namespace only; preview uploads never write production inquiries.
  env: {
    VONTE_INQUIRY_STORE: process.env.CONTEXT === "production"
      ? "vonte-inquiries-production"
      : "vonte-inquiries-preview",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
