import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Addlyft is a United States marketing company building two products: Go for store owners and Reach for local advertisers. We believe every small store deserves enterprise-level marketing.",
};

const DIFFERENT: [string, string][] = [
  [
    "AI-first",
    "The AI is the engine, not a feature bolted onto an older product. Describing a promotion in a sentence is the whole interface.",
  ],
  [
    "Built for small retail",
    "Not enterprise software scaled down. Built from day one for c-stores, restaurants, liquor stores and smoke shops.",
  ],
  [
    "We pay you back",
    "Addlyft pays store owners $49 a month guaranteed, plus referral commission. Most platforms only ever take.",
  ],
  [
    "A two-sided ecosystem",
    "Owners and advertisers strengthen each other. Every store that joins makes the network worth more to the advertisers, and the other way round.",
  ],
];

const VALUES: [string, string][] = [
  ["Simplicity", "If it takes more than five minutes, we have not done our job."],
  ["Community", "We grow when our store owners and advertisers grow. Not before."],
  ["Transparency", "Clear pricing, honest metrics, no hidden fees — ever."],
];


const TEAM: [string, string, string][] = [
  [
    "Azim",
    "Co-founder · Product",
    "Owns the product vision, the architecture and what actually ships. Writes the specification that everything else is measured against.",
  ],
  [
    "Jishan",
    "Co-founder · Advertiser growth",
    "Builds the demand side — advertiser acquisition, partnerships and the revenue strategy behind Reach.",
  ],
  [
    "Alnoor",
    "Co-founder · Market expansion",
    "Store acquisition, market entry and the go-to-market playbook. Decides which street we open next.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Addlyft"
        accent="plain"
        lines={[
          <span key="ln1">The best local media</span>,
          <span key="ln2">
            was <span key="ln3" className="em">already in the room.</span>
          </span>,
        ]}
        lede="Addlyft is a United States marketing company. We build two products — Go for the people who own the stores, Reach for the local businesses who want to be heard in them — around one belief: every small store deserves the same marketing firepower as a national chain."
        image="street-evening"
        imageAlt="Independent shopfronts on a city street in the evening"
      />

      <section className="bay shell" id="story">
        <div className="split">
          <div className="split__copy">
            <Reveal>
              <span className="kicker">Our story</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem", marginBottom: "1.5rem" }}>
                Two problems that turned out to be one.
              </h2>
            </Reveal>
            <RevealGroup className="prose" stagger={0.06}>
              <RevealItem as="div">
                <p className="t-lead">
                  A neighbourhood store has an audience every single day and no way to earn from
                  it. A local brand has a budget and no honest way to reach the people standing
                  four feet from the shelf.
                </p>
              </RevealItem>
              <RevealItem as="div">
                <p>
                  Both sides had been told the same thing for a decade: put it on a feed, buy
                  impressions, hope. Meanwhile the highest-intent moment in the whole purchase —
                  the minute someone is actually inside a shop with a basket in their hand — went
                  completely unsold, because there was no practical way to buy it. Booking a
                  hundred independent stores meant a hundred conversations, a hundred invoices
                  and no way to prove anything happened.
                </p>
              </RevealItem>
              <RevealItem as="div">
                <p>
                  Addlyft exists to make that moment purchasable and countable. The store keeps
                  its music, its customers and its character, and gains a revenue line it never
                  had. The brand gets a room with a street address instead of a segment with a
                  name. Both sides get the same numbers, which is the part that makes it a
                  network rather than a favour.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
          <div className="split__media">
            <div className="shot shot--tall shot--zoom">
              <Img
                name="storefront-deli"
                alt="The painted facade of an independent grocery and deli"
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bay-sm on-paper2" id="principles">
        <div className="shell">
          <div className="sec-head sec-head--split">
            <div>
              <Reveal>
                <span className="kicker">Why we&rsquo;re different</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                  Four things that are not marketing lines.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-lead">
                Plenty of platforms will sell a small shop advertising. Very few of them were
                designed for one, and almost none of them pay it anything back.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="edge" stagger={0.06}>
            {DIFFERENT.map(([h, p], i) => (
              <RevealItem className="edge__item" key={h}>
                <span className="mono edge__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-d4">{h}</h3>
                <p className="t-sm">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="values">
            {VALUES.map(([h, p], i) => (
              <Reveal className="values__item" delay={i * 0.07} key={h}>
                <h3 className="t-d4">{h}</h3>
                <p className="t-sm">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- founder note */}
      <section className="bay-sm shell" id="founder">
        <Reveal y={22}>
          <figure className="founder">
            <div className="founder__mark" aria-hidden="true">
              A
            </div>
            <blockquote>
              <p>
                &ldquo;I watched store owners work sixteen-hour days and still lose customers to
                the chains — not because their products were worse, but because they could not
                market like them. That ends with Addlyft.&rdquo;
              </p>
              <figcaption>
                <b>Azim</b>
                <span>Founder, Addlyft</span>
              </figcaption>
            </blockquote>
          </figure>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="t-sm founder__note">
            Addlyft was built by an entrepreneur, for entrepreneurs. Every feature was shaped by
            real conversations with real store owners — which is why the pricing is flat, the
            hardware is free and the guarantee exists at all.
          </p>
        </Reveal>
      </section>

      <section className="bay shell" id="team">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Who is building it</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem" }}>
                A small team, split three ways.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Product, demand and distribution — the three things a two-sided network has to get
              right at the same time, each owned outright by one person.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="team" stagger={0.08}>
          {TEAM.map(([name, role, note]) => (
            <RevealItem className="team__member" key={name}>
              <span className="team__initial" aria-hidden="true">
                {name[0]}
              </span>
              <h3 className="t-d4">{name}</h3>
              <span className="mono team__role">{role}</span>
              <p className="t-sm">{note}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <div className="shot shot--cine team__photo">
            <Img
              name="team"
              alt="A small team working together around a table"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </section>

      <CtaBand
        lines={[<span key="ln1">Come and</span>, <span key="ln2" className="em">build the network.</span>]}
        lede="Whether you have a store, a brand or a street you think we should open next — we would like to hear from you."
      />
    </>
  );
}
