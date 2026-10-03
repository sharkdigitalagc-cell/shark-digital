import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const STEPS = [
  {
    title: "Entendimento",
    text: "Conhecemos a oferta, o público que você quer alcançar e como sua equipe atende os contatos hoje.",
  },
  {
    title: "Planejamento",
    text: "Definimos objetivos, prioridades e o que entra primeiro entre Google Ads, Instagram Ads e conteúdo.",
  },
  {
    title: "Produção",
    text: "Preparamos os conteúdos, criativos e páginas previstos no escopo combinado com a empresa.",
  },
  {
    title: "Publicação",
    text: "Publicamos e gerenciamos as campanhas no Google Ads e no Instagram Ads, seguindo o plano definido.",
  },
  {
    title: "Avaliação",
    text: "Avaliamos os dados disponíveis e o retorno do atendimento para decidir o que manter, mudar ou testar.",
  },
];

export function Method() {
  return (
    <Section id="metodo" labelledBy="metodo-title">
      <SectionHeader
        id="metodo-title"
        eyebrow="Método"
        lines={["Do entendimento aos ajustes."]}
        text="Cada etapa responde a uma pergunta prática: o que vamos divulgar, para quem, com qual objetivo e o que os dados mostram depois da publicação."
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
