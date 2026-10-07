import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export type ArticleCtaCopy = {
  title: string;
  text: string;
  /** Prefilled WhatsApp message. */
  whatsappText: string;
  /** Main button label; defaults to the diagnosis request. */
  buttonLabel?: string;
};

const DEFAULT_COPY: ArticleCtaCopy = {
  title: "Você já recebe leads, mas não sabe onde eles estão sendo perdidos?",
  text: "A Shark analisa o caminho entre aquisição, página, WhatsApp, atendimento, CRM, agendamento e venda para identificar onde a conversão está parando antes de simplesmente recomendar mais mídia.",
  whatsappText:
    "Olá, Shark! Li o artigo sobre leads da clínica que não agendam e quero solicitar um diagnóstico de aquisição.",
};

/** Closing call to action of a blog post; copy can be set per post. */
export function ArticleCta({ copy = DEFAULT_COPY }: { copy?: ArticleCtaCopy }) {
  return (
    <aside
      aria-labelledby="cta-diagnostico-title"
      className="grain relative mt-20 overflow-hidden rounded-3xl border border-line-strong bg-bg-2 p-6 sm:p-8 md:p-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-brand/10 blur-3xl"
      />
      <h2
        id="cta-diagnostico-title"
        className="text-balance text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:text-[2rem]"
      >
        {copy.title}
      </h2>
      <p className="mt-5 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-fg/80">
        {copy.text}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href="/#contato" arrow>
          {copy.buttonLabel ?? "Solicitar diagnóstico de aquisição"}
        </ButtonLink>
        {WHATSAPP_NUMBER ? (
          <ButtonLink
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
            variant="secondary"
            external
          >
            <MessageCircle aria-hidden className="size-4 text-accent" />
            Falar pelo WhatsApp
          </ButtonLink>
        ) : null}
      </div>
    </aside>
  );
}
