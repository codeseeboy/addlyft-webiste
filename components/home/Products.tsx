"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Img from "@/components/site/Img";
import { Arrow } from "@/components/site/Brand";
import { EASE, LineReveal, Reveal } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

/**
 * Go and Reach are the same network seen from opposite sides, so the page used
 * to explain them as two long stacked essays — which read as one template
 * printed twice and buried the distinction under 2,400px of scroll.
 *
 * They are now one panel behind a switcher. Choosing between them is the first
 * decision a visitor has to make, so the page asks it as a question and answers
 * it in place, instead of asking the reader to hold both essays in their head.
 */

type Key = "go" | "reach";

type Panel = {
  key: Key;
  tab: string;
  tabNote: string;
  titleLines: React.ReactNode[];
  lede: string;
  /** One line each. If a benefit needs a paragraph it belongs on the product page. */
  points: [string, string][];
  spec: string[];
  href: string;
  cta: string;
  shot: { name: ImageKey; alt: string };
  badge: string;
};

const PANELS: Panel[] = [
  {
    key: "go",
    tab: "I own a store",
    tabNote: "Addlyft Go",
    titleLines: [
      <span key="g1">Advertise your own store,</span>,
      <span key="g2">
        inside{" "}
        <span key="g3" className="em">
          your own store.
        </span>
      </span>,
    ],
    lede:
      "Type the promotion in plain English. Addlyft writes the audio read, builds the screen spot and posts to social — no agency, no photographer, no separate subscriptions.",
    points: [
      ["Describe it, don't produce it", "One sentence becomes all three ads."],
      ["Audio, screen and social", "All included — never sold separately."],
      ["$49 a month, guaranteed", "Paid whether or not anyone books your screen."],
      ["Hardware on us", "In-store TV and speaker come with the plan."],
    ],
    spec: ["$99.99 / mo billed annually", "7-day free trial", "Hardware included"],
    href: "/go",
    cta: "Explore Addlyft Go",
    shot: {
      name: "store-counter-tv",
      alt: "A convenience store checkout counter with a promotional TV screen and speaker",
    },
    badge: "Store side",
  },
  {
    key: "reach",
    tab: "I want to advertise",
    tabNote: "Addlyft Reach",
    titleLines: [
      <span key="r1">Advertise your business</span>,
      <span key="r2">
        inside{" "}
        <span key="r3" className="em">
          somebody else&rsquo;s store.
        </span>
      </span>,
    ],
    lede:
      "You are the auto dealer, the dentist, the estate agent. Your customers are already standing in the shop down the road. Reach puts you on that screen and that speaker.",
    points: [
      ["Pick the actual stores", "Addresses on a map, not a lookalike audience."],
      ["Screen and speaker", "10-second silent spot, 15-second audio read."],
      ["From five stores up", "$29.99 a month to start, scaling to 90 plays a day."],
      ["No rivals in your aisle", "Same-category stores drop off your list automatically."],
    ],
    spec: ["From $29.99 / mo", "Minimum 5 stores", "Up to 50% volume discount"],
    href: "/reach",
    cta: "Explore Addlyft Reach",
    shot: { name: "reach-auto-showroom", alt: "A modern auto dealership showroom" },
    badge: "Advertiser side",
  },
];

function PanelBody({ panel }: { panel: Panel }) {
  return (
    <div className={`prod__in prod__in--${panel.key}`}>
      <div className="prod__copy">
        <h3 className="t-d1 prod__title">
          <LineReveal lines={panel.titleLines} trigger="mount" duration={0.8} />
        </h3>

        <p className="t-lead prod__lede">{panel.lede}</p>

        <ul className="prod__points">
          {panel.points.map(([h, p]) => (
            <li className="prod__point" key={h}>
              <b>{h}</b>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="prod__foot">
          <Link
            href={panel.href}
            className={`btn ${panel.key === "go" ? "btn--teal" : "btn--reach"} btn--lg`}
          >
            {panel.cta}
            <Arrow className="btn__ico" />
          </Link>
          <ul className="prod__spec">
            {panel.spec.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="prod__shot">
        <Img name={panel.shot.name} alt={panel.shot.alt} sizes="(max-width: 900px) 100vw, 46vw" />
        <figcaption className="prod__badge">
          <span>{panel.key === "go" ? "Go" : "Re"}</span>
          {panel.badge}
        </figcaption>
      </figure>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState<Key>("go");
  const reduce = useReducedMotion();
  const panel = PANELS.find((p) => p.key === active)!;

  return (
    <section className="prods bay" id="products">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Two products, one ecosystem</span>
            </Reveal>
            <h2 className="t-d1 prods__head-t">
              <LineReveal
                lines={[
                  <span key="p1">Which side of the</span>,
                  <span key="p2">
                    counter are <span className="em">you on?</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              The difference is simply whose store it is. Go is a shop advertising itself. Reach is
              a business advertising inside a shop it does not own. Same screens, same speakers —
              and the store gets paid either way.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="prods__switch" role="tablist" aria-label="Choose your product">
            {PANELS.map((p) => (
              <button
                key={p.key}
                role="tab"
                id={`tab-${p.key}`}
                aria-selected={active === p.key}
                aria-controls={`panel-${p.key}`}
                /* Only the selected tab is in the tab order; the arrow keys move
                   between them. That is what `role="tablist"` promises. */
                tabIndex={active === p.key ? 0 : -1}
                data-on={active === p.key}
                data-key={p.key}
                className="prods__tab"
                onClick={() => setActive(p.key)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                  e.preventDefault();
                  const next = PANELS[(PANELS.indexOf(p) + 1) % PANELS.length];
                  setActive(next.key);
                  document.getElementById(`tab-${next.key}`)?.focus();
                }}
              >
                {active === p.key && !reduce && (
                  <motion.span
                    className="prods__tab-bg"
                    layoutId="prods-tab-bg"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="prods__tab-in">
                  {p.tab}
                  <em>{p.tabNote}</em>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          className={`prod prod--${panel.key}`}
          role="tabpanel"
          id={`panel-${panel.key}`}
          aria-labelledby={`tab-${panel.key}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={panel.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <PanelBody panel={panel} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
