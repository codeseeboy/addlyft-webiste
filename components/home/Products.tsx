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
    eyebrow: "Addlyft Go — for store owners",
    titleLines: [
      <span key="g1">Advertise your own store,</span>,
      <span key="g2">
        inside <span key="g3" className="em">your own store.</span>
      </span>,
    ],
    lede: "You own the shop. You want people who walk in to know about the deal on this weekend. Today that means hiring an agency to shoot it, produce it and schedule it. Go replaces all of that with a sentence you type yourself.",
    points: [
      [
        "No agency, no photographer",
        "Describe the promotion in plain English and Addlyft writes the audio read, the screen spot and the social post. Or take one from the free template library and pay nothing for it.",
      ],
      [
        "All three channels, one price",
        "Audio between the songs, video on the screen above your counter, and a post on Facebook and Instagram. They are not sold separately — every store gets all of them.",
      ],
      [
        "A guaranteed floor, not a maybe",
        "$49 a month per active store, paid whether or not an advertiser books your screen. The TV device and the speaker come with the plan.",
      ],
      [
        "Then it starts paying you back",
        "Local advertisers pay to appear in your store, and you keep a share. Introduce one yourself and take up to 40% of their spend, every month they stay.",
      ],
    ],
    spec: ["$99.99 / mo billed annually", "7-day free trial", "$49 / mo guaranteed", "Hardware included"],
    href: "/go",
    cta: "Explore Addlyft Go",
    big: { name: "store-live-cafe", alt: "A shop's own promotion running on its in-store screen" },
    small: { name: "counter-pos", alt: "A customer paying at a small store counter" },
  },
  {
    key: "reach",
    eyebrow: "Addlyft Reach — for advertisers",
    titleLines: [
      <span key="r1">Advertise your business</span>,
      <span key="r2">
        inside <span key="r3" className="em">somebody else&rsquo;s store.</span>
      </span>,
    ],
    lede: "You are the auto dealer, the dentist, the estate agent. Your customers are already standing in the convenience store down the road. Reach puts you on that screen and that speaker — without knocking on a single door yourself.",
    points: [
      [
        "Pick the actual stores",
        "Browse the network and hand-select the shops you want to appear in. Addresses on a map, not a lookalike audience.",
      ],
      [
        "Two channels, run separately",
        "A 10-second silent spot on the screen, running through the day. A 15-second audio read between songs on the speaker. Different schedules, on purpose.",
      ],
      [
        "From five stores upward",
        "Plans start at $29.99 a month covering five stores, and scale to ninety plays a day per store. Volume discounts reach 50% and apply automatically.",
      ],
      [
        "Your competitors are removed",
        "Stores in your own category come off your list automatically. You never pay to advertise inside a rival.",
      ],
    ],
    spec: ["From $29.99 / mo", "Minimum 5 stores", "15s audio · 10s screen", "Up to 50% volume discount"],
    href: "/reach",
    cta: "Explore Addlyft Reach",
    big: { name: "store-live-realestate", alt: "A local estate agent's ad playing inside a shop" },
    small: { name: "reach-auto", alt: "A car on display in a dealership showroom" },
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
          <span className="kicker">Two products, one ecosystem</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-d2 prods__head-t">
            Built for two audiences. Connected by <span className="em">one platform.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead measure">
            The difference is simply whose store it is. Go is a shop advertising itself. Reach is a
            business advertising inside a shop it does not own. Same screens, same speakers,
            opposite directions — and the store gets paid either way.
          </p>
        </Reveal>
      </div>

      {PANELS.map((p, i) => (
        <Panel panel={p} index={i} key={p.key} />
      ))}
    </section>
  );
}
