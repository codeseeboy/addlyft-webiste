"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE, Reveal } from "./Motion";

export type QA = { q: string; a: string };

export default function Faq({ items, openFirst = true }: { items: QA[]; openFirst?: boolean }) {
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
  return (
    <section className="faqsec bay" id="faq">
      <div className="shell faqsec__in">
        <div className="faqsec__head">
          <Reveal>
            <span className="kicker">{kicker}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d2" style={{ marginTop: "1.1rem" }}>
              {title}
            </h2>
          </Reveal>
          {lede && (
            <Reveal delay={0.12}>
              <p className="t-sm" style={{ marginTop: "1rem", maxWidth: "34ch" }}>
                {lede}
              </p>
            </Reveal>
          )}
        </div>
        <Reveal className="faqsec__list" delay={0.08}>
          <Faq items={items} />
        </Reveal>
      </div>
    </section>
  );
}
