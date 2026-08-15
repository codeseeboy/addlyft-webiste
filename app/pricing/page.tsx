import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Arrow } from "@/components/site/Brand";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { GO_PLANS, GUARANTEE_NOTE, REACH_FACTS, REACH_POINTS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Store owners subscribe by location from $39.99 a month with a seven-day free trial. Brands pay for stores and plays, starting at five stores.",
};

const COMPARE: { row: string; single: string; dual: string; bundle: string }[] = [
  { row: "In-store audio · 15s", single: "Included", dual: "Included", bundle: "Included" },
  { row: "In-store screen · 10s", single: "—", dual: "Included", bundle: "Included" },
  { row: "Social posts", single: "—", dual: "—", bundle: "Included" },
  { row: "Ready-made promotion library", single: "Included", dual: "Included", bundle: "Included" },
  { row: "Custom promotion builds", single: "1 / month", dual: "2 / month", bundle: "Unlimited" },
  { row: "Scheduling by day & time slot", single: "Included", dual: "Included", bundle: "Included" },
  { row: "Performance reporting", single: "Core", dual: "By hour", bundle: "By hour & channel" },
  { row: "Multiple locations", single: "—", dual: "—", bundle: "Included" },
  { row: "$49 / month revenue guarantee", single: "—", dual: "—", bundle: "Included" },
  { row: "Referral earnings", single: "Up to 40%", dual: "Up to 40%", bundle: "Up to 40%" },
  { row: "Free trial", single: "7 days", dual: "7 days", bundle: "7 days" },
];

const FAQ = [
  {
    q: "Is the free trial really free?",
    a: "Yes. Seven days, and the payment method is not charged during them. The exact date of the first charge is shown before you confirm the plan, and cancelling inside the window costs nothing.",
  },
  {
    q: "How does the $49 guarantee actually work?",
    a: GUARANTEE_NOTE,
  },
  {
    q: "Can I change plan later?",
    a: "Yes, in either direction. Upgrades take effect immediately and downgrades take effect at the next billing cycle, so you are never charged twice for the same month.",
  },
  {
    q: "How are advertisers billed?",
    a: "By campaign, monthly. Cost is a function of how many stores you book and how often the message plays, and the cost per thousand is displayed beside every option before you commit to it.",
  },
  {
    q: "Are there setup fees or contracts?",
    a: "No setup fee, and no minimum term for either side. Stores are billed monthly per location; advertisers are billed per cycle and can stop between cycles.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="phero">
        <div className="shell">
          <div className="phero__grid">
            <div>
              <Reveal>
                <span className="kicker">Pricing</span>
              </Reveal>
              <h1 className="t-d1 phero__title">
                Two sides of the network, <span className="em">two honest price lists.</span>
              </h1>
            </div>
            <div className="phero__aside">
              <Reveal delay={0.15}>
                <p className="t-lead">
                  Store owners subscribe by location. Brands pay for stores and plays. Nobody has
                  to sign a twelve-month insertion order to find out what fifteen seconds costs.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="shell bay-sm">
        <div className="sec-head" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <Reveal>
            <span className="kicker kicker--teal">For store owners · Go</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">Priced per store, per month.</h2>
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
                <Link
                  href="/contact?intent=store"
                  className={`btn ${p.featured ? "btn--teal" : "btn--ghost"} plan__cta`}
                >
                  Start with {p.name}
                  <Arrow className="btn__ico" />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="t-xs earn__note">{GUARANTEE_NOTE}</p>
        </Reveal>
      </section>

      <section className="shell bay-sm">
        <Reveal>
          <div className="tablewrap">
            <table className="ptable">
              <caption className="sr-only">Comparison of ADD-LYFT Go plans</caption>
              <thead>
                <tr>
                  <th scope="col">What you get</th>
                  <th scope="col">Single</th>
                  <th scope="col">Dual</th>
                  <th scope="col">Full Bundle</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row}>
                    <th scope="row">{r.row}</th>
                    <td data-off={r.single === "—"}>{r.single}</td>
                    <td data-off={r.dual === "—"}>{r.dual}</td>
                    <td data-off={r.bundle === "—"}>{r.bundle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="bay on-paper2">
        <div className="shell">
          <div className="sec-head" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <Reveal>
              <span className="kicker kicker--reach">For brands · Reach</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2">Priced by stores and plays.</h2>
            </Reveal>
          </div>

          <div className="peek__reach" style={{ marginTop: 0 }}>
            <Reveal>
              <div className="peek__reach-copy">
                <RevealGroup className="bullets" stagger={0.06}>
                  {REACH_POINTS.map((p) => (
                    <RevealItem className="bullet" key={p} as="div">
                      <span />
                      <p className="t-sm">{p}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
                <div className="btn-row" style={{ marginTop: "2rem" }}>
                  <Link href="/contact?intent=brand" className="btn btn--reach btn--lg">
                    Get a campaign quote
                    <Arrow className="btn__ico" />
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

      <FaqSection
        items={FAQ}
        kicker="Pricing questions"
        title={
          <>
            The small print, <span className="em">said out loud.</span>
          </>
        }
      />

      <CtaBand />
    </>
  );
}
