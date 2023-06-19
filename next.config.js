/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
        source: "/api/contributions/:githubUserName",
        destination: "/api/contributions/:githubUserName",
      },
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "avatars.githubusercontent.com",
      "static.velog.io",
      "github.com",
      "velog.velcdn.com", // 테스트 용
      "img.delicious.com.au", // 테스트 용
      "images.theconversation.com", // 테스트 용
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  output: "standalone",
};

module.exports = withBundleAnalyzer(removeImports({ ...nextConfig }));
