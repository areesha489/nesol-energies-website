import type { NextConfig } from "next";

const githubOwner = process.env.GITHUB_OWNER || "areesha489";
const githubRepo = process.env.GITHUB_REPO || "nesol-energies-website";
const githubBranch = process.env.GITHUB_BRANCH || "main";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/public/uploads/:path*`,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "files.catbox.moe" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
