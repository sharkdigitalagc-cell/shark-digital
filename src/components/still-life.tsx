"use client";

import { cn } from "@/components/ui";

/*
 * Editorial still lifes drawn in SVG: matte black objects on a dark table,
 * lit from the side. They stand in for photographs (see docs/imagens.md)
 * and are purely decorative.
 */

export const GREEN = "#3DF06E";
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
export function RimGradient({
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

export const Horizon = ({ y, w }: { y: number; w: number }) => (
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
