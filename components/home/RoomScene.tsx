"use client";

/*
 * Addlyft — the checkout counter, in three dimensions.
 *
 * Rebuilt to the brief given on the call. The previous version was a dark
 * aisle of shelving; the client said it "looks like a library to me" and
 * asked for a convenience store instead — specifically the cash counter:
 *
 *   "use like a counter, where you go to shopping, you go to the cash
 *    counter... where you purchase the stuff... on the top of the counter
 *    you can put a TV and on the side or wherever"
 *
 * and, asked whether it should stay in the skeleton style: "Colored."
 *
 * So: a lit daytime store, a real service counter with a POS on it, a
 * back-bar of stock, the screen mounted above the counter playing a spot,
 * and the speaker overhead. Warm and colourful rather than near-black.
 *
 * PERFORMANCE — a sticky full-height canvas has to hold frame rate while the
 * page scrolls. Every repeated fixture is instanced, there are five dynamic
 * lights, and the frameloop stops when the section leaves the viewport.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  Instance,
  Instances,
  Lightformer,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  bg: "#9aa6b0",
  floor: "#7d7b76",
  wall: "#c3beb4",
  ceiling: "#d6d3cd",
  counterTop: "#7a4f2e",
  counterBody: "#212c33",
  shelf: "#b3afa6",
  shelfEdge: "#9b978e",
  daylight: "#ffeed2",
  cool: "#cfe3f2",
  audio: "#0d9488",
};

/*
 * Convenience-store stock is loud, but it is not a colour wheel. The first
 * version used evenly spaced Flat-UI primaries at full saturation, which is
 * exactly the palette a toy set uses — that was the "cartoonish" note.
 *
 * These are sampled off real packaging instead: mostly mid-value and muted,
 * with a handful of saturated pops, and several near-neutral cartons. Value
 * varies more than hue does, which is what real shelves actually look like.
 */
const GOODS = [
  "#9c3b32", "#b5642f", "#c9a24a", "#4f7346", "#3a5f7d",
  "#6d5273", "#a8552c", "#3f7168", "#95566a", "#c4a06a",
  "#d8d2c6", "#b9b3a6", "#8f8a80", "#e0d8c8", "#7a6f63",
  "#2f3a42", "#c85a3c", "#d9c9a3",
];
const COLD = ["#3d6a8c", "#4a8579", "#5d6d93", "#4b7d90", "#7fa2b5", "#c3d2da"];

export type Tier = "high" | "mid" | "low";

const TIERS: Record<Tier, { units: number; perShelf: number; backBar: number; reflector: boolean }> = {
  high: { units: 6, perShelf: 7, backBar: 9, reflector: true },
  mid: { units: 5, perShelf: 5, backBar: 7, reflector: false },
  low: { units: 3, perShelf: 4, backBar: 5, reflector: false },
};

const UNIT_D = 2.2;
const BACK_Z = -6;
const COUNTER_Z = -3.5;

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type V3 = [number, number, number];

/* ---------------------------------------------------------------- camera */

type Shot = { p: number; pos: V3; look: V3; fov: number };

/* The whole path now faces the counter, because the counter is the subject. */
const SHOTS: Shot[] = [
  { p: 0.0, pos: [0, 1.62, 8.6], look: [0, 1.55, -4.2], fov: 54 },
  { p: 0.28, pos: [0, 1.6, 5.0], look: [0, 1.5, -4.4], fov: 48 },
  /* Held on the overhead speaker while the audio channel is explained. */
  { p: 0.5, pos: [0.75, 1.5, 2.4], look: [0, 2.85, 0.5], fov: 44 },
  { p: 0.66, pos: [-0.5, 1.6, 2.0], look: [0, 2.85, 0.5], fov: 43 },
  /* Then down onto the counter and up to the screen above it. */
  { p: 0.84, pos: [-1.15, 1.66, 2.2], look: [0.15, 1.9, -5.4], fov: 40 },
  { p: 1.0, pos: [-1.0, 1.78, 0.9], look: [0.25, 2.24, -5.9], fov: 36 },
];

const vA = new THREE.Vector3();
const vB = new THREE.Vector3();

function sampleShots(p: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  let i = 0;
  while (i < SHOTS.length - 2 && p > SHOTS[i + 1].p) i++;
  const a = SHOTS[i];
  const b = SHOTS[i + 1];
  const span = b.p - a.p;
  const t = Math.max(0, Math.min(1, span <= 0 ? 0 : (p - a.p) / span));
  const e = t * t * (3 - 2 * t);

  outPos.set(...a.pos).lerp(vA.set(...b.pos), e);
  outLook.set(...a.look).lerp(vB.set(...b.look), e);
  return a.fov + (b.fov - a.fov) * e;
}

