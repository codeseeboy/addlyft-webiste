import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Arrow } from "@/components/site/Brand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { ReachEstimator, ReachPlanGrid, VolumeTable } from "@/components/pricing/ReachPlans";
import { REACH_BASE_STORES, REACH_PLANS, money } from "@/lib/pricing";
import type { ImageKey } from "@/lib/images";
import AdStudio from "@/components/home/AdStudio";

export const metadata: Metadata = {
  title: "Addlyft Reach — for advertisers",
  description:
    "Advertise your business inside real local stores. Pick the exact locations, run 15-second audio and 10-second screen ads, from $29.99 a month across five stores.",
};

/* Exactly the advertisers named on the call. */
const WHO: { name: string; note: string; img: ImageKey; alt: string }[] = [
  {
    name: "Auto dealers",
    note: "Put the showroom in front of people two minutes down the road, every day of the week.",
    img: "reach-auto-showroom",
    alt: "A car on display in a dealership showroom",
  },
  {
    name: "Real estate agents",
    note: "New listing, open house this Sunday — in the shops the neighbourhood actually walks into.",
    img: "reach-realestate-house",
    alt: "A house with a for-sale sign in the front yard",
  },
  {
    name: "Healthcare providers",
    note: "Clinics, dentists and practices introducing themselves to the street they sit on.",
    img: "reach-health",
    alt: "A dentist talking with a patient in a bright clinic",
  },
  {
    name: "Trades & services",
    note: "Plumbers, electricians, cleaners and roofers — the businesses people look up only when they need one.",
    img: "counter-pos",
    alt: "A local business owner serving a customer at the counter",
  },
];

const STEPS: [string, string][] = [
  [
    "Pick the stores",
    "Browse the network and hand-select the shops you want to be in. No radius restrictions, no lookalike audiences — you are choosing addresses on a map.",
  ],
  [
    "Bring or build the ad",
    "Upload what you already have, or let Addlyft build it. A 10-second screen spot, a 15-second audio read, or both.",
  ],
  [
    "Set the frequency",
    "Your plan decides how many times a day your ad plays in each store — from 5 plays a day up to 90.",
  ],
  [
    "Watch it land",
    "Campaigns go live within 48 hours of submission, then plays report back store by store and hour by hour — so budget can move toward the locations that are working.",
  ],
];

const EDGE: [string, string][] = [
  [
    "Cross Audio and Cross Video, run separately",
    "Cross Video runs continuously on the screen through the day with no sound. Cross Audio is a separate 15-second read between songs on the speaker. They are not one synchronised ad — they are two ways to be in the room, and every plan from Standard up includes both.",
  ],
  [
    "Stores, not lookalikes",
    "Every play has a street address behind it. You can drive past the shops your campaign is running in.",
  ],
  [
    "Your competitors are removed",
    "Stores in your own category are taken off your list automatically. You never pay to advertise inside a competitor.",
  ],
  [
    "No per-impression billing",
    "You pay for the stores you booked and the plays in your plan. There is no auction and no invoice surprise at the end of the month.",
  ],
  [
    "Volume actually pays",
    "Discounts stack automatically as you add stores — 5% at ten, 20% at fifty, 50% at a hundred. No promo code.",
  ],
  [
    "Reviewed before it airs",
    "Every ad is checked before it plays in somebody's business — the same standard that protects the shop next door.",
  ],
];

const FAQ = [
  {
    q: "What is Addlyft Reach?",
    a: "It is how a business advertises inside other people's stores. If you own the shop and want to promote it on your own screen, that is Addlyft Go. If you are an auto dealer, a dentist or an estate agent who wants to appear in the convenience store down the road, that is Reach.",
  },
  {
    q: "How small can a campaign be?",
    a: `Five stores — that is the base every plan covers. Prices start at ${money(REACH_PLANS[0].price)} a month for five, which is deliberately low enough that a single-location business can try the channel.`,
  },
  {
    q: "Do the audio and video ads play at the same time?",
    a: "No, and that is by design. The screen runs 10-second video continuously with no sound. The audio ad is a separate 15-second spot that plays between songs on the store's speakers. Two channels, two schedules, never synchronised.",
  },
  {
    q: "How does pricing scale past five stores?",
    a: "Each plan's headline price covers five stores. Beyond that you pay the plan price divided by five, multiplied by your store count — then your volume discount comes off automatically.",
  },
  {
    q: "Do I have to make a new ad every day?",
    a: "No. Most advertisers run one ad for the month. A plan with 25 plays a day means the same spot is shown 25 times a day in each store, the way a television ad repeats through an evening.",
  },
  {
    q: "Can my competitor advertise in the same store?",
    a: "Not in the same category. The network removes stores from an advertiser's list when there is a direct category conflict, which protects both the shop and its regulars.",
  },
];

