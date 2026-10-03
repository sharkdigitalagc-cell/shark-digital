"use client";

import { m } from "framer-motion";
import { cn } from "@/components/ui";

/*
 * Editorial still lifes drawn in SVG: matte black objects on a dark table,
 * lit from the side. They stand in for photographs (see docs/imagens.md)
 * and are purely decorative.
 */

const GREEN = "#3DF06E";
const ORANGE = "#FBC502";

function Frame({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light: "green" | "orange";
}) {
  return (
    <figure
      aria-hidden
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-line",
        light === "green"
          ? "bg-[radial-gradient(120%_90%_at_80%_35%,#0b1a10_0%,#0a0a0a_45%,#050505_100%)]"
          : "bg-[radial-gradient(120%_90%_at_85%_30%,#161208_0%,#0a0a0a_45%,#050505_100%)]",
        className,
      )}
    >
      {children}
    </figure>
  );
}

/** Matte black gradient with a rim of coloured light on one side. */
function RimGradient({
  id,
  color,
  side,
}: {
  id: string;
  color: string;
  side: "left" | "right";
}) {
  const stops =
    side === "right"
      ? [
          ["0%", "#060606", 1],
          ["55%", "#111111", 1],
          ["94%", "#161616", 1],
          ["98.6%", color, 0.38],
          ["100%", color, 0.1],
        ]
      : [
          ["0%", color, 0.1],
          ["1.4%", color, 0.38],
          ["6%", "#161616", 1],
          ["45%", "#111111", 1],
          ["100%", "#060606", 1],
        ];
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      {stops.map(([offset, c, o]) => (
        <stop key={offset as string} offset={offset as string} stopColor={c as string} stopOpacity={o as number} />
      ))}
    </linearGradient>
  );
}

const Horizon = ({ y, w }: { y: number; w: number }) => (
  <>
    <defs>
      <linearGradient id={`hz-${y}-${w}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="60%" stopColor="#fff" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y={y} width={w} height="1" fill={`url(#hz-${y}-${w})`} />
  </>
);

/** Strategy: a chess pawn, orange light from the right. */
export function StrategyPiece({ className }: { className?: string }) {
  return (
    <Frame light="orange" className={className}>
      <svg viewBox="0 0 240 300" className="block size-full">
        <defs>
          <RimGradient id="sp-body" color={ORANGE} side="right" />
          <radialGradient id="sp-head" cx="68%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#2a241a" />
            <stop offset="45%" stopColor="#121212" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <radialGradient id="sp-floor" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ORANGE} stopOpacity="0.16" />
            <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
          </radialGradient>
        </defs>
        <Horizon y={236} w={240} />
        <ellipse cx="132" cy="240" rx="96" ry="16" fill="url(#sp-floor)" />
        <ellipse cx="120" cy="238" rx="54" ry="6" fill="#000" opacity="0.85" />
        <path d="M66 236 C66 226 72 220 84 218 L156 218 C168 220 174 226 174 236 Z" fill="url(#sp-body)" />
        <rect x="76" y="206" width="88" height="14" rx="6" fill="url(#sp-body)" />
        <path d="M100 128 C100 160 92 186 80 206 L160 206 C148 186 140 160 140 128 Z" fill="url(#sp-body)" />
        <ellipse cx="120" cy="126" rx="34" ry="8" fill="url(#sp-body)" />
        <circle cx="120" cy="92" r="28" fill="url(#sp-head)" />
        <path d="M138 70 A28 28 0 0 1 146 104" fill="none" stroke={ORANGE} strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

/**
 * Integration: a block and a puck joined by a thin line of green light,
 * drawn once when the image enters the screen.
 */
export function ConnectedObjects({ className }: { className?: string }) {
  return (
    <Frame light="green" className={className}>
      <svg viewBox="0 0 480 240" className="block size-full">
        <defs>
          <RimGradient id="co-cube" color={GREEN} side="right" />
          <RimGradient id="co-puck" color={GREEN} side="left" />
          <linearGradient id="co-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#0c0c0c" />
          </linearGradient>
          <radialGradient id="co-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.55" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="co-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.1" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </radialGradient>
          <filter id="co-blur" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <Horizon y={188} w={480} />
        <ellipse cx="240" cy="192" rx="170" ry="14" fill="url(#co-floor)" />

        {/* Block (left) */}
        <ellipse cx="150" cy="190" rx="62" ry="5" fill="#000" opacity="0.85" />
        <path d="M100 100 L124 84 L210 84 L186 100 Z" fill="url(#co-top)" />
        <path d="M186 100 L210 84 L210 172 L186 188 Z" fill="#0b0b0b" />
        <rect x="100" y="100" width="86" height="88" rx="2" fill="url(#co-cube)" />

        {/* Puck (right) */}
        <ellipse cx="335" cy="190" rx="56" ry="6" fill="#000" opacity="0.85" />
        <path d="M285 128 L285 182 A50 9 0 0 0 385 182 L385 128 Z" fill="url(#co-puck)" />
        <ellipse cx="335" cy="128" rx="50" ry="9" fill="url(#co-top)" />

        {/* Line of light */}
        <m.line
          x1="187" y1="146" x2="286" y2="152"
          stroke={GREEN} strokeWidth="6" strokeOpacity="0.35" filter="url(#co-blur)"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <m.line
          x1="187" y1="146" x2="286" y2="152"
          stroke={GREEN} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <circle cx="187" cy="146" r="9" fill="url(#co-glow)" />
        <circle cx="286" cy="152" r="9" fill="url(#co-glow)" />
      </svg>
    </Frame>
  );
}

/** Planning: a closed black notebook, green light from the right. */
export function Planner({ className }: { className?: string }) {
  return (
    <Frame light="green" className={className}>
      <svg viewBox="0 0 400 260" className="block size-full">
        <defs>
          <linearGradient id="pl-cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="70%" stopColor="#141414" />
            <stop offset="100%" stopColor="#1d2a20" />
          </linearGradient>
          <linearGradient id="pl-pages" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#6d7a70" />
          </linearGradient>
          <radialGradient id="pl-floor" cx="65%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.1" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="220" cy="190" rx="170" ry="40" fill="url(#pl-floor)" />
        {/* Shadow */}
        <path d="M74 196 L270 214 L336 140 L150 124 Z" fill="#000" opacity="0.7" />
        {/* Page block edge */}
        <path d="M66 182 L262 200 L262 208 L66 190 Z" fill="url(#pl-pages)" opacity="0.55" />
        <path d="M262 200 L328 126 L328 134 L262 208 Z" fill="url(#pl-pages)" opacity="0.8" />
        {/* Cover */}
        <path d="M66 182 L262 200 L328 126 L142 110 Z" fill="url(#pl-cover)" />
        {/* Rim light on the far edge */}
        <path d="M262 200 L328 126" stroke={GREEN} strokeOpacity="0.45" strokeWidth="1" />
        {/* Elastic band */}
        <path d="M222 196 L288 122" stroke="#050505" strokeWidth="5" />
        <path d="M224 196 L290 122" stroke="#222" strokeWidth="0.8" />
      </svg>
    </Frame>
  );
}
