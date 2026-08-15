"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LineReveal, Reveal } from "@/components/site/Motion";

/**
 * The in-store cycle, to scale.
 *
 * Segment lengths are the real ones — a track runs about two minutes, fades
 * for five seconds, two fifteen-second messages play, and the music returns.
 * The playhead fast-forwards through music and slows to near real time for the
 * break, and the header states which it is doing, so nobody has to wait ten
 * seconds to see the part that matters.
 */

type Seg = {
  id: string;
  label: string;
  detail: string;
  len: number;
  kind: "music" | "fade" | "ad";
};

const SEGS: Seg[] = [
  {
    id: "track-a",
    label: "Music",
    detail: "The store's own playlist — genre, language and mood chosen by the owner.",
    len: 120,
    kind: "music",
  },
  {
    id: "fade",
    label: "Fade",
    detail: "The track eases down over five seconds. Nothing is ever cut off mid-song.",
    len: 5,
    kind: "fade",
  },
  {
    id: "ad-1",
    label: "Message 01",
    detail: "Fifteen seconds, spoken clearly, for a business within a few miles of the door.",
    len: 15,
    kind: "ad",
  },
  {
    id: "ad-2",
    label: "Message 02",
    detail: "A second fifteen. Two per break — never a block, never a commercial radio hour.",
    len: 15,
    kind: "ad",
  },
  {
    id: "track-b",
    label: "Music returns",
    detail: "The next track comes up and the room goes back to being a room.",
    len: 120,
    kind: "music",
  },
];

const TOTAL = SEGS.reduce((s, x) => s + x.len, 0);

/*
 * The bar is drawn to true scale, so music is 87% of the cycle. Playing that
 * back at one flat speed means staring at a moving line for ten seconds before
 * anything happens. Instead the playhead fast-forwards through music and drops
 * to near real time for the break — and the header says which it is doing, so
 * the compression is disclosed rather than hidden.
 */
const RATE = { music: 46, fade: 3, ad: 3 } as const;
const rateFor = (kind: Seg["kind"]) => RATE[kind];

const WAVE = [
  0.2, 0.44, 0.72, 0.5, 0.86, 0.62, 0.34, 0.58, 0.9, 0.68, 0.42, 0.76, 0.54, 0.28,
  0.64, 0.88, 0.6, 0.38, 0.7, 0.48, 0.82, 0.56, 0.3, 0.66, 0.92, 0.52, 0.36, 0.74,
  0.46, 0.8, 0.6, 0.32,
];

function segAt(t: number) {
  let acc = 0;
  for (let i = 0; i < SEGS.length; i++) {
    if (t < acc + SEGS[i].len) return { i, start: acc, local: t - acc };
    acc += SEGS[i].len;
  }
  return { i: SEGS.length - 1, start: acc - SEGS[SEGS.length - 1].len, local: SEGS[SEGS.length - 1].len };
}