export default function ReachPage() {
  return (
    <>
      <PageHero
        kicker="Addlyft Reach — for advertisers"
        accent="reach"
        lines={[
          <span key="ln1">Reach real customers.</span>,
          <span key="ln2">
            Inside <span key="ln3" className="em">real stores.</span>
          </span>,
        ]}
        lede="Want to showcase your business directly where local customers shop? Addlyft Reach launches targeted audio and video campaigns across our trusted partner store network — you choose the stores, you set the frequency."
        primary={{ href: "/contact?intent=advertiser", label: "Plan a campaign" }}
        secondary={{ href: "/pricing#reach", label: "See the five plans" }}
        facts={[
          ["Starts at", `${money(REACH_PLANS[0].price)} / mo`],
          ["Minimum", `${REACH_BASE_STORES} stores`],
          ["Formats", "Cross Audio 15s · Cross Video 10s"],
          ["Volume discount", "Up to 50%"],
        ]}
        image="reach-auto-showroom"
        imageAlt="A modern auto dealership showroom"
      />

      <AdStudio />

      {/* --------------------------------------------------------- who it's for */}
      <section className="bay-sm shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--reach">Who advertises</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                The businesses your neighbours already need.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Reach was built for local businesses that do not sit on a high street — the ones
              people find late, and usually by asking around.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="typegrid" stagger={0.07}>
          {WHO.map((w) => (
            <RevealItem key={w.name} as="figure">
              <article className="typecard">
                <div className="shot shot--wide shot--zoom">
                  <Img name={w.img} alt={w.alt} sizes="(max-width: 900px) 100vw, 24vw" />
                </div>
                <div className="typecard__body">
                  <h3 className="t-d4">{w.name}</h3>
                  <p className="t-sm">{w.note}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------- how it runs */}
      <section className="bay-sm on-paper2">
        <div className="shell">
          <div className="sec-head sec-head--split">
            <div>
              <Reveal>
                <span className="kicker kicker--reach">How a campaign runs</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                  From a map to on-air, without a media plan.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-lead">
                Local media has always been sold the hard way — one landlord, one negotiation at
                a time. Reach makes a hundred independent stores behave like one bookable
                channel.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="steps" stagger={0.06}>
            {STEPS.map(([h, p], i) => (
              <RevealItem className="step" key={h}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <div className="step__body">
                  <h3 className="t-d3">{h}</h3>
                  <p className="t-sm measure">{p}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------- edge */}
      <section className="bay-sm shell">
        <div className="sec-head" style={{ marginBottom: "1.25rem" }}>
          <Reveal>
            <span className="kicker kicker--reach">Why it outperforms</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">Six things a feed cannot offer you.</h2>
          </Reveal>
        </div>

        <RevealGroup className="edge" stagger={0.05}>
          {EDGE.map(([h, p], i) => (
            <RevealItem className="edge__item" key={h}>
              <span className="mono edge__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-d4">{h}</h3>
              <p className="t-sm">{p}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ---------------------------------------------------------- pricing */}
      <section className="bay-sm on-paper2" id="pricing">
        <div className="shell">
          <div className="sec-head sec-head--split" style={{ marginBottom: "1.35rem" }}>
            <div>
              <Reveal>
                <span className="kicker kicker--reach">Pricing</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                  Five plans. Built for every advertiser.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-sm">
                Each plan covers five stores as its base. Add more at the per-store rate and the
                volume discount applies automatically.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.06} y={20}>
            <ReachPlanGrid />
          </Reveal>

          <div className="grid-2" style={{ marginTop: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            <Reveal>
              <h3 className="t-d3" style={{ marginBottom: "0.9rem" }}>
                More stores, bigger discount
              </h3>
              <VolumeTable />
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="t-d3" style={{ marginBottom: "0.9rem" }}>
                Estimate your campaign
              </h3>
              <ReachEstimator />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="btn-row" style={{ marginTop: "1.5rem" }}>
              <Link href="/contact?intent=advertiser" className="btn btn--reach btn--lg">
                Plan a campaign
                <Arrow className="btn__ico" />
              </Link>
              <Link href="/pricing" className="tlink tlink--reach">
                Full pricing detail
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection items={FAQ} kicker="Advertiser questions" title="What advertisers ask first." />

      <CtaBand
        lines={[
          <span key="l1">Be the business</span>,
          <span key="l2" className="em">
            in the room.
          </span>,
        ]}
        lede="Tell us who you are trying to reach and roughly where. We will come back with the stores that fit and what a first campaign costs."
      />
    </>
  );
}
