import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Founder } from "@/components/growth/founder";
import { GrowthFunnel } from "@/components/growth/growth-funnel";
import { HeroSignals } from "@/components/growth/hero-signals";
import { ProjectCard, toCardData } from "@/components/portfolio/project-card";
import { Reveal, RevealOnLoad } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow, cn } from "@/components/ui";
import { PORTFOLIO } from "@/lib/portfolio";
import { jsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const title = "Como trabalhamos | Shark Digital";
const description =
  "Google Ads, Meta Ads, sites e mensuração organizados pela jornada completa do cliente: da primeira descoberta ao contrato, com foco em advocacia e nichos sensíveis.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/como-trabalhamos" });

/** Advocacy first, then the other niches. */
const CASES = ["colen-advogados", "marcelo-colen", "barp-hoff", "petria-azevedo", "arthemi", "fausto-carretos"];

const wa = (text: string) =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : "/#contato";

const FORMATS = [
  {
    kind: "Serviço específico",
    title: "Você precisa resolver uma demanda pontual?",
    text: "Também executamos projetos de Google Ads, Meta Ads, sites, conteúdo e infraestrutura digital com objetivos e escopos definidos.",
    items: ["Google Ads", "Meta Ads", "Sites e landing pages", "Conteúdo", "Mensuração"],
    cta: "Falar sobre um projeto",
    message: "Olá, Shark! Vim pela página Como trabalhamos e preciso de um projeto específico.",
    main: false,
  },
  {
    kind: "Operação de growth",
    title: "Você precisa desenvolver sua aquisição de clientes?",
    text: "Integramos estratégia, canais, conversão e mensuração, acompanhando a operação para encontrar gargalos e oportunidades de crescimento.",
    items: ["Diagnóstico do funil", "Canais certos para o negócio", "Páginas e atendimento", "Mensuração até o contrato", "Ajustes contínuos"],
    cta: "Falar sobre a operação",
    message: "Olá, Shark! Vim pela página Como trabalhamos e quero conversar sobre a operação de growth.",
    main: true,
  },
];

