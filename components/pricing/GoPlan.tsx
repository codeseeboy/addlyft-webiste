"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/site/Brand";
import { GO_INCLUDES, GO_PRICE } from "@/lib/pricing";

/**
 * One plan, not three.
 *
 * Audio, video and social used to be sold as Single / Dual / Full Bundle.
 * That is gone: "we are not going to simplify for audio, video and social
 * separately because we want everybody to have all of these things."
 * The only choice left is how you pay for it.
 */
export default function GoPlan({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(true);
  const price = annual ? GO_PRICE.annualPerMonth : GO_PRICE.monthly;

  return (
    <div className="goplan">
      <div className="goplan__head">
        <div>
          <span className="mono goplan__eyebrow">Addlyft Go · everything included</span>
          <p className="goplan__price">
            <span className="goplan__amount num">${price.toFixed(2)}</span>
            <span className="goplan__per">/ month</span>
          </p>
          <p className="goplan__note t-sm">
            {annual ? (
              <>
                Billed annually — <b>${GO_PRICE.saving}/month less</b> than paying monthly.
              </>
            ) : (
              <>
                Billed monthly. Switch to annual and pay ${GO_PRICE.annualPerMonth.toFixed(2)}
                /month instead.
              </>
            )}
          </p>
        </div>

        <div className="goplan__toggle" role="group" aria-label="Billing period">
          <button data-on={annual} onClick={() => setAnnual(true)} aria-pressed={annual}>
            Annual
          </button>
          <button data-on={!annual} onClick={() => setAnnual(false)} aria-pressed={!annual}>
            Monthly
          </button>
        </div>
      </div>

      {!compact && (
        <div className="goplan__grid">
          {GO_INCLUDES.map((g) => (
            <div className="goplan__group" key={g.group}>
              <h3 className="mono goplan__group-h">{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="goplan__foot">
        <Link href="/contact?intent=store" className="btn btn--teal btn--lg">
          Start {GO_PRICE.trialDays}-day free trial
          <Arrow className="btn__ico" />
        </Link>
        <span className="t-xs">
          No card required · Cancel anytime · ${GO_PRICE.guarantee}/mo guaranteed revenue
        </span>
      </div>
    </div>
  );
}
