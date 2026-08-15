import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "ADD-LYFT is a United States retail media company building two products: Go for store owners and Reach for brands. Our thesis is that the best local advertising happens inside the store.",
};

const PRINCIPLES: [string, string][] = [
  [
    "The store comes first",
    "If the owner would not want the message in their own room, it does not belong on the network. Every rule about competitors, review and playback caps follows from that one sentence.",
  ],
  [
    "Say the real number",
    "A play is a play and an impression is an estimate, and we never present the second as if it were the first. It is slower to sell that way. It is the only version worth building.",
  ],
  [
    "Nothing asked of the shopper",
    "No app, no scan, no account, no data trail followed home. The person buying a coffee is not the product here — the airtime is.",
  ],
  [
    "Built for people with no time",
    "Our customer is already doing three jobs at once. If a feature needs a tutorial, it is not finished.",
  ],
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
        kicker="About ADD-LYFT"
        accent="plain"
        lines={[
          <span key="ln1">The best local media</span>,
          <span key="ln2">
            was <span key="ln3" className="em">already in the room.</span>
          </span>,
        ]}
        lede="ADD-LYFT is a United States retail media company. We build two products — Go for the people who own the stores, Reach for the brands who want to be heard in them — around one belief: attention at the point of purchase is the most valuable and least served moment in local advertising."
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
                  ADD-LYFT exists to make that moment purchasable and countable. The store keeps
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

      <section className="bay on-paper2" id="principles">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="kicker">Principles</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">Four rules we do not trade away.</h2>
            </Reveal>
          </div>

          <RevealGroup className="edge" stagger={0.07}>
            {PRINCIPLES.map(([h, p], i) => (
              <RevealItem className="edge__item" key={h}>
                <span className="mono edge__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-d4">{h}</h3>
                <p className="t-sm">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
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
