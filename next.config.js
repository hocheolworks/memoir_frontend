/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://54.180.51.124/api/:path*`,
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = withBundleAnalyzer(removeImports({ ...nextConfig }));
