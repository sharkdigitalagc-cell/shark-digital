import { Reveal } from "@/components/reveal";
import { ButtonLink, Container } from "@/components/ui";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden border-t border-line bg-bg py-28 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[56rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,240,110,0.07),transparent)]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-md font-mono text-[0.72rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-muted">
            Se o marketing da sua empresa cresceu,
            <br />
            mas a estrutura não...
          </p>
          <h2
            id="cta-title"
            className="mt-8 text-balance text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-5xl md:text-[3.4rem]"
          >
            <span className="block">Talvez o próximo passo</span>
            <span className="block">não seja fazer mais.</span>
            <span className="mt-2 block text-accent">Talvez seja organizar melhor.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-muted md:text-lg">
            Vamos entender onde sua operação de marketing está hoje e quais
            estruturas precisam existir para ela evoluir.
          </p>
          <ButtonLink href="#contato" arrow className="mt-10">
            Falar com a Shark
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
