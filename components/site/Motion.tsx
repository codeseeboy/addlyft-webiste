"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ reveal */

/**
 * The house reveal: a short rise with a soft blur burn-off. The blur is what
 * makes it read as film rather than as a CSS transition, but it is only 6px —
 * enough to feel, not enough to notice.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
  amount = 0.35,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section" | "header" | "figure";
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduce) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggers direct children of a container without per-child delay maths. */
export function RevealGroup({
  children,
  className,
  stagger = 0.075,
  delay = 0,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  if (reduce) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={{
        hide: { opacity: 0, y, filter: "blur(5px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- headlines */

/**
 * Line-by-line mask reveal. Each line is clipped by its own overflow box so
 * the words rise out of nothing — the standard for editorial headlines, and
 * far calmer than animating individual letters.
 */
export function LineReveal({
  lines,
  className,
  delay = 0,
  duration = 1.05,
  stagger = 0.085,
  trigger = "view",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "view" | "mount";
}) {
  const reduce = useReducedMotion();

  /*
   * Visibility is read from a block-level wrapper with useInView rather than
   * from `whileInView` on the sliding spans themselves. Those spans start
   * translated 112% down inside an overflow-hidden mask, and an observer
   * attached to a masked, transformed inline box does not reliably report
   * intersection — which silently left every headline on the site invisible.
   */
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = trigger === "mount" || inView;

  if (reduce) {
    return (
      <span className={className} style={{ display: "block" }}>
        {lines.map((l, i) => (
          <span key={i} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
          <motion.span
            style={{ display: "block", willChange: "transform" }}
            initial={{ y: "112%", opacity: 0 }}
            animate={show ? { y: "0%", opacity: 1 } : { y: "112%", opacity: 0 }}
            transition={{ duration, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ----------------------------------------------------------------- numbers */

/** Counts up once on view. Prefix/suffix stay outside the animated value. */
export function Counter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.5,
}: {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const run = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className="num">
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------- pointer */

/** Subtle magnetic pull toward the cursor. Desktop and fine pointers only. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength, x, y, reduce]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
    >
      {children}
    </motion.span>
  );
}

/** Maps a progress MotionValue to a parallax offset in pixels. */
export function useParallax(progress: MotionValue<number>, distance: number) {
  return useTransform(progress, [0, 1], [distance, -distance]);
}
