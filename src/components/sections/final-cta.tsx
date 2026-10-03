import { Reveal } from "@/components/reveal";
import { ButtonLink, Container } from "@/components/ui";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="grain relative overflow-hidden border-t border-line bg-bg py-28 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[56rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,240,110,0.06),transparent)]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-md font-mono text-[0.72rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-muted">
            Atração • Engajamento • Venda
            <br />
            Assessoria e agência
          </p>
          <h2
            id="cta-title"
            className="mt-8 text-balance text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-5xl md:text-[3.4rem]"
          >
            <span className="block">Apresente sua empresa</span>
            <span className="block">e vamos conversar sobre</span>
            <span className="mt-2 block text-accent">o seu marketing.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
            Conte o que você oferece e conversamos sobre por onde começar.
          </p>
          <span aria-hidden className="mx-auto mt-10 flex w-40 items-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="size-1 rotate-45 bg-accent" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/60" />
          </span>
          <ButtonLink href="#contato" arrow className="mt-10 shadow-[0_10px_40px_-12px_rgba(251,197,2,0.45)]">
            Conversar sobre meu marketing
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
