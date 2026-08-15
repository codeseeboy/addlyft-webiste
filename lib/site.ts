/**
 * Single source of truth for anything that changes between environments.
 *
 * The canonical URL drives metadataBase, the sitemap, robots.txt and the
 * structured data, so a preview deploy and production never disagree about
 * who they are.
 */

function getValidSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  let raw = envUrl || "https://addlyft.com";
  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }

  try {
    const parsed = new URL(raw);
    return parsed.origin;
  } catch {
    return "https://addlyft.com";
  }
}

export const SITE_URL = getValidSiteUrl();

export const SITE_NAME = "ADD-LYFT";
export const SITE_TAGLINE = "Grow Local. Reach Further.";

export const SITE_DESCRIPTION =
  "ADD-LYFT turns everyday stores into measurable local media. Fifteen seconds of spoken audio between songs, ten seconds on the screen — at the moment people decide. Go for store owners, Reach for brands.";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@addlyft.com";

/** Routes that belong in the sitemap, with their relative importance. */
export const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/go", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reach", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/network", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
];

/** Organization schema, so search and social know what ADD-LYFT is. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    slogan: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    logo: `${SITE_URL}/icon.svg`,
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "local retail media",
      "in-store audio advertising",
      "in-store digital screens",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "ADD-LYFT Go",
        description:
          "For store owners: earn from in-store audio and screen airtime, with a guaranteed monthly floor on the Full Bundle plan.",
        url: `${SITE_URL}/go`,
      },
      {
        "@type": "Offer",
        name: "ADD-LYFT Reach",
        description:
          "For brands: run 15-second audio and 10-second screen campaigns in chosen local stores, counted per play.",
        url: `${SITE_URL}/reach`,
      },
    ],
  };
}