function CameraRig({ progress, still }: { progress: React.RefObject<number>; still: boolean }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const cur = useRef(new THREE.Vector3());
  const curLook = useRef(new THREE.Vector3());
  const started = useRef(false);

  useFrame((_, delta) => {
    const p = still ? 0 : progress.current ?? 0;
    const fov = sampleShots(p, pos.current, look.current);

    if (!started.current) {
      cur.current.copy(pos.current);
      curLook.current.copy(look.current);
      started.current = true;
    }

    const k = 1 - Math.pow(0.0018, Math.min(delta, 0.05));
    cur.current.lerp(pos.current, k);
    curLook.current.lerp(look.current, k);
    camera.position.copy(cur.current);
    camera.lookAt(curLook.current);

    const cam = camera as THREE.PerspectiveCamera;
    /* Portrait crops the room away at the sides, so widen the lens. */
    const wide = cam.aspect < 1 ? 1 + Math.min(0.42, (1 - cam.aspect) * 0.72) : 1;
    const target = fov * wide;
    if (Math.abs(cam.fov - target) > 0.01) {
      cam.fov += (target - cam.fov) * k;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/* ------------------------------------------------------------- the store */

const SHELF_LEVELS = [0.45, 0.98, 1.51, 2.04];

/** Aisle shelving down both sides, so the camera flies between it. */
function Aisles({ tier }: { tier: Tier }) {
  const { units, perShelf } = TIERS[tier];
  const from = 8.6;

  const geo = useMemo(() => {
    const backs: V3[] = [];
    const decks: V3[] = [];
    const bases: V3[] = [];
    for (const side of [-1, 1]) {
      const x = 3.1 * side;
      for (let u = 0; u < units; u++) {
        const z = from - u * UNIT_D;
        backs.push([x + side * 0.34, 1.2, z]);
        bases.push([x + side * 0.06, 0.13, z]);
        for (const y of SHELF_LEVELS) decks.push([x + side * -0.08, y - 0.02, z]);
      }
    }
    return { backs, decks, bases };
  }, [units]);

  const stock = useMemo(() => {
    const rand = prng(1877);
    const out: { pos: V3; scale: V3; color: string }[] = [];
    for (const side of [-1, 1]) {
      const x = 3.1 * side;
      for (let u = 0; u < units; u++) {
        const z = from - u * UNIT_D;
        for (const y of SHELF_LEVELS) {
          for (let n = 0; n < perShelf; n++) {
            if (rand() < 0.14) continue;
            const w = 0.12 + rand() * 0.1;
            const h = 0.18 + rand() * 0.16;
            out.push({
              pos: [x - side * (0.1 + rand() * 0.16), y + h / 2, z - 0.95 + n * (1.9 / perShelf)],
              scale: [w, h, w * 0.8],
              color: GOODS[Math.floor(rand() * GOODS.length)],
            });
          }
        }
      }
    }
    return out;
  }, [units, perShelf]);

  /* Roughly a third of a real shelf is bottles and cans; the rest is board. */
  const matte = useMemo(() => stock.filter((_, i) => i % 3 !== 0), [stock]);
  const gloss = useMemo(() => stock.filter((_, i) => i % 3 === 0), [stock]);

  return (
    <group>
      <Instances limit={geo.backs.length} range={geo.backs.length}>
        <boxGeometry args={[0.62, 2.4, 2.14]} />
        <meshStandardMaterial color={C.shelf} roughness={0.9} />
        {geo.backs.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.bases.length} range={geo.bases.length}>
        <boxGeometry args={[0.56, 0.26, 2.14]} />
        <meshStandardMaterial color={C.shelfEdge} roughness={0.85} />
        {geo.bases.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.decks.length} range={geo.decks.length}>
        <boxGeometry args={[0.5, 0.04, 2.12]} />
        <meshStandardMaterial color="#d5d1c8" roughness={0.55} metalness={0.08} envMapIntensity={1.1} />
        {geo.decks.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      {/*
       * Two material groups, not one. A single matte material made every item
       * the same plastic brick; cartons and bottles reflect very differently,
       * and that contrast is most of what separates a shelf you believe from
       * one you do not.
       */}
      <Instances limit={matte.length} range={matte.length}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.82} metalness={0.02} envMapIntensity={0.7} />
        {matte.map((s, i) => (
          <Instance key={i} position={s.pos} scale={s.scale} color={s.color} />
        ))}
      </Instances>

      <Instances limit={gloss.length} range={gloss.length}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.2} metalness={0.14} envMapIntensity={1.6} />
        {gloss.map((s, i) => (
          <Instance key={i} position={s.pos} scale={s.scale} color={s.color} />
        ))}
      </Instances>
    </group>
  );
}

/** The service counter: the thing the client actually asked for. */
function Counter({ tier }: { tier: Tier }) {
  const { backBar } = TIERS[tier];

  const bottles = useMemo(() => {
    const rand = prng(5521);
    const out: { pos: V3; scale: V3; color: string }[] = [];
    for (let row = 0; row < 2; row++) {
      const y = 0.56 + row * 0.52;
      for (let n = 0; n < backBar; n++) {
        const h = 0.22 + rand() * 0.14;
        out.push({
          pos: [-2.4 + n * (4.8 / backBar) + rand() * 0.1, y + h / 2, BACK_Z + 0.46],
          scale: [0.11, h, 0.11],
          color: rand() > 0.55 ? GOODS[Math.floor(rand() * GOODS.length)] : COLD[Math.floor(rand() * COLD.length)],
        });
      }
    }
    return out;
  }, [backBar]);

  return (
    <group>
      {/* counter body + overhanging top */}
      <mesh position={[0, 0.5, COUNTER_Z]} castShadow={false}>
        <boxGeometry args={[3.6, 1.0, 0.8]} />
        <meshStandardMaterial color={C.counterBody} roughness={0.45} metalness={0.2} envMapIntensity={1.1} />
      </mesh>
      <mesh position={[0, 1.03, COUNTER_Z]}>
        <boxGeometry args={[3.85, 0.07, 0.95]} />
        <meshStandardMaterial color={C.counterTop} roughness={0.3} metalness={0.05} envMapIntensity={1.2} />
      </mesh>
      {/* kick rail — a small real-world detail that sells the scale */}
      <mesh position={[0, 0.06, COUNTER_Z + 0.38]}>
        <boxGeometry args={[3.6, 0.12, 0.06]} />
        <meshStandardMaterial color="#161d21" roughness={0.8} />
      </mesh>

      {/* POS terminal, screen tilted toward the cashier */}
      <group position={[-1.05, 1.06, COUNTER_Z - 0.05]}>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.26]} />
          <meshStandardMaterial color="#20282c" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.24, -0.05]} rotation={[-0.28, 0, 0]}>
          <boxGeometry args={[0.34, 0.26, 0.03]} />
          <meshStandardMaterial color="#11171a" roughness={0.35} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.24, -0.033]} rotation={[-0.28, 0, 0]}>
          <planeGeometry args={[0.29, 0.21]} />
          <meshBasicMaterial color="#3d6f8a" toneMapped={false} />
        </mesh>
      </group>

      {/* card reader on the customer side */}
      <group position={[0.95, 1.07, COUNTER_Z + 0.22]}>
        <mesh rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.13, 0.19, 0.03]} />
          <meshStandardMaterial color="#2b3237" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>

      {/* a few goods mid-checkout on the countertop */}
      <group position={[0.15, 1.07, COUNTER_Z + 0.02]}>
        {[
          [0, 0.07, 0, "#c0392b", 0.1, 0.14],
          [0.22, 0.05, 0.05, "#27ae60", 0.09, 0.1],
          [-0.24, 0.06, -0.04, "#f1c40f", 0.08, 0.12],
        ].map(([x, y, z, col, w, h], i) => (
          <mesh key={i} position={[x as number, y as number, z as number]}>
            <boxGeometry args={[w as number, h as number, (w as number) * 0.8]} />
            <meshStandardMaterial color={col as string} roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* back-bar behind the counter */}
      {/* Kept low and pulled clear of the wall so it never intersects the
          screen mounted above it. */}
      <mesh position={[0, 0.8, BACK_Z + 0.34]}>
        <boxGeometry args={[5.4, 1.6, 0.44]} />
        <meshStandardMaterial color={C.shelf} roughness={0.9} />
      </mesh>
      {[0.5, 1.02].map((y) => (
        <mesh key={y} position={[0, y, BACK_Z + 0.48]}>
          <boxGeometry args={[5.2, 0.04, 0.32]} />
          <meshStandardMaterial color="#d5d1c8" roughness={0.55} metalness={0.08} envMapIntensity={1.1} />
        </mesh>
      ))}
      <Instances limit={bottles.length} range={bottles.length}>
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshStandardMaterial roughness={0.5} />
        {bottles.map((b, i) => (
          <Instance key={i} position={b.pos} scale={b.scale} color={b.color} />
        ))}
      </Instances>
    </group>
  );
}

