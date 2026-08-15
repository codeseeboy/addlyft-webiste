import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/Faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import GoPlan from "@/components/pricing/GoPlan";
import { ReachEstimator, ReachPlanGrid, VolumeTable } from "@/components/pricing/ReachPlans";
import { AI_TOPUPS, GO_PRICE, GUARANTEE_NOTE, money } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Addlyft Go is one all-in-one plan — $99.99/month billed annually, $129.99 monthly, audio, video and social included. Addlyft Reach starts at $29.99 for five stores.",
};

const FAQ = [
  {
    q: "Why is Addlyft Go a single plan?",
    a: "Because splitting audio, video and social into separate subscriptions helped nobody. Every store gets all three channels for one price. There is no tier to outgrow and nothing to bolt on later.",
  },
  {
    q: "What is the difference between annual and monthly?",
    a: `Exactly ${money(GO_PRICE.saving)} a month. Annual is ${money(GO_PRICE.annualPerMonth)} per month paid once for the year; monthly is ${money(GO_PRICE.monthly)} charged each month. Same product either way.`,
  },
  {
    q: "Is the free trial really free?",
    a: `Yes — ${GO_PRICE.trialDays} days, no card required, and the payment method is not charged during them. The exact first-charge date is shown before you confirm a plan.`,
  },
  {
    q: "How does the $49 guarantee work?",
    a: GUARANTEE_NOTE,
  },
  {
    q: "How is Addlyft Reach priced?",
    a: "Each plan's headline price covers a base of five stores. For more stores you pay the plan price divided by five, multiplied by your store count — then the volume discount is applied automatically, up to 50% at a hundred stores.",
  },
  {
    q: "What happens when I run out of AI generations?",
    a: "Buy a top-up pack at any time: 10 for $9.90, 25 for $19.99, or 50 for $34.99. They are one-off purchases, not subscriptions. You can also use the free template library, which costs no generations at all.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="phero phero--tight">
        <div className="shell">
          <div className="phero__grid">
            <div>
              <Reveal>
                <span className="kicker">Pricing</span>
              </Reveal>
              <h1 className="t-d1 phero__title">Transparent pricing. No surprises.</h1>
            </div>
            <div className="phero__aside">
              <Reveal delay={0.12}>
                <p className="t-lead">
                  Store owners pay one flat price for everything. Advertisers pay for the
                  stores they pick and how often they play. No per-impression billing, no rate
                  card theatre.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- GO */}
      <section className="shell bay-sm" id="go">
        <div className="sec-head" style={{ marginBottom: "1.5rem" }}>
          <Reveal>
            <span className="kicker kicker--teal">For store owners · Addlyft Go</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">One plan. Audio, video and social — all of it.</h2>
          </Reveal>
        </div>

        <Reveal delay={0.08} y={22}>
          <GoPlan />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="t-xs earn__note">{GUARANTEE_NOTE}</p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- REACH */}
      <section className="bay-sm on-paper2" id="reach">
        <div className="shell">
          <div className="sec-head sec-head--split" style={{ marginBottom: "1.5rem" }}>
            <div>
              <Reveal>
                <span className="kicker kicker--reach">For advertisers · Addlyft Reach</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                  Five plans. Built for every advertiser.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-sm">
                Each plan covers five stores as its base. Add more at the per-store rate and
                volume discounts of up to 50% apply automatically — no promo code.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={22}>
            <ReachPlanGrid />
          </Reveal>

          <div className="grid-2" style={{ marginTop: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
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
        </div>
      </section>

      {/* ------------------------------------------------------- top-ups */}
      <section className="shell bay-sm">
        <div className="sec-head" style={{ marginBottom: "1.25rem" }}>
          <Reveal>
            <span className="kicker">AI top-ups</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">Need more than your monthly generations?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-sm measure">
              Every Addlyft Go plan includes 90 AI generations a month — 30 per channel. A
              generation is spent when you create a new ad, and again if you ask for a retry,
              so you always keep control of what actually gets published. Top-up packs are
              one-off purchases, never a subscription, and the free template library costs no
              generations at all.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid-3" stagger={0.07}>
          {AI_TOPUPS.map((t) => (
            <RevealItem key={t.count}>
              <div className="topup">
                <span className="mono topup__n num">{t.count} extra generations</span>
                <p className="topup__price num">{money(t.price)}</p>
                <p className="t-xs num">{money(t.each)} per generation</p>
                {t.save && <span className="tag tag--teal">{t.save}</span>}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <FaqSection items={FAQ} kicker="Pricing questions" title="The small print, said out loud." />

      <CtaBand />
    </>
  );
}
