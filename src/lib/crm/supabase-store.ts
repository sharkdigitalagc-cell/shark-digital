import { createHash, randomBytes } from "node:crypto";
import { type Cfg, type Lead, DEFAULT_CFG, LIST_HEADERS, phoneInfo } from "./fields";
import type { CrmBackend, Snapshot } from "./store";
import { Supabase, inList } from "./supabase";

/**
 * The CRM on Supabase. Same contract as the Google Sheets store (store.ts), so the
 * CRM page and the API routes do not change. Tables: docs/crm/supabase.sql.
 *
 * Every change is also written to `crm_eventos` (who did what, when), and contact
 * form submissions land in `contatos_site` and become leads.
 */

type Row = Record<string, unknown>;

/** Lead field → column, for the names that differ. */
const COL: Partial<Record<keyof Lead, string>> = {
  foneAviso: "fone_aviso",
  order: "ordem",
  createdAt: "created_ms",
  updatedAt: "updated_ms",
  stageAt: "stage_ms",
  wonAt: "won_ms",
  siteNota: "site_nota",
  adsMeta: "ads_meta",
  adsGoogle: "ads_google",
  diagAt: "diag_ms",
};
const KEY_BY_COL = new Map(Object.entries(COL).map(([k, c]) => [c, k as keyof Lead]));
const INT_COLS = new Set(["num", "created_ms", "updated_ms", "stage_ms", "won_ms", "diag_ms"]);
const DATE_COLS = new Set(["prox", "criado"]);
const NUM_COLS = new Set(["ordem", "fee", "setup", "verba"]);
const JSON_ARRAYS = new Set(["servicos", "hist", "perfis", "achados", "forcas"]);
const SYSTEM_COLS = new Set(["inserido_em", "alterado_em"]);

const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
export const newLeadId = () => "l" + Date.now().toString(36) + randomBytes(4).toString("hex");

export function leadToRow(fields: Partial<Lead>): Row {
  const row: Row = {};
  for (const [key, value] of Object.entries(fields) as [keyof Lead, unknown][]) {
    if (value === undefined) continue;
    const col = COL[key] ?? key;
    if (INT_COLS.has(col)) row[col] = Math.round(Number(value) || 0);
    else if (NUM_COLS.has(col)) row[col] = Number(value) || 0;
    else if (DATE_COLS.has(col)) row[col] = value ? value : null;
    else if (JSON_ARRAYS.has(col)) row[col] = Array.isArray(value) ? value : [];
    else row[col] = value;
  }
  return row;
}

function rowToLead(row: Row): Lead {
  const lead: Record<string, unknown> = {};
  for (const [col, value] of Object.entries(row)) {
    if (SYSTEM_COLS.has(col)) continue;
    const key = KEY_BY_COL.get(col) ?? col;
    if (INT_COLS.has(col) || NUM_COLS.has(col)) lead[key] = Number(value) || 0;
    else if (DATE_COLS.has(col)) lead[key] = typeof value === "string" ? value.slice(0, 10) : "";
    else if (JSON_ARRAYS.has(col)) lead[key] = Array.isArray(value) ? value : [];
    else if (col === "exemplo") lead[key] = value === true;
    else lead[key] = value ?? "";
  }
  return lead as Lead;
}

/** A complete row for a new lead, with the defaults the CRM expects. */
function fullRow(lead: Partial<Lead>): Row {
  const t = Date.now();
  return leadToRow({
    num: 0, empresa: "", contato: "", whats: "", e164: "", foneAviso: "", email: "", insta: "", cidade: "", nicho: "",
    canal: "", origem: "", servicos: [], demanda: "", stage: "novo", order: -t, fee: 0, setup: 0, verba: 0, temp: "morno",
    resp: "", prox: "", obs: "", perda: "", criado: "", createdAt: t, updatedAt: t, stageAt: t, wonAt: 0, exemplo: false,
    hist: [], perfis: [], site: "", siteNota: "", adsMeta: "", adsGoogle: "", achados: [], forcas: [], abordagem: "", diagAt: 0,
    ...lead,
  });
}

/** Fields worth recording in the event log (the history array is already in the lead). */
function eventData(fields: Partial<Lead>): Row {
  const { hist, ...rest } = fields;
  const last = Array.isArray(hist) && hist.length ? hist[hist.length - 1] : undefined;
  return last ? { ...rest, ultimo_registro: last } : rest;
}

