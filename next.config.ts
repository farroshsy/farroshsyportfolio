import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Several lockfiles exist above this directory; pin the workspace root so
  // Turbopack does not guess the wrong one.
  turbopack: { root: __dirname },
};

export default nextConfig;
