/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.mem0ir.com",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap-index.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.mem0ir.com/server-sitemap-index.xml", // <==== Add here
    ],
  },
};
