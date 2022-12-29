/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
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
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "avatars.githubusercontent.com",
      "img.delicious.com.au", // 테스트 용
      "images.theconversation.com", // 테스트 용
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = withBundleAnalyzer(removeImports({ ...nextConfig }));
