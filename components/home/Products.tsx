"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Img from "@/components/site/Img";
import { Arrow } from "@/components/site/Brand";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

type Panel = {
  key: "go" | "reach";
  eyebrow: string;
  titleLines: React.ReactNode[];
  lede: string;
  points: [string, string][];
  spec: string[];
  href: string;
  cta: string;
  big: { name: ImageKey; alt: string };
  small: { name: ImageKey; alt: string };
};

const PANELS: Panel[] = [
  {
    key: "go",
    eyebrow: "ADD-LYFT Go — for store owners",
    titleLines: [
      <>Your store already has</>,
      <>
        an audience. Now it has <span className="em">an income.</span>
      </>,
    ],
    lede: "Go is the side of ADD-LYFT built for the person behind the counter. Set the store up once, keep your own music, and let the airtime you were already paying for start earning.",
    points: [
      [
        "A guaranteed floor, not a maybe",
        "On the Full Bundle plan, $49 a month per active store — paid whether or not an advertiser books your aisle that month. We carry that risk, not you.",
      ],
      [
        "Promote your own business too",
        "Ready-made promotions and your own audio, screen and social posts — scheduled by day and time slot, from one screen.",
      ],
      [
        "Earn from who you introduce",
        "Bring a local advertiser onto the network with your referral code and take up to 40% of what they spend, for as long as they stay active.",
      ],
      [
        "Numbers in plain English",
        "Plays today, people reached, best hours of the week. No dashboards you need a course to read.",
      ],
    ],
    spec: ["From $39.99 / month", "7-day free trial", "$49 / month guaranteed", "Zero setup work"],
    href: "/go",
    cta: "Explore Go",
    big: { name: "owner-shop", alt: "A shop owner behind the counter of her store" },
    small: { name: "counter-pos", alt: "A customer paying at a small store counter" },
  },
  {
    key: "reach",
    eyebrow: "ADD-LYFT Reach — for brands",
    titleLines: [
      <>Buy the last three feet,</>,
      <>
        not another <span className="em">impression.</span>
      </>,
    ],
    lede: "Reach is the buying side. Choose the actual stores your customers walk into, run audio and screen together, and watch the plays land store by store — without an agency in the middle.",
    points: [
      [
        "Stores, not abstractions",
        "Pick locations by neighbourhood, category and daily footfall. You are choosing rooms on a map, not a lookalike segment.",
      ],
      [
        "Two formats, one break",
        "Fifteen seconds spoken, ten seconds on screen. Run either, or run both inside the same rotation for the same shopper.",
      ],
      [
        "Your competitors are removed",
        "Stores in your own category are taken off your list automatically. A café never carries a rival café — that is a network rule.",
      ],
      [
        "Counted, not modelled",
        "Every play is logged by the device that ran it, with the store and the hour attached. Impressions come from footfall you can see.",
      ],
    ],
    spec: ["15s audio · 10s screen", "From 5 stores", "Live performance data", "Self-serve setup"],
    href: "/reach",
    cta: "Explore Reach",
    big: { name: "screens-wall", alt: "A wall of bright in-store display screens" },
    small: { name: "foodtruck", alt: "Customers ordering from a local food business" },
  },
];

function Panel({ panel, index }: { panel: Panel; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [-26, 34]);

  return (
    <article className={`prod prod--${panel.key}`} ref={ref} id={panel.key}>
      <div className="shell prod__in">
        <div className="prod__copy">
          <Reveal>
            <span className={`kicker kicker--${panel.key === "go" ? "teal" : "reach"}`}>
              {panel.eyebrow}
            </span>
          </Reveal>

          <h2 className="t-d1 prod__title">
            <LineReveal lines={panel.titleLines} />
          </h2>

          <Reveal delay={0.08}>
            <p className="t-lead prod__lede">{panel.lede}</p>
          </Reveal>

          <RevealGroup className="prod__points">
            {panel.points.map(([h, p], k) => (
              <RevealItem className="prod__point" key={h}>
                <span className="mono prod__point-n">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-d4">{h}</h3>
                  <p className="t-sm">{p}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.05}>
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
          </Reveal>
        </div>

        <div className="prod__media">
          <motion.figure
            className="prod__shot prod__shot--big"
            style={reduce ? undefined : { y }}
          >
            <Img
              name={panel.big.name}
              alt={panel.big.alt}
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <figcaption className="prod__badge">
              <span>{panel.key === "go" ? "Go" : "Reach"}</span>
              {panel.key === "go" ? "Store side" : "Brand side"}
            </figcaption>
          </motion.figure>

          <motion.figure
            className="prod__shot prod__shot--small"
            style={reduce ? undefined : { y: ySmall }}
          >
            <Img
              name={panel.small.name}
              alt={panel.small.alt}
              sizes="(max-width: 900px) 45vw, 22vw"
            />
          </motion.figure>

          <span className="prod__index mono" aria-hidden="true">
            0{index + 1}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <section className="prods" id="products">
      <div className="shell prods__head">
        <Reveal>
          <span className="kicker">Two products, one network</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-d2 prods__head-t">
            ADD-LYFT is the company. <span className="em">Go</span> and{" "}
            <span className="em">Reach</span> are the two sides of the same street.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead measure">
            One network, two jobs. Stores supply the room and the audience. Brands supply the
            message and the budget. ADD-LYFT keeps the exchange fair, measurable and pleasant to
            stand inside.
          </p>
        </Reveal>
      </div>

      {PANELS.map((p, i) => (
        <Panel panel={p} index={i} key={p.key} />
      ))}
    </section>
  );
}
