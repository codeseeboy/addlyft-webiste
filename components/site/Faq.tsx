"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EASE, Reveal } from "./Motion";

export type QA = { q: string; a: string; category?: string };

export default function Faq({
  items,
  openFirst = true,
}: {
  items: QA[];
  openFirst?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);

  return (
    <div className="faq">
      {items.map((item, i) => (
        <div className="faq__row" key={item.q} data-open={open === i}>
          <h3>
            <button
              className="faq__q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span className="faq__sign" aria-hidden="true" />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                className="faq__a"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <p className="faq__a-in">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/**
 * Section wrapper. When the items carry categories it renders the filter row
 * from the client's reference site (All · Addlyft Go · Addlyft Reach ·
 * Pricing · Hardware · Getting started).
 */
export function FaqSection({
  items,
  kicker = "Questions",
  title,
  lede,
}: {
  items: QA[];
  kicker?: string;
  title: React.ReactNode;
  lede?: string;
}) {
  const cats = useMemo(() => {
    const seen: string[] = [];
    for (const i of items) if (i.category && !seen.includes(i.category)) seen.push(i.category);
    return seen;
  }, [items]);

  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <section className="faqsec bay-sm" id="faq">
      <div className="shell faqsec__in">
        <div className="faqsec__head">
          <Reveal>
            <span className="kicker">{kicker}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
              {title}
            </h2>
          </Reveal>
          {lede && (
            <Reveal delay={0.12}>
              <p className="t-sm" style={{ marginTop: "0.8rem", maxWidth: "34ch" }}>
                {lede}
              </p>
            </Reveal>
          )}

          {cats.length > 1 && (
            <Reveal delay={0.16}>
              <div className="faqsec__cats" role="group" aria-label="Filter questions">
                <button data-on={active === "all"} onClick={() => setActive("all")}>
                  All
                </button>
                {cats.map((c) => (
                  <button key={c} data-on={active === c} onClick={() => setActive(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="faqsec__list" delay={0.08}>
          <Faq key={active} items={shown} />
        </Reveal>
      </div>
    </section>
  );
}
