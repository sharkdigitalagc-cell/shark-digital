import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

// Answers use only what the site already states. No prices, terms or meeting
// frequency until the Shark confirms them.
const FAQ = [
  {
    q: "Qual a diferença entre assessoria e execução?",
    a: "A assessoria define prioridades, canais e mensagens. A execução (agência) faz campanhas, conteúdo e páginas. Na Shark, as duas trabalham juntas.",
  },
  {
    q: "Como vocês definem as prioridades?",
    a: "A partir da oferta, do público e de como sua equipe atende. Antes de anunciar, respondemos: quem pode se interessar, o que essa pessoa busca, para onde o anúncio leva e qual ação esperamos.",
  },
  {
    q: "O que preciso ter para começar?",
    a: "Saber o que você oferece e para quem, o que já foi feito em campanhas, como sua equipe atende os contatos, os objetivos e os dados disponíveis. Essa é a pauta da primeira conversa.",
  },
  {
    q: "Como o trabalho é acompanhado?",
    a: "Por indicadores que vão do alcance às oportunidades, somados ao retorno da sua equipe comercial. Esse retorno orienta os ajustes.",
  },
  {
    q: "Vocês fazem campanhas e páginas?",
    a: "Sim. Google Ads para quem já busca, Instagram e Facebook para apresentar a empresa, além de conteúdo, criativos, sites e landing pages.",
  },
  {
    q: "O que influencia a avaliação dos resultados?",
    a: "A oferta, o público, o canal, a página de destino e o atendimento dos contatos. Por isso o retorno do comercial faz parte da avaliação.",
  },
  {
    q: "Como é a primeira conversa?",
    a: "Falamos sobre oferta e público, campanhas já feitas, atendimento, objetivos e dados disponíveis. Você pode começar pelo formulário ou pelo WhatsApp.",
  },
];

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" tone="raised">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader id="faq-title" eyebrow="Dúvidas" lines={["Perguntas", "frequentes."]} />

        <Reveal>
          <div className="border-t border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-left text-base font-medium text-fg transition-colors duration-200 hover:text-white md:text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    aria-hidden
                    className="size-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
