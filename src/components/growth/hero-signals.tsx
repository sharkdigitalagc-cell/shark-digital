import { cn } from "@/components/ui";

/*
 * Hero backdrop: the outline of a funnel with light signals coming from
 * different sides; some fall through, one leaves. Pure SVG (SMIL), no JS.
 * The moving dots are hidden under prefers-reduced-motion (globals.css).
 */

const PATHS = [
  { d: "M-20 120 C 90 130, 150 170, 230 250 S 290 420, 300 540", dur: 7.5, begin: 0 },
  { d: "M300 -30 C 300 60, 320 140, 310 230 S 290 420, 300 540", dur: 6.5, begin: 1.4 },
  { d: "M620 210 C 520 220, 430 250, 380 320 S 310 450, 300 540", dur: 7, begin: 2.6 },
  { d: "M-20 300 C 90 300, 170 320, 240 360 S 300 460, 300 540", dur: 6.8, begin: 3.8 },
  { d: "M620 90 C 500 110, 420 150, 360 220 C 330 260, 360 300, 470 330 S 640 360, 660 380", dur: 8, begin: 5 },
  { d: "M140 -30 C 170 80, 230 150, 280 240 S 305 430, 300 540", dur: 7.2, begin: 6.1 },
];

export function HeroSignals({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 560" aria-hidden className={cn("pointer-events-none", className)} fill="none">
      <defs>
        <radialGradient id="hs-dot">
          <stop offset="0" stopColor="#fde415" />
          <stop offset="0.4" stopColor="#fbc502" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fbc502" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Funnel outline and its levels. */}
      <ellipse cx="300" cy="60" rx="240" ry="26" stroke="url(#hs-edge)" />
      <path d="M60 60 C 70 220, 230 330, 268 470 L 272 540" stroke="url(#hs-edge)" />
      <path d="M540 60 C 530 220, 370 330, 332 470 L 328 540" stroke="url(#hs-edge)" />
      {[150, 240, 330, 410].map((y, i) => (
        <ellipse key={y} cx="300" cy={y} rx={[205, 150, 95, 55][i]} ry={[18, 14, 10, 7][i]} stroke="#ffffff" strokeOpacity="0.07" />
      ))}
      <ellipse cx="300" cy="540" rx="30" ry="6" stroke="#3df06e" strokeOpacity="0.5" />

      {/* Paths stay faint; the dots carry the motion. */}
      {PATHS.map((p) => (
        <path key={p.d} d={p.d} stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="2 6" />
      ))}
      <g className="hero-signal-dot">
        {PATHS.map((p) => (
          <circle key={p.d} r="7" fill="url(#hs-dot)" opacity="0">
            <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  );
}
