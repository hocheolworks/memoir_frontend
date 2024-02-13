// pages/server-sitemap-index.xml/index.tsx
import sitemapAPI from "@api/sitemap/sitemapAPI";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let urls: string[] = [];

  try {
    urls = await sitemapAPI.getAllPostPathnames();
  } catch (e) {}

  return getServerSideSitemapLegacy(
    ctx,
    urls.map((url) => ({
      loc: process.env.NEXT_PUBLIC_WEB_URL + "/" + url,
      lastmod: new Date().toISOString(),
    }))
  );
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
