import Link from "next/link";
import { Arrow, BrandMark } from "./Brand";

const COLS = [
  {
    title: "Products",
    links: [
      { href: "/go", label: "ADD-LYFT Go" },
      { href: "/reach", label: "ADD-LYFT Reach" },
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
      { href: "/contact?intent=brand", label: "Run a campaign" },
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
            <span className="brand" style={{ color: "var(--night-ink)" }}>
              <BrandMark />
              ADD-LYFT
            </span>
            <p className="ftr__tag">Grow Local. Reach Further.</p>
            <p className="t-sm" style={{ color: "var(--night-ink-2)" }}>
              Measurable local retail media — built for the people behind the counter and the
              brands who want to stand beside them.
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
          <span>© {new Date().getFullYear()} ADD-LYFT. All rights reserved.</span>
          <span className="ftr__bar-links">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <span>United States</span>
          </span>
        </div>
      </div>

      <div className="ftr__word" aria-hidden="true">
        <svg viewBox="0 0 1000 128" preserveAspectRatio="xMidYMax meet">
          <text
            className="w-fill"
            x="0"
            y="112"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--f-sans)"
            fontSize="140"
            fontWeight="600"
            letterSpacing="-6"
          >
            ADD-LYFT
          </text>
        </svg>
      </div>
    </footer>
  );
}
