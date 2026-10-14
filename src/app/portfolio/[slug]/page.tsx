import type { Metadata } from "next";
import { ArrowRight, AtSign, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserFrame, PhoneFrame } from "@/components/portfolio/device-frames";
import { Gallery } from "@/components/portfolio/gallery";
import { Reveal, RevealOnLoad } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { FULL_SERVICE_LABEL, PORTFOLIO, categoryLabel, getProject } from "@/lib/portfolio";
import { jsonLd, organizationJsonLd } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/portfolio/${project.slug}`;
  const title = `${project.name} | Portfólio Shark Digital`;
  const og = { url: project.og.src, width: project.og.width, height: project.og.height, alt: project.cover.alt };
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url,
      title,
      description: project.summary,
      images: [og],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [og.url] },
  };
}

export default async function PortfolioProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PORTFOLIO.indexOf(project);
  const next = PORTFOLIO[(index + 1) % PORTFOLIO.length];
  const url = absoluteUrl(`/portfolio/${project.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.summary,
      url,
      image: absoluteUrl(project.og.src),
      inLanguage: "pt-BR",
      creator: organizationJsonLd(),
      keywords: project.deliveries.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Portfólio", item: absoluteUrl("/portfolio") },
        { "@type": "ListItem", position: 3, name: project.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader />
      <main id="conteudo">
        <article className="pb-24 pt-28 md:pb-32 md:pt-36">
          <Container>
            <nav aria-label="Trilha de navegação">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li>
                  <Link href="/" className="rounded-sm transition-colors duration-200 hover:text-fg">
                    Início
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link href="/portfolio" className="rounded-sm transition-colors duration-200 hover:text-fg">
                    Portfólio
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="max-w-[14rem] truncate text-fg/70 sm:max-w-md">
                  {project.name}
                </li>
              </ol>
            </nav>

            <RevealOnLoad className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
              <header>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <Eyebrow tone="brand">{project.segment}</Eyebrow>
                  {project.fullService ? (
                    <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-on-brand">
                      {FULL_SERVICE_LABEL}
                    </span>
                  ) : null}
                </div>
                <h1 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl md:text-[3.4rem]">
                  {project.name}
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
                  {project.summary}
                </p>
              </header>

              <dl className="grid content-start gap-6 border-t border-line pt-6 text-sm lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
                {project.location || project.period ? (
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                      {project.location && project.period ? "Onde e quando" : project.location ? "Onde" : "Quando"}
                    </dt>
                    <dd className="mt-2 text-fg/85">
                      {[project.location, project.period].filter(Boolean).join(" · ")}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">Entregas</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.deliveries.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.8rem] text-fg/85"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {project.site?.url || project.instagram ? (
                  <div>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">Ver ao vivo</dt>
                    <dd className="mt-3 flex flex-col items-start gap-2.5">
                      {project.site?.url ? (
                        <a
                          href={project.site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-sm text-fg/85 transition-colors duration-200 hover:text-brand"
                        >
                          <ExternalLink aria-hidden className="size-4 text-accent" />
                          {new URL(project.site.url).host.replace(/^www\./, "")}
                        </a>
                      ) : null}
                      {project.instagram ? (
                        <a
                          href={`https://www.instagram.com/${project.instagram}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-sm text-fg/85 transition-colors duration-200 hover:text-brand"
                        >
                          <AtSign aria-hidden className="size-4 text-accent" />
                          {project.instagram}
                          <span className="sr-only">(Instagram)</span>
                        </a>
                      ) : null}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </RevealOnLoad>

            <RevealOnLoad delay={0.08}>
              <figure className="mt-12 overflow-hidden rounded-3xl border border-line md:mt-14">
                <Image
                  src={project.cover.image}
                  alt={project.cover.alt}
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  placeholder="blur"
                  priority
                  className="h-auto w-full"
                />
              </figure>
            </RevealOnLoad>

            <Reveal className="mt-12 max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-fg/80 md:mt-16 md:text-lg">
              {project.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="flex flex-wrap gap-x-2 text-sm text-muted">
                {project.categories.map((c, i) => (
                  <span key={c}>
                    {i > 0 ? <span aria-hidden className="mr-2">·</span> : null}
                    {categoryLabel(c)}
                  </span>
                ))}
              </p>
            </Reveal>

            {project.site ? (
              <section aria-labelledby="site-titulo" className="mt-16 md:mt-20">
                <h2 id="site-titulo" className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted">
                  {project.site.url ? "O site" : "A página"}
                </h2>
                <p className="mt-3 text-sm text-muted">Role dentro da janela para ver a página inteira.</p>
                <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
                  <BrowserFrame shot={project.site.page} url={project.site.url} />
                  <PhoneFrame shot={project.site.mobile} className="mx-auto lg:mt-10" />
                </div>
              </section>
            ) : null}

            {project.gallery.map((section, i) => (
              <Gallery key={section.title} section={section} id={`galeria-${i}`} />
            ))}

            <div className="mt-20 grid gap-4 border-t border-line pt-10 md:mt-24 md:grid-cols-2 md:items-center">
              <Link
                href={`/portfolio/${next.slug}`}
                className="lift group flex items-center gap-4 rounded-3xl border border-line bg-card p-3 pr-6"
              >
                <Image
                  src={next.cover.image}
                  alt=""
                  sizes="160px"
                  placeholder="blur"
                  className="h-auto w-32 shrink-0 rounded-2xl border border-line sm:w-40"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    Próximo projeto
                  </span>
                  <span className="mt-1.5 flex items-center gap-2 text-lg font-semibold tracking-tight text-fg">
                    <span className="truncate">{next.name}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
              <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                <p className="text-lg font-medium tracking-tight text-fg">Quer algo assim para a sua empresa?</p>
                <ButtonLink href="/#contato" arrow>
                  Conversar sobre meu marketing
                </ButtonLink>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
