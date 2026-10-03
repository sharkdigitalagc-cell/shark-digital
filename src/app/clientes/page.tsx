import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { CLIENTS } from "@/lib/clients";

const title = "Projetos e entregas | Shark Digital";
const description =
  "Empresas atendidas pela Shark Digital e o que foi feito em cada projeto: tráfego, mídia, funis, sites e sistemas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/clientes" },
  openGraph: { title, description, url: "/clientes" },
  twitter: { title, description },
};

export default function ClientesPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section
          aria-labelledby="clientes-title"
          className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40"
        >
          <Container>
            <Reveal className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm text-sm text-muted transition-colors duration-200 hover:text-fg"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Voltar ao início
              </Link>
              <div className="mt-10">
                <Eyebrow tone="brand">Projetos e entregas</Eyebrow>
              </div>
              <h1
                id="clientes-title"
                className="mt-5 text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl md:text-[3.4rem]"
              >
                Empresas atendidas
                <span className="block text-accent">e o que fizemos.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
                Escopo de cada projeto, do tráfego ao site.
              </p>
            </Reveal>

            <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
              {CLIENTS.map((client, i) => (
                <li key={client.slug} id={client.slug}>
                  <Reveal delay={(i % 2) * 0.06} className="h-full">
                    <article
                      aria-labelledby={`${client.slug}-nome`}
                      className="lift flex h-full flex-col rounded-3xl border border-line bg-card p-3"
                    >
                      <ProjectCover
                        as="h2"
                        headingId={`${client.slug}-nome`}
                        name={client.name}
                        segment={client.segment}
                        className="min-h-44"
                      />
                      <div className="flex flex-1 flex-col p-4 pt-5 md:p-5 md:pt-6">
                        <p className="leading-relaxed text-muted">{client.summary}</p>
                        <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                          Entregas
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {client.services.map((service) => (
                            <li key={service} className="flex items-start gap-3 text-fg/85">
                              <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium tracking-tight text-fg">
                Quer conversar sobre o marketing da sua empresa?
              </p>
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
