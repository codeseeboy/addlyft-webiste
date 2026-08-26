"use client";

import Link from "next/link";
import { Arrow } from "@/components/site/Brand";
import { Reveal } from "@/components/site/Motion";
import { GO_PRICE, REACH_PLANS, money } from "@/lib/pricing";

const cheapestReach = REACH_PLANS[0];

export default function PricePeek() {
  return (
    <section className="peek bay on-paper2" id="pricing">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">Pricing</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-d1" style={{ marginTop: "0.9rem" }}>
                Transparent pricing. No surprises.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Own a store? One flat price, everything included. Want to advertise in stores?
              Pay for the locations you pick and how often you play.
            </p>
          </Reveal>
        </div>

        <div className="peek__two">
          <Reveal y={20}>
            <article className="peek__card peek__card--go">
              <header>
                <span className="mono">Addlyft Go · store owners</span>
                <span className="tag tag--teal">All-in-one</span>
              </header>
              <p className="peek__price">
                <span className="num">{money(GO_PRICE.annualPerMonth)}</span>
                <span>/ mo billed annually</span>
              </p>
              <p className="t-sm peek__alt num">
                or {money(GO_PRICE.monthly)}/mo billed monthly
              </p>
              <ul className="peek__list">
                <li>Audio, video and social — no separate subscriptions</li>
                <li>Free in-store TV device and speaker included</li>
                <li>${GO_PRICE.guarantee}/month guaranteed revenue from Addlyft</li>
                <li>{GO_PRICE.trialDays}-day free trial, no card required</li>
              </ul>
              <Link href="/pricing#go" className="tlink tlink--teal">
                See what is included
                <Arrow />
              </Link>
            </article>
          </Reveal>

          <Reveal y={20} delay={0.08}>
            <article className="peek__card peek__card--reach">
              <header>
                <span className="mono">Addlyft Reach · advertisers</span>
                <span className="tag tag--reach">5 plans</span>
              </header>
              <p className="peek__price">
                <span className="num">from {money(cheapestReach.price)}</span>
                <span>/ mo for 5 stores</span>
              </p>
              <p className="t-sm peek__alt">Base · Standard · Plus · Premium · Executive</p>
              <ul className="peek__list">
                <li>Pick the exact stores your ads run in</li>
                <li>5 to 90 video plays a day, per store</li>
                <li>Audio from the Standard plan upward</li>
                <li>Volume discounts to 50% — applied automatically</li>
              </ul>
              <Link href="/pricing#reach" className="tlink tlink--reach">
                Compare the five plans
                <Arrow />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
