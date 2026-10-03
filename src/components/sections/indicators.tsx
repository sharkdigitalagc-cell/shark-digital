import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

// Labels only: no values or charts that could be read as real results.
const INDICATORS = ["Cliques", "Contatos", "Custo por contato", "Orçamentos", "Oportunidades", "Vendas"];

export function Indicators() {
  return (
    <Section labelledBy="indicadores-title">
      <div className="grid gap-14 xl:grid-cols-[1.15fr_1fr] xl:items-end xl:gap-16">
        <SectionHeader
          id="indicadores-title"
          eyebrow="Indicadores"
          lines={["Dados de campanha", "e dados comerciais."]}
          text="Cliques e contatos ajudam a acompanhar as campanhas. Orçamentos, oportunidades e vendas dependem também das informações do atendimento e do processo comercial. O que é possível medir varia conforme os dados e a estrutura de cada empresa."
        />

        <Reveal>
          <ul
            aria-label="Exemplos de indicadores"
            className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 xl:grid-cols-2"
          >
            {INDICATORS.map((label) => (
              <li
                key={label}
                className="flex min-h-28 flex-col justify-between gap-6 bg-card p-5 md:min-h-32 md:p-6"
              >
                <span aria-hidden className="flex items-center gap-1">
                  <span className="h-1 w-5 rounded-full bg-accent/80" />
                  <span className="h-1 w-2 rounded-full bg-white/15" />
                </span>
                <span className="text-base font-semibold tracking-tight text-fg sm:text-lg md:text-xl">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
