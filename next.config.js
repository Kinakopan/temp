/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEYAPI_KEY,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  }
};