/* -------------------------------------------------------------- markers */

function Marker({
  children,
  visibleAt,
  width,
  progress,
}: {
  children: React.ReactNode;
  visibleAt: [number, number];
  width: number;
  progress: React.RefObject<number>;
}) {
  const el = useRef<HTMLDivElement>(null);
  useFrame(() => {
    if (!el.current) return;
    const p = progress.current ?? 0;
    const [a, b] = visibleAt;
    const mid = (a + b) / 2;
    const half = (b - a) / 2;
    el.current.style.opacity = String(Math.min(1, Math.max(0, 1 - Math.abs(p - mid) / half) * 1.6));
  });
  return (
    <Html center zIndexRange={[10, 0]} occlude={false} style={{ pointerEvents: "none" }}>
      <div className="marker" ref={el} style={{ opacity: 0, width }}>
        {children}
      </div>
    </Html>
  );
}

/** Overhead speaker — the audio channel. */
function Speaker({ progress }: { progress: React.RefObject<number> }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const p = progress.current ?? 0;
    const near = Math.max(0, 1 - Math.abs(p - 0.56) / 0.28);
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 2.1) * 0.45;
    (ring.current.material as THREE.MeshBasicMaterial).opacity = near * (0.3 + pulse * 0.55);
  });

  return (
    <group position={[0, 2.92, 0.5]}>
      <mesh>
        <cylinderGeometry args={[0.28, 0.33, 0.2, 24]} />
        <meshStandardMaterial color="#3b4449" roughness={0.55} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.105, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.025, 24]} />
        <meshStandardMaterial color="#1b2226" roughness={0.85} />
      </mesh>
      <mesh ref={ring} position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.17, 0.2, 32]} />
        <meshBasicMaterial color={C.audio} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0.95, -0.12, 0]}>
        <Marker visibleAt={[0.38, 0.74]} width={172} progress={progress}>
          <b>Speaker · audio</b>
          <span>15s read between songs</span>
        </Marker>
      </group>
    </group>
  );
}

