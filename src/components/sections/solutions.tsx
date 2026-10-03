import {
  ChartNoAxesCombined,
  Crosshair,
  LayoutTemplate,
  Network,
  Palette,
  PenLine,
  Radio,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader, cn } from "@/components/ui";

const SOLUTIONS = [
  {
    icon: Network,
    title: "Gestão de marketing",
    text: "Define prioridades e coordena as entregas.",
    featured: true,
  },
  {
    icon: Crosshair,
    title: "Posicionamento & oferta",
    text: "Oferta clara e objetiva.",
  },
  {
    icon: PenLine,
    title: "Conteúdo",
    text: "Responde dúvidas e apresenta a empresa.",
  },
  {
    icon: Radio,
    title: "Mídia paga",
    text: "Google Ads para quem busca; Instagram e Facebook para apresentar a empresa.",
  },
  {
    icon: Palette,
    title: "Criativos",
    text: "Imagens, vídeos e textos.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing pages & funis",
    text: "Páginas que levam ao contato.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Análise & acompanhamento",
    text: "Dados que orientam ajustes.",
  },
];

export function Solutions() {
  return (
    <Section id="solucoes" labelledBy="solucoes-title">
      <SectionHeader
        id="solucoes-title"
        eyebrow="Soluções"
        lines={["A função de cada", "canal e serviço."]}
      />

      <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS.map(({ icon: Icon, title, text, featured }, i) => (
          <li key={title} className={cn(featured && "md:col-span-2")}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6 md:p-7",
                  featured
                    ? "border-accent/25 bg-[linear-gradient(135deg,rgba(61,240,110,0.07),rgba(13,13,13,1)_55%)]"
                    : "border-line bg-card",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn("size-5", featured ? "text-accent" : "text-muted")}
                  strokeWidth={1.6}
                />
                <h3
                  className={cn(
                    "mt-8 font-semibold tracking-tight text-fg",
                    featured ? "text-2xl" : "text-lg",
                  )}
                >
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
                {featured ? (
                  <p className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Coordena as demais frentes
                  </p>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
