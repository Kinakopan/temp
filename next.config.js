/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
  "engines": {
    "node": "16.x"
  },
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
};
