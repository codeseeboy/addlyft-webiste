"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LineReveal, Reveal } from "@/components/site/Motion";

/**
 * Two channels, two clocks.
 *
 * This is the correction that came out of the meeting. The screen and the
 * speaker are NOT one synchronised break:
 *
 *   "the one which is played on TV doesn't have any audio"
 *   "the audio advertisements are completely different, they are individual,
 *    they are not together"
 *   "if I'm having a video playing it's not like audio will be playing at the
 *    same time, audio could be plus or minus on different times"
 *
 * So the diagram runs both lanes against ONE shared time axis and lets you
 * watch them disagree: the screen is wall-to-wall ten-second spots all day,
 * while the speaker is mostly music with a fifteen-second read after a track.
 */

const WINDOW = 140; // seconds of store time drawn across the full width

type Seg = { id: string; label: string; len: number; kind: "music" | "fade" | "ad" };

/* Speaker: a track, a fade, one read, and back to the music. */
const AUDIO_LANE: Seg[] = [
  { id: "a-music", label: "Music", len: 120, kind: "music" },
  { id: "a-fade", label: "Fade", len: 5, kind: "fade" },
  { id: "a-ad", label: "Audio ad · 15s", len: 15, kind: "ad" },
];

/* Screen: ten-second spots, back to back, through trading hours. */
const VIDEO_LANE: Seg[] = Array.from({ length: WINDOW / 10 }, (_, i) => ({
  id: `v-${i}`,
  label: `Spot ${String(i + 1).padStart(2, "0")}`,
  len: 10,
  kind: "ad" as const,
}));

/*
 * The playhead fast-forwards through music and slows for the read, so nobody
 * waits ten seconds to see the interesting part. The header says which speed
 * it is running at rather than hiding the compression.
 */
const RATE = { music: 30, fade: 4, ad: 3 } as const;

const WAVE = [
  0.2, 0.44, 0.72, 0.5, 0.86, 0.62, 0.34, 0.58, 0.9, 0.68, 0.42, 0.76, 0.54, 0.28,
  0.64, 0.88, 0.6, 0.38, 0.7, 0.48, 0.82, 0.56, 0.3, 0.66, 0.92, 0.52, 0.36, 0.74,
];

function segAt(lane: Seg[], t: number) {
  let acc = 0;
  for (let i = 0; i < lane.length; i++) {
    if (t < acc + lane[i].len) return { i, seg: lane[i], local: t - acc, start: acc };
    acc += lane[i].len;
  }
  const last = lane.length - 1;
  return { i: last, seg: lane[last], local: lane[last].len, start: acc - lane[last].len };
}

export default function Cycle() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(112);
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
      setT((v) => (v + dt * RATE[segAt(AUDIO_LANE, v).seg.kind]) % WINDOW);
      raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, reduce]);

  const audio = segAt(AUDIO_LANE, t);
  const video = segAt(VIDEO_LANE, t);
  const onAir = audio.seg.kind === "ad";
  const pct = (t / WINDOW) * 100;

  const jumpToRead = useCallback(() => setT(122), []);

  /* The screen never stops, so the clip only pauses when the section does. */
  useEffect(() => {
    const v = vid.current;
    if (!v || v.readyState < 2) return;
    if (playing) void v.play().catch(() => {});
    else v.pause();
  }, [playing, canPlay]);

  return (
    <section className="cyc bay" id="cycle">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--teal">How the ads actually run</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "0.9rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Two channels.</span>,
                  <span key="ln2">
                    Two <span key="ln3" className="em">separate clocks.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              The screen and the speaker are deliberately not tied together. The screen runs
              ten-second spots continuously and silently. The speaker plays the store&rsquo;s
              music, with a fifteen-second read after a track. They never wait for each other.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={26}>
          <div className="cyc__player" data-air={onAir}>
            <header className="cyc__head">
              <span className="cyc__phase">
                <span className={`dot ${onAir ? "dot--live" : ""}`} />
                <b>{onAir ? "Audio read on air" : "Music playing"}</b>
                <span className="mono cyc__clock num">
                  {Math.floor(t)}s of {WINDOW}s
                </span>
              </span>

              <span className="cyc__controls">
                <span className="mono cyc__rate">
                  {onAir || audio.seg.kind === "fade"
                    ? `break · ${RATE[audio.seg.kind]}× speed`
                    : `music · ${RATE.music}× fast-forward`}
                </span>
                <button className="cyc__jump" onClick={jumpToRead}>
                  Skip to the read
                </button>
                <button
                  className="cyc__play"
                  onClick={() => setPlaying((p) => !p)}
                  aria-pressed={playing}
                  aria-label={playing ? "Pause" : "Play"}
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

            {/* Both lanes share one time axis, which is what makes the point. */}
            <div className="lanes">
              <span className="lanes__head-line" style={{ left: `${pct}%` }} aria-hidden="true" />

              <div className="lane" data-kind="video">
                <div className="lane__label">
                  <span className="mono">Screen · video</span>
                  <b>10s spots, back to back, no sound</b>
                </div>
                <div className="lane__track">
                  {VIDEO_LANE.map((s, k) => (
                    <span
                      key={s.id}
                      className="lane__seg"
                      data-kind="ad"
                      data-on={k === video.i}
                      style={{ flexGrow: s.len }}
                      title={`${s.label} · 10s`}
                    />
                  ))}
                </div>
              </div>

              <div className="lane" data-kind="audio">
                <div className="lane__label">
                  <span className="mono">Speaker · audio</span>
                  <b>Music, then one 15s read</b>
                </div>
                <div className="lane__track">
                  {AUDIO_LANE.map((s, k) => (
                    <span
                      key={s.id}
                      className="lane__seg"
                      data-kind={s.kind}
                      data-on={k === audio.i}
                      style={{ flexGrow: s.len }}
                      title={`${s.label} · ${s.len}s`}
                    >
                      {s.len >= 30 && <em>{s.label}</em>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lanes__axis" aria-hidden="true">
                <span>0s</span>
                <span>35s</span>
                <span>70s</span>
                <span>105s</span>
                <span>140s</span>
              </div>
            </div>

            <div className="cyc__panes">
              <div className="cyc__pane cyc__pane--screen" data-on>
                <span className="mono cyc__pane-h">
                  Screen channel
                  <b>{video.seg.label} · always on</b>
                </span>
                <div className="cyc__screen" aria-hidden="true">
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
                </div>
                <p className="t-xs">
                  A silent ten-second spot on the display above the counter, repeating through
                  trading hours. <em>Sample creative.</em>
                </p>
              </div>

              <div className="cyc__pane cyc__pane--audio" data-on={onAir}>
                <span className="mono cyc__pane-h">
                  Audio channel
                  <b>{onAir ? "read on air" : "music playing"}</b>
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
                <p className="t-xs">
                  {onAir
                    ? "Fifteen seconds, spoken, for a business a few miles from the door — then the music comes back."
                    : "The store's own playlist: genre, language and mood chosen by the owner."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="cyc__notes">
          {[
            [
              "The screen has no sound",
              "Video spots are picture and text only, so they never fight the music the store is already playing.",
            ],
            [
              "The speaker is mostly music",
              "One read after a track, not a commercial block. Nobody has to sit through an ad break to buy a coffee.",
            ],
            [
              "Same ad, repeated",
              "You do not make a new ad every day. One spot runs all month — the way a television ad repeats through an evening.",
            ],
          ].map(([h, p]) => (
            <Reveal className="cyc__note" key={h}>
              <h3 className="t-d4">{h}</h3>
              <p className="t-sm">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
