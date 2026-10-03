import { ArrowDown, ArrowRight, CornerDownLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const FLOW = ["Oferta", "Atração", "Engajamento", "Venda", "Avaliação"];
const LOOP = ["Dados da campanha", "Retorno do atendimento", "Ajustes"];

export function Operation() {
  return (
    <Section labelledBy="gestao-title" tone="raised">
      <SectionHeader
        tone="accent"
        id="gestao-title"
        eyebrow="Estratégia de aquisição"
        lines={["Atração, engajamento", "e venda."]}
        text="Atrair interessados, explicar a oferta e levar ao contato com a sua equipe."
      />

      <Reveal className="mt-14 md:mt-16">
        <div className="rounded-3xl border border-line bg-card p-5 sm:p-8 md:p-10">
          <ol
            aria-label="Etapas da estratégia de aquisição"
            className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0"
          >
            {FLOW.map((step, i) => (
              <li key={step} className="flex flex-col items-center lg:flex-1 lg:flex-row">
                <div className="flex w-full items-center gap-3 rounded-xl border border-line bg-bg-2 px-4 py-3.5 lg:justify-center">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-fg">{step}</span>
                </div>
                {i < FLOW.length - 1 ? (
                  <>
                    <ArrowRight
                      aria-hidden
                      className="mx-2 hidden size-4 shrink-0 text-accent lg:block"
                    />
                    <ArrowDown aria-hidden className="my-1 size-4 text-accent lg:hidden" />
                  </>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-muted">
              <CornerDownLeft aria-hidden className="size-4 text-accent" />
              Ciclo de ajustes
            </p>
            <ol
              aria-label="Ciclo de ajustes"
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-fg"
            >
              {LOOP.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-line-strong px-3 py-1">
                    {step}
                  </span>
                  {i < LOOP.length - 1 ? (
                    <ArrowRight aria-hidden className="size-3.5 text-muted" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
