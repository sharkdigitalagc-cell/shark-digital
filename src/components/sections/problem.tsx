import { BarChart3, Compass, Megaphone, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Card, Section, SectionHeader } from "@/components/ui";

const PROBLEMS = [
  {
    icon: Compass,
    title: "Conteúdo sem direção",
    text: "Publicações constantes sem conexão clara com posicionamento, aquisição ou vendas.",
  },
  {
    icon: Megaphone,
    title: "Mídia sem estrutura",
    text: "Investimento em tráfego sem jornada, oferta e processo comercial preparados para converter.",
  },
  {
    icon: BarChart3,
    title: "Métricas de vaidade",
    text: "Curtidas e alcance apresentados como resultado enquanto oportunidades, CAC e receita ficam em segundo plano.",
  },
  {
    icon: RefreshCcw,
    title: "Operação reativa",
    text: "Demandas surgem, peças são produzidas e campanhas são lançadas sem um sistema claro de decisão.",
  },
];

export function Problem() {
  return (
    <Section labelledBy="problema-title">
      <SectionHeader
        id="problema-title"
        eyebrow="O problema"
        lines={["Mais marketing não resolve", "um marketing desorganizado."]}
        text="Quando conteúdo, mídia, vendas e atendimento trabalham separados, o resultado é uma operação que produz muito e entende pouco sobre o que realmente gera negócio."
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
          <span aria-hidden className="h-px w-10 bg-accent" />
          A Shark existe para organizar esse sistema.
        </p>
      </Reveal>
    </Section>
  );
}
