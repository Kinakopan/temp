/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  }
};
