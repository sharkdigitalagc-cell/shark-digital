import { ArrowRight } from "lucide-react";
import { DrawLine, Reveal } from "@/components/reveal";
import { StrategyPiece } from "@/components/still-life";
import { Section, SectionHeader, cn } from "@/components/ui";

/** The acquisition path every step serves. */
const FLOW = ["Oferta", "Atração", "Engajamento", "Venda", "Avaliação"];

/** Asked during planning, before any ad goes live. */
const QUESTIONS = [
  "Quem pode se interessar?",
  "O que essa pessoa busca?",
  "Para onde o anúncio leva?",
  "Qual ação esperamos?",
];

const STEPS: Array<{
  title: string;
  text: string;
  outcome: string;
  extra?: "questions";
}> = [
  {
    title: "Entendimento",
    text: "Oferta, público e atendimento.",
    outcome: "Você confirma o que vende, para quem e como sua equipe atende.",
  },
  {
    title: "Planejamento",
    text: "Prioridades, canais e mensagens.",
    outcome: "Quatro perguntas respondidas antes de anunciar:",
    extra: "questions",
  },
  {
    title: "Produção",
    text: "Conteúdos, criativos e páginas.",
    outcome: "Oferta clara, textos objetivos e contato fácil.",
  },
  {
    title: "Publicação",
    text: "Campanhas no Google e no Instagram.",
    outcome: "Anúncios coerentes com a página para onde levam.",
  },
  {
    title: "Avaliação",
    text: "Dados orientam os ajustes.",
    outcome: "Dados da campanha e retorno do seu comercial definem o próximo ciclo.",
  },
];

export function Method() {
  return (
    <Section id="metodo" labelledBy="metodo-title">
      {/* Older links pointed to #diferenciais (engagement), now part of the method. */}
      <span id="diferenciais" aria-hidden className="absolute top-0" />

      <div className="grid items-end gap-10 md:grid-cols-[1fr_13rem] lg:grid-cols-[1fr_16rem]">
        <div>
          <SectionHeader
            id="metodo-title"
            eyebrow="Método"
            lines={["Do entendimento aos ajustes."]}
            text="Cinco etapas para atrair, engajar e levar ao contato com a sua equipe."
          />
          <Reveal delay={0.08}>
            <ol
              aria-label="Caminho da aquisição"
              className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-muted"
            >
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-line-strong px-3 py-1.5 text-fg/80">
                    {step}
                  </span>
                  {i < FLOW.length - 1 ? (
                    <ArrowRight aria-hidden className="size-3.5 text-accent" />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="hidden md:block">
          <StrategyPiece className="aspect-[4/5]" />
        </Reveal>
      </div>

      <ol className="relative mt-16 grid gap-0 md:mt-20 lg:grid-cols-5 lg:gap-6">
        <DrawLine className="absolute left-0 right-0 top-[1.2rem] hidden h-px bg-gradient-to-r from-accent/60 via-line-strong to-line lg:block" />
        <DrawLine
          axis="y"
          className="absolute bottom-6 left-[1.2rem] top-2 w-px bg-gradient-to-b from-accent/60 via-line-strong to-line lg:hidden"
        />

        {STEPS.map((step, i) => (
          <li key={step.title} className="group relative pb-10 pl-16 last:pb-0 lg:pb-0 lg:pl-0">
            <Reveal delay={i * 0.06}>
              <span
                className={cn(
                  "absolute left-0 top-0 flex size-[2.4rem] items-center justify-center rounded-full border bg-bg font-mono text-xs text-fg transition-colors duration-200 lg:relative",
                  i === 0
                    ? "border-accent/60 shadow-[0_0_24px_-6px_rgba(61,240,110,0.45)]"
                    : "border-line-strong group-hover:border-accent/50",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pt-1.5 text-lg font-semibold tracking-tight text-fg lg:mt-7 lg:pt-0">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg/80">{step.text}</p>
              <p className="mt-3 border-l border-line-strong pl-3 text-sm leading-relaxed text-muted">
                {step.outcome}
              </p>
              {step.extra === "questions" ? (
                <ul className="mt-3 space-y-1.5 pl-3 text-sm text-fg/80">
                  {QUESTIONS.map((q) => (
                    <li key={q} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-brand" />
                      {q}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
