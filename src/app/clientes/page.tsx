import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow, cn } from "@/components/ui";
import { CLIENTS } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Clientes | Shark Digital",
  description:
    "Empresas atendidas pela Shark Digital e os trabalhos feitos para cada uma.",
  alternates: { canonical: "/clientes" },
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
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-fg"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Voltar ao início
              </Link>
              <div className="mt-10">
                <Eyebrow>Clientes</Eyebrow>
              </div>
              <h1
                id="clientes-title"
                className="mt-5 text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl md:text-[3.4rem]"
              >
                Clientes que atendemos
                <span className="block text-brand">e o que fazemos.</span>
              </h1>
            </Reveal>

            <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
              {CLIENTS.map((client, i) => {
                const active = client.status === "ativo";
                return (
                  <li key={client.name}>
                    <Reveal delay={i * 0.06} className="h-full">
                      <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 md:p-8">
                        <header className="flex flex-wrap items-start justify-between gap-3">
                          <h2 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
                            {client.name}
                          </h2>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                              active
                                ? "border-accent/40 text-accent"
                                : "border-line-strong text-muted",
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "size-1.5 rounded-full",
                                active ? "bg-accent" : "bg-white/40",
                              )}
                            />
                            {active ? "Ativo" : (client.statusNote ?? "Pausado")}
                          </span>
                        </header>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {client.services.map((service) => (
                            <li
                              key={service}
                              className="rounded-full bg-bg-2 px-3 py-1.5 text-sm text-fg/85"
                            >
                              {service}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
