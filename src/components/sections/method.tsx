import { DrawLine, Reveal } from "@/components/reveal";
import { Section, SectionHeader, cn } from "@/components/ui";

const STEPS = [
  {
    title: "Entendimento",
    text: "Oferta, público e atendimento.",
  },
  {
    title: "Planejamento",
    text: "Prioridades, canais e mensagens.",
  },
  {
    title: "Produção",
    text: "Conteúdos, criativos e páginas.",
  },
  {
    title: "Publicação",
    text: "Campanhas no Google e no Instagram.",
  },
  {
    title: "Avaliação",
    text: "Dados orientam os ajustes.",
  },
];

export function Method() {
  return (
    <Section id="metodo" labelledBy="metodo-title">
      <SectionHeader
        tone="accent"
        id="metodo-title"
        eyebrow="Método"
        lines={["Do entendimento aos ajustes."]}
        text="Base de trabalho já aplicada na Shark."
      />

      <ol className="relative mt-16 grid gap-0 md:mt-20 lg:grid-cols-5 lg:gap-6">
        {/* Desktop horizontal rail */}
        <DrawLine className="absolute left-0 right-0 top-[1.2rem] hidden h-px bg-gradient-to-r from-accent/60 via-line-strong to-line lg:block" />
        {/* Mobile vertical rail */}
        <DrawLine
          axis="y"
          className="absolute bottom-6 left-[1.2rem] top-2 w-px bg-gradient-to-b from-accent/60 via-line-strong to-line lg:hidden"
        />

        {STEPS.map((step, i) => (
          <li key={step.title} className="relative pb-10 pl-16 last:pb-0 lg:pb-0 lg:pl-0">
            <Reveal delay={i * 0.08}>
              <span
                className={cn(
                  "absolute left-0 top-0 flex size-[2.4rem] items-center justify-center rounded-full border bg-bg font-mono text-xs text-fg lg:relative",
                  i === 0
                    ? "border-accent/60 shadow-[0_0_24px_-6px_rgba(61,240,110,0.45)]"
                    : "border-line-strong",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pt-1.5 text-lg font-semibold tracking-tight text-fg lg:mt-7 lg:pt-0">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
