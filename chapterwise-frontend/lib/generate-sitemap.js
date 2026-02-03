const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.chapteriq.com";

function getAllBlogSlugs() {
  const files = fs.readdirSync(path.join("content/blog"));
  return files.map((filename) => filename.replace(".mdx", ""));
}

function generateSitemap() {
  const staticPages = ["", "app", "about", "contact", "pricing", "blog"];
  const blogSlugs = getAllBlogSlugs();

  const allUrls = [
    ...staticPages.map((page) => `${BASE_URL}/${page}`),
    ...blogSlugs.map((slug) => `${BASE_URL}/blog/${slug}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map((url) => {
    return `<url>
  <loc>${url}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
  })
  .join("")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log("✅ sitemap.xml generated!");
}

generateSitemap();
