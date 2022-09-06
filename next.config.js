/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://54.180.51.124/api/:path*`,
      },
    ];
  },
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = removeImports({ ...nextConfig });
