import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";
import portrait from "@/content/founder/vinicius-gavioli.webp";
import { getProject } from "@/lib/portfolio";

/** Path told by the founder; ages and the first year come from him. */
const STEPS = [
  { when: "2017 · 15 anos", what: "Primeiro trabalho, numa imobiliária. Começam os estudos e os cursos de marketing." },
  { when: "17 anos", what: "Primeira marca criada: um delivery que virou um dos restaurantes mais conhecidos de Foz do Iguaçu." },
  { when: "Depois", what: "Outras marcas, outros segmentos e a mesma pergunta: o que faz o cliente escolher?" },
  { when: "Hoje", what: "Nichos sensíveis e foco em resultado, com a advocacia em primeiro lugar." },
];

export function Founder() {
  const firstCase = getProject("pesque-pague-golfinho");
  return (
    <section aria-labelledby="ct-fundador" className="border-t border-line py-20 md:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <figure className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-line lg:max-w-none">
            <Image
              src={portrait}
              alt="Vinicius Gavioli, fundador da Shark Digital"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
              <p className="font-semibold tracking-tight text-fg">Vinicius Gavioli</p>
              <p className="text-sm text-fg/70">Fundador da Shark Digital</p>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow tone="brand">Quem conduz a estratégia</Eyebrow>
            <h2
              id="ct-fundador"
              className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-[2.6rem]"
            >
              Estudo marketing desde os 15 anos.
            </h2>
            <blockquote className="mt-6 max-w-2xl space-y-4 text-pretty leading-relaxed text-fg/80 md:text-lg">
              <p>
                Comecei em 2017, numa imobiliária, e desde então não parei de estudar e fazer cursos na área. Aos 17, criei
                minha primeira marca, que dominou o mercado: foi o meu primeiro case de sucesso.
              </p>
              <p>
                Depois vieram outras marcas. Hoje atuo com nichos sensíveis e foco em resultado, principalmente na advocacia,
                que virou minha paixão.
              </p>
            </blockquote>
          </Reveal>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.when} className="bg-bg">
                <Reveal delay={i * 0.05} className="h-full p-5 md:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand">{s.when}</p>
                  <p className="mt-2 text-pretty leading-relaxed text-fg/85">{s.what}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          {firstCase ? (
            <Reveal className="mt-6">
              <Link
                href={`/portfolio/${firstCase.slug}`}
                className="lift group grid gap-5 rounded-3xl border border-brand/40 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(251,197,2,0.08),transparent_60%)] bg-card p-5 sm:grid-cols-[6rem_1fr] sm:items-center md:p-6"
              >
                <Image
                  src={firstCase.gallery[0].items[0].image}
                  alt=""
                  sizes="96px"
                  className="size-24 rounded-2xl border border-line object-cover"
                />
                <span className="min-w-0">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand">Primeiro case</span>
                  <span className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight text-fg">
                    {firstCase.name}
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  {firstCase.metrics?.length ? (
                    <span className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {firstCase.metrics.map((m) => (
                        <span key={m.label} className="text-sm text-muted">
                          <strong className="mr-1.5 text-lg font-semibold text-fg">{m.value}</strong>
                          {m.label}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  <span className="mt-2 block text-xs text-muted">Instagram e painel do Perfil da Empresa no Google, outubro de 2026.</span>
                </span>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
