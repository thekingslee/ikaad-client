import type { NextConfig } from 'next';
const withSvgr = require('@svgr/webpack');

const nextConfig: NextConfig = {
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
};

export default nextConfig;
