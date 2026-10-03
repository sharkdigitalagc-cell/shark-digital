import { FileClock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

type CaseStudy = {
  client: string;
  segment: string;
  context: string;
  challenge: string;
  strategy: string;
  result: string;
};

/*
 * TODO(cases): inserir aqui apenas cases verificados e autorizados pelo cliente.
 * Cada item deve ter contexto, desafio, estratégia e resultado com dados reais
 * e a fonte conferida. Enquanto a lista estiver vazia, a seção mostra a
 * estrutura com placeholders explícitos — nunca preencha com dados fictícios.
 */
const CASES: CaseStudy[] = [];

const PLACEHOLDER_SLOTS = 2;

const FIELDS: Array<{ key: keyof CaseStudy; label: string; placeholder: string }> = [
  { key: "context", label: "Contexto", placeholder: "Conteúdo será adicionado" },
  { key: "challenge", label: "Desafio", placeholder: "Conteúdo será adicionado" },
  { key: "strategy", label: "Estratégia", placeholder: "Conteúdo será adicionado" },
  { key: "result", label: "Resultado", placeholder: "Dados reais serão adicionados" },
];

export function Cases() {
  const hasCases = CASES.length > 0;
  const items: Array<CaseStudy | null> = hasCases
    ? CASES
    : Array.from({ length: PLACEHOLDER_SLOTS }, () => null);

  return (
    <Section id="cases" labelledBy="cases-title" tone="raised">
      <SectionHeader
        id="cases-title"
        eyebrow="Cases"
        lines={["Cases com contexto", "e dados verificados."]}
      />

      <ul className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-2">
        {items.map((item, i) => (
          <li key={item?.client ?? `placeholder-${i}`}>
            <Reveal delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 md:p-8">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      {item ? item.segment : `Case ${String(i + 1).padStart(2, "0")}`}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">
                      {item ? item.client : "Case em preparação"}
                    </h3>
                  </div>
                  {!item ? (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                      <FileClock aria-hidden className="size-3.5" />
                      Em breve
                    </span>
                  ) : null}
                </header>

                <dl className="mt-8 grid flex-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {FIELDS.map((field) => (
                    <div key={field.key} className="bg-bg-2 p-5">
                      <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                        {field.label}
                      </dt>
                      <dd
                        className={
                          item
                            ? "mt-2 leading-relaxed text-fg"
                            : "mt-2 text-sm italic text-white/45"
                        }
                      >
                        {item ? item[field.key] : field.placeholder}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
