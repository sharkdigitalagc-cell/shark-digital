import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const FRAGMENTED = [
  "Posts isolados",
  "Demandas pelo WhatsApp",
  "Decisões por opinião",
  "Métricas de vaidade",
  "Execução reativa",
];

const SHARK = [
  "Planejamento integrado",
  "Processos claros",
  "Decisões orientadas por dados",
  "Indicadores de negócio",
  "Evolução contínua",
];

export function Differentials() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title" tone="raised">
      <SectionHeader
        id="diferenciais-title"
        eyebrow="Diferenciais"
        lines={["Menos improviso.", "Mais sistema."]}
      />

      <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-3xl border border-line bg-bg p-7 md:p-9">
            <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Modelo fragmentado
            </h3>
            <ul className="mt-8 space-y-1">
              {FRAGMENTED.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-4 text-muted last:border-0"
                >
                  <Minus aria-hidden className="size-4 shrink-0 text-white/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <div className="h-full rounded-3xl border border-accent/25 bg-card p-7 shadow-[0_0_80px_-40px_rgba(61,240,110,0.35)] md:p-9">
            <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Modelo Shark
            </h3>
            <ul className="mt-8 space-y-1">
              {SHARK.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-4 font-medium text-fg last:border-0"
                >
                  <Check aria-hidden className="size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

