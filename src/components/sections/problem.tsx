import { BarChart3, Compass, Megaphone, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Card, Section, SectionHeader } from "@/components/ui";

const PROBLEMS = [
  {
    icon: Compass,
    title: "Assessoria",
    text: "Define prioridades, canais e mensagens.",
  },
  {
    icon: Megaphone,
    title: "Agência",
    text: "Executa campanhas, conteúdo e páginas.",
  },
  {
    icon: BarChart3,
    title: "Leitura dos dados",
    text: "Mostra o que ajustar.",
  },
  {
    icon: RefreshCcw,
    title: "Retorno do atendimento",
    text: "Sua equipe comercial orienta os ajustes.",
  },
];

export function Problem() {
  return (
    <Section labelledBy="problema-title">
      <SectionHeader
        id="problema-title"
        eyebrow="Quem somos"
        lines={["Assessoria e agência", "de marketing."]}
        text="Planejamos com você e executamos."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16">
        {PROBLEMS.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="h-full">
              <Card className="h-full">
                <Icon aria-hidden className="size-5 text-muted" strokeWidth={1.6} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mt-14 flex items-center gap-4 text-xl font-medium tracking-tight text-fg md:text-2xl">
          <span aria-hidden className="h-px w-10 bg-brand" />
          Tudo organizado em atração, engajamento e venda.
        </p>
      </Reveal>
    </Section>
  );
}
