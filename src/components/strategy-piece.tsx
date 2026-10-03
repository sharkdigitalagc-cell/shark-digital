import { cn } from "@/components/ui";

/**
 * Editorial still life drawn in SVG: a matte black chess pawn on a dark
 * surface, lit from the right with the brand orange. Stands in for a
 * photograph (see docs/imagens.md) and is purely decorative.
 */
export function StrategyPiece({ className }: { className?: string }) {
  return (
    <figure
      aria-hidden
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-line bg-[radial-gradient(120%_90%_at_85%_30%,#161208_0%,#0a0a0a_45%,#050505_100%)]",
        className,
      )}
    >
      <svg viewBox="0 0 240 300" className="block size-full" role="presentation">
        <defs>
          {/* Body: matte black, rim of orange light on the right edge */}
          <linearGradient id="sp-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#060606" />
            <stop offset="55%" stopColor="#111111" />
            <stop offset="88%" stopColor="#1b1813" />
            <stop offset="98%" stopColor="#fbc502" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fbc502" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="sp-head" cx="68%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#2a241a" />
            <stop offset="45%" stopColor="#121212" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <radialGradient id="sp-floor" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbc502" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#fbc502" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sp-horizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Table edge */}
        <rect x="0" y="236" width="240" height="1" fill="url(#sp-horizon)" />
        {/* Light pool on the table */}
        <ellipse cx="132" cy="240" rx="96" ry="16" fill="url(#sp-floor)" />
        {/* Contact shadow */}
        <ellipse cx="120" cy="238" rx="54" ry="6" fill="#000" opacity="0.85" />

        {/* Base */}
        <path
          d="M66 236 C66 226 72 220 84 218 L156 218 C168 220 174 226 174 236 Z"
          fill="url(#sp-body)"
        />
        <rect x="76" y="206" width="88" height="14" rx="6" fill="url(#sp-body)" />
        {/* Body */}
        <path
          d="M100 128 C100 160 92 186 80 206 L160 206 C148 186 140 160 140 128 Z"
          fill="url(#sp-body)"
        />
        {/* Collar */}
        <ellipse cx="120" cy="126" rx="34" ry="8" fill="url(#sp-body)" />
        {/* Head */}
        <circle cx="120" cy="92" r="28" fill="url(#sp-head)" />
        {/* Rim highlight on the head */}
        <path
          d="M138 70 A28 28 0 0 1 146 104"
          fill="none"
          stroke="#fbc502"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </figure>
  );
}
