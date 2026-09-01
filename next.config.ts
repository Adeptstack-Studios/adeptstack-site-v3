import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // next blocks the image optimizer from fetching private/loopback ips (ssrf guard).
    // the local backend is exactly that, so allow it during development only.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.adeptstack.net',
        port: '',
        pathname: '/**',
      },
      // local backend during development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