/** The screen, mounted above the counter — the video channel. */
function CounterScreen({
  progress,
  playing,
}: {
  progress: React.RefObject<number>;
  playing: boolean;
}) {
  const [tex, setTex] = useState<THREE.VideoTexture | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.loop = true;
    v.preload = "auto";
    v.src = "/media/instore-spot.mp4";
    v.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;";
    v.setAttribute("aria-hidden", "true");
    document.body.appendChild(v);
    video.current = v;

    const t = new THREE.VideoTexture(v);
    t.colorSpace = THREE.SRGBColorSpace;
    /* No mipmaps on a video texture: three would have to regenerate them on
       every frame, and on several drivers the mip chain never completes, so
       the sampler returns black and the screen looks switched off. */
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.anisotropy = 4;
    setTex(t);

    return () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
      v.remove();
      t.dispose();
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) void v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <group position={[0, 2.34, BACK_Z + 0.06]}>
      {/* Bezel sits behind the picture. The plane used to be at local z=0
          while the bezel box spanned -0.05..+0.01, so the picture was buried
          5mm inside the frame and the screen read as switched off. */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[2.32, 1.36, 0.07]} />
        <meshStandardMaterial color="#171c1f" roughness={0.45} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.18, 1.22]} />
        {/* keyed so the video map actually binds once the texture exists */}
        <meshBasicMaterial
          key={tex ? "spot" : "blank"}
          map={tex ?? undefined}
          color={tex ? "#ffffff" : C.cool}
          toneMapped={false}
        />
      </mesh>
      {/* the screen throws its own light onto the counter below */}
      <pointLight position={[0, -0.5, 1.5]} color="#cfe0f2" intensity={6} distance={7} decay={2} />
      <group position={[1.72, -0.12, 0.25]}>
        <Marker visibleAt={[0.78, 1.14]} width={168} progress={progress}>
          <b>Screen · video</b>
          <span>10s spots, above the counter</span>
        </Marker>
      </group>
    </group>
  );
}

/* ----------------------------------------------------------------- room */

