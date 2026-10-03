import type { ComponentType } from "react";
import LeadsClinicaNaoAgendam, {
  sources as leadsClinicaSources,
  toc as leadsClinicaToc,
} from "./leads-clinica-nao-agendam";

export type PostContent = {
  Body: ComponentType;
  /** Section anchors for the "Neste artigo" index. */
  toc: Array<{ id: string; label: string }>;
  /** External references cited in the post. */
  sources: Array<{ label: string; href: string }>;
};

/** Body of each post in src/lib/blog.ts, by slug. */
export const POST_CONTENT: Record<string, PostContent> = {
  "leads-clinica-nao-agendam": {
    Body: LeadsClinicaNaoAgendam,
    toc: leadsClinicaToc,
    sources: leadsClinicaSources,
  },
};
