/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'ais.tact.ac.in',
      },
    ],
  },
  productionBrowserSourceMaps: false, // Disable source maps
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = false; // Disable source maps in dev for client
    }
    return config;
  },
};

export default nextConfig;
