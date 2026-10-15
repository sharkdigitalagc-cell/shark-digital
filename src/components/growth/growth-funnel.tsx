"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Repeat2 } from "lucide-react";
import { cn } from "@/components/ui";
import { CYCLE, SOURCES, STAGES, type SourceId, type StageId } from "@/lib/funnel";

/*
 * The living funnel. Light signals (potential customers) come in through
 * different channels and at different stages; some move on, some go back
 * to consideration, some leave. Signals that reach the commercial result
 * turn into data that travels back to the strategy at the top.
 *
 * Everything that explains the model is static SVG (bands, entry paths, the
 * return arc, the feedback loop), so the drawing still reads without
 * JavaScript or with reduced motion; the moving signals are only a layer on
 * top, drawn by a requestAnimationFrame loop that pauses off screen.
 */

// ---------- geometry (viewBox units) ----------
const VB_W = 640;
const VB_H = 760;
const CX = 330;
const Y0 = 96; // top of the funnel (u = 0)
const Y1 = 630; // bottom of the funnel (u = 1)
const HW0 = 190; // half width at the top
const HW1 = 60; // half width at the bottom
const SOURCE_X = 30;
const TOP_NODE = { x: CX, y: 44 };
const BOTTOM_NODE = { x: CX, y: 690 };

type Pt = { x: number; y: number };

const yAt = (u: number) => Y0 + u * (Y1 - Y0);
const hwAt = (u: number) => HW0 - (HW0 - HW1) * u;
/** u: position along the funnel (0 top, 1 bottom); v: -1 left edge, 1 right edge. */
const at = (u: number, v: number): Pt => ({ x: CX + v * hwAt(u), y: yAt(u) });

const BAND_GAP = 0.012;
const bands = STAGES.map((s, i) => {
  const u0 = i / STAGES.length + BAND_GAP;
  const u1 = (i + 1) / STAGES.length - BAND_GAP;
  const a = at(u0, -1);
  const b = at(u0, 1);
  const c = at(u1, 1);
  const d = at(u1, -1);
  return {
    id: s.id,
    short: s.short,
    d: `M${a.x} ${a.y}L${b.x} ${b.y}L${c.x} ${c.y}L${d.x} ${d.y}Z`,
    mid: yAt((u0 + u1) / 2),
  };
});

/** Where each channel enters the funnel (u). */
const ENTRY: Record<SourceId, number> = { meta: 0.08, organico: 0.3, google: 0.52, indicacao: 0.74 };
const sourcePos = (id: SourceId): Pt => ({ x: SOURCE_X, y: yAt(ENTRY[id]) });

const pathFrom = (pts: Pt[]) => "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("L");

// Catmull-Rom through the points, as a dense polyline (for animation and drawing).
function spline(points: Pt[], steps = 10): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

// Static guides drawn for everyone (also the no-motion version of the story).
const ENTRY_GUIDES = SOURCES.map((s) => {
  const u = ENTRY[s.id];
  return { id: s.id, d: pathFrom(spline([sourcePos(s.id), at(u + 0.015, -1.25), at(u + 0.05, -0.55)])) };
});
const RETURN_GUIDE = pathFrom(spline([at(0.6, 0.15), at(0.56, 0.62), at(0.46, 0.7), at(0.36, 0.45)]));
const DROP_GUIDE = pathFrom(spline([at(0.4, 0.2), at(0.44, 0.75), at(0.47, 1.32)]));
const LOOP_POINTS: Pt[] = [
  { x: BOTTOM_NODE.x + 40, y: BOTTOM_NODE.y },
  { x: 560, y: 676 },
  { x: 608, y: 560 },
  { x: 610, y: 300 },
  { x: 596, y: 110 },
  { x: 520, y: 52 },
  { x: TOP_NODE.x + 62, y: TOP_NODE.y },
];
const LOOP_DENSE = spline(LOOP_POINTS, 14);
const LOOP_D = pathFrom(LOOP_DENSE);
// Same loop drawn bottom-to-top along the right side for the vertical caption.
const LOOP_TEXT_D = pathFrom(spline([{ x: 638, y: 600 }, { x: 640, y: 380 }, { x: 634, y: 130 }]));

