"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw, Search, TriangleAlert } from "lucide-react";
import { cn } from "@/components/ui";

/*
 * Diagnóstico de Vazamento de Receita da Clínica.
 * Runs entirely in the browser: nothing typed here is stored or sent.
 * It asks only for aggregate counts, never for patient data.
 */

type StageKey =
  | "leads"
  | "validos"
  | "respondidos"
  | "qualificados"
  | "agendados"
  | "compareceram"
  | "pacientes";

type Stage = {
  key: StageKey;
  label: string;
  hint: string;
  /** Cost label used when an investment is informed. */
  costLabel: string;
  /** What to investigate when the passage INTO this stage is the weakest. */
  checks?: string[];
};

const STAGES: Stage[] = [
  {
    key: "leads",
    label: "Leads recebidos",
    hint: "Todo contato que chegou: formulário, WhatsApp, ligação.",
    costLabel: "Custo por lead",
  },
  {
    key: "validos",
    label: "Leads válidos",
    hint: "Contato real, na sua região, buscando algo que a clínica oferece.",
    costLabel: "Custo por lead válido",
    checks: [
      "Termos de pesquisa que acionaram os anúncios",
      "Segmentação geográfica e de público",
      "Promessa do anúncio comparada ao que a clínica realmente oferece",
      "Formulário: campos, filtros e contatos duplicados ou falsos",
    ],
  },
  {
    key: "respondidos",
    label: "Respondidos",
    hint: "Receberam uma primeira resposta útil da clínica.",
    costLabel: "Custo por lead respondido",
    checks: [
      "Tempo entre a chegada do lead e a primeira resposta útil",
      "Contatos que chegam fora do horário de atendimento",
      "Volume de mensagens comparado à equipe disponível",
      "Mensagens perdidas em vários aparelhos ou números",
    ],
  },
  {
    key: "qualificados",
    label: "Qualificados",
    hint: "Têm necessidade, interesse e condição de seguir para uma consulta.",
    costLabel: "Custo por lead qualificado",
    checks: [
      "Intenção de quem chega: pesquisa de preço, dúvida ou decisão",
      "Primeira abordagem: a conversa avança ou só responde perguntas?",
      "Serviço, convênio ou região que a clínica não atende",
      "Coerência entre anúncio, página e o que o atendimento diz",
    ],
  },
  {
    key: "agendados",
    label: "Agendados",
    hint: "Saíram da conversa com data e horário marcados.",
    costLabel: "Custo por agendamento",
    checks: [
      "Horários disponíveis comparados aos horários pedidos",
      "Preço, forma de pagamento e percepção de valor",
      "Clareza do próximo passo proposto na conversa",
      "Follow-up de quem não decidiu na primeira conversa",
    ],
  },
  {
    key: "compareceram",
    label: "Comparecimentos",
    hint: "Agendados que de fato foram à consulta ou avaliação.",
    costLabel: "Custo por comparecimento",
    checks: [
      "Confirmação antes da consulta e facilidade para remarcar",
      "Intervalo entre o agendamento e a data da consulta",
      "Orientações pré-consulta: endereço, preparo, documentos",
      "Faltas concentradas em algum dia, horário ou profissional",
    ],
  },
  {
    key: "pacientes",
    label: "Novos pacientes",
    hint: "Iniciaram tratamento ou contrataram o serviço.",
    costLabel: "Custo por paciente adquirido",
    checks: [
      "Como o plano ou orçamento é apresentado na consulta",
      "Acompanhamento de quem levou o orçamento para pensar",
      "Expectativa criada antes da consulta comparada à proposta",
      "Formas de pagamento e próximos passos após a avaliação",
    ],
  },
];

type Values = Record<StageKey, string>;

const EMPTY: Values = {
  leads: "",
  validos: "",
  respondidos: "",
  qualificados: "",
  agendados: "",
  compareceram: "",
  pacientes: "",
};

/** Fictitious numbers, only to show how the tool reads. */
const EXAMPLE: Values = {
  leads: "200",
  validos: "150",
  respondidos: "130",
  qualificados: "90",
  agendados: "40",
  compareceram: "30",
  pacientes: "18",
};

