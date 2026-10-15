import { AtSign, Check, ExternalLink, Images } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/portfolio";

/**
 * A case study in four blocks: starting point, strategic decision, the
 * operation built and the evidence. The evidence block adapts to what can be
 * shown: authorised metrics (with period and source), verifiable lessons,
 * live links and the screens and pieces further down the page.
 */
export function CaseStudy({ project }: { project: Project }) {
  const hasPieces = Boolean(project.site) || project.gallery.length > 0;
  const blocks = [
    { n: "01", title: "O ponto de partida", body: <p>{project.startingPoint}</p> },
    { n: "02", title: "A decisão estratégica", body: <p>{project.decision}</p> },
    {
      n: "03",
      title: "A operação construída",
      body: (
        <ul className="space-y-2.5">
          {project.operation.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section aria-label="Estudo de caso" className="mt-14 md:mt-20">
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {blocks.map((b, i) => (
          <li key={b.n} className="bg-bg">
            <Reveal delay={i * 0.05} className="h-full p-6 md:p-7">
              <p className="font-mono text-xs text-brand">{b.n}</p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-fg">{b.title}</h2>
              <div className="mt-3 text-pretty leading-relaxed text-fg/80">{b.body}</div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-4 rounded-3xl border border-line bg-card p-6 md:p-7">
        <p className="font-mono text-xs text-brand">04</p>
        <h2 className="mt-3 text-lg font-semibold tracking-tight text-fg">As evidências</h2>

        {project.metrics?.length ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.map((m) => (
              <li key={m.label} className="rounded-2xl border border-line p-5">
                <p className="text-3xl font-semibold tracking-tight text-fg">{m.value}</p>
                <p className="mt-1 text-sm text-fg/80">{m.label}</p>
                <p className="mt-3 text-xs text-muted">
                  {m.period} · Fonte: {m.source}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {project.learnings?.length ? (
          <div className="mt-5">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">O que aprendemos</h3>
            <ul className="mt-3 space-y-2.5">
              {project.learnings.map((l) => (
                <li key={l} className="max-w-3xl text-pretty leading-relaxed text-fg/85">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-5">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">O que dá para conferir</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.site?.url ? (
              <li>
                <a
                  href={project.site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/85 transition-colors hover:border-white/30 hover:text-fg"
                >
                  <ExternalLink aria-hidden className="size-4 text-accent" />
                  Site no ar
                </a>
              </li>
            ) : null}
            {project.instagram ? (
              <li>
                <a
                  href={`https://www.instagram.com/${project.instagram}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/85 transition-colors hover:border-white/30 hover:text-fg"
                >
                  <AtSign aria-hidden className="size-4 text-accent" />
                  Instagram<span className="sr-only">: {project.instagram}</span>
                </a>
              </li>
            ) : null}
            {hasPieces ? (
              <li>
                <a
                  href="#pecas"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/85 transition-colors hover:border-white/30 hover:text-fg"
                >
                  <Images aria-hidden className="size-4 text-accent" />
                  Telas e peças entregues
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        {!project.metrics?.length ? (
          <p className="mt-5 border-t border-line pt-5 text-sm text-muted">
            Números de resultado só entram aqui com autorização do cliente, período e fonte.
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}
