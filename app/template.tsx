"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition. A template re-mounts on every navigation, which is exactly
 * the hook we want — a short rise and fade so a page change reads as a cut in
 * a film rather than a browser reload.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
