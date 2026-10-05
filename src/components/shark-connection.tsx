"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowDown,
  Building2,
  Check,
  Handshake,
  Megaphone,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/components/ui";

/*
 * Geometry, in a 400 x 504 coordinate space shared by the SVG (viewBox) and
 * the HTML overlays (percentages of the same aspect-ratio box).
 */
const W = 400;
const H = 504;

type Pt = readonly [number, number];
type Seg = readonly [Pt, Pt, Pt, Pt];

const SOURCE: Pt = [200, 62];
const PORT: Pt = [200, 420];
const CARD = { x: 24, top: 420, bottom: 488 };

type Stage = {
  name: string;
  icon: LucideIcon;
  at: Pt;
  /** Side of the node where the label sits (always towards the centre). */
  label: "left" | "right";
};

const STAGES: Stage[] = [
  { name: "Atração", icon: Megaphone, at: [96, 168], label: "right" },
  { name: "Engajamento", icon: MessageCircle, at: [304, 266], label: "left" },
  { name: "Venda", icon: Handshake, at: [96, 364], label: "right" },
];

/** S-curve with vertical tangents at both ends. */
function sCurve(a: Pt, b: Pt): Seg {
  const my = (a[1] + b[1]) / 2;
  return [a, [a[0], my], [b[0], my], b];
}

const STOPS: Pt[] = [SOURCE, ...STAGES.map((s) => s.at), PORT];
const SEGS: Seg[] = STOPS.slice(1).map((b, i) => sCurve(STOPS[i], b));

const ROUTE =
  `M ${SOURCE[0]} ${SOURCE[1]} ` +
  SEGS.map(([, c1, c2, b]) => `C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${b[0]} ${b[1]}`).join(" ");

function bezier([p0, p1, p2, p3]: Seg, t: number): Pt {
  const u = 1 - t;
  const k0 = u * u * u;
  const k1 = 3 * u * u * t;
  const k2 = 3 * u * t * t;
  const k3 = t * t * t;
  return [
    k0 * p0[0] + k1 * p1[0] + k2 * p2[0] + k3 * p3[0],
    k0 * p0[1] + k1 * p1[1] + k2 * p2[1] + k3 * p3[1],
  ];
}

/*
 * Arc-length lookup table, so the comet head rides exactly at the tip of the
 * drawn line and each stage knows where along the route it sits.
 */
const { LUT, TOTAL, SEG_END } = (() => {
  const steps = 64;
  const lut: { x: number; y: number; d: number }[] = [{ x: SOURCE[0], y: SOURCE[1], d: 0 }];
  const ends: number[] = [];
  let acc = 0;
  let prev: Pt = SOURCE;
  for (const seg of SEGS) {
    for (let i = 1; i <= steps; i++) {
      const p = bezier(seg, i / steps);
      acc += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      lut.push({ x: p[0], y: p[1], d: acc });
      prev = p;
    }
    ends.push(acc);
  }
  return { LUT: lut, TOTAL: acc, SEG_END: ends };
})();

/** Fraction of the route at which each stage node sits. */
const STAGE_AT = SEG_END.slice(0, STAGES.length).map((d) => d / TOTAL);

function pointAt(f: number): Pt {
  const target = Math.min(1, Math.max(0, f)) * TOTAL;
  let lo = 0;
  let hi = LUT.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (LUT[mid].d < target) lo = mid + 1;
    else hi = mid;
  }
  const b = LUT[lo];
  const a = LUT[Math.max(0, lo - 1)];
  const k = (target - a.d) / (b.d - a.d || 1);
  return [a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k];
}

const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;
const at = ([x, y]: Pt) => ({ left: px(x), top: py(y) });

const GREEN = "rgba(61,240,110,1)";
const NO_GLOW = "0px 0px 0px 0px rgba(61,240,110,0)";

/*
 * Story timeline (0 to 1, driven by scroll):
 *   0.00 – 0.03  the route is visible, waiting
 *   0.03 – 0.80  the connection draws from the Shark; stages light in order
 *   0.80 – 0.94  the company card switches on
 */
const DRAW: [number, number] = [0.03, 0.8];
const POWER: [number, number] = [0.8, 0.94];

