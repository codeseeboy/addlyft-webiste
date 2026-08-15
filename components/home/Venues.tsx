"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Img from "@/components/site/Img";
import { EASE, LineReveal, Reveal } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

type Venue = {
  name: string;
  dwell: string;
  line: string;
  img: ImageKey;
  alt: string;
};

const VENUES: Venue[] = [
  {
    name: "Convenience & c-store",
    dwell: "3–8 min",
    line: "A drink, a snack, a lottery ticket. The highest-frequency room on the network, and the one people visit without planning to.",
    img: "cat-cstore",
    alt: "A customer choosing a drink from a lit cooler in a convenience store",
  },
  {
    name: "Gas & fuel",
    dwell: "5–10 min",
    line: "A stop that has to happen, with a store attached. People come in for one thing and leave with three.",
    img: "cat-gas",
    alt: "A fuel station forecourt lit at dusk",
  },
  {
    name: "Salon & barbershop",
    dwell: "30–60 min",
    line: "Half an hour in a chair with the music on and nowhere else to be. The longest dwell time in local retail.",
    img: "cat-salon",
    alt: "Barbers cutting hair in a busy modern shop",
  },
  {
    name: "Pharmacy",
    dwell: "6–15 min",
    line: "A queue, a wait, and a decision people take seriously. Trust carries further here than anywhere on the list.",
    img: "cat-pharmacy",
    alt: "A well-stocked neighbourhood pharmacy",
  },
  {
    name: "Café & quick service",
    dwell: "4–20 min",
    line: "Morning rush, same faces, same hour. The most repeatable audience a local business can put a message in front of.",
    img: "cat-cafe",
    alt: "Customers at the counter of a busy café",
  },
  {
    name: "Laundromat",
    dwell: "30–90 min",
    line: "An hour with genuinely nothing to do. Nobody scrolls past a wash cycle — they sit inside it.",
    img: "cat-laundromat",
    alt: "Rows of machines and carts inside a laundromat",
  },
];

export default function Venues() {
  const [i, setI] = useState(0);
  const v = VENUES[i];

  return (
    <section className="ven bay on-paper2" id="venues">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Where it runs</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Ordinary rooms.</span>,
                  <span key="ln2">
                    <span key="ln3" className="em">Extraordinary attention.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Every venue on the network was chosen for one reason: people are already inside it,
              already unhurried, already about to spend. Dwell time is the whole product.
            </p>
          </Reveal>
        </div>

        <div className="ven__body">
          <ul className="ven__list">
            {VENUES.map((venue, k) => (
              <li key={venue.name}>
                <button
                  className="ven__row"
                  data-on={k === i}
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  onClick={() => setI(k)}
                  aria-pressed={k === i}
                >
                  <span className="mono ven__row-n">{String(k + 1).padStart(2, "0")}</span>
                  <span className="ven__row-name">{venue.name}</span>
                  <span className="mono ven__row-d num">{venue.dwell}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="ven__stage">
            <div className="ven__frame">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={v.img}
                  className="ven__img"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Img name={v.img} alt={v.alt} sizes="(max-width: 900px) 100vw, 42vw" />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figcaption
                key={v.name}
                className="ven__cap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="t-d4">{v.name}</h3>
                <p className="t-sm">{v.line}</p>
                <span className="mono ven__cap-d">Typical dwell · {v.dwell}</span>
              </motion.figcaption>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
