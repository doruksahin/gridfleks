const withVideos = require('next-videos');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = {...nextConfig, ...withVideos()};
