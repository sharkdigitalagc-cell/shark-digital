import { MessageSquareText, Route, Target, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const PILLARS = [
  { icon: Users, title: "Público", question: "Quem buscamos alcançar?" },
  { icon: Target, title: "Objetivo", question: "Qual ação esperamos estimular?" },
  { icon: MessageSquareText, title: "Mensagem", question: "O que essa pessoa precisa compreender sobre a oferta?" },
  { icon: Route, title: "Distribuição", question: "Como essa mensagem será distribuída e avaliada?" },
];

export function Framework() {
  return (
    <Section labelledBy="framework-title" tone="raised">
      <SectionHeader
        id="framework-title"
        eyebrow="Planejamento de campanha"
        lines={["Quatro perguntas antes", "de cada campanha."]}
      />

      <ul className="mt-14 grid overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 [&>li]:bg-card md:mt-16 gap-px">
        {PILLARS.map(({ icon: Icon, title, question }, i) => (
          <li key={title} className="p-6 md:p-8">
            <Reveal delay={i * 0.06}>
              <div className="flex items-center justify-between">
                <Icon aria-hidden className="size-5 text-accent" strokeWidth={1.6} />
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-10 text-sm font-medium uppercase tracking-[0.16em] text-muted">
                {title}
              </h3>
              <p className="mt-3 text-xl font-medium leading-snug tracking-tight text-fg">
                {question}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
