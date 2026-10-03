import { MessageSquareText, Route, Target, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { StrategyPiece } from "@/components/still-life";
import { Section, SectionHeader } from "@/components/ui";

const PILLARS = [
  { icon: Users, title: "Público", question: "Quem pode se interessar?" },
  { icon: Target, title: "Necessidade", question: "O que essa pessoa busca?" },
  { icon: MessageSquareText, title: "Destino", question: "Para onde o anúncio leva?" },
  { icon: Route, title: "Ação", question: "Qual ação esperamos?" },
];

export function Framework() {
  return (
    <Section labelledBy="framework-title" tone="raised">
      <div className="grid items-end gap-10 md:grid-cols-[1fr_14rem] lg:grid-cols-[1fr_17rem]">
        <SectionHeader
          tone="brand"
          id="framework-title"
          eyebrow="Planejamento da atração"
          lines={["Quatro perguntas", "antes de anunciar."]}
        />
        <Reveal delay={0.1} className="hidden md:block">
          <StrategyPiece className="aspect-[4/5]" />
        </Reveal>
      </div>

      <ul className="mt-14 grid overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 [&>li]:bg-card md:mt-16 gap-px">
        {PILLARS.map(({ icon: Icon, title, question }, i) => (
          <li key={title} className="group p-6 transition-colors duration-200 hover:!bg-[#111] md:p-8">
            <Reveal delay={i * 0.06}>
              <div className="flex items-center justify-between">
                <Icon
                  aria-hidden
                  className="size-5 text-brand transition-transform duration-200 group-hover:-translate-y-0.5"
                  strokeWidth={1.6}
                />
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
