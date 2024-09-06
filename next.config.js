/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const removeImports = require("next-remove-imports")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "static.velog.io",
      },
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
      },
      {
        protocol: "https",
        hostname: "img.delicious.com.au",
      },
      {
        protocol: "https",
        hostname: "images.theconversation.com",
      },
      {
        protocol: "https",
        hostname: "github.com", // 깃허브 프로필 아이콘
      },
      {
        protocol: "https",
        hostname: "d1ccleacxg8gcm.cloudfront.net", // 이미지 저장용 cloudfront
      },
    ],
    // domains: [
    //   "*",
    //   // "avatars.githubusercontent.com",
    //   // "static.velog.io",
    //   // "github.com",
    //   // "d1ccleacxg8gcm.cloudfront.net", // 이미지 저장용 cloudfront
    //   // "velog.velcdn.com", // 테스트 용
    //   // "img.delicious.com.au", // 테스트 용
    //   // "images.theconversation.com", // 테스트 용
    // ],
  },
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
  output: "standalone",
};

module.exports = withBundleAnalyzer(removeImports({ ...nextConfig }));
