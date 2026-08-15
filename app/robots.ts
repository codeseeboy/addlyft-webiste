import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview and staging deploys must never be indexed as the real site.
  const isProduction = process.env.NEXT_PUBLIC_SITE_URL
    ? !/vercel\.app|localhost|staging|preview/.test(process.env.NEXT_PUBLIC_SITE_URL)
    : true;

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
