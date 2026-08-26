import Link from "next/link";
import { Arrow, BrandMark, Wordmark } from "./Brand";

const COLS = [
  {
    title: "Products",
    links: [
      { href: "/go", label: "Addlyft Go" },
      { href: "/reach", label: "Addlyft Reach" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/network", label: "Store network" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#story", label: "Our story" },
      { href: "/about#principles", label: "Principles" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: "/contact?intent=store", label: "List your store" },
      { href: "/contact?intent=advertiser", label: "Advertise with Reach" },
      { href: "/contact?intent=partner", label: "Partnerships" },
      { href: "/contact?intent=press", label: "Press" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="shell-wide">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <span className="brand">
              <Wordmark />
            </span>
            <p className="ftr__tag">The marketing platform small retail has been waiting for.</p>
            <p className="t-sm" style={{ color: "var(--night-ink-2)" }}>
              AI-powered marketing for small retail — built for the people behind the counter and the local businesses who want to be heard in them.
            </p>
            <Link href="/contact" className="tlink tlink--night" style={{ marginTop: "0.35rem" }}>
              Start a conversation
              <Arrow />
            </Link>
          </div>

          {COLS.map((col) => (
            <div className="ftr__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ftr__bar">
          <span>© {new Date().getFullYear()} Addlyft. All rights reserved.</span>
          <span className="ftr__bar-links">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <span>United States</span>
          </span>
        </div>
      </div>

      {/*
       * The brand reveal at the end of the scroll — the client liked how
       * Anthropic shows its mark on the way down. Same lockup as the header,
       * at full width: the A is the logo and the type carries on from it.
       */}
      <div className="ftr__word" aria-hidden="true">
        <span className="ftr__word-mark">
          <BrandMark className="" />
        </span>
        <span className="ftr__word-type">
          <span className="ftr__word-pale">dd</span>lyft
        </span>
      </div>
    </footer>
  );
}