const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function toCount(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

/** "5.000" or "5000,50" → 5000 / 5000.5 */
function toMoney(raw: string): number | null {
  const clean = raw.replace(/[^\d,]/g, "").replace(",", ".");
  const n = Number.parseFloat(clean);
  return Number.isFinite(n) && n > 0 ? n : null;
}

type Passage = {
  from: Stage;
  to: Stage;
  fromCount: number;
  toCount: number;
  rate: number;
  invalid: boolean;
};

export function RevenueLeakDiagnostic({ id }: { id?: string }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [investment, setInvestment] = useState("");
  const [isExample, setIsExample] = useState(false);

  const counts = useMemo(
    () => STAGES.map((s) => toCount(values[s.key])),
    [values],
  );

  const passages = useMemo(() => {
    const list: Passage[] = [];
    for (let i = 1; i < STAGES.length; i++) {
      const a = counts[i - 1];
      const b = counts[i];
      if (a === null || b === null || a === 0) continue;
      list.push({
        from: STAGES[i - 1],
        to: STAGES[i],
        fromCount: a,
        toCount: b,
        rate: b / a,
        invalid: b > a,
      });
    }
    return list;
  }, [counts]);

  const validPassages = passages.filter((p) => !p.invalid);
  const weakest = validPassages.length
    ? validPassages.reduce((min, p) => (p.rate < min.rate ? p : min))
    : null;
  const hasInvalid = passages.some((p) => p.invalid);
  const money = toMoney(investment);
  const top = counts[0];

  const update = (key: StageKey, raw: string) => {
    setIsExample(false);
    setValues((v) => ({ ...v, [key]: raw.replace(/[^\d.]/g, "").slice(0, 9) }));
  };

  return (
    <section
      id={id}
      aria-labelledby={`${uid}-title`}
      className="grain relative mt-16 md:mt-20 overflow-hidden rounded-3xl border border-line-strong bg-bg-2 p-5 sm:p-7 md:p-9"
    >
      <p className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        Ferramenta
      </p>
      <h2
        id={`${uid}-title`}
        className="mt-4 text-balance text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:text-[2rem]"
      >
        Diagnóstico de Vazamento de Receita da Clínica
      </h2>
      <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
        Informe quantos contatos chegaram a cada etapa no <strong className="font-medium text-fg">mesmo período</strong>{" "}
        (por exemplo, o último mês). Você não precisa preencher tudo: a taxa aparece para cada par
        de etapas seguidas, a etapa com maior perda proporcional é destacada e, se você informar o
        investimento, aparece o custo de cada etapa. Os números ficam só no seu navegador; nada é enviado ou salvo, e nenhum
        dado de paciente é pedido.
      </p>

      <div className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2">
        {STAGES.map((stage, i) => (
          <div key={stage.key}>
            <label htmlFor={`${uid}-${stage.key}`} className="flex items-baseline gap-2 text-sm font-medium text-fg">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {stage.label}
            </label>
            <input
              id={`${uid}-${stage.key}`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0"
              value={values[stage.key]}
              onChange={(e) => update(stage.key, e.target.value)}
              aria-describedby={`${uid}-${stage.key}-hint`}
              className="mt-2 h-12 w-full rounded-xl border border-line-strong bg-bg px-4 font-mono text-base text-fg placeholder:text-muted/50 transition-colors duration-200 hover:border-white/25 focus:border-accent/70 focus:outline-none"
            />
            <p id={`${uid}-${stage.key}-hint`} className="mt-1.5 text-xs leading-relaxed text-muted">
              {stage.hint}
            </p>
          </div>
        ))}
        <div>
          <label htmlFor={`${uid}-invest`} className="flex items-baseline gap-2 text-sm font-medium text-fg">
            <span className="font-mono text-xs text-muted">R$</span>
            Investimento em mídia no período
            <span className="text-xs font-normal text-muted">(opcional)</span>
          </label>
          <input
            id={`${uid}-invest`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0,00"
            value={investment}
            onChange={(e) => {
              setIsExample(false);
              setInvestment(e.target.value.replace(/[^\d.,]/g, "").slice(0, 14));
            }}
            aria-describedby={`${uid}-invest-hint`}
            className="mt-2 h-12 w-full rounded-xl border border-line-strong bg-bg px-4 font-mono text-base text-fg placeholder:text-muted/50 transition-colors duration-200 hover:border-white/25 focus:border-accent/70 focus:outline-none"
          />
          <p id={`${uid}-invest-hint`} className="mt-1.5 text-xs leading-relaxed text-muted">
            Use só o valor ligado a esses contatos, para calcular o custo de cada etapa.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setValues(EXAMPLE);
            setInvestment("6000");
            setIsExample(true);
          }}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.04]"
        >
          Ver com números de exemplo
        </button>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setInvestment("");
            setIsExample(false);
          }}
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors duration-200 hover:text-fg"
        >
          <RotateCcw aria-hidden className="size-3.5" />
          Limpar
        </button>
      </div>

      <div aria-live="polite" className="mt-10 border-t border-line pt-8">
        {passages.length === 0 ? (
          <p className="text-sm text-muted">
            Preencha pelo menos duas etapas seguidas para ver a taxa de passagem entre elas.
          </p>
        ) : (
          <>
            {isExample ? (
              <p className="mb-6 rounded-xl border border-line bg-bg px-4 py-3 text-sm text-muted">
                Números fictícios, só para mostrar a leitura. Não são média de mercado nem meta.
              </p>
            ) : null}

            <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
              Taxa de passagem entre etapas
            </h3>
            <ul className="mt-4 space-y-3">
              {passages.map((p) => {
                const isWeakest = weakest !== null && p.to.key === weakest.to.key;
                return (
                  <li
                    key={p.to.key}
                    className={cn(
                      "rounded-xl border px-4 py-3",
                      isWeakest ? "border-accent/50 bg-accent/[0.05]" : "border-line bg-bg",
                      p.invalid && "border-brand/40",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-sm text-fg/85">
                        {p.from.label} <span aria-hidden className="text-accent">→</span>
                        <span className="sr-only"> para </span> {p.to.label}
                      </p>
                      <p className="font-mono text-sm text-fg">
                        {p.invalid ? "confira" : pct.format(p.rate)}
                        <span className="ml-2 text-xs text-muted">
                          {p.toCount.toLocaleString("pt-BR")} de {p.fromCount.toLocaleString("pt-BR")}
                        </span>
                      </p>
                    </div>
                    <div aria-hidden className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-500",
                          isWeakest ? "bg-accent" : "bg-white/35",
                        )}
                        style={{ width: `${Math.min(p.rate, 1) * 100}%` }}
                      />
                    </div>
                    {p.invalid ? (
                      <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-brand">
                        <TriangleAlert aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                        Esta etapa tem mais registros que a anterior. Confira se os números são do
                        mesmo período e da mesma origem.
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            {weakest ? (
              <div className="mt-8 rounded-2xl border border-accent/40 bg-card p-5 md:p-6">
                <p className="flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
                  <Search aria-hidden className="size-3.5" />
                  Onde olhar primeiro
                </p>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-fg">
                  Nos dados informados, a maior perda proporcional está na passagem de{" "}
                  <strong className="font-semibold">{weakest.from.label.toLowerCase()}</strong> para{" "}
                  <strong className="font-semibold">{weakest.to.label.toLowerCase()}</strong>: só{" "}
                  {pct.format(weakest.rate)} avançaram. Isso indica onde investigar, não a causa.
                  Comece por:
                </p>
                <ul className="mt-4 space-y-2">
                  {weakest.to.checks?.map((c) => (
                    <li key={c} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg/80">
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rotate-45 bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
                {hasInvalid ? (
                  <p className="mt-4 text-xs text-muted">
                    Há etapas com números inconsistentes; elas ficaram fora desta comparação.
                  </p>
                ) : null}
              </div>
            ) : null}

            {top !== null && counts[STAGES.length - 1] !== null && top > 0 ? (
              <p className="mt-6 text-sm text-muted">
                De cada 100 leads recebidos, cerca de{" "}
                <strong className="font-medium text-fg">
                  {((counts[STAGES.length - 1]! / top) * 100).toLocaleString("pt-BR", {
                    maximumFractionDigits: 1,
                  })}
                </strong>{" "}
                viraram novos pacientes no período.
              </p>
            ) : null}

            {money !== null ? (
              <div className="mt-8">
                <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
                  Custo por etapa
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  {STAGES.map((stage, i) => {
                    const n = counts[i];
                    if (n === null || n === 0) return null;
                    return (
                      <div key={stage.key} className="rounded-xl border border-line bg-bg px-4 py-3">
                        <dt className="text-xs text-muted">{stage.costLabel}</dt>
                        <dd className="mt-1 font-mono text-base text-fg">{brl.format(money / n)}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Investimento dividido pelo total de cada etapa. Só é confiável se esses contatos
                  vieram, de fato, da mídia considerada.
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
