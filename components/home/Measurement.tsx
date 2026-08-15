"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Counter, EASE, LineReveal, Reveal } from "@/components/site/Motion";

/** Illustrative shape of a trading day — labelled as such under the figure. */
const HOURS: [string, number][] = [
  ["6", 18], ["7", 42], ["8", 64], ["9", 51], ["10", 46], ["11", 58],
  ["12", 78], ["13", 71], ["14", 55], ["15", 60], ["16", 74], ["17", 92],
  ["18", 100], ["19", 86], ["20", 68], ["21", 47], ["22", 31], ["23", 19],
];

const POINTS = [
  {
    h: "Every play is a logged event",
    p: "A message is counted when the device in the room actually plays it — not when a server decides it probably did.",
  },
  {
    h: "Store, hour and channel attached",
    p: "Performance breaks down by location and by time of day, so a campaign can be moved to the hours that work instead of guessed at.",
  },
  {
    h: "Reach from real footfall",
    p: "Audience figures start from the store's own daily visitor band. No modelled panels, no borrowed demographics.",
  },
];

export default function Measurement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <section className="meas bay on-night" id="measurement">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--night">Measurement</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Counted where it happened.</span>,
                  <span key="ln2">
                    <span key="ln3" className="em">Not estimated afterwards.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead meas__lede">
              Local advertising has always ended with a shrug — a flyer, a banner, a hope. The
              point of putting media inside a room you control is that you can count what came
              out of the speaker, and say so plainly to both sides of the network.
            </p>
          </Reveal>
        </div>

        <div className="meas__body">
          <figure className="meas__fig" ref={ref}>
            <figcaption className="meas__fig-head">
              <span className="mono">Plays by hour · single store · one trading day</span>
              <span className="meas__fig-peak">Peak 5–7pm</span>
            </figcaption>

            <div className="meas__chart">
              <div className="meas__grid" aria-hidden="true">
                {[100, 75, 50, 25, 0].map((g) => (
                  <span key={g} style={{ bottom: `${g}%` }}>
                    <i />
                  </span>
                ))}
              </div>

              <div className="meas__bars">
                {HOURS.map(([hour, v], i) => (
                  <motion.div
                    className="meas__bar"
                    key={hour}
                    data-peak={v >= 92}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={inView || reduce ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.05 + i * 0.028 }}
                    style={{ height: `${v}%` }}
                  >
                    <span className="meas__bar-v mono num">{v}</span>
                  </motion.div>
                ))}
              </div>

              <div className="meas__axis" aria-hidden="true">
                {HOURS.map(([hour], i) => (
                  <span key={hour}>{i % 3 === 0 ? `${hour}:00` : ""}</span>
                ))}
              </div>
            </div>

            <p className="meas__note t-xs">
              Illustrative distribution of a typical convenience-store day. Live campaign figures
              are reported per store inside Reach.
            </p>
          </figure>

          <div className="meas__side">
            {POINTS.map((p, i) => (
              <Reveal className="meas__point" delay={i * 0.08} key={p.h}>
                <h3 className="t-d4">{p.h}</h3>
                <p className="t-sm">{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="stats stats--night meas__stats">
          {[
            { v: <Counter to={15} suffix="s" />, l: "Spoken audio, the standard message length" },
            { v: <Counter to={10} suffix="s" />, l: "On-screen spot, inside the same break" },
            { v: <Counter to={2} />, l: "Messages per break — never a commercial block" },
            { v: <Counter to={49} prefix="$" />, l: "Guaranteed monthly floor on the Full Bundle plan" },
          ].map((s, i) => (
            <Reveal className="stat" delay={i * 0.06} key={s.l}>
              <span className="stat__v">{s.v}</span>
              <span className="stat__l">{s.l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
