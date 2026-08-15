"use client";

import { Counter, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import { GO_PRICE, money } from "@/lib/pricing";

/**
 * What a store actually earns.
 *
 * Both figures come straight from the client's reference site: the $49/month
 * guarantee shown as a yearly baseline, and the 40% referral commission shown
 * as the four-step flow with his worked example ($390/mo spend → $156/mo).
 */

const REFERRAL_STEPS = ["Share your code", "They sign up", "They advertise", "You earn 40%"];

const EXAMPLE_SPEND = 390;
const EXAMPLE_EARN = Math.round(EXAMPLE_SPEND * (GO_PRICE.referralPct / 100));

export default function Earnings() {
  const yearly = GO_PRICE.guarantee * 12;

  return (
    <section className="earn2 bay-sm" id="earnings">
      <div className="shell">
        <div className="sec-head" style={{ marginBottom: "1.35rem" }}>
          <Reveal>
            <span className="kicker kicker--teal">The money</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2">Your store earns before it sells anything.</h2>
          </Reveal>
        </div>

        <div className="earn2__grid">
          {/* guaranteed floor */}
          <Reveal y={20}>
            <article className="earn2__card earn2__card--guarantee">
              <span className="mono earn2__label">Guaranteed revenue</span>
              <p className="earn2__figure">
                <span className="num">
                  <Counter to={GO_PRICE.guarantee} prefix="$" />
                </span>
                <span>/ month</span>
              </p>
              <p className="t-sm">
                Every active Addlyft Go store is paid {money(GO_PRICE.guarantee)} a month by
                Addlyft — just for being part of the network. It is your baseline, paid whether
                or not an advertiser books your screen.
              </p>
              <p className="earn2__math num">
                {money(GO_PRICE.guarantee)} × 12 = <b>{money(yearly)} a year</b> baseline income
              </p>
            </article>
          </Reveal>

          {/* referral */}
          <Reveal y={20} delay={0.08}>
            <article className="earn2__card earn2__card--referral">
              <span className="mono earn2__label">Referral commission</span>
              <p className="earn2__figure">
                <span className="num">
                  <Counter to={GO_PRICE.referralPct} suffix="%" />
                </span>
                <span>of their monthly spend</span>
              </p>
              <p className="t-sm">
                Refer any local business to Addlyft Reach with your code and earn{" "}
                {GO_PRICE.referralPct}% of what they spend — automatically, every month they
                stay active. There is no cap on how many you refer.
              </p>

              <ol className="earn2__flow">
                {REFERRAL_STEPS.map((s, i) => (
                  <li key={s}>
                    <span className="earn2__flow-n num">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>

              <p className="earn2__example num">
                Advertiser spends {money(EXAMPLE_SPEND)}/mo → you earn{" "}
                <b>{money(EXAMPLE_EARN)}/mo</b>
              </p>
            </article>
          </Reveal>
        </div>

        <RevealGroup className="earn2__notes" stagger={0.06}>
          {[
            [
              "Host advertisers, keep a share",
              "The auto dealer and the dentist down the road pay to appear on your screen. You take a cut of every campaign that runs in your store.",
            ],
            [
              "Paid quarterly",
              "The guarantee starts after three continuous months on the network and is paid out every quarter.",
            ],
            [
              "No competitor in your aisle",
              "Advertisers in your own category are blocked from your store automatically, so hosting never costs you a customer.",
            ],
          ].map(([h, p]) => (
            <RevealItem className="earn2__note" key={h}>
              <h3 className="t-d4">{h}</h3>
              <p className="t-sm">{p}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
