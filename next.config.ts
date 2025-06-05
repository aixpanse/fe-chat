import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/rag_store/:path*',
        destination: 'http://57.128.223.2:8080/:path*', // Proxy to external URL
      },
      {
        source: '/api/rag_app/:path*',
        destination: 'http://57.128.223.2:8000/:path*', // Proxy to external URL
      },
    ];
  },
};

export default nextConfig;
