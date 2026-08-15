import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Arrow } from "@/components/site/Brand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import GoPlan from "@/components/pricing/GoPlan";
import Channels, { TemplateLibrary } from "@/components/product/Channels";
import Earnings from "@/components/product/Earnings";
import { GO_PRICE, GUARANTEE_NOTE, money } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Addlyft Go — for store owners",
  description:
    "Stop paying an agency to market your own store. Addlyft Go creates in-store audio, video and social ads in minutes — and pays you for hosting local advertisers.",
};


const STEPS: [string, string][] = [
  [
    "Describe the promotion in plain words",
    'Type "20% off all cold drinks this weekend". No brief, no agency, no photographer, no waiting on somebody else\'s schedule.',
  ],
  [
    "Addlyft builds the ad",
    "You get an audio spot, a screen video and a social post back, ready to review. Change anything you do not like — or start from the free template library instead and spend nothing at all.",
  ],
  [
    "Choose when it runs",
    "Set the days, the hours and how often. Morning commuters and Friday evening are two different audiences standing in the same shop.",
  ],
  [
    "It plays, and the meter runs",
    "Your promotions run on your own screen and speaker. Meanwhile local advertisers pay to appear in your store — and you keep a share of that.",
  ],
];


const CONTROL: [string, string][] = [
  ["Your playlist", "Genre, language and mood, set per store and changed whenever you like."],
  ["Family-friendly by default", "Explicit lyrics stay off until you turn them on."],
  [
    "No direct competitors",
    "Advertisers in your own category are blocked from your store automatically.",
  ],
  ["Your schedule", "You choose the days and time slots your own promotions run in."],
  ["Nothing plays unreviewed", "Every message is checked before it reaches your speakers."],
];

const FAQ = [
  {
    q: "What exactly is Addlyft Go?",
    a: "It is the side of Addlyft for the person who owns the shop. You advertise your own business, inside your own store, on your own screen and speaker — without hiring an agency to shoot and produce it for you.",
  },
  {
    q: "How is that different from Addlyft Reach?",
    a: "Go is advertising your own store, in your own store. Reach is a different business — an auto dealer, a dentist, an estate agent — paying to advertise inside somebody else's store on the network. Same screens, opposite direction.",
  },
  {
    q: "Do I need to be good with technology?",
    a: "No. You describe the promotion in plain English and Addlyft writes it. If you can post a photo to a business page, you can run this. Most owners are set up in about five minutes.",
  },
  {
    q: "Do I have to buy hardware?",
    a: "No. The in-store TV device is free with your plan, and the speaker or tablet for audio is included too. There is nothing to buy up front.",
  },
  {
    q: "When am I first charged?",
    a: `${GO_PRICE.trialDays} days after you sign up. The trial runs a full week, the payment method is untouched during it, and the exact first-charge date is shown before you confirm anything.`,
  },
  {
    q: "When do I get paid?",
    a: GUARANTEE_NOTE,
  },
  {
    q: "How do the AI generations work?",
    a: "Your plan includes 90 generations a month — 30 for audio, 30 for video, 30 for social. One is spent when you create an ad, and one more if you ask for a retry. Anything you take from the free template library costs nothing. If you need more, top-up packs start at $9.90 for ten.",
  },
  {
    q: "Do I have to make a new ad every day?",
    a: "No. Most stores run the same promotion for weeks and simply reschedule it. You are choosing how often an ad plays, not how many ads you have to produce.",
  },
];

export default function GoPage() {
  return (
    <>
      <PageHero
        kicker="Addlyft Go — for store owners"
        accent="teal"
        lines={[
          <span key="ln1">Your store. Your brand.</span>,
          <span key="ln2">
            Your <span key="ln3" className="em">revenue.</span>
          </span>,
        ]}
        lede="Stop wasting money on big advertising. Addlyft Go creates in-store audio, video and social ads in minutes — and unlocks extra revenue by hosting local advertisers on the screen you already own."
        primary={{ href: "/contact?intent=store", label: "Start free trial" }}
        secondary={{ href: "/pricing#go", label: "See pricing" }}
        facts={[
          ["All-in-one", `${money(GO_PRICE.annualPerMonth)} / mo annual`],
          ["Free trial", `${GO_PRICE.trialDays} days, no card`],
          ["Guaranteed", `${money(GO_PRICE.guarantee)} / month`],
          ["Hardware", "TV device included"],
        ]}
        image="store-live-cafe"
        imageAlt="A shop's own promotion running on the screen above its counter"
      />

      <Channels />

      {/* ------------------------------------------------------ how it works */}
      <section className="bay-sm on-paper2">
        <div className="shell">
          <div className="sec-head sec-head--split">
            <div>
              <Reveal>
                <span className="kicker kicker--teal">How it works</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                  No agency. No photographer. No waiting.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-lead">
                Paying somebody to make your ads is the expensive part, and the slow part. Go
                removes both — you do it yourself, in the time it takes to serve a customer.
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

      <Earnings />

      <TemplateLibrary />

      {/* ---------------------------------------------------------- pricing */}
      <section className="bay-sm on-paper2" id="pricing">
        <div className="shell">
          <div className="sec-head" style={{ marginBottom: "1.25rem" }}>
            <Reveal>
              <span className="kicker kicker--teal">Pricing</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">One plan. Everything on.</h2>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={22}>
            <GoPlan />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="btn-row" style={{ marginTop: "1.5rem" }}>
              <Link href="/contact?intent=store" className="btn btn--teal btn--lg">
                List your store
                <Arrow className="btn__ico" />
              </Link>
              <Link href="/pricing" className="tlink tlink--teal">
                Full pricing detail
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- what stays yours */}
      <section className="bay-sm shell">
        <div className="split">
          <div className="split__media">
            <div className="shot shot--wide shot--zoom">
              <Img
                name="cat-cstore"
                alt="A customer choosing a drink inside a convenience store"
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </div>
          <div className="split__copy">
            <Reveal>
              <span className="kicker kicker--teal">What stays yours</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "0.9rem", marginBottom: "1rem" }}>
                Your store. Your music. Your customers.
              </h2>
            </Reveal>
            <RevealGroup className="checks" stagger={0.05}>
              {CONTROL.map(([h, p]) => (
                <RevealItem className="check" key={h} as="div">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="check__ico">
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <b>{h}</b>
                    <p className="t-sm">{p}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <FaqSection items={FAQ} kicker="Store owner questions" title="What owners ask first." />

      <CtaBand
        lines={[
          <span key="l1">Your store is</span>,
          <span key="l2" className="em">
            already earning.
          </span>,
        ]}
        lede="It just isn't paying you yet. Tell us about the shop and we will show you what a normal month looks like."
      />
    </>
  );
}