/**
 * "Quem somos" scene: the reader's scroll draws a green connection from the
 * Shark to the visitor's company, lighting Atração, Engajamento and Venda on
 * the way, until the company card switches on. Once connected it stays
 * connected. The server render, visitors without JS and prefers-reduced-motion
 * all get the final, connected state.
 */
export function SharkConnection({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.9"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Starts complete: that is what the server, no-JS and reduced motion show.
  const story = useMotionValue(1);

  useEffect(() => {
    if (reduceMotion) {
      story.set(1);
      return;
    }
    let ready = false;
    let done = false;
    const apply = (v: number) => {
      if (!ready || done) return;
      if (v >= 0.995) {
        done = true;
        story.set(1);
      } else {
        story.set(v);
      }
    };
    const unsubscribe = smooth.on("change", apply);
    // Wait until the scroll position has been measured, then start from it
    // without replaying: landing past the section shows it connected.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        ready = true;
        const v = scrollYProgress.get();
        smooth.jump(v);
        apply(v);
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
    };
  }, [reduceMotion, scrollYProgress, smooth, story]);

  const drawn = useTransform(story, DRAW, [0, 1]);
  const on = useTransform(story, POWER, [0, 1]);

  const lineOpacity = useTransform(drawn, [0, 0.01], [0, 1]);
  const glowOpacity = useTransform(drawn, [0, 0.01], [0, 0.45]);
  const headX = useTransform(drawn, (f) => pointAt(f)[0]);
  const headY = useTransform(drawn, (f) => pointAt(f)[1]);
  const headOpacity = useTransform(drawn, [0, 0.06, 0.96, 1], [0, 1, 1, 0]);
  const hintOpacity = useTransform(story, [0.02, 0.11], [1, 0]);
  const pulseOpacity = useTransform(on, [0.96, 1], [0, 1]);

  const tileLit = useTransform(drawn, [0, 0.08], [0, 1]);
  const tileBorder = useTransform(tileLit, [0, 1], [
    "rgba(255,255,255,0.12)",
    "rgba(61,240,110,0.45)",
  ]);
  const tileGlow = useTransform(tileLit, [0, 1], [
    NO_GLOW,
    "0px 0px 36px -4px rgba(61,240,110,0.35)",
  ]);

  return (
    <figure
      ref={ref}
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-line bg-[radial-gradient(90%_55%_at_50%_0%,#0c1a10_0%,#0a0a0a_55%,#050505_100%)]",
        className,
      )}
    >
      <figcaption className="sr-only">
        Ao rolar a página, a Shark se conecta à sua empresa passando por
        atração, engajamento e venda.
      </figcaption>

      <div aria-hidden className="relative aspect-[400/504] w-full select-none">
        {/* Precision grid, fading towards the edges */}
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(75%_65%_at_50%_45%,#000_30%,transparent_100%)]" />

        {/* Light pool under the company once it is on */}
        <m.div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(61,240,110,0.16)_0%,transparent_70%)]"
          style={{ opacity: on }}
        />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient
              id="sc-beam"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1={SOURCE[1]}
              x2="0"
              y2={PORT[1]}
            >
              <stop offset="0" stopColor="#3DF06E" stopOpacity="0.55" />
              <stop offset="1" stopColor="#3DF06E" />
            </linearGradient>
            <filter id="sc-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Rings around the source */}
          <circle cx={SOURCE[0]} cy={SOURCE[1]} r={62} stroke="rgba(255,255,255,0.06)" />
          <circle
            cx={SOURCE[0]}
            cy={SOURCE[1]}
            r={84}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="1.5 6"
          />

          {/* The planned route */}
          <path
            d={ROUTE}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1.25}
            strokeDasharray="2 6"
            strokeLinecap="round"
          />

          {/* The connection, drawn by scroll */}
          <m.path
            d={ROUTE}
            stroke="#3DF06E"
            strokeWidth={7}
            strokeLinecap="round"
            filter="url(#sc-blur)"
            style={{ pathLength: drawn, opacity: glowOpacity }}
          />
          <m.path
            d={ROUTE}
            stroke="url(#sc-beam)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ pathLength: drawn, opacity: lineOpacity }}
          />

          {/* Once connected, a quiet signal keeps flowing to the company */}
          <m.g style={{ opacity: pulseOpacity }}>
            <path
              d={ROUTE}
              pathLength={1}
              stroke="#eafff0"
              strokeWidth={2.4}
              strokeLinecap="round"
              className="signal [animation-duration:3.4s]"
            />
          </m.g>

          {/* Comet head at the tip */}
          <m.circle
            cx={headX}
            cy={headY}
            r={11}
            fill="#3DF06E"
            filter="url(#sc-blur)"
            style={{ opacity: headOpacity }}
          />
          <m.circle cx={headX} cy={headY} r={3.6} fill="#eafff0" style={{ opacity: headOpacity }} />
        </svg>

        {/* Source: the Shark */}
        <div className="absolute" style={at(SOURCE)}>
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <m.div
              className="grid size-[76px] place-items-center rounded-[22px] border bg-[linear-gradient(160deg,#171717_0%,#0b0b0b_100%)] sm:size-[84px]"
              style={{ borderColor: tileBorder, boxShadow: tileGlow }}
            >
              <Image
                src="/logo-shark-digital.png"
                alt=""
                width={640}
                height={534}
                sizes="56px"
                className="w-[50px] sm:w-[56px]"
              />
            </m.div>
          </div>
        </div>

        {/* Scroll hint, gone as soon as the story starts */}
        <m.div className="absolute" style={{ ...at([238, 132]), opacity: hintOpacity }}>
          <span className="absolute left-0 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur-sm">
            <ArrowDown className="size-3 text-accent" strokeWidth={2} />
            Role para conectar
          </span>
        </m.div>

        {STAGES.map((stage, i) => (
          <StageNode key={stage.name} stage={stage} index={i} drawn={drawn} />
        ))}

        <CompanyCard on={on} />
      </div>
    </figure>
  );
}

