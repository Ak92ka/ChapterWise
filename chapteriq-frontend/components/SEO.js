import Head from "next/head";

export default function SEO({ title, description, url, image, jsonLd }) {
  return (
    <Head>
      {/* <title>{title} | ChapterIQ</title> */}
      <title>{`${title} | ChapterIQ`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url || "https://www.chapteriq.com"} />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} | ChapterIQ`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={image || "https://www.chapteriq.com/og-default.png"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ChapterIQ`} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image || "https://www.chapteriq.com/og-default.png"}
      />

      {/* Optional JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
