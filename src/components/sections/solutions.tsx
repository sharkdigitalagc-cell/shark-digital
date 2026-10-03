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

/*
 * Each card: the problem it answers and what is done. "projects" lists only
 * clients whose confirmed scope includes the service (src/lib/clients.ts).
 */
const SOLUTIONS = [
  {
    icon: Network,
    title: "Gestão de marketing",
    text: "Para quando há várias frentes e nenhuma prioridade clara. Definimos prioridades, coordenamos as entregas e acompanhamos os dados com o seu comercial.",
    featured: true,
  },
  {
    icon: Crosshair,
    title: "Posicionamento & oferta",
    text: "Quando a oferta não fica clara no anúncio. Organizamos o que dizer e para quem.",
  },
  {
    icon: PenLine,
    title: "Conteúdo e mídias sociais",
    text: "Responde dúvidas e apresenta a empresa antes do contato.",
    projects: ["Sereia"],
  },
  {
    icon: Radio,
    title: "Mídia paga",
    text: "Google Ads para quem já busca; Instagram e Facebook para apresentar a empresa.",
    projects: ["Arthemi", "Colen", "Sereia", "Barphoff"],
  },
  {
    icon: Palette,
    title: "Criativos",
    text: "Imagens, vídeos e textos alinhados à oferta e ao canal.",
  },
  {
    icon: LayoutTemplate,
    title: "Sites, landing pages & funis",
    text: "Páginas que explicam a oferta e levam ao contato.",
    projects: ["Colen", "Sereia", "Barphoff"],
  },
  {
    icon: ChartNoAxesCombined,
    title: "Análise & acompanhamento",
    text: "Dados da campanha e retorno do atendimento orientam os ajustes.",
  },
];

export function Solutions() {
  return (
    <Section id="solucoes" labelledBy="solucoes-title">
      <SectionHeader
        id="solucoes-title"
        eyebrow="Soluções"
        lines={["A função de cada", "canal e serviço."]}
        text="A gestão de marketing coordena as demais frentes."
      />

      <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS.map(({ icon: Icon, title, text, featured, projects }, i) => (
          <li key={title} className={cn(featured && "md:col-span-2")}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <article
                className={cn(
                  "lift group flex h-full flex-col rounded-2xl border p-6 md:p-7",
                  featured
                    ? "border-accent/25 bg-[linear-gradient(135deg,rgba(61,240,110,0.06),rgba(13,13,13,1)_55%)]"
                    : "border-line bg-card",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-5 transition-colors duration-200",
                    featured ? "text-accent" : "text-muted group-hover:text-accent",
                  )}
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
                {projects ? (
                  <p className="mt-auto pt-6 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    Em projetos: <span className="text-fg/80">{projects.join(" · ")}</span>
                  </p>
                ) : null}
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
