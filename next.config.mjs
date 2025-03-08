/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'ais.tact.ac.in',
      },
      {
        protocol: 'https',
        hostname: 'tridentpublicdata.s3.ap-south-1.amazonaws.com'
      }
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
