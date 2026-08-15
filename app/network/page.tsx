import type { Metadata } from "next";
import Link from "next/link";
import UsMap from "@/components/site/UsMap";
import Img from "@/components/site/Img";
import CtaBand from "@/components/site/CtaBand";
import { Arrow } from "@/components/site/Brand";
import { Counter, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { MARKETS } from "@/lib/usmap";
import type { ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "The network",
  description:
    "ADD-LYFT is a United States network of independent retail — convenience, fuel, salons, pharmacies, cafés and laundromats — switched on market by market.",
};

const TYPES: { name: string; dwell: string; note: string; img: ImageKey; alt: string }[] = [
  {
    name: "Convenience & c-store",
    dwell: "3–8 min",
    note: "The highest-frequency room on the network, and the one people enter without planning to.",
    img: "cat-cstore",
    alt: "A customer choosing a drink from a lit cooler",
  },
  {
    name: "Gas & fuel",
    dwell: "5–10 min",
    note: "A stop that has to happen, with a shop attached to it.",
    img: "cat-gas",
    alt: "A fuel station forecourt lit at dusk",
  },
  {
    name: "Salon & barbershop",
    dwell: "30–60 min",
    note: "The longest dwell time in local retail, with the radio already on.",
    img: "cat-salon",
    alt: "Barbers cutting hair in a modern shop",
  },
  {
    name: "Pharmacy",
    dwell: "6–15 min",
    note: "A queue and a decision people take seriously. Trust carries furthest here.",
    img: "cat-pharmacy",
    alt: "A well-stocked neighbourhood pharmacy",
  },
  {
    name: "Café & quick service",
    dwell: "4–20 min",
    note: "Same faces, same hour, every weekday. The most repeatable audience on the list.",
    img: "cat-cafe",
    alt: "Customers at the counter of a busy café",
  },
  {
    name: "Laundromat",
    dwell: "30–90 min",
    note: "An hour with nothing to do. Nobody scrolls past a wash cycle.",
    img: "cat-laundromat",
    alt: "Rows of machines inside a laundromat",
  },
];

const JOIN: [string, string][] = [
  ["Submitted", "You tell us about the store — address, hours and roughly how busy a normal day is."],
  ["Documents", "We check the basics of the business, the same way any payment partner would."],
  ["A short call", "A real conversation about the room, the music and what your customers are like."],
  ["Approved & live", "The store is switched on, appears to advertisers, and starts earning."],
];

export default function NetworkPage() {
  const majors = MARKETS.filter((m) => m.major);
  const rest = MARKETS.filter((m) => !m.major);

  return (
    <>
      <section className="phero">
        <div className="shell">
          <div className="phero__grid">
            <div>
              <Reveal>
                <span className="kicker">The network</span>
              </Reveal>
              <h1 className="t-d1 phero__title">
                Real rooms, on real streets, <span className="em">switched on one market at a time.</span>
              </h1>
            </div>
            <div className="phero__aside">
              <Reveal delay={0.15}>
                <p className="t-lead">
                  We would rather open a city properly than claim a national footprint we cannot
                  stand behind. Stores are onboarded market by market so that every campaign
                  finds genuine footfall the day it starts.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="btn-row phero__cta">
                  <Link href="/contact?intent=store" className="btn btn--teal">
                    List your store
                    <Arrow className="btn__ico" />
                  </Link>
                  <Link href="/contact?intent=brand" className="btn btn--ghost">
                    Ask about a market
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="shell bay-sm">
        <Reveal y={26}>
          <UsMap />
        </Reveal>

        <div className="netpage__markets">
          <Reveal>
            <div className="netpage__col">
              <h3 className="mono netpage__col-h">First wave</h3>
              <ul className="netpage__list netpage__list--major">
                {majors.map((m) => (
                  <li key={m.name}>
                    <span className="dot" /> {m.name}, {m.state}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="netpage__col">
              <h3 className="mono netpage__col-h">Opening next</h3>
              <ul className="netpage__list">
                {rest.map((m) => (
                  <li key={m.name}>
                    {m.name}, {m.state}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="netpage__col netpage__col--note">
              <h3 className="mono netpage__col-h">Not on the list?</h3>
              <p className="t-sm">
                Markets open where store owners ask for them. If you run a business somewhere we
                have not reached, that is genuinely useful for us to know — it is how the next
                city gets chosen.
              </p>
              <Link href="/contact?intent=store" className="tlink tlink--teal">
                Put your street forward
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bay on-paper2">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="kicker">Venue types</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">Six kinds of room, one thing in common.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead measure">
                People are already inside, already unhurried, already about to spend. Dwell time
                is the whole product — everything else is a consequence of it.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="typegrid" stagger={0.06}>
            {TYPES.map((t) => (
              <RevealItem key={t.name} as="figure">
                <article className="typecard">
                  <div className="shot shot--wide shot--zoom">
                    <Img name={t.img} alt={t.alt} sizes="(max-width: 900px) 100vw, 32vw" />
                  </div>
                  <div className="typecard__body">
                    <h3 className="t-d4">{t.name}</h3>
                    <p className="t-sm">{t.note}</p>
                    <span className="mono typecard__dwell">Typical dwell · {t.dwell}</span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bay shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--teal">Joining</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "1.1rem" }}>
                How a store gets on the network.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Four stages, and a person on the other end of each of them. Most stores move from
              first message to live inside a week.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="steps" stagger={0.07}>
          {JOIN.map(([h, p], i) => (
            <RevealItem className="step" key={h}>
              <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
              <div className="step__body">
                <h3 className="t-d3">{h}</h3>
                <p className="t-sm measure">{p}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="stats" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          {[
            { v: <Counter to={20} suffix="+" />, l: "Metro markets in the first wave" },
            { v: <Counter to={6} />, l: "Venue categories on the network" },
            { v: <Counter to={5} />, l: "Stores is the smallest campaign" },
            { v: <Counter to={7} suffix=" days" />, l: "Free trial for every new store" },
          ].map((s, i) => (
            <Reveal className="stat" delay={i * 0.06} key={s.l}>
              <span className="stat__v">{s.v}</span>
              <span className="stat__l">{s.l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
