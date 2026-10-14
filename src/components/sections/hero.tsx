import { ArrowRight } from "lucide-react";
import { HeroDiagram } from "@/components/hero-diagram";
import { RevealOnLoad } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_70%)]"
      />

      {/* Lateral green light on the diagram side */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,240,110,0.07),transparent)]"
      />
      {/* Fine baseline that closes the first screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <RevealOnLoad>
            <Eyebrow>Assessoria e agência de marketing</Eyebrow>
          </RevealOnLoad>

          <RevealOnLoad delay={0.05}>
            <h1
              id="hero-title"
              className="mt-7 text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-[3.4rem] lg:text-[2.75rem] xl:text-[3.6rem]"
            >
              <span className="block text-fg/70">Estratégia para</span>
              {" "}
              <span className="block text-fg/70">atrair, engajar</span>
              {" "}
              <span className="mt-4 block">e gerar oportunidades</span>
              {" "}
              <span className="block text-accent">de venda.</span>
            </h1>
          </RevealOnLoad>

          <RevealOnLoad delay={0.12}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              Campanhas no Google e no Instagram, conteúdo e páginas
              para a sua oferta.
            </p>
          </RevealOnLoad>

          <RevealOnLoad delay={0.18}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contato" arrow>
                Conversar sobre meu marketing
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                Ver portfólio
              </ButtonLink>
            </div>
          </RevealOnLoad>

          <RevealOnLoad delay={0.21}>
            <a
              href="#metodo"
              className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Conhecer o método
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </RevealOnLoad>

          <RevealOnLoad delay={0.24}>
            <p className="mt-10 border-l border-accent/60 pl-4 text-sm leading-relaxed text-muted">
              Assessoria define prioridades.
              <br />
              Agência executa.
            </p>
          </RevealOnLoad>
        </div>

        <RevealOnLoad delay={0.15} y={0}>
          <HeroDiagram className="max-w-[26rem] sm:max-w-[30rem] lg:max-w-[34rem]" />
        </RevealOnLoad>
      </Container>
    </section>
  );
}
