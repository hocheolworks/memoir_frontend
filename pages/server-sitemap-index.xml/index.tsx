// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import sitemapAPI from "@api/sitemap/sitemapAPI";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let urls: string[] = [];

  try {
    urls = await sitemapAPI.getAllPostPathnames();
  } catch (e) {}

  return getServerSideSitemapIndexLegacy(
    ctx,
    urls.map((url) => process.env.NEXT_PUBLIC_WEB_URL + "/" + url)
  );
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
