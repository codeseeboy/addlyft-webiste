"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Img from "@/components/site/Img";
import LoopVideo from "@/components/site/LoopVideo";
import { Arrow } from "@/components/site/Brand";
import { EASE, LineReveal, Magnetic } from "@/components/site/Motion";
import FormatSlate from "./FormatSlate";

const PROOF = [
  "Convenience & c-store",
  "Gas & fuel",
  "Salon & spa",
  "Pharmacy",
  "Café & QSR",
  "Laundromat",
  "Barbershop",
  "Liquor & smoke",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The frame drifts up slower than the page and gives back a little scale —
  // the depth cue that makes a still photograph feel like a held shot.
  const yBig = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 62]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__rules" aria-hidden="true" />

      <div className="shell-wide hero__in">
        <motion.div className="hero__copy" style={reduce ? undefined : { y: copyY, opacity: fade }}>
          <motion.span
            className="kicker kicker--teal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            AI-powered marketing for small retail
          </motion.span>

          <h1 className="t-hero hero__title">
            <LineReveal
              trigger="mount"
              delay={0.24}
              lines={[
                <span key="ln1">The marketing platform</span>,
                <span key="ln2">small retail has</span>,
                <span key="ln3" className="em">
                  been waiting for.
                </span>,
              ]}
            />
          </h1>

          <motion.p
            className="t-lead hero__sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
          >
            Addlyft Go turns your store into a marketing powerhouse. Addlyft Reach puts
            your business inside real local stores. Two products, one ecosystem — built so a
            small retailer never has to hire an agency again.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.74 }}
          >
            <Magnetic strength={0.22}>
              <Link href="/go" className="btn btn--teal btn--lg">
                I'm a store
                <Arrow className="btn__ico" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link href="/reach" className="btn btn--ghost btn--lg">
                I'm an advertiser
                <Arrow className="btn__ico" />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.95 }}
          >
            <span className="dot dot--live" />
            <p className="t-xs">
              <b>Go</b> markets your own store. <b>Reach</b> puts you inside other local stores.
            </p>
          </motion.div>
        </motion.div>

        <div className="hero__stage">
          <motion.figure
            className="hero__frame hero__frame--big"
            style={reduce ? undefined : { y: yBig }}
            initial={{ clipPath: "inset(14% 0% 0% 0% round 18px)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
          >
            <motion.div className="hero__frame-inner" style={reduce ? undefined : { scale }}>
              <LoopVideo
                src="/media/store-screen.mp4"
                poster="/media/store-screen-poster.jpg"
                className="hero__video"
                alt="An Addlyft screen above a shop counter, cycling local advertisers"
              />
            </motion.div>
            <FormatSlate />
          </motion.figure>

          <motion.figure
            className="hero__frame hero__frame--small"
            style={reduce ? undefined : { y: ySmall }}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.85 }}
          >
            <Img
              name="store-live-counter"
              alt="A digital board above a service counter running a local ad"
              sizes="(max-width: 900px) 40vw, 20vw"
            />
          </motion.figure>
        </div>
      </div>

      <div className="hero__rail" aria-hidden="true">
        <div className="hero__rail-track">
          {[0, 1].map((dup) => (
            <div className="hero__rail-set" key={dup}>
              {PROOF.map((p) => (
                <span className="hero__rail-item" key={p + dup}>
                  <i />
                  {p}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