// ---------- particles ----------
type Particle = {
  pts: Pt[];
  cum: number[];
  total: number;
  t0: number;
  dur: number;
  kind: "lead" | "data";
  fate: "drop" | "convert" | "loop";
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function measure(pts: Pt[]) {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  return { cum, total: cum[cum.length - 1] };
}

function pointAt(p: Particle, s: number): Pt {
  const { cum, pts } = p;
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < s) lo = mid;
    else hi = mid;
  }
  const seg = cum[hi] - cum[lo] || 1;
  const t = Math.min(1, Math.max(0, (s - cum[lo]) / seg));
  return { x: pts[lo].x + (pts[hi].x - pts[lo].x) * t, y: pts[lo].y + (pts[hi].y - pts[lo].y) * t };
}

/** A potential customer: enters through a channel, then advances, returns or leaves. */
function leadRoute(now: number): Particle {
  const r = Math.random();
  const source: SourceId = r < 0.34 ? "meta" : r < 0.62 ? "google" : r < 0.84 ? "organico" : "indicacao";
  let u = ENTRY[source];
  const way: Pt[] = [sourcePos(source), at(u + 0.015, -1.25), at(u + 0.05, rand(-0.5, 0.3))];
  u += 0.05;
  const step = () => {
    u = Math.min(0.97, u + rand(0.09, 0.14));
    way.push(at(u, rand(-0.5, 0.5)));
  };
  // Some go back to consideration before deciding (the "messy middle").
  if (u < 0.6 && Math.random() < 0.3) {
    const peak = Math.min(0.66, u + rand(0.12, 0.2));
    while (u < peak) step();
    way.push(at(u - 0.04, 0.62));
    u = Math.max(0.24, u - rand(0.18, 0.26));
    way.push(at(u, 0.4));
  }
  const fate: Particle["fate"] = Math.random() < 0.46 ? "convert" : "drop";
  if (fate === "convert") {
    while (u < 0.9) step();
    way.push(at(0.97, rand(-0.15, 0.15)), { x: BOTTOM_NODE.x, y: BOTTOM_NODE.y - 6 });
  } else {
    const leave = Math.min(0.88, u + rand(0.08, 0.4));
    while (u < leave) step();
    way.push(at(u + 0.03, Math.random() < 0.5 ? 1.3 : -1.3));
  }
  const pts = spline(way, 8);
  const { cum, total } = measure(pts);
  return { pts, cum, total, t0: now, dur: total * rand(13, 17), kind: "lead", fate };
}

function dataRoute(now: number): Particle {
  const { cum, total } = measure(LOOP_DENSE);
  return { pts: LOOP_DENSE, cum, total, t0: now, dur: 4200, kind: "data", fate: "loop" };
}

const LEAD_SLOTS = 18;
const DATA_SLOTS = 4;

