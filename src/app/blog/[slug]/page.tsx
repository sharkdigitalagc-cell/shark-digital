import type { Metadata } from "next";
import { ChevronRight, List as ListIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCta } from "@/components/blog/article-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container, Eyebrow, cn } from "@/components/ui";
import { POST_CONTENT } from "@/content/blog";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { jsonLd, organizationJsonLd } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const images = [
    { url: post.ogImage.src, width: post.ogImage.width, height: post.ogImage.height, alt: post.ogImage.alt },
  ];
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url,
      title: post.seoTitle,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [SITE_NAME],
      section: post.category,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [post.ogImage.src],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = POST_CONTENT[slug];
  if (!post || !content) notFound();

  const { Body, toc, sources, cta } = content;
  // Square or portrait covers would fill the whole screen at full width.
  const cover = post.cover;
  const coverIsTall = cover ? cover.height >= cover.width : false;
  const url = absoluteUrl(`/blog/${post.slug}`);
  const organization = organizationJsonLd();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [...(cover ? [absoluteUrl(cover.src)] : []), absoluteUrl(post.ogImage.src)],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      inLanguage: "pt-BR",
      articleSection: post.category,
      author: organization,
      publisher: organization,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  const tocLinks = (
    <ol className="space-y-2.5 text-sm">
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block rounded-sm leading-snug text-muted transition-colors duration-200 hover:text-fg"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

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
                  <Link href="/blog" className="rounded-sm transition-colors duration-200 hover:text-fg">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="max-w-[16rem] truncate text-fg/70 sm:max-w-md">
                  {post.title}
                </li>
              </ol>
            </nav>

            <header className="mt-10 max-w-4xl">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-[2.6rem] md:text-[3.1rem]">
                {post.title}
              </h1>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span>Por {SITE_NAME}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                {post.updatedAt ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Atualizado em <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                    </span>
                  </>
                ) : null}
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min de leitura</span>
              </p>
            </header>

            {cover ? (
              <figure
                className={cn(
                  "mt-10 overflow-hidden rounded-3xl border border-line md:mt-12",
                  coverIsTall && "max-w-xl",
                )}
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  sizes={coverIsTall ? "(min-width: 640px) 576px, 100vw" : "(min-width: 1152px) 1088px, 100vw"}
                  priority
                  className="h-auto w-full"
                />
              </figure>
            ) : null}

            <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
              <div className="min-w-0 max-w-[44rem]">
                <details className="mb-10 rounded-2xl border border-line bg-card lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
                    <ListIcon aria-hidden className="size-4 text-accent" />
                    Neste artigo
                  </summary>
                  <div className="border-t border-line px-5 py-4">{tocLinks}</div>
                </details>

                <Body />

                <ArticleCta copy={cta} />

                <section aria-labelledby="fontes" className="mt-16 border-t border-line pt-8">
                  <h2
                    id="fontes"
                    className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted"
                  >
                    Fontes consultadas
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-sm text-fg/75 underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-fg hover:decoration-accent"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside aria-label="Neste artigo" className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
                    Neste artigo
                  </p>
                  <div className="mt-5 border-l border-line pl-4">{tocLinks}</div>
                </div>
              </aside>
            </div>
          </Container>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
