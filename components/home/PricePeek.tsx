"use client";

import Link from "next/link";
import { Arrow } from "@/components/site/Brand";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { GO_PLANS, REACH_FACTS } from "@/lib/pricing";

export default function PricePeek() {
  return (
    <section className="peek bay" id="pricing">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Pricing</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Two sides, two</span>,
                  <span key="ln2">
                    <span key="ln3" className="em">honest price lists.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Store owners subscribe by location. Brands pay for stores and plays. Nobody signs a
              twelve-month insertion order to find out what a fifteen-second message costs.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="peek__plans" stagger={0.08}>
          {GO_PLANS.map((p) => (
            <RevealItem key={p.id}>
              <article className="plan" data-featured={!!p.featured}>
                <header className="plan__head">
                  <span className="mono plan__name">{p.name}</span>
                  {p.featured && <span className="tag tag--teal">Most chosen</span>}
                </header>
                <p className="plan__price">
                  {p.price}
                  <span>{p.cadence}</span>
                </p>
                <p className="t-sm plan__blurb">{p.blurb}</p>
                <ul className="plan__channels">
                  {p.channels.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="peek__reach">
          <Reveal>
            <div className="peek__reach-copy">
              <span className="kicker kicker--reach">For brands · Reach</span>
              <h3 className="t-d3" style={{ marginTop: "1rem" }}>
                Campaigns start at five stores and scale by plays.
              </h3>
              <p className="t-sm" style={{ marginTop: "0.85rem", maxWidth: "46ch" }}>
                You choose the stores and the volume; the cost per thousand is shown beside every
                option before anything is confirmed. Founding advertisers take 50% off their first
                cycle.
              </p>
              <div className="btn-row" style={{ marginTop: "1.6rem" }}>
                <Link href="/pricing" className="btn">
                  See full pricing
                  <Arrow className="btn__ico" />
                </Link>
                <Link href="/contact?intent=brand" className="tlink tlink--reach">
                  Talk to the team
                  <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="peek__facts">
              {REACH_FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
