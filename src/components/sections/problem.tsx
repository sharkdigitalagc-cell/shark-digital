import { BarChart3, Compass, Megaphone, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

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

/** Thin line of light joining the two roles: one operation, two halves. */
function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 md:px-1 md:py-0">
      <span className="relative block h-8 w-px bg-gradient-to-b from-line-strong via-brand/70 to-line-strong md:h-px md:w-14 md:bg-gradient-to-r">
        <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand" />
      </span>
    </div>
  );
}

export function Problem() {
  return (
    <Section labelledBy="problema-title">
      <SectionHeader
        id="problema-title"
        eyebrow="Quem somos"
        lines={["Assessoria e agência", "de marketing."]}
        text="Planejamos com você e executamos."
      />

      <Reveal className="mt-14 md:mt-16">
        <ul className="grid items-stretch md:grid-cols-[1fr_auto_1fr]">
          {ROLES.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="contents">
              {i > 0 ? <Connector /> : null}
              <div className="lift rounded-2xl border border-line bg-[linear-gradient(160deg,#111_0%,#0b0b0b_60%)] p-7 md:p-9">
                <Icon aria-hidden className="size-5 text-brand" strokeWidth={1.6} />
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
          <span aria-hidden className="h-px w-10 bg-brand" />
          Tudo organizado em atração, engajamento e venda.
        </p>
      </Reveal>
    </Section>
  );
}