type Event = { tipo: string; lead_id?: string | null; usuario?: string | null; dados?: Row };

/** Marks that the spreadsheet was copied into Supabase (runs once, when Supabase is switched on). */
const IMPORT_EVENT = "importacao_planilha";
let imported = false;

export class SupabaseCrmStore implements CrmBackend {
  constructor(
    private db: Supabase,
    /** The spreadsheet store, when it is still configured: copied in once at the switch. */
    private sheet: CrmBackend | null,
  ) {}

  private async log(events: Event[]) {
    if (!events.length) return;
    try {
      // Every row needs the same keys for a bulk insert.
      const rows = events.map((e) => ({ tipo: e.tipo, lead_id: e.lead_id ?? null, usuario: e.usuario ?? null, dados: e.dados ?? {} }));
      await this.db.insert("crm_eventos", rows);
    } catch (error) {
      // The change itself is saved; a missing log line must not fail the request.
      console.error("[crm] evento não registrado", error);
    }
  }

  /**
   * First run after the switch: copies the spreadsheet as it is now (leads and lists)
   * so nothing typed in the meantime is lost. Leads not in the sheet are removed, so
   * Supabase ends up identical to the sheet. Later runs only check the marker.
   */
  async ensureImported(): Promise<void> {
    if (imported || !this.sheet) return;
    const done = await this.db.select<Row>("crm_eventos", { select: "id", tipo: `eq.${IMPORT_EVENT}`, limit: 1 });
    if (done.length) {
      imported = true;
      return;
    }
    const snap = await this.sheet.load();
    const rows = snap.leads.filter((l) => l.id && ID_RE.test(l.id)).map((l) => fullRow(l));
    for (let i = 0; i < rows.length; i += 500) {
      await this.db.insert("crm_leads", rows.slice(i, i + 500), { onConflict: "id", merge: true });
    }
    const keep = new Set(rows.map((r) => r.id as string));
    const current = await this.db.selectAll<{ id: string }>("crm_leads", { select: "id" });
    const extra = current.map((r) => r.id).filter((id) => !keep.has(id));
    for (let i = 0; i < extra.length; i += 100) await this.db.delete("crm_leads", { id: inList(extra.slice(i, i + 100)) });
    await this.writeLists(snap.cfg);
    await this.db.insert("crm_eventos", [{ tipo: IMPORT_EVENT, dados: { leads: rows.length, removidos: extra.length } }]);
    imported = true;
  }

  async load(): Promise<Snapshot> {
    await this.ensureImported();
    const [rows, lists] = await Promise.all([
      this.db.selectAll<Row>("crm_leads", { order: "num.asc,inserido_em.asc" }),
      this.db.selectAll<{ chave: string; itens: string[] }>("crm_listas", { select: "chave,itens" }),
    ]);
    const leads = rows.map(rowToLead);

    // Leads without a number (e.g. typed straight into the table) get the next one.
    let maxNum = leads.reduce((m, l) => Math.max(m, l.num || 0), 0);
    for (const lead of leads) {
      if (lead.num) continue;
      lead.num = ++maxNum;
      await this.db.update("crm_leads", { id: `eq.${lead.id}` }, { num: lead.num });
    }

    const cfg: Cfg = { ...DEFAULT_CFG };
    for (const { chave, itens } of lists) {
      if (chave in LIST_HEADERS && Array.isArray(itens) && itens.length) cfg[chave as keyof Cfg] = itens;
    }
    const version = createHash("sha1").update(JSON.stringify([rows, lists])).digest("hex").slice(0, 16);
    return { leads, cfg, version };
  }

  async create(items: Partial<Lead>[], by?: string): Promise<{ created: number; skipped: number }> {
    await this.ensureImported();
    const valid = items.filter((l) => l.id && ID_RE.test(l.id));
    const rows = valid.map((l) => fullRow(l));
    const created: { id: string; num: number; empresa: string }[] = [];
    for (let i = 0; i < rows.length; i += 500) {
      created.push(
        ...(await this.db.insert<{ id: string; num: number; empresa: string }>("crm_leads", rows.slice(i, i + 500), {
          onConflict: "id",
          returning: "id,num,empresa",
        })),
      );
    }
    await this.log(
      created.length > 20
        ? [{ tipo: "leads_importados", usuario: by, dados: { quantidade: created.length } }]
        : created.map((c) => ({ tipo: "lead_criado", lead_id: c.id, usuario: by, dados: { num: c.num, empresa: c.empresa } })),
    );
    return { created: created.length, skipped: items.length - created.length };
  }

