import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const STEPS = [
  {
    title: "Entendimento",
    text: "Entendemos o negócio, mercado, público, oferta, operação comercial e momento da empresa.",
  },
  {
    title: "Planejamento",
    text: "Transformamos contexto em prioridades, canais, mensagens, campanhas e indicadores.",
  },
  {
    title: "Produção",
    text: "Estratégia vira conteúdo, criativos, campanhas, páginas e ativos de aquisição.",
  },
  {
    title: "Divulgação",
    text: "Distribuímos cada ativo nos canais adequados, conectando mídia, conteúdo e jornada.",
  },
  {
    title: "Acompanhamento",
    text: "Analisamos comportamento, oportunidades, conversões e resultados para orientar a próxima decisão.",
  },
];

export function Method() {
  return (
    <Section id="metodo" labelledBy="metodo-title">
      <SectionHeader
        id="metodo-title"
        eyebrow="Método Shark"
        lines={["Processo antes de volume."]}
        text="Uma operação de marketing precisa saber por que está executando, o que está medindo e qual decisão será tomada depois."
      />

      <ol className="relative mt-16 grid gap-0 md:mt-20 lg:grid-cols-5 lg:gap-6">
        {/* Desktop horizontal rail */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[1.2rem] hidden h-px bg-gradient-to-r from-accent/60 via-line-strong to-line lg:block"
        />
        {/* Mobile vertical rail */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[1.2rem] top-2 w-px bg-gradient-to-b from-accent/60 via-line-strong to-line lg:hidden"
        />

        {STEPS.map((step, i) => (
          <li key={step.title} className="relative pb-10 pl-16 last:pb-0 lg:pb-0 lg:pl-0">
            <Reveal delay={i * 0.08}>
              <span className="absolute left-0 top-0 flex size-[2.4rem] items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-xs text-fg lg:relative">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pt-1.5 text-lg font-semibold tracking-tight text-fg lg:mt-7 lg:pt-0">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
