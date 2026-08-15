"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/site/Brand";
import {
  REACH_BASE_STORES,
  REACH_PLANS,
  VOLUME_TIERS,
  estimate,
  money,
  type ReachPlan,
} from "@/lib/pricing";

/** Five plans, base of five stores each, volume discount stacked on top. */
export function ReachPlanGrid() {
  return (
    <div className="rplans">
      {REACH_PLANS.map((p) => (
        <article className="rplan" key={p.id} data-featured={!!p.featured}>
          <header>
            <span className="mono rplan__name">{p.name}</span>
            {p.featured && <span className="tag tag--reach">Most chosen</span>}
          </header>

          <p className="rplan__price">
            <span className="num">{money(p.price)}</span>
            <span>/ mo</span>
          </p>
          <p className="rplan__per t-xs num">
            {money(p.perStore)} per store · base {REACH_BASE_STORES} stores
          </p>

          <ul className="rplan__specs">
            <li>
              <b className="num">{p.video}</b> video plays / day / store
            </li>
            <li data-off={p.audio === null}>
              {p.audio === null ? (
                "Audio not included"
              ) : (
                <>
                  <b className="num">{p.audio}</b> audio play{p.audio > 1 ? "s" : ""} / day / store
                </>
              )}
            </li>
            <li data-off={p.tokens === null}>
              {p.tokens === null ? (
                "No AI tokens"
              ) : (
                <>
                  <b className="num">{p.tokens}</b> AI token{p.tokens > 1 ? "s" : ""} / month
                </>
              )}
            </li>
            <li>{p.analytics}</li>
            {p.extra && <li>{p.extra}</li>}
          </ul>

          <Link
            href="/contact?intent=advertiser"
            className={`btn ${p.featured ? "btn--reach" : "btn--ghost"} btn--sm rplan__cta`}
          >
            {p.id === "executive" ? "Contact sales" : "Get started"}
            <Arrow className="btn__ico" />
          </Link>
        </article>
      ))}
    </div>
  );
}

/** The volume ladder, shown against the most-chosen plan. */
export function VolumeTable() {
  const plus = REACH_PLANS.find((p) => p.featured) ?? REACH_PLANS[2];
  return (
    <div className="tablewrap">
      <table className="ptable">
        <caption className="sr-only">Volume discounts by store count</caption>
        <thead>
          <tr>
            <th scope="col">Stores</th>
            <th scope="col">Discount</th>
            <th scope="col">Example — {plus.name} plan</th>
          </tr>
        </thead>
        <tbody>
          {VOLUME_TIERS.map((t) => {
            const e = estimate(plus, t.stores);
            return (
              <tr key={t.stores} data-best={t.discount === 0.5}>
                <th scope="row" className="num">
                  {t.stores} stores
                </th>
                <td className="num">{t.discount === 0 ? "—" : `${Math.round(t.discount * 100)}%`}</td>
                <td className="num">{money(e.total)} / mo</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Interactive estimator — plan × store count, discount applied live. */
export function ReachEstimator() {
  const [planId, setPlanId] = useState<string>("plus");
  const [stores, setStores] = useState(REACH_BASE_STORES);
  const plan = REACH_PLANS.find((p) => p.id === planId) as ReachPlan;
  const e = estimate(plan, stores);

  return (
    <div className="rest">
      <div className="rest__controls">
        <div className="rest__field">
          <span className="mono rest__label">1 · Choose a plan</span>
          <div className="rest__chips" role="group" aria-label="Plan">
            {REACH_PLANS.map((p) => (
              <button
                key={p.id}
                data-on={p.id === planId}
                onClick={() => setPlanId(p.id)}
                aria-pressed={p.id === planId}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rest__field">
          <span className="mono rest__label">
            2 · Stores <em>(minimum {REACH_BASE_STORES})</em>
          </span>
          <div className="rest__stepper">
            <button
              onClick={() => setStores((s) => Math.max(REACH_BASE_STORES, s - 5))}
              aria-label="Fewer stores"
            >
              −
            </button>
            <input
              type="range"
              min={REACH_BASE_STORES}
              max={120}
              step={1}
              value={stores}
              onChange={(ev) => setStores(Number(ev.target.value))}
              aria-label="Number of stores"
            />
            <button onClick={() => setStores((s) => Math.min(120, s + 5))} aria-label="More stores">
              +
            </button>
            <span className="rest__count num">{e.stores}</span>
          </div>
        </div>
      </div>

      <div className="rest__out">
        <div className="rest__lines">
          <div>
            <dt className="t-xs">
              {plan.name} · {e.stores} stores
            </dt>
            <dd className="num">{money(e.gross)}</dd>
          </div>
          <div data-active={e.discount > 0}>
            <dt className="t-xs">Volume discount</dt>
            <dd className="num">
              {e.discount > 0 ? `− ${Math.round(e.discount * 100)}%` : "—"}
            </dd>
          </div>
        </div>
        <div className="rest__total">
          <span className="mono">Your monthly spend</span>
          <strong className="num">{money(e.total)}</strong>
          <span className="t-xs num">
            {plan.video * e.stores} video plays a day · {(plan.audio ?? 0) * e.stores} audio
          </span>
        </div>
        <Link href="/contact?intent=advertiser" className="btn btn--reach">
          Plan this campaign
          <Arrow className="btn__ico" />
        </Link>
      </div>
    </div>
  );
}
