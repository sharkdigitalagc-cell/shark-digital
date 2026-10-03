import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

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
        tone="accent"
        id="diferenciais-title"
        eyebrow="Engajamento e venda"
        lines={["O que leva o público", "a pedir contato."]}
      />

      <div className="mt-14 max-w-2xl md:mt-16">
        <Reveal className="h-full">
          <div className="h-full rounded-3xl border border-accent/25 bg-card p-7 shadow-[0_0_80px_-40px_rgba(61,240,110,0.35)] md:p-9">
            <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              O que trabalhamos
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

