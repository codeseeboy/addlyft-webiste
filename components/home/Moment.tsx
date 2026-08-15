"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Img from "@/components/site/Img";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";

const ARGUMENT = [
  {
    n: "01",
    h: "The audience is already standing there",
    p: "Nobody walks into a store to avoid it. Footfall is the audience, the aisle is the venue, and the store is open whether or not anyone is scrolling.",
  },
  {
    n: "02",
    h: "Distance to purchase: zero",
    p: "A message heard beside the cooler can be acted on in four steps. No click, no landing page, no second session, no hoping they remember tomorrow.",
  },
  {
    n: "03",
    h: "Nothing for the shopper to do",
    p: "No app, no QR code, no opt-in, no account. The room carries the message. That is why it reaches people other local media never touches.",
  },
];

export default function Moment() {
  const figRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: figRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="moment bay" id="why">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">The moment</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Local advertising is everywhere</span>,
                  <span key="ln2">
                    except <span key="ln3" className="em">where it matters.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.12}>
            <p className="t-lead">
              A neighbourhood business buys impressions on a feed somebody scrolls past on the
              sofa. The decision it actually wanted to influence happens somewhere else
              entirely — three feet from the shelf, basket already in hand.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="moment__fig" ref={figRef}>
        <div className="moment__fig-frame">
          <motion.div className="moment__fig-move" style={reduce ? undefined : { y: imgY }}>
            <Img
              name="reach-moment"
              alt="A shopper pausing at a shelf, hand on a product"
              sizes="100vw"
            />
          </motion.div>
        </div>

        <Reveal className="moment__quote" delay={0.1}>
          <blockquote>
            <p>
              The last three feet is the only place a message can end at the{" "}
              <span className="em">register.</span>
            </p>
            <cite>ADD-LYFT — why we build for the floor, not the feed</cite>
          </blockquote>
        </Reveal>
      </div>

      <div className="shell">
        <RevealGroup className="moment__args">
          {ARGUMENT.map((a) => (
            <RevealItem className="moment__arg" key={a.n}>
              <span className="mono moment__arg-n">{a.n}</span>
              <h3 className="t-d4">{a.h}</h3>
              <p className="t-sm">{a.p}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
