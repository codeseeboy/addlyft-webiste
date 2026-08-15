import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Arrow } from "@/components/site/Brand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { REACH_FACTS, REACH_POINTS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "ADD-LYFT Reach — for brands",
  description:
    "Book real stores, not lookalike audiences. Fifteen-second audio and ten-second screen spots inside independent retail, with plays counted by the device that ran them.",
};

const STEPS: [string, string][] = [
  [
    "Pick the rooms",
    "Filter the network by neighbourhood, business category and daily footfall, then select the actual stores you want. You are choosing addresses, not a segment name.",
  ],
  [
    "Bring or build the message",
    "Upload what you already have, or work from the standard formats — fifteen seconds spoken, ten seconds on screen. Both run inside the same break.",
  ],
  [
    "Set the run",
    "Choose the dates, the days of the week and the hours of the day. Morning commuters and Friday evening are two different audiences in the same store.",
  ],
  [
    "Watch it land",
    "Plays report back store by store and hour by hour, so you can move budget toward the locations that are working while the campaign is still live.",
  ],
];

const EDGE: [string, string][] = [
  [
    "Stores, not lookalikes",
    "Every impression has a street address behind it. You can drive past the places your campaign is running in — and so can your regional manager.",
  ],
  [
    "Category exclusivity as standard",
    "Stores in your own business category are removed from your targeting list automatically. You will never pay to advertise inside a competitor's shop.",
  ],
  [
    "Sound and picture in one break",
    "The same shopper hears the message beside the cooler and sees it again at the register. Two formats, one rotation, one buy.",
  ],
  [
    "Counted, not modelled",
    "A play is recorded when the device in the room plays it. Reach figures start from that store's own footfall band, not from a borrowed panel.",
  ],
  [
    "Local scale without local admin",
    "Five stores or five hundred, it is the same three screens. No insertion orders, no per-site negotiation, no agency retainer.",
  ],
  [
    "Reviewed before it airs",
    "Every message is checked before it plays in somebody's business, which is exactly the standard you want applied to the shop next door too.",
  ],
];

const FAQ = [
  {
    q: "How small can a campaign be?",
    a: "Five stores. That is deliberately low — enough locations to tell you something real, small enough that a single-site business can try the channel without a committee.",
  },
  {
    q: "What do the two formats actually sound and look like?",
    a: "The audio is a fifteen-second spoken message that plays between songs, after the track fades. The screen spot is ten seconds of video on the display near the counter. Never more than two messages per break.",
  },
  {
    q: "How is a play different from an impression?",
    a: "A play is a logged event from the device in the room. Impressions are then derived from the store's own daily visitor band for that hour. We show you both, and we never present the second number as if it were the first.",
  },
  {
    q: "Can my competitor advertise in the same store?",
    a: "Not in the same category. The network removes stores from an advertiser's list when there is a direct category conflict, which protects both the shop and its regulars.",
  },
  {
    q: "What does it cost?",
    a: "Pricing is driven by store count and play volume, with volume rates improving as the campaign grows. Founding advertisers on the launch programme take 50% off their first billing cycle.",
  },
];

export default function ReachPage() {
  return (
    <>
      <PageHero
        kicker="ADD-LYFT Reach — for brands"
        accent="reach"
        lines={[
          <span key="ln1">Book the aisle,</span>,
          <span key="ln2">
            not the <span key="ln3" className="em">algorithm.</span>
          </span>,
        ]}
        lede="Reach is the buying side of ADD-LYFT. Choose the independent stores your customers already walk into, run audio and screen inside the same break, and see the plays land location by location — without an agency in the middle."
        primary={{ href: "/contact?intent=brand", label: "Plan a campaign" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
        facts={REACH_FACTS}
        image="screen-touch"
        imageAlt="A shopper using a bright in-store display screen"
      />

      <section className="bay-sm shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--reach">How a campaign runs</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem" }}>
                From a map to on-air, without a media plan.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="t-lead">
              Local media has always been sold the hard way — one landlord, one negotiation, one
              invoice at a time. Reach makes a hundred independent stores behave like a single,
              bookable channel.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="steps" stagger={0.07}>
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
      </section>

      <section className="bay on-paper2">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="kicker kicker--reach">Why it outperforms</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">Six things a feed cannot offer you.</h2>
            </Reveal>
          </div>

          <RevealGroup className="edge" stagger={0.06}>
            {EDGE.map(([h, p], i) => (
              <RevealItem className="edge__item" key={h}>
                <span className="mono edge__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-d4">{h}</h3>
                <p className="t-sm">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bay shell">
        <div className="split split--rev">
          <div className="split__media">
            <div className="shot shot--tall shot--zoom">
              <Img
                name="shoppers"
                alt="Shoppers moving through a supermarket aisle"
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </div>
          <div className="split__copy">
            <Reveal>
              <span className="kicker kicker--reach">Pricing</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem", marginBottom: "1.25rem" }}>
                You pay for stores and plays. That is the whole model.
              </h2>
            </Reveal>
            <RevealGroup className="bullets" stagger={0.06}>
              {REACH_POINTS.map((p) => (
                <RevealItem className="bullet" key={p} as="div">
                  <span />
                  <p className="t-sm">{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.12}>
              <div className="btn-row" style={{ marginTop: "2rem" }}>
                <Link href="/contact?intent=brand" className="btn btn--reach btn--lg">
                  Plan a campaign
                  <Arrow className="btn__ico" />
                </Link>
                <Link href="/pricing" className="tlink tlink--reach">
                  Full pricing
                  <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection
        items={FAQ}
        kicker="Advertiser questions"
        title={
          <>
            What brands ask <span className="em">before the first campaign.</span>
          </>
        }
      />

      <CtaBand
        lines={[<span key="ln1">Be the message</span>, <span key="ln2" className="em">in the room.</span>]}
        lede="Tell us who you are trying to reach and roughly where. We will come back with the stores that fit and what a first campaign would cost."
      />
    </>
  );
}
