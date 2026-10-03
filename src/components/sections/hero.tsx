import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroDiagram } from "@/components/hero-diagram";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_70%)]"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <Eyebrow>Assessoria e agência de marketing</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="mt-7 text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-[3.4rem] lg:text-[2.75rem] xl:text-[3.6rem]"
            >
              <span className="block text-fg/70">Estratégia para</span>
              <span className="block text-fg/70">atrair, engajar</span>
              <span className="mt-4 block">e gerar oportunidades</span>
              <span className="block text-brand">de venda.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              Campanhas no Google e no Instagram, conteúdo e páginas
              para a sua oferta.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contato" arrow>
                Conversar sobre meu marketing
              </ButtonLink>
              <ButtonLink href="#metodo" variant="secondary">
                Conhecer o método
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.21}>
            <Link
              href="/clientes"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              <span className="underline decoration-brand/40 underline-offset-4 group-hover:decoration-brand">
                Veja os clientes que atendemos
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-10 border-l border-brand/60 pl-4 text-sm leading-relaxed text-muted">
              Assessoria define prioridades.
              <br />
              Agência executa.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={0}>
          <HeroDiagram className="max-w-[26rem] sm:max-w-[30rem] lg:max-w-[34rem]" />
        </Reveal>
      </Container>
    </section>
  );
}
