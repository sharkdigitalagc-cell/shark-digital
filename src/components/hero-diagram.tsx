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

/**
 * Hero diagram: the business at the centre, connected to the five
 * disciplines of the operation. Pure SVG + CSS (no JS); motion is
 * disabled under prefers-reduced-motion.
 */
export function HeroDiagram({ className }: { className?: string }) {
  return (
    <figure
      className={cn("relative mx-auto aspect-square w-full max-w-[34rem]", className)}
    >
      <figcaption className="sr-only">
        Diagrama: sua empresa, com a oferta e o atendimento no centro, conectada
        a Google Ads, Conteúdo, Instagram Ads, Atendimento e Dados.
      </figcaption>
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

        <circle cx={C} cy={C} r={150} fill="url(#hd-core)" />

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
              strokeOpacity="0.55"
              strokeWidth="1.25"
              strokeLinecap="round"
              className="line-draw"
              style={{ animationDelay: `${600 + i * 120}ms` }}
            />
          </g>
        ))}

        {/* Node markers */}
        {points.map((p) => (
          <circle
            key={`${p.label}-dot`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#050505"
            stroke="#3DF06E"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Centre: the business — intentionally no logo here. */}
      <div aria-hidden className="absolute left-1/2 top-1/2 flex size-[35%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line-strong bg-card text-center shadow-[0_0_0_10px_rgba(5,5,5,0.9)]">
        <span className="whitespace-nowrap text-[clamp(0.7rem,2.4vw,1.05rem)] font-semibold tracking-[0.1em] text-fg">
          SUA EMPRESA
        </span>
        <span className="mt-1.5 px-3 text-[clamp(0.66rem,2vw,0.8rem)] leading-snug text-muted">
          Oferta e atendimento
        </span>
      </div>

      {/* Node labels */}
      <ul aria-hidden className="contents">
        {points.map((p) => {
          const below = p.y > C + 10;
          return (
            <li
              key={p.label}
              className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-card/95 px-3 py-1.5 text-[clamp(0.7rem,2.2vw,0.85rem)] font-medium text-fg"
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
    </figure>
  );
}
