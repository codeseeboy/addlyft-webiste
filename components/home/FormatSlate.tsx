"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const AUDIO = 15;
const SCREEN = 10;
const TOTAL = AUDIO + SCREEN;

// Fixed profile, not random per render — the same shape every time, so the
// slate reads as a spec rather than as decoration.
const BARS = [
  0.22, 0.38, 0.61, 0.44, 0.78, 0.92, 0.66, 0.41, 0.55, 0.83, 0.97, 0.71, 0.5, 0.34,
  0.48, 0.69, 0.88, 0.62, 0.4, 0.57, 0.75, 0.93, 0.68, 0.45, 0.3, 0.52, 0.72, 0.36,
];

/**
 * The measure of Addlyft media, stated plainly: fifteen seconds spoken, then
 * ten seconds on screen. It loops because the format loops, not because
 * something needs to move.
 */
export default function FormatSlate() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) {
      setT(6);
      return;
    }
    let raf = 0;
    let start = performance.now();
    const run = (now: number) => {
      const elapsed = ((now - start) / 1000) % TOTAL;
      setT(elapsed);
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onAudio = t < AUDIO;
  const audioPct = Math.min(1, t / AUDIO) * 100;
  const screenPct = onAudio ? 0 : Math.min(1, (t - AUDIO) / SCREEN) * 100;
  const remaining = onAudio ? AUDIO - t : SCREEN - (t - AUDIO);

  return (
    <figcaption className="slate" data-phase={onAudio ? "audio" : "screen"}>
      <div className="slate__top">
        <span className="mono slate__label">
          <span className="dot dot--live" />
          The unit
        </span>
        <span className="mono slate__clock num">
          0:{String(Math.max(0, Math.ceil(remaining))).padStart(2, "0")}
        </span>
      </div>

      <div className="slate__viz">
        <div className="slate__wave" aria-hidden="true">
          {BARS.map((h, i) => (
            <i
              key={i}
              style={{
                height: `${Math.round(h * 100)}%`,
                animationDelay: `${(i % 9) * 0.11}s`,
              }}
            />
          ))}
        </div>
        <div className="slate__screen" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="slate__segs">
        <div className="slate__seg" data-on={onAudio}>
          <span className="slate__fill" style={{ transform: `scaleX(${audioPct / 100})` }} />
          <span className="slate__seg-t">Spoken audio · 15s</span>
        </div>
        <div className="slate__seg slate__seg--screen" data-on={!onAudio}>
          <span className="slate__fill" style={{ transform: `scaleX(${screenPct / 100})` }} />
          <span className="slate__seg-t">On screen · 10s</span>
        </div>
      </div>
    </figcaption>
  );
}
