"use client";

import { Counter, LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { GO_PRICE } from "@/lib/pricing";

/**
 * "The Addlyft Ecosystem" — lifted from the client's own reference site.
 * Three steps, because the whole business only makes sense as a loop: the
 * store joins Go, the advertiser joins Reach, and each one makes the other
 * worth more.
 */

const STEPS: [string, string, string][] = [
  [
    "Store owner joins Go",
    "Gets the tools to make audio, video and social ads for their own shop — and $49 a month guaranteed just for being on the network.",
    "go",
  ],
  [
    "Advertiser joins Reach",
    "Picks the stores they want, chooses a plan, and places audio and video ads inside those shops.",
    "reach",
  ],
  [
    "Both sides win",
    "The store earns passive income on top of better marketing. The advertiser reaches real shoppers at the exact moment they are buying.",
    "both",
  ],
];

const STATS: { v: React.ReactNode; l: string }[] = [
  { v: <Counter to={49} prefix="$" />, l: "Guaranteed monthly revenue, every active store" },
  { v: <Counter to={40} suffix="%" />, l: "Referral commission, for as long as they stay" },
  { v: <Counter to={5} suffix=" min" />, l: "Average setup time for a new store" },
  { v: <Counter to={GO_PRICE.trialDays} suffix=" days" />, l: "Free trial, no card required" },
];

export default function Ecosystem() {
  return (
    <section className="eco bay" id="ecosystem">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">The Addlyft ecosystem</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "0.9rem" }}>
              <LineReveal
                lines={[
                  <span key="e1">Two sides that make</span>,
                  <span key="e2">
                    each other <span key="e3" className="em">worth more.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Store owners and advertisers are not two separate products bolted together. Each
              one is the reason the other works — a self-sustaining local marketing network that
              gets stronger every time a shop joins.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="eco__flow" stagger={0.09}>
          {STEPS.map(([h, p, kind], i) => (
            <RevealItem className="eco__step" key={h} as="div">
              <div className="eco__card" data-kind={kind}>
                <span className="mono eco__n">Step {i + 1}</span>
                <h3 className="t-d4">{h}</h3>
                <p className="t-sm">{p}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="eco__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 12" fill="none">
                    <path
                      d="M0 6h21M17 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="stats eco__stats">
          {STATS.map((s, i) => (
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