function useParticles(svgRef: React.RefObject<SVGSVGElement | null>, enabled: boolean) {
  const leadsRef = useRef<(SVGCircleElement | null)[]>([]);
  const dataRef = useRef<(SVGCircleElement | null)[]>([]);
  const topRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!enabled || !svg) return;
    const leads: (Particle | null)[] = Array(LEAD_SLOTS).fill(null);
    const data: (Particle | null)[] = Array(DATA_SLOTS).fill(null);
    let raf = 0;
    let visible = false;
    let nextSpawn = 0;
    let last = performance.now();

    const place = (el: SVGCircleElement | null, p: Pt, opacity: number) => {
      if (!el) return;
      el.setAttribute("cx", p.x.toFixed(1));
      el.setAttribute("cy", p.y.toFixed(1));
      el.setAttribute("opacity", opacity.toFixed(2));
    };

    const frame = (now: number) => {
      // After a pause (tab hidden, scrolled away), shift timers instead of jumping.
      const gap = now - last;
      if (gap > 250) {
        for (const p of [...leads, ...data]) if (p) p.t0 += gap;
        nextSpawn += gap;
      }
      last = now;

      if (now >= nextSpawn) {
        const free = leads.findIndex((p) => !p);
        if (free >= 0) leads[free] = leadRoute(now);
        nextSpawn = now + rand(380, 620);
      }

      leads.forEach((p, i) => {
        const el = leadsRef.current[i];
        if (!p) return place(el, { x: -20, y: -20 }, 0);
        const k = (now - p.t0) / p.dur;
        if (k >= 1) {
          leads[i] = null;
          place(el, { x: -20, y: -20 }, 0);
          if (p.fate === "convert") {
            const slot = data.findIndex((d) => !d);
            if (slot >= 0) data[slot] = dataRoute(now);
          }
          return;
        }
        const fadeIn = Math.min(1, k / 0.06);
        const fadeOut = p.fate === "drop" ? Math.min(1, (1 - k) / 0.22) : 1;
        place(el, pointAt(p, k * p.total), Math.min(fadeIn, fadeOut));
      });

      let arriving = 0;
      data.forEach((p, i) => {
        const el = dataRef.current[i];
        if (!p) return place(el, { x: -20, y: -20 }, 0);
        const k = (now - p.t0) / p.dur;
        if (k >= 1) {
          data[i] = null;
          place(el, { x: -20, y: -20 }, 0);
          return;
        }
        if (k > 0.85) arriving = Math.max(arriving, (k - 0.85) / 0.15);
        place(el, pointAt(p, k * p.total), Math.min(1, k / 0.08, (1 - k) / 0.08));
      });
      topRef.current?.setAttribute("opacity", (0.25 + 0.75 * arriving).toFixed(2));

      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting && document.visibilityState === "visible";
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(svg);
    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        visible = false;
        cancelAnimationFrame(raf);
      } else if (svg.getBoundingClientRect().top < window.innerHeight && svg.getBoundingClientRect().bottom > 0) {
        visible = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, svgRef]);

  return { leadsRef, dataRef, topRef };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

