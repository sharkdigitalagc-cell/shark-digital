import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container, Eyebrow } from "@/components/ui";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

const title = "Blog | Shark Digital";
const description =
  "Artigos sobre aquisição de clientes: mídia, páginas, atendimento comercial e mensuração do anúncio até a receita.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" });

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section aria-labelledby="blog-title" className="pb-24 pt-32 md:pb-32 md:pt-40">
          <Container>
            <Reveal className="max-w-3xl">
              <Eyebrow>Blog</Eyebrow>
              <h1
                id="blog-title"
                className="mt-5 text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl md:text-[3.4rem]"
              >
                Do anúncio{" "}
                <span className="block text-accent">até a receita.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
                Artigos para quem já investe em marketing e quer entender onde o resultado se perde.
              </p>
            </Reveal>

            <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={(i % 2) * 0.06} className="h-full">
                    <article className="lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card">
                      <div className="overflow-hidden border-b border-line">
                        <Image
                          src={(post.card ?? post.cover ?? post.ogImage).src}
                          alt=""
                          width={(post.card ?? post.cover ?? post.ogImage).width}
                          height={(post.card ?? post.cover ?? post.ogImage).height}
                          sizes="(min-width: 768px) 540px, 100vw"
                          className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                          {post.category} · <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                        </p>
                        <h2 className="mt-4 text-balance text-xl font-semibold leading-snug tracking-tight text-fg">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="rounded-sm after:absolute after:inset-0 after:content-['']"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-3 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
                        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg">
                          Ler artigo · {post.readingMinutes} min
                          <ArrowRight
                            aria-hidden
                            className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