export default function ComoTrabalhamosPage() {
  const cases = CASES.map((slug) => PORTFOLIO.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Como trabalhamos",
    description,
    url: absoluteUrl("/como-trabalhamos"),
    inLanguage: "pt-BR",
    publisher: organizationJsonLd(),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader />
      <main id="conteudo">
        {/* 1. Hero */}
        <section aria-labelledby="ct-hero" className="grain relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-48 top-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(251,197,2,0.07),transparent)]"
          />
          <Container className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <RevealOnLoad>
                <Eyebrow tone="brand">Shark Digital / Growth operations</Eyebrow>
              </RevealOnLoad>
              <RevealOnLoad delay={0.05}>
                <h1
                  id="ct-hero"
                  className="mt-6 text-balance text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.6rem]"
                >
                  Mais anúncios não consertam um funil que{" "}
                  <span className="text-brand">perde clientes.</span>
                </h1>
              </RevealOnLoad>
              <RevealOnLoad delay={0.12}>
                <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
                  Da primeira descoberta ao contrato, conectamos os canais certos, identificamos gargalos e
                  construímos estratégias para melhorar a aquisição e a conversão do seu negócio.
                </p>
              </RevealOnLoad>
              <RevealOnLoad delay={0.18}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="#estrategia" arrow>
                    Explore nossa estratégia
                  </ButtonLink>
                  <ButtonLink href="#projetos-reais" variant="secondary">
                    Ver projetos reais
                  </ButtonLink>
                </div>
                <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                  Atuação nacional · foco em advocacia e nichos sensíveis
                </p>
              </RevealOnLoad>
            </div>
            <HeroSignals className="mx-auto hidden w-full max-w-[30rem] opacity-90 lg:block" />
          </Container>
          <HeroSignals className="absolute -right-24 top-24 w-[26rem] opacity-25 lg:hidden" />
        </section>

        {/* 2. The living funnel */}
        <section id="estrategia" aria-labelledby="ct-funil" className="relative border-t border-line bg-bg-2 py-20 md:py-28">
          <Container>
            <Reveal className="max-w-3xl">
              <Eyebrow>O funil</Eyebrow>
              <h2 id="ct-funil" className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-[2.6rem]">
                A jornada real não é uma linha reta.
              </h2>
              <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted md:text-lg">
                Somos especialistas em Google Ads de pesquisa e olhamos o caminho inteiro: por onde o cliente chega,
                onde trava e o que vira contrato. Toque em uma etapa.
              </p>
            </Reveal>
            <div className="mt-12 md:mt-16">
              <GrowthFunnel />
            </div>
            <p className="mt-10 max-w-2xl text-sm text-muted">
              O funil é um modelo para entender a jornada. Na prática, as pessoas entram por canais diferentes, voltam e
              pulam etapas.
            </p>
          </Container>
        </section>

        {/* 3. Positioning */}
        <section aria-labelledby="ct-posicionamento" className="border-t border-line py-24 md:py-36">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 id="ct-posicionamento" className="text-balance text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-[2.6rem]">
                A ferramenta muda. A estratégia tem que fazer sentido.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted md:text-lg">
                Alguns negócios precisam começar pelo Google. Outros precisam construir confiança, presença ou estrutura
                antes de acelerar a aquisição. Na Shark, cada decisão depende do mercado, do estágio da empresa e dos dados
                disponíveis.
              </p>
              <p className="mx-auto mt-12 max-w-2xl text-balance text-xl font-medium leading-snug tracking-tight text-fg md:text-2xl">
                <span className="text-brand">“</span>Não colocamos sua empresa em todos os canais. Trabalhamos nos canais
                que fazem sentido para ela.<span className="text-brand">”</span>
              </p>
            </Reveal>
          </Container>
        </section>

        {/* 4. Two ways to work together */}
        <section aria-labelledby="ct-formatos" className="border-t border-line bg-bg-2 py-20 md:py-28">
          <Container>
            <Reveal className="max-w-3xl">
              <Eyebrow>Formatos</Eyebrow>
              <h2 id="ct-formatos" className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-[2.6rem]">
                Duas formas de trabalhar com a Shark.
              </h2>
            </Reveal>
            <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[1fr_1.2fr]">
              {FORMATS.map((f, i) => (
                <Reveal key={f.kind} delay={i * 0.06} className="h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col rounded-3xl border p-7 md:p-9",
                      f.main
                        ? "border-brand/50 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(251,197,2,0.10),transparent_60%)] bg-card shadow-[0_0_0_1px_rgba(251,197,2,0.08),0_30px_80px_-40px_rgba(251,197,2,0.35)]"
                        : "border-line bg-card",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className={cn("font-mono text-[0.72rem] uppercase tracking-[0.2em]", f.main ? "text-brand" : "text-muted")}>
                        {f.kind}
                      </p>
                      {f.main ? (
                        <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-on-brand">Nossa especialidade</span>
                      ) : null}
                    </div>
                    <h3 className={cn("mt-5 text-balance font-semibold tracking-tight text-fg", f.main ? "text-2xl md:text-[1.9rem]" : "text-xl md:text-2xl")}>
                      {f.title}
                    </h3>
                    <p className="mt-4 text-pretty leading-relaxed text-muted">{f.text}</p>
                    <ul className="mt-6 space-y-2.5">
                      {f.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-fg/85">
                          <Check aria-hidden className={cn("mt-1 size-4 shrink-0", f.main ? "text-brand" : "text-accent")} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <ButtonLink href={wa(f.message)} external variant={f.main ? "primary" : "secondary"} arrow>
                        {f.cta}
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* 5. Who leads the strategy */}
        <Founder />

        {/* 6. Real projects */}
        <section id="projetos-reais" aria-labelledby="ct-projetos" className="border-t border-line py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal className="max-w-3xl">
                <Eyebrow tone="brand">Portfólio</Eyebrow>
                <h2 id="ct-projetos" className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-[2.6rem]">
                  Cada negócio. Uma estratégia própria.
                </h2>
                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted md:text-lg">
                  Veja como transformamos desafios diferentes em decisões, estruturas e operações específicas.
                </p>
              </Reveal>
              <Reveal className="shrink-0">
                <ButtonLink href="/portfolio" variant="secondary" arrow>
                  Ver todos os projetos
                </ButtonLink>
              </Reveal>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 3) * 0.05} className="h-full">
                    <ProjectCard project={toCardData(p)} as="h3" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 7. Closing */}
        <section aria-labelledby="ct-final" className="grain relative overflow-hidden border-t border-line py-24 md:py-36">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,240,110,0.07),transparent)]"
          />
          <Container className="relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 id="ct-final" className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
                Seu negócio não precisa de mais uma receita pronta.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
                Precisa descobrir onde estão as melhores oportunidades e o que fazer para aproveitá-las.
              </p>
              <div className="mt-10 flex justify-center">
                <ButtonLink
                  href={wa("Olá, Shark! Vim pela página Como trabalhamos e quero analisar o cenário da minha empresa.")}
                  external
                  arrow
                >
                  Vamos analisar seu cenário
                </ButtonLink>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
                <ArrowRight aria-hidden className="size-3.5 text-accent" />
                Conversa pelo WhatsApp, sem compromisso.
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
