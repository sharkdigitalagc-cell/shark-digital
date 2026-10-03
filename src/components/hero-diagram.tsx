"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/components/ui";

const NODES = ["Google Ads", "Conteúdo", "Instagram Ads", "Atendimento", "Dados"];

const SIZE = 560;
const C = SIZE / 2;
const R = 200;

// Pentagon, starting at the top and going clockwise.
const points = NODES.map((label, i) => {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  return {
    label,
    x: C + R * Math.cos(angle),
    y: C + R * Math.sin(angle),
  };
});

const pct = (v: number) => `${(v / SIZE) * 100}%`;

const CYCLE_MS = 2600;
const TILT = 6;

/**
 * Hero diagram: the business at the centre, connected to the five
 * disciplines of the operation. Signals travel from each channel to the
 * centre; while nobody interacts, the channels light up one by one.
 * Hovering (or tapping) a channel lights its connection, hovering the
 * centre lights all of them, and the diagram tilts slightly towards the
 * cursor. Under prefers-reduced-motion only the hover highlight remains.
 */
export function HeroDiagram({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [centreHovered, setCentreHovered] = useState(false);
  const [auto, setAuto] = useState<number | null>(null);
  const [inView, setInView] = useState(false);

  const interacting = hovered !== null || centreHovered;
  const active = hovered ?? (centreHovered ? null : auto);

  // Ambient tour of the channels, paused while the user interacts or the
  // diagram is off screen.
  useEffect(() => {
    if (reduceMotion || interacting || !inView) return;
    const id = window.setInterval(
      () => setAuto((a) => (a === null ? 0 : (a + 1) % NODES.length)),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, interacting, inView]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * TILT * 2);
    rx.set(-y * TILT * 2);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const lit = (i: number) => centreHovered || active === i;
  const opacityFor = (i: number) =>
    centreHovered ? 1 : active === null ? 0.55 : active === i ? 1 : 0.22;

  return (
    <figure
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[34rem] [perspective:1200px]",
        className,
      )}
    >
      <figcaption className="sr-only">
        Diagrama: sua empresa, com a oferta e o atendimento no centro, conectada
        a Google Ads, Conteúdo, Instagram Ads, Atendimento e Dados.
      </figcaption>
      <m.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden
        >
          <defs>
            <radialGradient id="hd-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3DF06E" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#3DF06E" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hd-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <circle
            cx={C}
            cy={C}
            r={150}
            fill="url(#hd-core)"
            className="transition-opacity duration-300"
            opacity={centreHovered || active !== null ? 1 : 0.6}
          />

          {/* Orbits */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.08)" />
          <circle
            cx={C}
            cy={C}
            r={R + 52}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 10"
            className="orbit-spin"
          />
          <circle
            cx={C}
            cy={C}
            r={118}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeDasharray="1 7"
          />

          {/* Ring connections between neighbouring nodes */}
          <polygon
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
          />

          {/* Spokes: a faint base line, plus a green connection drawn once on load */}
          {points.map((p, i) => (
            <g key={p.label}>
              <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="url(#hd-line)" />
              <line
                x1={p.x}
                y1={p.y}
                x2={C}
                y2={C}
                pathLength={1}
                stroke="#3DF06E"
                strokeOpacity={opacityFor(i)}
                strokeWidth={lit(i) ? 2 : 1.25}
                strokeLinecap="round"
                className="line-draw transition-[stroke-opacity,stroke-width] duration-200"
                style={{ animationDelay: `${600 + i * 120}ms` }}
              />
              <line
                x1={p.x}
                y1={p.y}
                x2={C}
                y2={C}
                pathLength={1}
                stroke="#3DF06E"
                strokeWidth={lit(i) ? 3 : 2}
                strokeLinecap="round"
                className="signal"
                style={{
                  animationDelay: `${1400 + i * 520}ms`,
                  animationDuration: lit(i) ? "1.3s" : "2.6s",
                }}
              />
            </g>
          ))}

          {/* Node markers, with a ping ring on the active one */}
          {points.map((p, i) => (
            <g key={`${p.label}-dot`}>
              {lit(i) && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill="none"
                  stroke="#3DF06E"
                  strokeWidth="1"
                  className="node-ping"
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={lit(i) ? 5 : 4}
                fill={lit(i) ? "#3DF06E" : "#050505"}
                className="transition-[fill,r] duration-200"
                stroke="#3DF06E"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>

        {/* Centre: the business — intentionally no logo here. */}
        <div
          aria-hidden
          onPointerEnter={(e) => e.pointerType === "mouse" && setCentreHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setCentreHovered(false)}
          className={cn(
            "absolute left-1/2 top-1/2 flex size-[35%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-card text-center transition-[border-color,box-shadow] duration-300",
            centreHovered || active !== null
              ? "border-accent/40 shadow-[0_0_0_10px_rgba(5,5,5,0.9),0_0_48px_rgba(61,240,110,0.18)]"
              : "border-line-strong shadow-[0_0_0_10px_rgba(5,5,5,0.9)]",
          )}
        >
          <span className="whitespace-nowrap text-[clamp(0.7rem,2.4vw,1.05rem)] font-semibold tracking-[0.1em] text-fg">
            SUA EMPRESA
          </span>
          <span className="mt-1.5 px-3 text-[clamp(0.66rem,2vw,0.8rem)] leading-snug text-muted">
            Oferta e atendimento
          </span>
        </div>

        {/* Node labels */}
        <ul aria-hidden className="contents">
          {points.map((p, i) => {
            const below = p.y > C + 10;
            return (
              <li
                key={p.label}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(null)}
                onPointerUp={(e) =>
                  e.pointerType !== "mouse" && setHovered((h) => (h === i ? null : i))
                }
                className={cn(
                  "absolute -translate-x-1/2 cursor-default select-none whitespace-nowrap rounded-full border bg-card/95 px-3 py-1.5 text-[clamp(0.7rem,2.2vw,0.85rem)] font-medium transition-[color,border-color,box-shadow] duration-200",
                  lit(i)
                    ? "border-accent/60 text-fg shadow-[0_0_18px_rgba(61,240,110,0.18)]"
                    : "border-line text-fg/85",
                )}
                style={{
                  left: pct(p.x),
                  top: pct(p.y),
                  transform: `translate(-50%, ${below ? "40%" : "-140%"})`,
                }}
              >
                {p.label}
              </li>
            );
          })}
        </ul>
      </m.div>
    </figure>
  );
}
