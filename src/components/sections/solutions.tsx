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
    text: "Planejamento, coordenação das frentes contratadas e acompanhamento do que foi combinado, com os mesmos objetivos orientando campanhas e conteúdo.",
    featured: true,
  },
  {
    icon: Crosshair,
    title: "Posicionamento & estratégia",
    text: "Definição do público, da forma de apresentar a oferta e das mensagens usadas nos anúncios e no conteúdo.",
  },
  {
    icon: PenLine,
    title: "Conteúdo",
    text: "Publicações que explicam a oferta, respondem dúvidas frequentes e ajudam o público a conhecer a empresa antes do contato.",
  },
  {
    icon: Radio,
    title: "Mídia paga",
    text: "Google Ads na Rede de Pesquisa, para alcançar quem procura serviços ligados à oferta, e Instagram Ads (Meta), para apresentar a oferta, distribuir conteúdo e se relacionar com o público.",
  },
  {
    icon: Palette,
    title: "Criativos",
    text: "Imagens, vídeos e textos dos anúncios, produzidos conforme a mensagem e o objetivo de cada campanha.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing pages & funis",
    text: "Páginas que apresentam a oferta e levam ao próximo passo definido, como um formulário ou uma conversa no WhatsApp.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Análise & acompanhamento",
    text: "Leitura dos números das campanhas e, quando a empresa compartilha, das informações do atendimento, para orientar os ajustes.",
  },
];

export function Solutions() {
  return (
    <Section id="solucoes" labelledBy="solucoes-title">
      <SectionHeader
        id="solucoes-title"
        eyebrow="Soluções"
        lines={["O que cada serviço faz."]}
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
