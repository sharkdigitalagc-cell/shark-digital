import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada | Shark Digital",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section aria-labelledby="nao-encontrada-title" className="pb-24 pt-32 md:pb-32 md:pt-40">
          <Container className="max-w-3xl">
            <Eyebrow>Erro 404</Eyebrow>
            <h1
              id="nao-encontrada-title"
              className="mt-5 text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl"
            >
              Página não encontrada.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted md:text-lg">
              O endereço pode ter mudado. Veja os serviços na página inicial, o portfólio ou o blog.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/" arrow>
                Ir para o início
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                Ver portfólio
              </ButtonLink>
              <ButtonLink href="/blog" variant="secondary">
                Ler o blog
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
