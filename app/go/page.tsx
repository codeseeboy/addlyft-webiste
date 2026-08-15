import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Arrow } from "@/components/site/Brand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { GO_PLANS, GUARANTEE_NOTE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "ADD-LYFT Go — for store owners",
  description:
    "Turn the airtime you already pay for into income. Guaranteed monthly revenue, your own promotions on audio, screen and social, and referral earnings — built for busy operators.",
};

const STEPS: [string, string][] = [
  [
    "Tell us about the store",
    "Name, address, opening hours and roughly how many people come through the door on a normal day. Ten minutes, once, and you never do it again.",
  ],
  [
    "Choose the channels you want",
    "Audio only, audio and screen, or the full bundle with social. You can start on one channel and add the next when it earns its keep.",
  ],
  [
    "We switch the store on",
    "Your audio and screen come alive within a day or two of setup. Nothing is rewired, nothing new sits on the counter demanding attention.",
  ],
  [
    "The music plays and the meter runs",
    "Your playlist runs the room. Between tracks, two short messages play. You watch the plays and the earnings add up in one place.",
  ],
];

const EARN: [string, string, string][] = [
  [
    "Guaranteed floor",
    "$49 / month",
    "Per active store on the Full Bundle plan, paid whether or not an advertiser books your aisle that month.",
  ],
  [
    "Referral share",
    "Up to 40%",
    "Of what an advertiser you introduce spends, for as long as they stay active on the network.",
  ],
  [
    "Your own promotions",
    "Included",
    "Run your own offers on audio, screen and social from the same place, at no extra cost per play.",
  ],
];

const CONTROL: [string, string][] = [
  ["Your playlist", "Genre, language, mood, favourite artists and popularity — set per store, changed whenever you like."],
  ["Family-friendly by default", "Explicit lyrics are off until you turn them on. Most owners never do."],
  ["No direct competitors", "Advertisers in your category are blocked from your store automatically."],
  ["Two messages, then music", "The break is capped. Your customers are not going to stand in a commercial hour."],
  ["Nothing plays unreviewed", "Every message is checked before it reaches your speakers."],
  ["Schedules you set", "Choose the days and the time-of-day slots your own promotions run in."],
];

const FAQ = [
  {
    q: "Do I need to be good with technology?",
    a: "No. The setup is a short form about your store, and after that the day-to-day is choosing a promotion and a time slot. If you can post a photo to a business page, you can run this.",
  },
  {
    q: "What happens to my music?",
    a: "It stays yours. You choose genre, language, mood and even favourite artists, and the room keeps its own character. The tracks fade properly instead of being cut off, so the break never feels abrupt.",
  },
  {
    q: "When am I first charged?",
    a: "Seven days after you sign up. The trial runs a full week, the payment method is not touched during it, and the exact first-charge date is shown to you before you confirm anything.",
  },
  {
    q: "When do I get paid?",
    a: GUARANTEE_NOTE,
  },
  {
    q: "Can I run more than one location?",
    a: "Yes. Additional stores are added from the same account on the Full Bundle plan, each with its own settings, schedule and reporting.",
  },
];

export default function GoPage() {
  return (
    <>
      <PageHero
        kicker="ADD-LYFT Go — for store owners"
        accent="teal"
        lines={[
          <span key="ln1">The airtime you already</span>,
          <span key="ln2">
            pay for, <span key="ln3" className="em">finally earning.</span>
          </span>,
        ]}
        lede="Go is the store owner's side of ADD-LYFT. Your speakers and your screen already run all day. Go turns them into a channel that pays you, promotes your own offers, and never asks your customers to do anything."
        primary={{ href: "/contact?intent=store", label: "List your store" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
        facts={[
          ["Starts at", "$39.99 / month"],
          ["Free trial", "7 days, no charge"],
          ["Guaranteed floor", "$49 / month"],
          ["Setup time", "Under 10 minutes"],
        ]}
        image="owner-counter"
        imageAlt="A store owner working the counter of a busy neighbourhood shop"
      />

      <section className="bay-sm shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--teal">How it works</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem" }}>
                Four steps, and then it just runs.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="t-lead">
              Go was designed for someone who is already doing three jobs at once. The setup
              happens once, and after that the store keeps working the way it always has.
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
              <span className="kicker kicker--teal">The money</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">Three ways a store earns, stated plainly.</h2>
            </Reveal>
          </div>

          <RevealGroup className="earn" stagger={0.08}>
            {EARN.map(([label, value, note]) => (
              <RevealItem className="earn__item" key={label}>
                <span className="mono earn__label">{label}</span>
                <span className="earn__value">{value}</span>
                <p className="t-sm">{note}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="t-xs earn__note">{GUARANTEE_NOTE}</p>
          </Reveal>
        </div>
      </section>

      <section className="bay shell">
        <div className="split">
          <div className="split__media">
            <div className="shot shot--tall shot--zoom">
              <Img
                name="owner-store"
                alt="A shopkeeper behind the counter of a well-stocked store"
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </div>
          <div className="split__copy">
            <Reveal>
              <span className="kicker kicker--teal">What stays yours</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem", marginBottom: "1.25rem" }}>
                Your store. Your music. Your customers.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead" style={{ marginBottom: "2rem" }}>
                An advertising network only works if the room stays pleasant to stand in. These
                are not settings buried three menus deep — they are how the product is built.
              </p>
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

      <section className="bay-sm shell">
        <div className="sec-head" style={{ marginBottom: "2.5rem" }}>
          <Reveal>
            <span className="kicker kicker--teal">Plans</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">Pick the channels, not a package tier.</h2>
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
                  {p.includes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="btn-row" style={{ marginTop: "2rem" }}>
            <Link href="/contact?intent=store" className="btn btn--teal btn--lg">
              List your store
              <Arrow className="btn__ico" />
            </Link>
            <Link href="/pricing" className="tlink tlink--teal">
              Compare everything
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>

      <FaqSection
        items={FAQ}
        kicker="Store owner questions"
        title={
          <>
            What owners ask <span className="em">before signing up.</span>
          </>
        }
      />

      <CtaBand
        lines={[<span key="ln1">Your floor is</span>, <span key="ln2" className="em">already earning.</span>]}
        lede="It just isn't paying you yet. Tell us about the store and we will show you what a normal week would look like."
      />
    </>
  );
}