export default function Cycle() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(118);
  const [playing, setPlaying] = useState(true);
  const raf = useRef(0);
  const last = useRef(0);
  const vid = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (reduce || !playing) return;
    last.current = performance.now();
    const run = (now: number) => {
      const dt = Math.min(0.05, (now - last.current) / 1000);
      last.current = now;
      setT((v) => {
        const rate = rateFor(SEGS[segAt(v).i].kind);
        return (v + dt * rate) % TOTAL;
      });
      raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, reduce]);

  const jump = useCallback((i: number) => {
    let acc = 0;
    for (let k = 0; k < i; k++) acc += SEGS[k].len;
    setT(acc + 0.01);
  }, []);

  const { i, start, local } = segAt(t);
  const seg = SEGS[i];
  const onAir = seg.kind === "ad";
  const pct = (t / TOTAL) * 100;

  /*
   * The reel carries two ten-second advertisers back to back, so the first
   * message plays the first one and the second message plays the second —
   * the break really does come from two different local businesses.
   */
  useEffect(() => {
    const v = vid.current;
    if (!v) return;

    // Seeking before there is data blanks the element, so wait for a frame.
    if (v.readyState < 2) return;

    if (onAir && playing) {
      const offset = seg.id === "ad-2" ? 10 : 0;
      if (Math.abs(v.currentTime - (offset + local)) > 1.2) {
        v.currentTime = offset + Math.min(local, 9.4);
      }
      void v.play().catch(() => {});
    } else {
      v.pause();
      if (!onAir && Math.abs(v.currentTime - 2.5) > 0.1) v.currentTime = 2.5;
    }
  }, [onAir, playing, seg.id, local, canPlay]);

  return (
    <section className="cyc bay" id="cycle">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--teal">The cycle</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Two minutes of music.</span>,
                  <span key="ln2">
                    Thirty seconds that <span key="ln3" className="em">pay for the room.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              This is the entire interruption, drawn to scale. Store owners keep their own
              playlist and set the tone of the room. Brands get a clean, uncrowded break — two
              messages, then the music comes back.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={34}>
          <div className="cyc__player" data-air={onAir}>
            <header className="cyc__head">
              <span className="cyc__phase">
                <span className={`dot ${onAir ? "dot--live" : ""}`} />
                <b>{seg.label}</b>
                <span className="mono cyc__clock num">
                  {Math.floor(local)}s / {seg.len}s
                </span>
              </span>

              <span className="cyc__controls">
                {/* The compression is disclosed, not hidden: music is
                    fast-forwarded, the break runs close to real time. */}
                <span className="mono cyc__rate">
                  {onAir || seg.kind === "fade"
                    ? `break · ${rateFor(seg.kind)}× speed`
                    : `music · ${rateFor(seg.kind)}× fast-forward`}
                </span>
                <button
                  className="cyc__play"
                  onClick={() => setPlaying((p) => !p)}
                  aria-pressed={playing}
                  aria-label={playing ? "Pause the cycle" : "Play the cycle"}
                >
                  {playing ? (
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor" />
                      <rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M5 3.5v9l8-4.5-8-4.5Z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </span>
            </header>

            {/* Bars are drawn to true scale, so the two ad segments are
                genuinely small. Their labels therefore live in the legend
                underneath rather than being squeezed into 4% of the width. */}
            <div className="cyc__track" role="group" aria-label="In-store cycle timeline">
              {SEGS.map((s, k) => (
                <button
                  key={s.id}
                  className="cyc__seg"
                  data-kind={s.kind}
                  data-on={k === i}
                  style={{ flexGrow: s.len }}
                  onClick={() => jump(k)}
                  aria-label={`Jump to ${s.label}, ${s.len} seconds`}
                >
                  <span className="cyc__seg-bar">
                    <span
                      className="cyc__seg-fill"
                      style={{
                        transform: `scaleX(${
                          k < i ? 1 : k > i ? 0 : Math.min(1, local / s.len)
                        })`,
                      }}
                    />
                  </span>
                </button>
              ))}
              <span className="cyc__head-line" style={{ left: `${pct}%` }} aria-hidden="true" />
            </div>

            <ol className="cyc__legend">
              {SEGS.map((s, k) => (
                <li key={s.id} data-kind={s.kind} data-on={k === i}>
                  <button onClick={() => jump(k)} aria-label={`Jump to ${s.label}`}>
                    <i aria-hidden="true" />
                    <b>{s.label}</b>
                    <span className="mono num">{s.len}s</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="cyc__panes">
              <div className="cyc__pane cyc__pane--audio" data-on={onAir}>
                <span className="mono cyc__pane-h">
                  Audio channel
                  <b>{onAir ? "message playing" : "music playing"}</b>
                </span>
                <div className="cyc__wave" aria-hidden="true">
                  {WAVE.map((h, k) => (
                    <i
                      key={k}
                      style={{
                        height: `${Math.round(h * 100)}%`,
                        animationDelay: `${(k % 11) * 0.09}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="t-xs">{seg.detail}</p>
              </div>

              <div className="cyc__pane cyc__pane--screen" data-on={onAir}>
                <span className="mono cyc__pane-h">
                  Screen channel
                  <b>{onAir ? (seg.id === "ad-2" ? "advertiser 02" : "advertiser 01") : "standby"}</b>
                </span>
                <div className="cyc__screen" aria-hidden="true">
                  {/* preload="auto": with metadata only, seeking to the
                      standby frame dropped the poster and left the panel
                      black until data arrived. */}
                  <video
                    ref={vid}
                    className="cyc__screen-vid"
                    src="/media/instore-spot.mp4"
                    poster="/media/instore-spot-poster.jpg"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setCanPlay(true)}
                  />
                  <span className="cyc__screen-bar">
                    <i style={{ transform: `scaleX(${onAir ? Math.min(1, local / 10) : 0})` }} />
                  </span>
                </div>
                <p className="t-xs">
                  A ten-second spot runs on the display by the counter, inside the same break —
                  a different local advertiser on each message. <em>Sample creative.</em>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="cyc__notes">
          {[
            ["Never more than two", "A break is two messages long. Nobody has to sit through a commercial block to buy a coffee."],
            ["The owner sets the room", "Genre, language, mood, explicit-lyrics off by default. The music belongs to the store."],
            ["No competitor next door", "A business never hears a direct competitor advertised in its own aisle. That is a rule, not a setting."],
          ].map(([h, p], k) => (
            <Reveal className="cyc__note" delay={0.06 * k} key={h}>
              <h3 className="t-d4">{h}</h3>
              <p className="t-sm">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
