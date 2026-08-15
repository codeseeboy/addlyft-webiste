"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** A 2px reading indicator. Brand gradient, teal into Reach purple. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.3 });

  if (reduce) return null;
  return <motion.div className="prog" style={{ scaleX }} aria-hidden="true" />;
}
