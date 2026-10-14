import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { toCardData } from "@/components/portfolio/project-card";
import { Reveal, RevealOnLoad } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { CATEGORIES, PORTFOLIO } from "@/lib/portfolio";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const title = "Portfólio | Shark Digital";
const description =
  "Sites, landing pages, identidade visual, social media e anúncios feitos pela Shark Digital para clientes de advocacia, saúde, serviços e varejo.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/portfolio" });

export default function PortfolioPage() {
  const categories = CATEGORIES.map((c) => ({
    ...c,
    count: PORTFOLIO.filter((p) => p.categories.includes(c.id)).length,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfólio da Shark Digital",
    description,
    url: absoluteUrl("/portfolio"),
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PORTFOLIO.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absoluteUrl(`/portfolio/${p.slug}`),
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader />
      <main id="conteudo">
        <section aria-labelledby="portfolio-title" className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
          <Container>
            <RevealOnLoad className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm text-sm text-muted transition-colors duration-200 hover:text-fg"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Voltar ao início
              </Link>
              <div className="mt-10">
                <Eyebrow tone="brand">Portfólio</Eyebrow>
              </div>
              <h1
                id="portfolio-title"
                className="mt-5 text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl md:text-[3.4rem]"
              >
                Sites, marcas e conteúdo{" "}
                <span className="block text-accent">feitos para clientes reais.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
                Do site com reserva online ao feed de um escritório de advocacia. Abra um projeto para ver as
                telas e as peças.
              </p>
            </RevealOnLoad>

            <PortfolioGrid projects={PORTFOLIO.map(toCardData)} categories={categories} />

            <Reveal className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium tracking-tight text-fg">Quer um projeto assim para a sua empresa?</p>
              <ButtonLink href="/#contato" arrow>
                Conversar sobre meu marketing
              </ButtonLink>
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
