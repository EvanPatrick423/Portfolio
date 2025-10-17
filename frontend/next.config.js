/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Disable x-powered-by header for better compatibility
  poweredByHeader: false,
  // Enable webpack HMR for Docker with Firefox compatibility
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: /node_modules/,
      };
      
      // Firefox HMR compatibility
      if (!isServer) {
        config.infrastructureLogging = {
          level: 'error',
        };
      }
    }
    return config;
  },
  // Ensure proper headers for HMR
  async headers() {
    return [
      {
        source: '/_next/webpack-hmr',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

