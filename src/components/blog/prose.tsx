import { ArrowDown } from "lucide-react";
import { cn } from "@/components/ui";

/*
 * Building blocks for blog posts. Text column is ~68ch for comfortable
 * reading; wide blocks (tables, diagrams, the calculator) use <Wide>.
 */

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-16 text-balance text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:mt-20 md:text-[2rem]"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-lg font-semibold tracking-tight text-fg md:text-xl">{children}</h3>
  );
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mt-5 text-pretty text-[1.05rem] leading-[1.75] text-fg/80", className)}>
      {children}
    </p>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-fg">{children}</strong>;
}

export function A({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="rounded-sm text-fg underline decoration-accent/60 decoration-1 underline-offset-[5px] transition-colors duration-200 hover:text-accent hover:decoration-accent"
    >
      {children}
    </a>
  );
}

export function List({
  children,
  ordered = false,
}: {
  children: React.ReactNode;
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "mt-5 space-y-2.5 pl-5 text-[1.05rem] leading-[1.7] text-fg/80 marker:text-accent",
        ordered ? "list-decimal marker:font-mono marker:text-sm" : "list-disc",
      )}
    >
      {children}
    </Tag>
  );
}

/** Highlighted note: a key question, a caution or a definition. */
export function Callout({
  label,
  children,
  tone = "accent",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "accent" | "neutral";
}) {
  return (
    <aside
      className={cn(
        "mt-8 rounded-2xl border bg-card p-5 md:p-6",
        tone === "accent" ? "border-accent/30" : "border-line",
      )}
    >
      <p className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
        <span
          aria-hidden
          className={cn("size-1.5 rounded-full", tone === "accent" ? "bg-accent" : "bg-muted")}
        />
        {label}
      </p>
      <div className="mt-3 text-[1.02rem] leading-[1.7] text-fg/90 [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

/** A formula shown on its own line, e.g. "Custo por agendamento = …". */
export function Formula({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-xl border border-line bg-bg-2 px-4 py-3 font-mono text-[0.85rem] leading-relaxed text-fg/90 md:text-sm">
      {children}
    </p>
  );
}

/** Vertical chain of steps (funnel or metric ladder). */
export function StepChain({
  steps,
  label,
}: {
  steps: Array<{ title: string; text?: string }>;
  label: string;
}) {
  return (
    <ol aria-label={label} className="mt-8 space-y-0">
      {steps.map((step, i) => (
        <li key={step.title}>
          <div className="flex items-start gap-4 rounded-xl border border-line bg-card px-4 py-3">
            <span className="mt-0.5 font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-medium text-fg">{step.title}</p>
              {step.text ? (
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
              ) : null}
            </div>
          </div>
          {i < steps.length - 1 ? (
            <ArrowDown aria-hidden className="mx-auto my-1 size-4 text-accent/70" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** Stage chain on one wrapping row, for the full acquisition path. */
export function FlowRow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol
      aria-label={label}
      className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-line-strong px-3 py-1.5 text-fg/85">{step}</span>
          {i < steps.length - 1 ? (
            <span aria-hidden className="text-accent">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * Two-column table that becomes stacked cards on small screens, so it never
 * forces horizontal scrolling.
 */
export function DiagnosisTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: [string, string];
  rows: Array<[string, string]>;
}) {
  return (
    <figure className="mt-8">
      <table className="w-full border-separate border-spacing-0 text-left text-[0.95rem]">
        <caption className="mb-4 text-left text-sm text-muted">{caption}</caption>
        <thead className="sr-only md:not-sr-only">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-line-strong pb-3 pr-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([symptom, where]) => (
            <tr
              key={symptom}
              className="mb-3 block rounded-xl border border-line bg-card p-4 md:mb-0 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0"
            >
              <th
                scope="row"
                className="block font-medium text-fg md:table-cell md:w-[38%] md:border-b md:border-line md:py-4 md:pr-6 md:align-top"
              >
                {symptom}
              </th>
              <td className="mt-2 block leading-relaxed text-fg/75 md:mt-0 md:table-cell md:border-b md:border-line md:py-4 md:align-top">
                <span className="mb-1 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted md:hidden">
                  {head[1]}
                </span>
                {where}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