function Room({ tier }: { tier: Tier }) {
  const { reflector } = TIERS[tier];

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 48]} />
        {reflector ? (
          <MeshReflectorMaterial
            resolution={256}
            blur={[140, 50]}
            mixBlur={1}
            mixStrength={1.4}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.3}
            roughness={0.85}
            metalness={0.1}
            color={C.floor}
            mirror={0}
          />
        ) : (
          <meshStandardMaterial color={C.floor} roughness={0.62} metalness={0.06} envMapIntensity={0.9} />
        )}
      </mesh>

      {/* ceiling and walls */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[40, 48]} />
        <meshStandardMaterial color={C.ceiling} roughness={0.92} envMapIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.6, BACK_Z]}>
        <planeGeometry args={[16, 3.2]} />
        <meshStandardMaterial color={C.wall} roughness={0.88} envMapIntensity={0.6} />
      </mesh>

      {/* ceiling light panels */}
      {[6.2, 2.6, -1.0, -4.4].map((z) =>
        [-2.0, 2.0].map((x) => (
          <group key={`${z}-${x}`}>
            <mesh position={[x, 3.14, z]}>
              <boxGeometry args={[0.42, 0.1, 2.1]} />
              <meshStandardMaterial color="#cdd2d6" roughness={0.6} metalness={0.3} />
            </mesh>
            <mesh position={[x, 3.08, z]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.34, 2.0]} />
              <meshBasicMaterial color={C.daylight} toneMapped={false} />
            </mesh>
          </group>
        )),
      )}

      <Aisles tier={tier} />
      <Counter tier={tier} />

      <ContactShadows
        position={[0, 0.01, COUNTER_Z]}
        scale={14}
        resolution={tier === "low" ? 256 : 512}
        blur={2.6}
        opacity={0.42}
        far={2.2}
        color="#1a1f24"
        frames={1}
      />

      {/* Daylight-ish store lighting: five lamps for the whole room. */}
      <pointLight position={[0, 3.0, 6.0]} color={C.daylight} intensity={13} distance={15} decay={2} />
      <pointLight position={[0, 3.0, 1.2]} color={C.daylight} intensity={13} distance={15} decay={2} />
      <pointLight position={[0, 2.9, -3.2]} color={C.daylight} intensity={12} distance={14} decay={2} />
      <pointLight position={[-3.0, 2.2, 3.0]} color="#ffffff" intensity={3} distance={10} decay={2} />
      <pointLight position={[3.0, 2.2, 3.0]} color="#ffffff" intensity={3} distance={10} decay={2} />
    </group>
  );
}

/* --------------------------------------------------------------- export */

export default function RoomScene({
  progress,
  tier,
  still,
  visible,
  onReady,
  onLost,
}: {
  progress: React.RefObject<number>;
  tier: Tier;
  still: boolean;
  visible: boolean;
  onReady: () => void;
  onLost: () => void;
}) {
  const dpr: [number, number] = tier === "high" ? [1, 1.6] : tier === "mid" ? [1, 1.35] : [1, 1];

  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [0, 1.62, 8.6], fov: 54, near: 0.1, far: 60 }}
      shadows={tier === "high" ? "soft" : false}
      gl={{
        antialias: tier === "high",
        powerPreference: "high-performance",
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.98,
      }}
      onCreated={({ gl }) => {
        /* WebGL dithers by default and Intel drivers draw it as a visible
           crosshatch over gradients. Nothing here needs it. */
        const ctx = gl.getContext();
        ctx.disable(ctx.DITHER);
        gl.domElement.addEventListener("webglcontextlost", onLost);
        onReady();
      }}
    >
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 22, 46]} />
      <ambientLight intensity={0.32} color="#e8eef3" />
      <hemisphereLight args={["#eaf1f6", "#8d8880", 0.4]} />

      {/*
       * Built in-engine rather than fetched: drei's HDRI presets pull from a
       * CDN, and this scene must not depend on a third-party download to stop
       * looking like plastic. Four soft strips mimic the ceiling runs, so every
       * bottle and chiller door gets a real highlight to roll across it.
       */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#20262b"]} />
        {[6.2, 2.6, -1.0, -4.4].map((z) => (
          <Lightformer
            key={z}
            form="rect"
            intensity={2.4}
            color="#fff4e2"
            position={[0, 3.1, z]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 1.6, 1]}
          />
        ))}
        <Lightformer form="rect" intensity={0.7} color="#cfe3f2" position={[-6, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#cfe3f2" position={[6, 2, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 4, 1]} />
      </Environment>

      <Room tier={tier} />
      <Speaker progress={progress} />
      <CounterScreen progress={progress} playing={visible} />
      <CameraRig progress={progress} still={still} />
    </Canvas>
  );
}
