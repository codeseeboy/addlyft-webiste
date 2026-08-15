"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Img from "@/components/site/Img";
import { EASE, LineReveal, Reveal } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

/**
 * Two columns, because there are two audiences — the shops that host the
 * screens and the businesses that buy time on them. Both lists are the ones
 * named on the call.
 */

type Row = { name: string; note: string; img: ImageKey; alt: string };

const HOSTS: Row[] = [
  {
    name: "Convenience & c-store",
    note: "Daily deals, new arrivals, the lottery counter. The highest-frequency room on the network.",
    img: "cat-cstore",
    alt: "A customer choosing a drink from a lit cooler",
  },
  {
    name: "Gas & fuel",
    note: "A stop that has to happen, with a shop attached to it.",
    img: "cat-gas",
    alt: "A fuel station forecourt at dusk",
  },
  {
    name: "Liquor & smoke shops",
    note: "Weekend specials, new spirits, tasting events — to people already at the counter.",
    img: "bodega",
    alt: "Shelves inside a neighbourhood store",
  },
  {
    name: "Restaurants & cafés",
    note: "Lunch specials and happy hour, in front of the queue that is already forming.",
    img: "cat-cafe",
    alt: "Customers at the counter of a busy café",
  },
  {
    name: "Salon & barbershop",
    note: "Half an hour in a chair with the music on. The longest dwell time in local retail.",
    img: "cat-salon",
    alt: "Barbers cutting hair in a modern shop",
  },
  {
    name: "Pharmacy",
    note: "A queue and a decision people take seriously. Trust carries furthest here.",
    img: "cat-pharmacy",
    alt: "A well-stocked neighbourhood pharmacy",
  },
];

const ADVERTISERS: Row[] = [
  {
    name: "Auto dealers",
    note: "Showroom visits and seasonal sales events, in front of people two minutes away.",
    img: "reach-auto",
    alt: "A car on display in a dealership showroom",
  },
  {
    name: "Real estate agents",
    note: "New listings and Sunday open houses, in the shops the neighbourhood walks into.",
    img: "reach-realestate",
    alt: "A house with a for-sale sign in the front yard",
  },
  {
    name: "Healthcare providers",
    note: "Clinics, dentists and practices introducing themselves to the street they sit on.",
    img: "reach-health",
    alt: "A dentist talking with a patient in a bright clinic",
  },
  {
    name: "Trades & home services",
    note: "Plumbers, electricians, cleaners and roofers — found late, and usually by asking around.",
    img: "reach-home",
    alt: "A house on a quiet residential street",
  },
];

function Column({
  eyebrow,
  title,
  rows,
  accent,
}: {
  eyebrow: string;
  title: string;
  rows: Row[];
  accent: "teal" | "reach";
}) {
  const [i, setI] = useState(0);
  const row = rows[i];

  return (
    <div className="vencol" data-accent={accent}>
      <header className="vencol__head">
        <span className={`kicker kicker--${accent}`}>{eyebrow}</span>
        <h3 className="t-d3">{title}</h3>
      </header>

      <div className="vencol__frame">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={row.img}
            className="vencol__img"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Img name={row.img} alt={row.alt} sizes="(max-width: 900px) 100vw, 40vw" />
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="vencol__list">
        {rows.map((r, k) => (
          <li key={r.name}>
            <button
              data-on={k === i}
              onMouseEnter={() => setI(k)}
              onFocus={() => setI(k)}
              onClick={() => setI(k)}
              aria-pressed={k === i}
            >
              <span className="vencol__name">{r.name}</span>
              <span className="vencol__note t-xs">{r.note}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Venues() {
  return (
    <section className="ven bay on-paper2" id="venues">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Who it is for</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "0.9rem" }}>
              <LineReveal
                lines={[
                  <span key="v1">Built for every business</span>,
                  <span key="v2">
                    in your <span key="v3" className="em">neighbourhood.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              One side hosts the screens and gets paid for it. The other side buys time on
              them. Most towns have plenty of both, and until now no practical way to connect
              the two.
            </p>
          </Reveal>
        </div>

        <div className="ven__cols">
          <Reveal y={20}>
            <Column
              eyebrow="Hosts with Addlyft Go"
              title="Shops that carry the screen"
              rows={HOSTS}
              accent="teal"
            />
          </Reveal>
          <Reveal y={20} delay={0.08}>
            <Column
              eyebrow="Advertises with Addlyft Reach"
              title="Businesses that buy the time"
              rows={ADVERTISERS}
              accent="reach"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
