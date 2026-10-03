import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

const FRAGMENTED = [
  "Como funciona",
  "Para quem é",
  "O que está incluído",
  "Como contratar",
  "Por que confiar",
];

const SHARK = [
  "Oferta clara",
  "Anúncios coerentes",
  "Textos objetivos",
  "Contato fácil",
  "Retorno comercial",
];

export function Differentials() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title" tone="raised">
      <SectionHeader
        id="diferenciais-title"
        eyebrow="Engajamento e venda"
        lines={["O que o público", "precisa entender."]}
      />

      <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-3xl border border-line bg-bg p-7 md:p-9">
            <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Dúvidas na avaliação
            </h3>
            <ul className="mt-8 space-y-1">
              {FRAGMENTED.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-4 text-muted last:border-0"
                >
                  <Minus aria-hidden className="size-4 shrink-0 text-white/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <div className="h-full rounded-3xl border border-accent/25 bg-card p-7 shadow-[0_0_80px_-40px_rgba(61,240,110,0.35)] md:p-9">
            <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Como a comunicação responde
            </h3>
            <ul className="mt-8 space-y-1">
              {SHARK.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-4 font-medium text-fg last:border-0"
                >
                  <Check aria-hidden className="size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

