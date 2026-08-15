"use client";

import Link from "next/link";
import UsMap from "@/components/site/UsMap";
import { Arrow } from "@/components/site/Brand";
import { Counter, LineReveal, Reveal } from "@/components/site/Motion";

export default function Network() {
  return (
    <section className="net bay" id="network">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">The network</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Built for the whole country,</span>,
                  <span key="ln2">
                    <span key="ln3" className="em">one street at a time.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Addlyft is a United States network of independent businesses — the corner store,
              the fuel stop, the salon, the laundromat. We switch stores on market by market, so
              every advertiser who opens a campaign finds real rooms with real footfall.
            </p>
          </Reveal>
        </div>

        <div className="net__body">
          <Reveal className="net__mapwrap" y={30}>
            <UsMap />
          </Reveal>

          <div className="net__side">
            <Reveal>
              <div className="net__figure">
                <span className="net__figure-v">
                  <Counter to={20} suffix="+" />
                </span>
                <span className="t-sm">
                  metro markets in the first wave, chosen for density of independent retail
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="net__figure">
                <span className="net__figure-v">
                  <Counter to={5000} prefix="up to " />
                </span>
                <span className="t-sm">
                  daily visits in a single high-traffic location on the network
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="net__figure">
                <span className="net__figure-v">
                  <Counter to={5} />
                </span>
                <span className="t-sm">
                  stores is the smallest campaign — enough to matter, small enough to try
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="net__cta">
                <p className="t-sm">
                  Opening a market near you, or want your street on the map first?
                </p>
                <Link href="/network" className="tlink">
                  See the network
                  <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