  async patch(id: string, fields: Partial<Lead>, by?: string): Promise<boolean> {
    await this.ensureImported();
    if (!ID_RE.test(id)) return false;
    delete fields.id;
    const values = leadToRow(fields);
    if (!Object.keys(values).length) return true;
    const found = await this.db.update("crm_leads", { id: `eq.${id}` }, values);
    if (!found.length) return false;
    // Dragging a card inside the same column only changes its position: not worth a log line.
    const meaningful = Object.keys(fields).some((k) => k !== "order" && k !== "updatedAt");
    if (meaningful) {
      await this.log([{ tipo: fields.stage ? "lead_mudou_etapa" : "lead_atualizado", lead_id: id, usuario: by, dados: eventData(fields) }]);
    }
    return true;
  }

  async remove(ids: string[], by?: string): Promise<number> {
    await this.ensureImported();
    const valid = ids.filter((id) => ID_RE.test(id));
    let removed: { id: string; num: number; empresa: string }[] = [];
    for (let i = 0; i < valid.length; i += 100) {
      removed = removed.concat(await this.db.delete("crm_leads", { id: inList(valid.slice(i, i + 100)) }, "id,num,empresa"));
    }
    await this.log(removed.map((r) => ({ tipo: "lead_excluido", lead_id: r.id, usuario: by, dados: { num: r.num, empresa: r.empresa } })));
    return removed.length;
  }

  private async writeLists(cfg: Cfg) {
    const rows = (Object.keys(LIST_HEADERS) as (keyof Cfg)[]).map((chave) => ({ chave, itens: cfg[chave] }));
    await this.db.insert("crm_listas", rows, { onConflict: "chave", merge: true });
  }

  async saveCfg(cfg: Cfg, by?: string): Promise<void> {
    await this.ensureImported();
    await this.writeLists(cfg);
    await this.log([{ tipo: "listas_salvas", usuario: by }]);
  }

  /** A lead from the site's contact form, at the top of "Novo lead", plus the raw submission. */
  async createFromContact(c: {
    nome: string;
    empresa: string;
    canal: "whatsapp" | "email";
    email: string;
    whatsapp: string;
    desafio: string;
    emailEnviado: boolean | null;
  }): Promise<{ id: string; num: number }> {
    await this.ensureImported();
    const [top] = await this.db.select<{ num: number }>("crm_leads", { select: "num", order: "num.desc", limit: 1 });
    const [first] = await this.db.select<{ ordem: number }>("crm_leads", { select: "ordem", stage: "eq.novo", order: "ordem.asc", limit: 1 });
    const t = Date.now();
    const phone = c.whatsapp ? phoneInfo(c.whatsapp) : { e164: "", warn: "" };
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date(t));
    const lead: Partial<Lead> = {
      id: newLeadId(),
      num: (top?.num ?? 0) + 1,
      empresa: c.empresa,
      contato: c.nome,
      whats: c.whatsapp,
      e164: phone.e164,
      foneAviso: phone.warn,
      email: c.email,
      canal: "Site",
      origem: "Site",
      demanda: c.desafio,
      stage: "novo",
      temp: "morno",
      order: first ? Number(first.ordem) - 1 : -t,
      criado: today,
      createdAt: t,
      updatedAt: t,
      stageAt: t,
      hist: [
        { t, k: "create", by: "Site" },
        { t, k: "site", txt: `Contato pelo formulário do site (prefere ${c.canal === "email" ? "e-mail" : "WhatsApp"}).` },
      ],
    };
    await this.db.insert("crm_leads", [fullRow(lead)]);
    await this.db.insert("contatos_site", [
      {
        nome: c.nome,
        empresa: c.empresa,
        canal: c.canal,
        email: c.email,
        whatsapp: c.whatsapp,
        desafio: c.desafio,
        email_enviado: c.emailEnviado,
        lead_id: lead.id,
      },
    ]);
    await this.log([{ tipo: "contato_site", lead_id: lead.id, usuario: "Site", dados: { num: lead.num, empresa: c.empresa, canal: c.canal } }]);
    return { id: lead.id!, num: lead.num! };
  }
}
