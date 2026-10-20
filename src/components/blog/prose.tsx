import { ArrowDown, Search } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/components/ui";

/*
 * Building blocks for blog posts. Text column is ~68ch for comfortable
 * reading; wide blocks (tables, diagrams, the calculator) use <Wide>.
 *
 * Heading outline: the article page renders the post title as the page's
 * only <h1>, so bodies start at <H2> for sections and use <H3> for their
 * subdivisions. Never put an <h1> inside a body.
 */

const sectionHeading =
  "mt-16 text-balance text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:mt-20 md:text-[2rem]";

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={sectionHeading}>
      {children}
    </h2>
  );
}

// `appearance="section"` keeps the look of an <H2> for subdivisions that were
// designed to read as full sections (e.g. a numbered series under one H2).
export function H3({
  id,
  appearance = "default",
  children,
}: {
  id?: string;
  appearance?: "default" | "section";
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className={
        appearance === "section"
          ? sectionHeading
          : "mt-10 text-lg font-semibold tracking-tight text-fg md:text-xl"
      }
    >
      {children}
    </h3>
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
export function FlowRow({
  steps,
  label,
  joiner = "→",
}: {
  steps: string[];
  label: string;
  /** Sign between stages: "→" for a sequence, "+" for parts that add up. */
  joiner?: string;
}) {
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
              {joiner}
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

/**
 * Numbered question cards on a two-column grid, meant to be scanned (and
 * screenshotted) on their own.
 */
export function QuestionGrid({
  id,
  title,
  questions,
}: {
  id: string;
  title: string;
  questions: string[];
}) {
  return (
    <section
      aria-labelledby={id}
      className="grain relative mt-12 overflow-hidden rounded-3xl border border-accent/30 bg-bg-2 p-5 sm:p-7 md:p-8"
    >
      <h2
        id={id}
        className="text-balance text-[1.45rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:text-[1.75rem]"
      >
        {title}
      </h2>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {questions.map((q, i) => (
          <li
            key={q}
            className="flex items-start gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-[0.98rem] leading-snug text-fg/90"
          >
            <span aria-hidden className="mt-0.5 font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{q}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Diagnostic checklist: each item is a question with what to look at. */
export function Checklist({
  label,
  items,
}: {
  label: string;
  items: Array<{ q: string; look?: string }>;
}) {
  return (
    <ul aria-label={label} className="mt-8 divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((item) => (
        <li key={item.q} className="flex gap-4 px-4 py-4 md:px-5">
          <span
            aria-hidden
            className="mt-1 grid size-4 shrink-0 place-items-center rounded-[5px] border border-accent/60"
          />
          <div>
            <p className="font-medium leading-snug text-fg">{item.q}</p>
            {item.look ? (
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.look}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Table with any number of columns. On small screens each row becomes a card
 * with the column name above each value, so nothing scrolls sideways.
 */
export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: string[][];
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
                className="border-b border-line-strong pb-3 pr-4 align-bottom font-mono text-[0.68rem] font-medium uppercase leading-snug tracking-[0.14em] text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr
              key={first}
              className="mb-3 block rounded-xl border border-line bg-card p-4 md:mb-0 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0"
            >
              <th
                scope="row"
                className="block font-medium leading-snug text-fg md:table-cell md:border-b md:border-line md:py-4 md:pr-4 md:align-top"
              >
                {first}
              </th>
              {rest.map((cell, i) => (
                <td
                  key={head[i + 1]}
                  className="mt-3 block leading-relaxed text-fg/75 md:mt-0 md:table-cell md:border-b md:border-line md:py-4 md:pr-4 md:align-top"
                >
                  <span className="mb-1 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted md:hidden">
                    {head[i + 1]}
                  </span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Small labelled tiles for an inventory of items (assets, tools, channels). */
export function TagGrid({ label, items }: { label: string; items: string[] }) {
  return (
    <ul aria-label={label} className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-3.5 py-3 text-[0.92rem] leading-snug text-fg/90"
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Side-by-side columns, each a short vertical sequence, for contrasts such as
 * "operar × possuir". Stacks on small screens.
 */
export function CompareColumns({
  label,
  columns,
}: {
  label: string;
  columns: Array<{ eyebrow: string; title: string; steps: string[]; result?: string; tone?: "accent" | "neutral" }>;
}) {
  return (
    <div role="group" aria-label={label} className="mt-8 grid gap-4 sm:grid-cols-2">
      {columns.map((col) => (
        <section
          key={col.eyebrow}
          className={cn(
            "rounded-2xl border bg-card p-5",
            col.tone === "accent" ? "border-accent/40" : "border-line",
          )}
        >
          <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted">
            {col.eyebrow}
          </p>
          <p className="mt-2 text-lg font-semibold leading-snug text-fg">{col.title}</p>
          <ol className="mt-4 space-y-0">
            {col.steps.map((step, i) => (
              <li key={step}>
                <p className="rounded-lg border border-line bg-bg-2 px-3 py-2 text-[0.92rem] leading-snug text-fg/85">
                  {step}
                </p>
                {i < col.steps.length - 1 ? (
                  <ArrowDown aria-hidden className="mx-auto my-1 size-3.5 text-accent/70" />
                ) : null}
              </li>
            ))}
          </ol>
          {col.result ? (
            <p className="mt-4 border-t border-line pt-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              Resultado:{" "}
              <span className={col.tone === "accent" ? "text-accent" : "text-fg"}>{col.result}</span>
            </p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

/** A sentence pulled out of the text to be read on its own. */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-10 border-l-2 border-accent pl-5 text-balance text-[1.35rem] font-semibold leading-[1.3] tracking-[-0.02em] text-fg md:pl-6 md:text-[1.6rem] [&>p+p]:mt-2">
      {children}
    </blockquote>
  );
}

/**
 * Two side-by-side panels joined by a short word ("versus", "+"). The
 * highlighted panel carries the accent; on small screens the panels stack.
 */
export function Versus({
  label,
  joiner,
  sides,
  highlight = "first",
}: {
  label: string;
  joiner: string;
  sides: [VersusSide, VersusSide];
  /** Which panel gets the green border: one, or both when they add up. */
  highlight?: "first" | "second" | "both";
}) {
  return (
    <figure aria-label={label} className="mt-8 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
      {sides.map((side, i) => (
        <Fragment key={side.title}>
          {i === 1 ? (
            <p
              aria-hidden
              className={cn(
                "self-center justify-self-center font-mono uppercase text-accent",
                joiner.length > 1 ? "text-xs tracking-[0.2em]" : "text-xl",
              )}
            >
              {joiner}
            </p>
          ) : null}
          <div
            className={cn(
              "rounded-2xl border bg-card p-5 md:p-6",
              isLit(i, highlight) ? "border-accent/35" : "border-line",
            )}
          >
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
              {side.label}
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug tracking-tight text-fg md:text-xl">
              {side.title}
            </p>
            {side.items ? (
              <ul className="mt-4 space-y-2 text-[0.98rem] leading-snug text-fg/80">
                {side.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-[0.55em] size-1.5 shrink-0 rounded-full",
                        isLit(i, highlight) ? "bg-accent" : "bg-muted",
                      )}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Fragment>
      ))}
    </figure>
  );
}

type VersusSide = { label: string; title: string; items?: string[] };

function isLit(index: number, highlight: "first" | "second" | "both") {
  return highlight === "both" || (highlight === "first" ? index === 0 : index === 1);
}

/** Example searches drawn as search fields, e.g. "serviço + cidade". */
export function SearchQueries({ label, queries }: { label: string; queries: string[] }) {
  return (
    <ul aria-label={label} className="mt-8 grid gap-2.5 sm:grid-cols-2">
      {queries.map((query) => (
        <li
          key={query}
          className="flex min-w-0 items-center gap-3 rounded-full border border-line-strong bg-card px-4 py-2.5 text-[0.98rem] text-fg/90"
        >
          <Search aria-hidden className="size-4 shrink-0 text-accent" />
          <span className="min-w-0 break-words">{query}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Factors that add up to an outcome: cards joined by "+", then an arrow to
 * the result. Cards sit in a row on wide screens and stack on small ones.
 */
export function FactorSum({
  label,
  factors,
  result,
}: {
  label: string;
  factors: Array<{ title: string; text: string }>;
  result: string;
}) {
  return (
    <figure aria-label={label} className="mt-8">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {factors.map((factor, i) => (
          <Fragment key={factor.title}>
            {i > 0 ? (
              <p aria-hidden className="self-center font-mono text-xl text-accent">
                +
              </p>
            ) : null}
            <div className="flex-1 self-stretch rounded-2xl border border-line bg-card p-5">
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
                {factor.title}
              </p>
              <p className="mt-2 text-[0.98rem] leading-snug text-fg/85">{factor.text}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <ArrowDown aria-hidden className="mx-auto my-2 size-5 text-accent/70" />
      <p className="rounded-2xl border border-accent/35 bg-bg-2 px-5 py-4 text-center font-mono text-[0.78rem] font-medium uppercase tracking-[0.2em] text-fg">
        {result}
      </p>
    </figure>
  );
}
