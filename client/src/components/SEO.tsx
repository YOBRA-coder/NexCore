const SITE_URL = "https://yobbytech.com"; // TODO: replace if your live domain differs
const SITE_NAME = "Yobby Technologies";
const DEFAULT_IMAGE = `${SITE_URL}/yobby.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/services"
  image?: string;
  /** Extra JSON-LD objects to inject on top of the base Organization graph (e.g. JobPosting, BreadcrumbList) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

// ─── SEO ────────────────────────────────────────────────────────
// Drop <SEO .../> anywhere in a page's render output. React 19
// automatically hoists <title>, <meta>, <link>, and <script> tags
// rendered by any component up into the document <head> — no
// portal or provider needed. This sets the page title, meta
// description, canonical URL, Open Graph/Twitter tags, and any
// page-specific JSON-LD structured data passed in via `jsonLd`.
export function SEO({ title, description, path, image, jsonLd }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image || DEFAULT_IMAGE;
  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {structuredData.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </>
  );
}

export { SITE_URL, SITE_NAME };
