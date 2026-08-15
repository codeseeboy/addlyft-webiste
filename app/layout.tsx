import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "@/components/site/SmoothScroll";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/site";

/* Fonts are self-hosted rather than fetched from Google at build time: one
   less network dependency in CI, and no third-party request from the browser. */

const sans = localFont({
  src: [{ path: "./fonts/InterTight.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

const serif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  adjustFontFallback: false,
});

const mono = localFont({
  src: [{ path: "./fonts/JetBrainsMono.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  keywords: [
    "local retail media",
    "in-store advertising",
    "convenience store advertising",
    "audio advertising",
    "in-store screens",
    "ADD-LYFT",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Measurable local retail media. Fifteen seconds between songs, ten seconds on screen — where shoppers already are.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "Measurable local retail media, built for store owners and brands.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
