"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/components/ui";
import { GREEN, Horizon, RimGradient } from "@/components/still-life";

const STAGES = ["Atração", "Engajamento", "Venda"] as const;

// Cable between the Shark block and the client's puck.
const FROM = { x: 187, y: 146 };
const TO = { x: 286, y: 152 };

const STEP_MS = 2200;
const TRAVEL_S = 0.9;

/**
 * "Quem somos" scene: the Shark block connected to the client's company.
 * Once on screen, a signal travels down the cable for each stage
 * (atração, engajamento, venda); every arrival lights the company a little
 * more and ticks the stage below. Hovering (or tapping) a stage replays it.
 * Under prefers-reduced-motion the scene is shown fully connected.
 */
export function SharkConnection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [pinned, setPinned] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  // The cable is drawn first; signals start once it is in place.
  useEffect(() => {
    if (!inView || connected) return;
    const id = window.setTimeout(() => setConnected(true), 900);
    return () => window.clearTimeout(id);
  }, [inView, connected]);

  // step 0..2 sends a stage; step 3 holds the fully lit scene.
  useEffect(() => {
    if (reduceMotion || !inView || !connected || pinned !== null) return;
    const id = window.setInterval(() => {
      setArrived(false);
      setStep((s) => (s + 1) % (STAGES.length + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, inView, connected, pinned]);

  const current = pinned ?? step;
  const sending = !reduceMotion && connected && current < STAGES.length;
  const done = reduceMotion
    ? STAGES.length
    : !connected
      ? 0
      : pinned !== null
        ? pinned + (arrived ? 1 : 0)
        : Math.min(STAGES.length, current + (arrived ? 1 : 0));
  const level = done / STAGES.length;

  const pin = (i: number | null) => {
    setArrived(false);
    setPinned(i);
  };

  return (
    <figure
      ref={ref}
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-line bg-[radial-gradient(120%_90%_at_80%_35%,#0b1a10_0%,#0a0a0a_45%,#050505_100%)]",
        className,
      )}
    >
      <figcaption className="sr-only">
        A Shark conectada à sua empresa: atração, engajamento e venda.
      </figcaption>

      <div className="relative aspect-[2/1]">
        <svg viewBox="70 60 340 170" className="absolute inset-0 block size-full" aria-hidden>
          <defs>
            <RimGradient id="sc-cube" color={GREEN} side="right" />
            <RimGradient id="sc-puck" color={GREEN} side="left" />
            <linearGradient id="sc-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1c1c" />
              <stop offset="100%" stopColor="#0c0c0c" />
            </linearGradient>
            <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.6" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sc-floor" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.14" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </radialGradient>
            <filter id="sc-blur" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="sc-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <Horizon y={188} w={480} />
          <m.ellipse
            cx="240" cy="192" rx="170" ry="14" fill="url(#sc-floor)"
            animate={{ opacity: 0.5 + level * 0.5 }} transition={{ duration: 0.5 }}
          />

          {/* Shark (left) */}
          <ellipse cx="150" cy="190" rx="62" ry="5" fill="#000" opacity="0.85" />
          <path d="M100 100 L124 84 L210 84 L186 100 Z" fill="url(#sc-top)" />
          <path d="M186 100 L210 84 L210 172 L186 188 Z" fill="#0b0b0b" />
          <rect x="100" y="100" width="86" height="88" rx="2" fill="url(#sc-cube)" />
          <text x="143" y="140" textAnchor="middle" fill="#f5f5f5" fontSize="11" fontWeight="600" letterSpacing="2.4">
            SHARK
          </text>
          <text x="143" y="154" textAnchor="middle" fill="#8a8a8a" fontSize="7.5" letterSpacing="1.6">
            DIGITAL
          </text>

          {/* Client's company (right): glows brighter with each stage */}
          <m.ellipse
            cx="335" cy="150" rx="70" ry="44" fill={GREEN} filter="url(#sc-soft)"
            animate={{ opacity: level * 0.16 }} transition={{ duration: 0.5 }}
          />
          <ellipse cx="335" cy="190" rx="56" ry="6" fill="#000" opacity="0.85" />
          <path d="M285 128 L285 182 A50 9 0 0 0 385 182 L385 128 Z" fill="url(#sc-puck)" />
          <ellipse cx="335" cy="128" rx="50" ry="9" fill="url(#sc-top)" />
          <m.ellipse
            cx="335" cy="128" rx="50" ry="9" fill="none" stroke={GREEN}
            animate={{ strokeOpacity: 0.12 + level * 0.6 }} transition={{ duration: 0.5 }}
          />
          <text x="337" y="158" textAnchor="middle" fill="#f5f5f5" fontSize="8.5" fontWeight="600" letterSpacing="1.6">
            SUA EMPRESA
          </text>

          {/* Cable */}
          <m.line
            x1={FROM.x} y1={FROM.y} x2={TO.x} y2={TO.y}
            stroke={GREEN} strokeWidth="6" strokeOpacity="0.35" filter="url(#sc-blur)"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <m.line
            x1={FROM.x} y1={FROM.y} x2={TO.x} y2={TO.y}
            stroke={GREEN} strokeWidth="1.2" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <circle cx={FROM.x} cy={FROM.y} r="9" fill="url(#sc-glow)" />
          <m.circle
            cx={TO.x} cy={TO.y} r="9" fill="url(#sc-glow)"
            animate={arrived ? { r: [9, 18, 9], opacity: [1, 0.6, 1] } : { r: 9 }}
            transition={{ duration: 0.6 }}
          />

          {/* Signal for the current stage */}
          {sending && (
            <m.circle
              key={`${current}-${pinned ?? "auto"}`}
              r="4" fill="#eafff0"
              style={{ filter: `drop-shadow(0 0 6px ${GREEN})` }}
              initial={{ cx: FROM.x, cy: FROM.y, opacity: 0 }}
              animate={{ cx: TO.x, cy: TO.y, opacity: [0, 1, 1, 0] }}
              transition={{ duration: TRAVEL_S, ease: "easeInOut", delay: 0.15 }}
              onAnimationComplete={() => setArrived(true)}
            />
          )}
        </svg>

        {/* Stage label riding under the cable */}
        {sending && (
          <m.span
            key={`label-${current}-${pinned ?? "auto"}`}
            aria-hidden
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[49%] top-[58%] -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/40 bg-black/70 px-2.5 py-1 text-[0.7rem] font-medium text-accent sm:text-xs"
          >
            {STAGES[current]}
          </m.span>
        )}
      </div>

      {/* Stage tracker */}
      <ol className="relative grid grid-cols-3 gap-2 border-t border-line px-4 py-4 sm:gap-3 sm:px-6">
        {STAGES.map((stage, i) => {
          const lit = i < done;
          const active = sending && i === current;
          return (
            <li key={stage}>
              <button
                type="button"
                onMouseEnter={() => pin(i)}
                onMouseLeave={() => pin(null)}
                onFocus={() => pin(i)}
                onBlur={() => pin(null)}
                onClick={() => pin(i)}
                className="group w-full cursor-pointer text-left"
              >
                <span className="block h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <span
                    className={cn(
                      "block h-full origin-left rounded-full bg-accent transition-transform duration-500",
                      lit ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "mt-2.5 flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 sm:text-sm",
                    lit || active ? "text-fg" : "text-muted group-hover:text-fg",
                  )}
                >
                  <span className="tabular-nums text-muted">{i + 1}</span>
                  {stage}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
