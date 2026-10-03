import { DrawLine, Reveal } from "@/components/reveal";
import { Section, SectionHeader, cn } from "@/components/ui";

const BAR = ["w-10", "w-7", "w-4"];

// Labels only: a scheme, no values or charts that could be read as results.
const TIERS = [
  {
    title: "Exposição e interesse",
    items: ["Alcance", "Cliques", "Ações na página"],
  },
  {
    title: "Contatos e qualificação",
    items: ["Contatos", "Perfil dos contatos"],
  },
  {
    title: "Oportunidades e vendas",
    items: ["Oportunidades", "Vendas"],
    note: "Quando sua equipe compartilha os dados comerciais.",
  },
];

export function Indicators() {
  return (
    <Section labelledBy="indicadores-title" tone="raised">
      <SectionHeader
        id="indicadores-title"
        eyebrow="Acompanhamento"
        lines={["Como o trabalho", "é acompanhado."]}
        text="Da campanha ao retorno comercial, com o que sua equipe vê no atendimento."
      />

      <Reveal className="mt-14 md:mt-16">
        <ol
          aria-label="Níveis de acompanhamento"
          className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3"
        >
          {TIERS.map((tier, i) => (
            <li key={tier.title} className="flex flex-col bg-card p-6 md:p-8">
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{tier.title}</h3>
              <ul className="mt-5 space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-fg/85">
                    <span aria-hidden className="flex w-10">
                      {/* Narrower bars further down the funnel: a scheme, not data. */}
                      <DrawLine className={cn("block h-1 rounded-full bg-accent/80", BAR[i])} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {tier.note ? (
                <p className="mt-auto pt-6 text-sm leading-relaxed text-muted">{tier.note}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
