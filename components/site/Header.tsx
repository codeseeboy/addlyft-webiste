"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow, BrandLink, Chevron } from "./Brand";
import { EASE } from "./Motion";

const PRODUCTS = [
  {
    href: "/go",
    key: "go" as const,
    name: "Addlyft Go",
    desc: "For store owners. Advertise your own store, on your own screen and speaker.",
  },
  {
    href: "/reach",
    key: "reach" as const,
    name: "Addlyft Reach",
    desc: "For advertisers. Run your ads inside other local stores.",
  },
];

const LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/network", label: "Network" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Company" },
];

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      // Hide on the way down, reveal on the way up — but never near the top,
      // where hiding just looks like a glitch.
      setHidden(y > 320 && y > lastY.current + 4);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverIn = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMenu(true);
  };
  const hoverOut = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(false), 130);
  };

  const isOn = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="hdr" data-solid={solid || open} data-hidden={hidden && !open}>
        <div className="hdr__in">
          <BrandLink />

          <nav className="nav" aria-label="Primary">
            <div
              className="nav__item"
              data-open={menu}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              <button
                className="nav__link"
                aria-expanded={menu}
                aria-haspopup="true"
                onClick={() => setMenu((v) => !v)}
              >
                Products
                <Chevron className="nav__chev" />
              </button>

              <AnimatePresence>
                {menu && (
                  <motion.div
                    className="nav__pop"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    {PRODUCTS.map((p) => (
                      <Link key={p.href} href={p.href} className={`pop-card pop-card--${p.key}`}>
                        <span className="pop-card__top">
                          <span className="pop-card__badge">
                            {p.key === "go" ? "Go" : "Re"}
                          </span>
                          <span className="pop-card__name">{p.name}</span>
                        </span>
                        <span className="pop-card__desc">{p.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav__link"
                aria-current={isOn(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hdr__cta">
            <Link href="/contact" className="btn btn--sm">
              Talk to us
              <Arrow className="btn__ico" />
            </Link>
            <button
              className="burger"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div className="sheet__links">
              {[...PRODUCTS.map((p) => ({ href: p.href, label: p.name, note: p.desc })), ...LINKS.map((l) => ({ href: l.href, label: l.label, note: "" }))].map(
                (l, i) => (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.045 }}
                  >
                    <Link href={l.href} className="sheet__link" onClick={() => setOpen(false)}>
                      {l.label}
                      <Arrow style={{ width: 18, height: 18, opacity: 0.4 }} />
                    </Link>
                  </motion.div>
                ),
              )}
            </div>
            <div className="sheet__foot">
              <Link href="/contact" className="btn btn--lg" onClick={() => setOpen(false)}>
                Talk to us
                <Arrow className="btn__ico" />
              </Link>
              <p className="t-xs">Grow Local. Reach Further.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
