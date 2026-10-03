import { BarChart3, Compass, Megaphone, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SharkConnection } from "@/components/shark-connection";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";

const ROLES = [
  {
    icon: Compass,
    title: "Assessoria",
    text: "Define prioridades, canais e mensagens.",
  },
  {
    icon: Megaphone,
    title: "Agência",
    text: "Executa campanhas, conteúdo e páginas.",
  },
];

const SUPPORT = [
  {
    icon: BarChart3,
    title: "Leitura dos dados",
    text: "Mostra o que ajustar.",
  },
  {
    icon: RefreshCcw,
    title: "Retorno do atendimento",
    text: "Sua equipe comercial orienta os ajustes.",
  },
];

export function Problem() {
  return (
    <Section id="assessoria" labelledBy="problema-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <SectionHeader
            id="problema-title"
            eyebrow="Quem somos"
            lines={["Assessoria e agência", "de marketing."]}
            text="Planejamos com você e executamos."
          />
          <Reveal delay={0.05} className="mt-8">
            <ButtonLink href="#contato" arrow>
              Conectar minha empresa à Shark
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <SharkConnection />
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-14">
        <ul className="grid gap-4 md:grid-cols-2">
          {ROLES.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <div className="lift group h-full rounded-2xl border border-line bg-[linear-gradient(160deg,#111_0%,#0b0b0b_60%)] p-7 md:p-9">
                <Icon
                  aria-hidden
                  className="size-5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5"
                  strokeWidth={1.6}
                />
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-fg">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="mt-10 grid gap-x-12 gap-y-8 border-t border-line pt-10 sm:grid-cols-2">
        {SUPPORT.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="flex gap-4">
              <Icon aria-hidden className="mt-1 size-5 shrink-0 text-muted" strokeWidth={1.6} />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-fg">{title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mt-14 flex items-center gap-4 text-xl font-medium tracking-tight text-fg md:text-2xl">
          <span aria-hidden className="h-px w-10 bg-accent" />
          Tudo organizado em atração, engajamento e venda.
        </p>
      </Reveal>
    </Section>
  );
}