function StageNode({
  stage,
  index,
  drawn,
}: {
  stage: Stage;
  index: number;
  drawn: MotionValue<number>;
}) {
  const f = STAGE_AT[index];
  const lit = useTransform(drawn, [f - 0.025, f], [0, 1]);
  const background = useTransform(lit, [0, 1], ["rgba(13,13,13,1)", GREEN]);
  const borderColor = useTransform(lit, [0, 1], ["rgba(255,255,255,0.16)", GREEN]);
  const color = useTransform(lit, [0, 1], ["rgba(154,154,154,1)", "rgba(5,5,5,1)"]);
  const boxShadow = useTransform(lit, [0, 1], [
    NO_GLOW,
    "0px 0px 26px 0px rgba(61,240,110,0.45)",
  ]);
  const labelColor = useTransform(lit, [0, 1], ["rgba(154,154,154,1)", "rgba(245,245,245,1)"]);
  const indexColor = useTransform(lit, [0, 1], ["rgba(154,154,154,0.7)", GREEN]);
  const ringScale = useTransform(drawn, [f, f + 0.12], [1, 2.4]);
  const ringOpacity = useTransform(drawn, [f, f + 0.01, f + 0.12], [0, 0.6, 0]);
  const Icon = stage.icon;

  return (
    <div className="absolute" style={at(stage.at)}>
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <m.span
          className="absolute inset-0 rounded-full border border-accent"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />
        <m.span
          className="relative grid size-9 place-items-center rounded-full border sm:size-10"
          style={{ background, borderColor, color, boxShadow }}
        >
          <Icon className="size-4 sm:size-[1.1rem]" strokeWidth={1.9} />
        </m.span>
      </div>
      <span
        className={cn(
          "absolute top-0 flex -translate-y-1/2 items-baseline gap-2 whitespace-nowrap",
          stage.label === "right" ? "left-[30px] sm:left-[34px]" : "right-[30px] sm:right-[34px]",
        )}
      >
        <m.span className="font-mono text-[11px] tabular-nums" style={{ color: indexColor }}>
          0{index + 1}
        </m.span>
        <m.span
          className="text-[0.84rem] font-semibold tracking-[-0.01em] sm:text-[0.95rem]"
          style={{ color: labelColor }}
        >
          {stage.name}
        </m.span>
      </span>
    </div>
  );
}

