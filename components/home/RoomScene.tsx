"use client";

/*
 * ADD-LYFT — the room, in three dimensions.
 *
 * WebGL earns its place here for one reason: the product is a ceiling
 * speaker, a wall screen and an aisle between them. The room *is* the
 * explanation, and no photograph can be walked through. Everything in this
 * scene is a physical object under a 3.2m ceiling — every light is attached
 * to a fixture. No particles, no constellations, no gradient fog toys.
 *
 * PERFORMANCE — the whole file is shaped by one rule: a sticky full-height
 * canvas has to hold 60fps *while the page is scrolling*, or the section is
 * worse than the photograph it replaced.
 *
 *   - Every repeated fixture (shelf panels, decks, lips, price rails, cooler
 *     cabinets, glass, ceiling troffers) is drawn with instancing. The first
 *     version issued ~182 individual draw calls; this one issues about 15.
 *   - Four dynamic lights, not ten. Lit surface cost is meshes × lights, so
 *     that change alone is worth more than every other optimisation here.
 *   - The reflective floor is a second full scene render, so it is reserved
 *     for the top tier and runs at a quarter of its old resolution.
 *   - The frameloop stops dead when the section leaves the viewport.
 *
 * Loaded through next/dynamic so three.js never reaches a visitor who is
 * going to be shown the photograph instead.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Instance, Instances, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  dark: "#080809",
  floor: "#101013",
  shelf: "#191920",
  shelfEdge: "#2b2b33",
  tungsten: "#ffdfb4",
  cool: "#8fb4cf",
  screen: "#cfe0f2",
  audio: "#14b8a6",
};

const DRY = ["#8a7f6d", "#6f7a6a", "#7d6a5c", "#5f6672", "#8b8378", "#6a6560", "#94836a"];
const COLD = ["#7d94a6", "#6a8a86", "#8a8f9c", "#5f7d8c", "#93a2ad"];

export type Tier = "high" | "mid" | "low";

const TIERS: Record<Tier, {
  units: number;
  perShelf: number;
  perCooler: number;
  ceilRows: number;
  reflector: boolean;
}> = {
  high: { units: 7, perShelf: 7, perCooler: 8, ceilRows: 8, reflector: true },
  mid: { units: 6, perShelf: 5, perCooler: 6, ceilRows: 7, reflector: false },
  low: { units: 4, perShelf: 4, perCooler: 4, ceilRows: 5, reflector: false },
};

const UNIT_D = 2.2;

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

const SHOTS: Shot[] = [
  { p: 0.0, pos: [0, 1.52, 13.2], look: [0, 1.72, -6], fov: 52 },
  { p: 0.25, pos: [0, 1.58, 8.0], look: [0, 1.68, -6], fov: 47 },
  { p: 0.42, pos: [-0.52, 1.82, 4.6], look: [0.22, 2.48, -1], fov: 43 },
  /* Held on the speaker, but far enough back that the ceiling stays in shot. */
  { p: 0.55, pos: [0.42, 1.72, 3.9], look: [0, 2.82, 0.9], fov: 42 },
  { p: 0.72, pos: [-0.3, 1.8, 3.4], look: [0, 2.82, 0.9], fov: 41 },
  { p: 0.84, pos: [0.25, 1.78, -1.2], look: [-0.85, 1.95, -8.8], fov: 34 },
  /*
   * The look target sits LEFT of the screen, which is what pushes the screen
   * into the right third of the frame — aiming right of it did the opposite —
   * so the chapter copy on the left keeps a dark ground to sit on.
   */
  { p: 1.0, pos: [0.45, 1.88, -3.6], look: [-1.35, 1.95, -8.86], fov: 32 },
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
  const e = t * t * (3 - 2 * t); /* smoothstep — honest accel/decel, no bounce */

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
    /*
     * Vertical FOV is fixed, so a portrait viewport crops the aisle away at
     * the sides and the shot stops reading as a room. Widen the lens as the
     * frame narrows — the same thing a camera operator would do.
     */
    const wide = cam.aspect < 1 ? 1 + Math.min(0.42, (1 - cam.aspect) * 0.72) : 1;
    const target = fov * wide;

    if (Math.abs(cam.fov - target) > 0.01) {
      cam.fov += (target - cam.fov) * k;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/* ------------------------------------------------------------- fixtures */
/* Each of these returns one instanced batch per material. Geometry is unit
   sized and scaled per instance, so a whole aisle of shelving is a single
   draw call rather than one per plank. */

const SHELF_LEVELS = [0.42, 0.94, 1.46, 1.98];

function Gondola({ tier }: { tier: Tier }) {
  const { units, perShelf } = TIERS[tier];
  const from = 11.4;
  const side = 1;
  const x = 2.7 * side;

  const geo = useMemo(() => {
    const backs: V3[] = [];
    const bases: V3[] = [];
    const decks: V3[] = [];
    const lips: V3[] = [];
    const rails: V3[] = [];

    for (let u = 0; u < units; u++) {
      const z = from - u * UNIT_D;
      backs.push([x + side * 0.36, 1.15, z]);
      bases.push([x + side * 0.1, 0.12, z]);
      for (const y of SHELF_LEVELS) {
        decks.push([x + side * -0.06, y - 0.016, z]);
        lips.push([x + side * -0.28, y, z]);
        rails.push([x + side * -0.297, y + 0.004, z]);
      }
    }
    return { backs, bases, decks, lips, rails };
  }, [units, x]);

  const stock = useMemo(() => {
    const rand = prng(4421);
    const out: { pos: V3; scale: V3; color: string }[] = [];
    for (let u = 0; u < units; u++) {
      const z = from - u * UNIT_D;
      for (const y of SHELF_LEVELS) {
        for (let n = 0; n < perShelf; n++) {
          if (rand() < 0.16) continue; /* gaps — a real shelf is never full */
          const w = 0.11 + rand() * 0.09;
          const h = 0.17 + rand() * 0.15;
          out.push({
            pos: [x - side * (0.12 + rand() * 0.14), y + h / 2, z - 0.95 + n * (1.9 / perShelf)],
            scale: [w, h, w * 0.78],
            color: DRY[Math.floor(rand() * DRY.length)],
          });
        }
      }
    }
    return out;
  }, [units, perShelf, x]);

  return (
    <group>
      <Instances limit={geo.backs.length} range={geo.backs.length}>
        <boxGeometry args={[0.66, 2.3, 2.14]} />
        <meshStandardMaterial color="#24242e" roughness={0.85} metalness={0.08} />
        {geo.backs.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.bases.length} range={geo.bases.length}>
        <boxGeometry args={[0.5, 0.24, 2.14]} />
        <meshStandardMaterial color="#101015" roughness={0.9} />
        {geo.bases.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.decks.length} range={geo.decks.length}>
        <boxGeometry args={[0.44, 0.03, 2.12]} />
        <meshStandardMaterial color="#2e2e38" roughness={0.55} metalness={0.35} />
        {geo.decks.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.lips.length} range={geo.lips.length}>
        <boxGeometry args={[0.035, 0.05, 2.12]} />
        <meshStandardMaterial color={C.shelfEdge} roughness={0.35} metalness={0.45} />
        {geo.lips.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      {/* price rails are unlit on purpose — they read as printed strips */}
      <Instances limit={geo.rails.length} range={geo.rails.length}>
        <boxGeometry args={[0.014, 0.018, 1.98]} />
        <meshBasicMaterial color="#5a5240" toneMapped={false} />
        {geo.rails.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={stock.length} range={stock.length}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.78} metalness={0.02} />
        {stock.map((s, i) => (
          <Instance key={i} position={s.pos} scale={s.scale} color={s.color} />
        ))}
      </Instances>
    </group>
  );
}

function Coolers({ tier }: { tier: Tier }) {
  const { units, perCooler } = TIERS[tier];
  const from = 11.4;
  const x = -2.7;

  const geo = useMemo(() => {
    const cabs: V3[] = [];
    const panels: V3[] = [];
    const mullions: V3[] = [];
    const glass: V3[] = [];
    for (let u = 0; u < units; u++) {
      const z = from - u * UNIT_D;
      cabs.push([x - 0.36, 1.24, z]);
      panels.push([x - 0.1, 1.24, z]);
      mullions.push([x + 0.02, 1.24, z]);
      glass.push([x + 0.03, 1.24, z]);
    }
    return { cabs, panels, mullions, glass };
  }, [units, x]);

  const bottles = useMemo(() => {
    const rand = prng(2255);
    const out: { pos: V3; scale: V3; color: string }[] = [];
    for (let u = 0; u < units; u++) {
      const z = from - u * UNIT_D;
      for (let level = 0; level < 4; level++) {
        const y = 0.45 + level * 0.5;
        for (let n = 0; n < perCooler; n++) {
          if (rand() < 0.12) continue;
          const h = 0.2 + rand() * 0.12;
          out.push({
            pos: [x + 0.16 + rand() * 0.1, y + h / 2, z - 0.92 + n * (1.84 / perCooler)],
            scale: [0.055, h, 0.055],
            color: COLD[Math.floor(rand() * COLD.length)],
          });
        }
      }
    }
    return out;
  }, [units, perCooler, x]);

  return (
    <group>
      <Instances limit={geo.cabs.length} range={geo.cabs.length}>
        <boxGeometry args={[0.7, 2.48, 2.16]} />
        <meshStandardMaterial color="#1c1c23" roughness={0.7} metalness={0.25} />
        {geo.cabs.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      {/* the lit interior, facing the aisle */}
      <Instances limit={geo.panels.length} range={geo.panels.length}>
        <planeGeometry args={[2.06, 2.24]} />
        <meshBasicMaterial color={C.cool} toneMapped={false} side={THREE.DoubleSide} />
        {geo.panels.map((p, i) => (
          <Instance key={i} position={p} rotation={[0, Math.PI / 2, 0]} />
        ))}
      </Instances>

      <Instances limit={geo.mullions.length} range={geo.mullions.length}>
        <boxGeometry args={[0.06, 2.4, 0.07]} />
        <meshStandardMaterial color="#1d1d24" roughness={0.4} metalness={0.6} />
        {geo.mullions.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.glass.length} range={geo.glass.length}>
        <planeGeometry args={[2.1, 2.4]} />
        <meshStandardMaterial
          color="#dfeaf5"
          transparent
          opacity={0.09}
          roughness={0.06}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
        {geo.glass.map((p, i) => (
          <Instance key={i} position={p} rotation={[0, Math.PI / 2, 0]} />
        ))}
      </Instances>

      <Instances limit={bottles.length} range={bottles.length}>
        <cylinderGeometry args={[1, 1, 1, 6]} />
        <meshStandardMaterial roughness={0.35} metalness={0.05} />
        {bottles.map((b, i) => (
          <Instance key={i} position={b.pos} scale={b.scale} color={b.color} />
        ))}
      </Instances>
    </group>
  );
}

function Ceiling({ tier }: { tier: Tier }) {
  const { ceilRows } = TIERS[tier];
  const step = 2.8;

  const geo = useMemo(() => {
    const housings: V3[] = [];
    const panels: V3[] = [];
    for (let i = 0; i < ceilRows; i++) {
      const z = 11.5 - i * step;
      for (const x of [-1.25, 1.25]) {
        housings.push([x, 3.24, z]);
        panels.push([x, 3.185, z]);
      }
    }
    return { housings, panels };
  }, [ceilRows]);

  return (
    <group>
      <Instances limit={geo.housings.length} range={geo.housings.length}>
        <boxGeometry args={[0.34, 0.08, 1.9]} />
        <meshStandardMaterial color="#17171c" roughness={0.6} metalness={0.4} />
        {geo.housings.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>

      <Instances limit={geo.panels.length} range={geo.panels.length}>
        <planeGeometry args={[0.26, 1.8]} />
        <meshBasicMaterial color={C.tungsten} toneMapped={false} />
        {geo.panels.map((p, i) => (
          <Instance key={i} position={p} rotation={[Math.PI / 2, 0, 0]} />
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
    const near = Math.max(0, 1 - Math.abs(p - mid) / half);
    el.current.style.opacity = String(Math.min(1, near * 1.6));
  });

  /* No distanceFactor: these are annotation pins, not objects in the room. */
  return (
    <Html center zIndexRange={[10, 0]} occlude={false} style={{ pointerEvents: "none" }}>
      <div className="marker" ref={el} style={{ opacity: 0, width }}>
        {children}
      </div>
    </Html>
  );
}

function AudioDevice({ progress }: { progress: React.RefObject<number> }) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const p = progress.current ?? 0;
    const near = Math.max(0, 1 - Math.abs(p - 0.62) / 0.3);
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 2.1) * 0.45;
    (ring.current.material as THREE.MeshBasicMaterial).opacity = near * (0.24 + pulse * 0.5);
  });

  return (
    <group position={[0, 2.94, 0.88]}>
      <mesh>
        <cylinderGeometry args={[0.27, 0.32, 0.18, 24]} />
        <meshStandardMaterial color="#1c1c22" roughness={0.5} metalness={0.55} />
      </mesh>
      <mesh position={[0, -0.095, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.022, 24]} />
        <meshStandardMaterial color="#0d0d11" roughness={0.9} metalness={0.2} />
      </mesh>
      {/* unlit ring — it glows without costing a dynamic light */}
      <mesh ref={ring} position={[0, -0.108, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.192, 32]} />
        <meshBasicMaterial
          color={C.audio}
          transparent
          opacity={0}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <group position={[0.72, -0.05, 0]}>
        <Marker visibleAt={[0.46, 0.8]} width={168} progress={progress}>
          <b>In-store audio</b>
          <span>15 seconds, spoken, between tracks</span>
        </Marker>
      </group>
    </group>
  );
}

/* ---------------------------------------------------------- wall screen */

/**
 * A real ten-second spot, decoded straight onto the display by the counter.
 * The video only runs while the section is on screen — a paused <video> that
 * nobody can see is pure battery cost.
 */
function WallScreen({
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
    // muted/playsInline must be set BEFORE src, or the autoplay policy has
    // already decided by the time the source is attached.
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.loop = true;
    v.preload = "auto";
    v.src = "/media/instore-spot.mp4";

    // A fully detached element is unreliable for decoding across browsers, so
    // it lives in the document — one pixel, hidden, out of the a11y tree.
    v.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;";
    v.setAttribute("aria-hidden", "true");
    document.body.appendChild(v);
    video.current = v;

    const t = new THREE.VideoTexture(v);
    t.colorSpace = THREE.SRGBColorSpace;
    /*
     * Mipmaps, not plain linear filtering. Seen from the far end of the aisle
     * the display is ~120px wide while the texture is 640px, and sampling that
     * without mipmaps produced a crawling moiré across the screen that read as
     * a scanning band. Anisotropy keeps it sharp at the oblique angles the
     * camera passes through.
     */
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;
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
    <group position={[0, 1.95, -8.86]}>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.05, 1.79, 0.08]} />
        <meshStandardMaterial color="#141417" roughness={0.45} metalness={0.5} />
      </mesh>
      <mesh>
        <planeGeometry args={[2.9, 1.64]} />
        {/*
         * The key is load-bearing. Swapping the props on one <meshBasicMaterial>
         * lets React reconcile it as the same element, so the material instance
         * is reused and the video map is never actually bound — the screen just
         * stays black. Changing the key forces a fresh material once the
         * texture exists.
         */}
        <meshBasicMaterial
          key={tex ? "spot" : "blank"}
          map={tex ?? undefined}
          color={tex ? "#ffffff" : C.screen}
          toneMapped={false}
        />
      </mesh>
      {/* The display is the only thing lighting the far end of the aisle,
          which is exactly how it looks in a real store after dark. */}
      <pointLight position={[0, 0.1, 1.6]} color={C.screen} intensity={11} distance={12} decay={2} />
      {/* Left of the screen: the camera now holds it in the right third, and
          on the right the pin ran off the edge of the frame. */}
      <group position={[-2.15, -0.35, 0.2]}>
        <Marker visibleAt={[0.8, 1.12]} width={156} progress={progress}>
          <b>In-store screen</b>
          <span>10 seconds, at the register</span>
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
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[44, 52]} />
        {reflector ? (
          <MeshReflectorMaterial
            resolution={256}
            blur={[120, 40]}
            mixBlur={1}
            mixStrength={3}
            depthScale={1}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.3}
            roughness={0.8}
            metalness={0.3}
            color={C.floor}
            mirror={0}
          />
        ) : (
          <meshStandardMaterial color={C.floor} roughness={0.62} metalness={0.42} />
        )}
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.3, 0]}>
        <planeGeometry args={[44, 52]} />
        <meshStandardMaterial color="#0c0c0f" roughness={1} />
      </mesh>

      <mesh position={[0, 1.65, -9]}>
        <planeGeometry args={[18, 3.3]} />
        <meshStandardMaterial color="#15151a" roughness={0.95} />
      </mesh>

      <Coolers tier={tier} />
      <Gondola tier={tier} />
      <Ceiling tier={tier} />

      {/* Five dynamic lights for the whole room, spaced down the aisle so the
          far end still reads when the camera reaches the screen. Everything
          else that appears to glow is an unlit material on a real fixture. */}
      <pointLight position={[0, 3.0, 9.2]} color={C.tungsten} intensity={20} distance={16} decay={2} />
      <pointLight position={[0, 3.0, 3.6]} color={C.tungsten} intensity={20} distance={16} decay={2} />
      <pointLight position={[0, 3.0, -2.0]} color={C.tungsten} intensity={20} distance={16} decay={2} />
      <pointLight position={[-2.1, 1.4, 5.2]} color={C.cool} intensity={12} distance={11} decay={2} />
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
  const dpr: [number, number] =
    tier === "high" ? [1, 1.6] : tier === "mid" ? [1, 1.35] : [1, 1];

  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [0, 1.52, 13.2], fov: 52, near: 0.1, far: 60 }}
      gl={{
        antialias: tier === "high",
        powerPreference: "high-performance",
        alpha: false,
      }}
      onCreated={({ gl }) => {
        /*
         * WebGL enables dithering by default, and Intel drivers render it as a
         * visible diagonal crosshatch over smooth gradients — most obviously
         * across the video on the in-store screen, where it read as a scanning
         * pattern crawling over the picture. Nothing here needs dithering.
         */
        const ctx = gl.getContext();
        ctx.disable(ctx.DITHER);

        gl.domElement.addEventListener("webglcontextlost", onLost);
        onReady();
      }}
    >
      <color attach="background" args={[C.dark]} />
      <fog attach="fog" args={[C.dark, 20, 58]} />
      <ambientLight intensity={1.15} color="#a8bacd" />
      <Room tier={tier} />
      <AudioDevice progress={progress} />
      <WallScreen progress={progress} playing={visible} />
      <CameraRig progress={progress} still={still} />
    </Canvas>
  );
}
