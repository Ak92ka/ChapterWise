import Head from "next/head";

export default function SEOBlog({ title, description, url, image, author, datePublished, dateModified }) {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title} | ChapterIQ Blog</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url || "https://www.chapteriq.com/blog"} />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} | ChapterIQ Blog`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || "https://www.chapteriq.com/og-default.png"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ChapterIQ Blog`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || "https://www.chapteriq.com/og-default.png"} />

      {/* JSON-LD structured data for articles */}
      {url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
              },
              "headline": title,
              "description": description,
              "image": image || "https://www.chapteriq.com/og-default.png",
              "author": {
                "@type": "Person",
                "name": author || "ChapterIQ Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ChapterIQ",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.chapteriq.com/logo.png"
                }
              },
              "datePublished": datePublished,
              "dateModified": dateModified || datePublished
            })
          }}
        />
      )}
    </Head>
  );
}
