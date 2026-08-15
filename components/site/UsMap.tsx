"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DOTS, MAP_H, MAP_W, MARKETS } from "@/lib/usmap";

/**
 * The lattice is sampled inside the real national border (Albers projection),
 * so the silhouette is the country rather than a decorative scatter. The
 * highlighted points are the markets opening first, and the legend says so —
 * a map that implies coverage we do not have is a lie with a nice gradient on
 * it.
 */
export default function UsMap({ legend = true }: { legend?: boolean }) {
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="usmap">
      <svg
        className="net__map"
        viewBox={`-14 -14 ${MAP_W + 28} ${MAP_H + 28}`}
        role="img"
        aria-label="Map of the continental United States with ADD-LYFT priority markets"
      >
        <g className="net__dots">
          {DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.6} />
          ))}
        </g>

        {MARKETS.map((m) => (
          <g
            key={m.name}
            className="net__mk"
            data-major={m.major}
            data-on={hover === m.name}
            onMouseEnter={() => setHover(m.name)}
            onMouseLeave={() => setHover(null)}
          >
            {m.major && !reduce && (
              <circle className="net__ping" cx={m.x} cy={m.y} r={7}>
                <animate
                  attributeName="r"
                  values="6;20;20"
                  dur="3.4s"
                  repeatCount="indefinite"
                  begin={`${(Math.round(m.x) % 7) * 0.42}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0"
                  dur="3.4s"
                  repeatCount="indefinite"
                  begin={`${(Math.round(m.x) % 7) * 0.42}s`}
                />
              </circle>
            )}
            <circle className="net__hit" cx={m.x} cy={m.y} r={16} />
            <circle className="net__core" cx={m.x} cy={m.y} r={m.major ? 6 : 4.2} />
            <text className="net__lbl" x={m.x} y={m.y - 14} textAnchor="middle">
              {m.name}
            </text>
          </g>
        ))}
      </svg>

      {legend && (
        <p className="net__legend t-xs">
          <span>
            <i className="net__key net__key--major" /> Priority markets
          </span>
          <span>
            <i className="net__key net__key--dot" /> Continental United States
          </span>
        </p>
      )}
    </div>
  );
}
