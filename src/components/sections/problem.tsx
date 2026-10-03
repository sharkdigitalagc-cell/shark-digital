import { BarChart3, Compass, Megaphone, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Card, Section, SectionHeader } from "@/components/ui";

const PROBLEMS = [
  {
    icon: Compass,
    title: "Clientes vindos de indicações",
    text: "Boa parte dos novos clientes chega por recomendação. É um canal valioso, mas difícil de planejar e de ampliar quando a empresa quer atender mais.",
  },
  {
    icon: Megaphone,
    title: "Contatos com perfis diferentes",
    text: "Os anúncios trazem pedidos de orçamento, mas nem todos combinam com a oferta. Entender por quê ajuda a ajustar público, mensagem e página.",
  },
  {
    icon: BarChart3,
    title: "Pouca visão depois do anúncio",
    text: "O relatório mostra cliques e contatos, mas não indica quantos viraram orçamento ou oportunidade. Sem essa ligação, as decisões sobre verba e mensagem ficam incompletas.",
  },
  {
    icon: RefreshCcw,
    title: "Marketing dividido com outras funções",
    text: "O fundador ou um gestor cuida dos anúncios, do conteúdo e do dia a dia da empresa ao mesmo tempo, e o marketing acaba ficando para os intervalos.",
  },
];

export function Problem() {
  return (
    <Section labelledBy="problema-title">
      <SectionHeader
        id="problema-title"
        eyebrow="Contexto"
        lines={["Situações comuns", "no dia a dia comercial."]}
        text="São cenários de empresas que já têm uma oferta definida e querem organizar a forma como novos contatos chegam, são atendidos e viram orçamentos."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16">
        {PROBLEMS.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="h-full">
              <Card className="h-full">
                <Icon aria-hidden className="size-5 text-muted" strokeWidth={1.6} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mt-14 flex items-center gap-4 text-xl font-medium tracking-tight text-fg md:text-2xl">
          <span aria-hidden className="h-px w-10 bg-accent" />
          O trabalho começa por entender qual desses cenários se aproxima do seu.
        </p>
      </Reveal>
    </Section>
  );
}
