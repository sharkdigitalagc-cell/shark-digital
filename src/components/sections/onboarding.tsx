import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const STEPS = [
  { title: "Oferta e público", text: "Quais serviços você quer divulgar e quem costuma contratar a empresa." },
  { title: "Campanhas", text: "O que já foi feito em Google Ads, Instagram Ads e conteúdo, e o que você observou." },
  {
    title: "Atendimento",
    text: "Como os contatos chegam, quem responde e como são feitos orçamentos e propostas.",
  },
  { title: "Objetivos", text: "O que a empresa quer alcançar e quais frentes parecem prioritárias agora." },
  {
    title: "Dados",
    text: "Quais informações de campanha e de vendas existem hoje para apoiar a avaliação.",
  },
];

export function Onboarding() {
  return (
    <Section labelledBy="entrada-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            id="entrada-title"
            eyebrow="Processo de entrada"
            lines={["Pauta da primeira", "conversa."]}
          />
        </div>

        <ol className="border-t border-line">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-b border-line">
              <Reveal delay={i * 0.05}>
                <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-7 sm:grid-cols-[4rem_10rem_1fr] sm:items-baseline">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="col-start-2 mt-1.5 leading-relaxed text-muted sm:col-start-3 sm:mt-0">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