// ---------- component ----------
export function GrowthFunnel() {
  const [active, setActive] = useState<StageId>("intencao");
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const { leadsRef, dataRef, topRef } = useParticles(svgRef, !reduced);
  const stage = STAGES.find((s) => s.id === active)!;
  const loopActive = active === "resultado";

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
      <figure className="relative mx-auto w-full min-w-0 max-w-[34rem] lg:sticky lg:top-24">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Funil de aquisição em cinco etapas: descoberta, consideração, intenção, conversão e resultado comercial. Potenciais clientes entram por Meta Ads e conteúdo, busca orgânica, Google Pesquisa e indicação, em etapas diferentes; alguns avançam, outros voltam à consideração ou saem. Os resultados comerciais voltam para a estratégia."
          className="h-auto w-full select-none overflow-visible"
        >
          <defs>
            <radialGradient id="gf-lead">
              <stop offset="0" stopColor="#fde415" stopOpacity="1" />
              <stop offset="0.35" stopColor="#fbc502" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fbc502" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gf-data">
              <stop offset="0" stopColor="#b9ffcb" stopOpacity="1" />
              <stop offset="0.35" stopColor="#3df06e" stopOpacity="0.85" />
              <stop offset="1" stopColor="#3df06e" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gf-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
            <marker id="gf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="#3df06e" />
            </marker>
            <marker id="gf-arrow-muted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="rgb(255 255 255 / 0.45)" />
            </marker>
          </defs>

          {/* Strategy node at the top, where the results come back. */}
          <g>
            <circle ref={topRef} cx={TOP_NODE.x} cy={TOP_NODE.y} r="30" fill="#3df06e" opacity="0.25" style={{ filter: "blur(10px)" }} />
            <rect x={TOP_NODE.x - 62} y={TOP_NODE.y - 17} width="124" height="34" rx="17" fill="#0d0d0d" stroke="#3df06e" strokeOpacity="0.7" />
            <text x={TOP_NODE.x} y={TOP_NODE.y + 5} textAnchor="middle" className="fill-fg font-mono" fontSize="14" letterSpacing="2">
              ESTRATÉGIA
            </text>
            <path d={`M${TOP_NODE.x} ${TOP_NODE.y + 17}V${Y0 - 8}`} stroke="#3df06e" strokeOpacity="0.5" strokeDasharray="3 4" markerEnd="url(#gf-arrow)" />
          </g>

          {/* Feedback loop: commercial results feed the next decisions. */}
          <path
            d={LOOP_D}
            fill="none"
            stroke="#3df06e"
            strokeWidth={loopActive ? 2.5 : 1.6}
            strokeOpacity={loopActive ? 0.95 : 0.55}
            strokeDasharray="6 7"
            markerEnd="url(#gf-arrow)"
            className="transition-[stroke-opacity,stroke-width] duration-300"
          />
          <path id="gf-loop-text" d={LOOP_TEXT_D} fill="none" stroke="none" />
          <text className="fill-accent font-mono" fontSize="12.5" letterSpacing="2.4" opacity="0.9">
            <textPath href="#gf-loop-text" startOffset="50%" textAnchor="middle">
              OS RESULTADOS ALIMENTAM AS DECISÕES
            </textPath>
          </text>

          {/* Funnel bands. */}
          {bands.map((b) => {
            const on = b.id === active;
            return (
              <g key={b.id} onClick={() => setActive(b.id)} className="cursor-pointer">
                <path
                  d={b.d}
                  fill={on ? "rgb(251 197 2 / 0.13)" : "url(#gf-band)"}
                  stroke={on ? "#fbc502" : "rgb(255 255 255 / 0.12)"}
                  strokeWidth={on ? 1.6 : 1}
                  className="transition-[fill,stroke] duration-300 hover:stroke-white/30"
                />
                <text
                  x={CX}
                  y={b.mid + 5}
                  textAnchor="middle"
                  fontSize="14.5"
                  letterSpacing="2.2"
                  className={cn("pointer-events-none font-mono uppercase transition-colors duration-300", on ? "fill-brand" : "fill-fg/55")}
                >
                  {b.short}
                </text>
              </g>
            );
          })}

          {/* Static guides: entry paths, a return to consideration, a lead that leaves. */}
          {ENTRY_GUIDES.map((g) => (
            <path
              key={g.id}
              d={g.d}
              fill="none"
              stroke={stage.sources.includes(g.id) ? "#fbc502" : "rgb(255 255 255 / 0.22)"}
              strokeOpacity={stage.sources.includes(g.id) ? 0.85 : 1}
              strokeWidth="1.3"
              strokeDasharray="2 5"
              className="transition-[stroke] duration-300"
            />
          ))}
          <path d={RETURN_GUIDE} fill="none" stroke="rgb(255 255 255 / 0.4)" strokeWidth="1.3" strokeDasharray="4 5" markerEnd="url(#gf-arrow-muted)" />
          <path d={DROP_GUIDE} fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.2" strokeDasharray="2 5" />

          {/* Entry points. */}
          {SOURCES.map((s) => {
            const p = sourcePos(s.id);
            const on = stage.sources.includes(s.id);
            return (
              <g key={s.id}>
                <circle cx={p.x} cy={p.y} r={on ? 7 : 5.5} fill={on ? "#fbc502" : "#0d0d0d"} stroke={on ? "#fbc502" : "rgb(255 255 255 / 0.4)"} className="transition-all duration-300" />
                <text x={p.x - 12} y={p.y - (s.lines[1] ? 26 : 16)} fontSize="15" className={cn("transition-colors duration-300", on ? "fill-fg" : "fill-fg/60")}>
                  <tspan x={p.x - 12}>{s.lines[0]}</tspan>
                  {s.lines[1] ? (
                    <tspan x={p.x - 12} dy="17">
                      {s.lines[1]}
                    </tspan>
                  ) : null}
                </text>
              </g>
            );
          })}

          {/* Commercial result node at the bottom. */}
          <g>
            <rect x={BOTTOM_NODE.x - 40} y={BOTTOM_NODE.y - 15} width="80" height="30" rx="15" fill="#0d0d0d" stroke={loopActive ? "#3df06e" : "rgb(255 255 255 / 0.25)"} className="transition-[stroke] duration-300" />
            <text x={BOTTOM_NODE.x} y={BOTTOM_NODE.y + 5} textAnchor="middle" className="fill-fg/80 font-mono" fontSize="12.5" letterSpacing="1.6">
              DADOS
            </text>
            <text x={BOTTOM_NODE.x} y={BOTTOM_NODE.y + 40} textAnchor="middle" className="fill-fg/50" fontSize="13">
              contatos · propostas · contratos
            </text>
          </g>

          {/* Moving signals (skipped with reduced motion). */}
          {!reduced ? (
            <g aria-hidden>
              {Array.from({ length: LEAD_SLOTS }, (_, i) => (
                <circle key={`l${i}`} ref={(el) => { leadsRef.current[i] = el; }} r="8" cx="-20" cy="-20" fill="url(#gf-lead)" opacity="0" />
              ))}
              {Array.from({ length: DATA_SLOTS }, (_, i) => (
                <circle key={`d${i}`} ref={(el) => { dataRef.current[i] = el; }} r="8" cx="-20" cy="-20" fill="url(#gf-data)" opacity="0" />
              ))}
            </g>
          ) : null}
        </svg>
        <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-brand shadow-[0_0_10px] shadow-brand" />
            Potencial cliente
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-px w-5 border-t border-dashed border-white/50" />
            Volta para a consideração
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent" />
            Dado comercial
          </span>
        </figcaption>
      </figure>

      <div className="min-w-0">
        <div role="group" aria-label="Etapas da jornada" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:gap-1.5">
          {STAGES.map((s, i) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                aria-controls="funil-detalhe"
                onClick={() => setActive(s.id)}
                className={cn(
                  "group flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-colors duration-200 lg:rounded-2xl lg:px-5 lg:py-3.5",
                  on ? "border-brand/70 bg-brand/[0.08]" : "border-line hover:border-white/25",
                )}
              >
                <span className={cn("font-mono text-xs", on ? "text-brand" : "text-muted")}>0{i + 1}</span>
                <span className="min-w-0">
                  <span className={cn("block text-sm font-semibold tracking-tight lg:text-base", on ? "text-fg" : "text-fg/80")}>{s.name}</span>
                  <span className="hidden text-sm text-muted lg:block">{s.tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="funil-detalhe" aria-live="polite" className="mt-6 rounded-3xl border border-line bg-card p-6 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-fg">{stage.name}</h3>
            {stage.specialty ? (
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-on-brand">Especialidade Shark</span>
            ) : null}
          </div>
          <p className="mt-1.5 text-brand">{stage.tagline}</p>
          <dl className="mt-6 grid gap-5">
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">O que a pessoa precisa</dt>
              <dd className="mt-1.5 leading-relaxed text-fg/85">{stage.need}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">O que influencia a decisão</dt>
              <dd className="mt-1.5 leading-relaxed text-fg/85">{stage.levers}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">Como avaliamos</dt>
              <dd className="mt-1.5 leading-relaxed text-fg/85">{stage.metric}</dd>
            </div>
          </dl>
          {stage.specialty ? <p className="mt-6 border-t border-line pt-5 text-sm text-fg/80">{stage.specialty}</p> : null}
          {stage.clientRole ? (
            <p className="mt-6 border-t border-line pt-5 text-sm text-fg/80">{stage.clientRole}</p>
          ) : null}
        </div>

        <div className="mt-6 rounded-3xl border border-accent/25 bg-accent/[0.04] p-6 md:p-7">
          <p className="flex items-center gap-2.5 font-semibold tracking-tight text-fg">
            <Repeat2 aria-hidden className="size-5 text-accent" />
            Os resultados alimentam as próximas decisões.
          </p>
          <ol aria-label="Ciclo de crescimento" className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg/75">
            {CYCLE.map((c, i) => (
              <li key={c} className="flex items-center gap-1.5">
                <span className="rounded-full border border-white/10 px-2.5 py-1">{c}</span>
                {i < CYCLE.length - 1 ? <ArrowRight aria-hidden className="size-3 text-accent" /> : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Quando seu time registra o que virou proposta e contrato, esses dados orientam a revisão das campanhas.
            Decidir com dados não é ter certeza antes: é validar cada decisão com evidência.
          </p>
        </div>
      </div>
    </div>
  );
}
