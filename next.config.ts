import type { NextConfig } from 'next';
const withSvgr = require('@svgr/webpack');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // Add any specific options here
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