function CompanyCard({ on }: { on: MotionValue<number> }) {
  const borderColor = useTransform(on, [0, 1], [
    "rgba(255,255,255,0.10)",
    "rgba(61,240,110,0.55)",
  ]);
  const boxShadow = useTransform(on, [0, 1], [
    "0px 0px 0px -8px rgba(61,240,110,0)",
    "0px 18px 48px -14px rgba(61,240,110,0.45)",
  ]);
  const avatarBg = useTransform(on, [0, 1], ["rgba(255,255,255,0.04)", "rgba(61,240,110,0.12)"]);
  const avatarColor = useTransform(on, [0, 1], ["rgba(154,154,154,1)", GREEN]);
  const offOpacity = useTransform(on, [0, 0.5], [1, 0]);
  const onOpacity = useTransform(on, [0.35, 0.85], [0, 1]);
  const onY = useTransform(on, [0.35, 0.85], [4, 0]);
  const trackBg = useTransform(on, [0, 1], ["rgba(255,255,255,0.08)", GREEN]);
  const knobX = useTransform(on, [0, 1], [0, 16]);
  const knobBg = useTransform(on, [0, 1], ["rgba(140,140,140,1)", "rgba(5,5,5,1)"]);
  const sheenX = useTransform(on, [0.2, 1], ["-120%", "320%"]);
  const sheenOpacity = useTransform(on, [0.2, 0.4, 0.85, 1], [0, 1, 1, 0]);
  const portBg = useTransform(on, [0, 0.3], ["rgba(13,13,13,1)", GREEN]);
  const portRingScale = useTransform(on, [0.05, 0.7], [1, 4]);
  const portRingOpacity = useTransform(on, [0.05, 0.12, 0.7], [0, 0.7, 0]);
  const portGlow = useTransform(on, [0, 1], [
    NO_GLOW,
    "0px 0px 14px 3px rgba(61,240,110,0.55)",
  ]);

  return (
    <>
      <m.div
        className="absolute flex items-center gap-3 overflow-hidden rounded-2xl border bg-[linear-gradient(160deg,#131313_0%,#0a0a0a_100%)] px-3.5 sm:gap-3.5 sm:px-4"
        style={{
          left: px(CARD.x),
          right: px(CARD.x),
          top: py(CARD.top),
          bottom: py(H - CARD.bottom),
          borderColor,
          boxShadow,
        }}
      >
        {/* A sweep of light as it switches on */}
        <m.span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(61,240,110,0.14),transparent)]"
          style={{ x: sheenX, opacity: sheenOpacity }}
        />
        <m.span
          className="relative grid size-9 shrink-0 place-items-center rounded-xl sm:size-10"
          style={{ background: avatarBg, color: avatarColor }}
        >
          <Building2 className="size-[1.05rem]" strokeWidth={1.7} />
        </m.span>
        <span className="relative min-w-0 flex-1">
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Sua empresa
          </span>
          <span className="mt-1 grid text-[0.8rem] font-medium sm:text-sm">
            <m.span
              className="flex items-center gap-1.5 text-muted [grid-area:1/1]"
              style={{ opacity: offOpacity }}
            >
              <span className="size-1.5 rounded-full bg-white/25" />
              Aguardando conexão
            </m.span>
            <m.span
              className="flex items-center gap-1.5 text-fg [grid-area:1/1]"
              style={{ opacity: onOpacity, y: onY }}
            >
              <span className="grid size-4 place-items-center rounded-full bg-accent text-bg">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              Conectada à Shark
            </m.span>
          </span>
        </span>
        {/* Power switch */}
        <m.span
          className="relative flex h-[22px] w-[38px] shrink-0 items-center rounded-full px-[3px]"
          style={{ background: trackBg }}
        >
          <m.span className="size-4 rounded-full" style={{ x: knobX, background: knobBg }} />
        </m.span>
      </m.div>

      {/* Port where the connection plugs in */}
      <div className="absolute" style={at(PORT)}>
        <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
          <m.span
            className="block size-2.5 rounded-full border border-accent"
            style={{ scale: portRingScale, opacity: portRingOpacity }}
          />
        </span>
        <m.span
          className="absolute left-0 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70"
          style={{ background: portBg, boxShadow: portGlow }}
        />
      </div>
    </>
  );
}
