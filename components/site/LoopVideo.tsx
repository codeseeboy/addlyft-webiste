"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A muted, looping background clip that only decodes while it is on screen.
 *
 * The poster frame is a still from the clip itself, so the swap from image to
 * video is invisible — no flash, no change of subject, nothing that reads as a
 * glitch. Anyone on reduced motion keeps the still permanently.
 */
export default function LoopVideo({
  src,
  poster,
  className,
  alt = "",
}: {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const io = new IntersectionObserver(
      (entries) => setNear(entries.some((e) => e.isIntersecting)),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (near) void el.play().catch(() => {});
    else el.pause();
  }, [near, reduce]);

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={poster} alt={alt} />;
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt || undefined}
    />
  );
}
