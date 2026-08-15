"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MAP_H, MAP_W, MARKETS, STATES_PATH } from "@/lib/usmap";

/**
 * A real map, not a decorative lattice.
 *
 * The previous version drew a dot grid and placed the cities from a projection
 * that was vertically mirrored — north came out at the bottom, which is why
 * the client said "the mappings are not right" and could not find his own
 * state. This draws actual state borders from us-atlas through an Albers USA
 * projection, and every market below sits on its true coordinates.
 */
export default function UsMap({ legend = true }: { legend?: boolean }) {
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="usmap">
      <svg
        className="net__map"
        viewBox={`-16 -16 ${MAP_W + 32} ${MAP_H + 32}`}
        role="img"
        aria-label="Map of the United States showing Addlyft priority markets"
      >
        <path className="net__states" d={STATES_PATH} />

        {MARKETS.map((m) => (
          <g
            key={`${m.name}-${m.state}`}
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
                  values="5;18;18"
                  dur="3.4s"
                  repeatCount="indefinite"
                  begin={`${(Math.round(m.x) % 7) * 0.42}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.45;0;0"
                  dur="3.4s"
                  repeatCount="indefinite"
                  begin={`${(Math.round(m.x) % 7) * 0.42}s`}
                />
              </circle>
            )}
            <circle className="net__hit" cx={m.x} cy={m.y} r={16} />
            <circle className="net__core" cx={m.x} cy={m.y} r={m.major ? 5.5 : 3.8} />
            <text className="net__lbl" x={m.x} y={m.y - 12} textAnchor="middle">
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
            <i className="net__key net__key--minor" /> Opening next
          </span>
        </p>
      )}
    </div>
  );
}
