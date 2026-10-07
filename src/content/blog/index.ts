import type { ComponentType } from "react";
import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import AgenciaNaoEntendeMeuSegmento, {
  cta as agenciaSegmentoCta,
  sources as agenciaSegmentoSources,
  toc as agenciaSegmentoToc,
} from "./agencia-nao-entende-meu-segmento";
import LeadsAdvogadosNaoConvertem, {
  cta as leadsAdvogadosCta,
  sources as leadsAdvogadosSources,
  toc as leadsAdvogadosToc,
} from "./leads-advogados-nao-convertem";
import LeadsClinicaNaoAgendam, {
  sources as leadsClinicaSources,
  toc as leadsClinicaToc,
} from "./leads-clinica-nao-agendam";
import MarketingJuridicoMedoOab, {
  cta as medoOabCta,
  sources as medoOabSources,
  toc as medoOabToc,
} from "./marketing-juridico-medo-regulamentacao-oab";

export type PostContent = {
  Body: ComponentType;
  /** Section anchors for the "Neste artigo" index. */
  toc: Array<{ id: string; label: string }>;
  /** External references cited in the post. */
  sources: Array<{ label: string; href: string }>;
  /** Closing call to action; the default copy is used when omitted. */
  cta?: ArticleCtaCopy;
};

/** Body of each post in src/lib/blog.ts, by slug. */
export const POST_CONTENT: Record<string, PostContent> = {
  "leads-clinica-nao-agendam": {
    Body: LeadsClinicaNaoAgendam,
    toc: leadsClinicaToc,
    sources: leadsClinicaSources,
  },
  "leads-advogados-nao-convertem": {
    Body: LeadsAdvogadosNaoConvertem,
    toc: leadsAdvogadosToc,
    sources: leadsAdvogadosSources,
    cta: leadsAdvogadosCta,
  },
  "agencia-nao-entende-meu-segmento": {
    Body: AgenciaNaoEntendeMeuSegmento,
    toc: agenciaSegmentoToc,
    sources: agenciaSegmentoSources,
    cta: agenciaSegmentoCta,
  },
  "marketing-juridico-medo-regulamentacao-oab": {
    Body: MarketingJuridicoMedoOab,
    toc: medoOabToc,
    sources: medoOabSources,
    cta: medoOabCta,
  },
};
