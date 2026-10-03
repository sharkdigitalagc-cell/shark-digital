import { cn } from "@/components/ui";

/**
 * Typographic cover for a project while there are no approved images of the
 * work: the client's name (as the card heading) and the confirmed
 * deliveries, nothing invented.
 */
export function ProjectCover({
  name,
  segment,
  services,
  as: Heading = "h3",
  headingId,
  className,
}: {
  name: string;
  segment?: string;
  /** Delivery tags on the cover; omit when the card lists them below. */
  services?: string[];
  as?: "h2" | "h3";
  headingId?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grain relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_100%_at_100%_0%,#0d1a11_0%,#0b0b0b_45%,#070707_100%)] p-5 sm:p-6",
        className,
      )}
    >
      <span aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden className="relative flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        <span>{segment ?? "Projeto"}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
      </div>
      {segment ? <p className="sr-only">{segment}</p> : null}
      <Heading
        id={headingId}
        className="relative mt-8 text-balance text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-3xl"
      >
        {name}
      </Heading>
      {services ? (
        <ul aria-label="Entregas" className="relative mt-6 flex flex-wrap gap-1.5">
          {services.map((s) => (
            <li
              key={s}
              className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-fg/70"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
