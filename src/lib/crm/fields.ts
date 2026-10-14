/**
 * Maps CRM leads to rows of the "Leads" tab and back.
 *
 * Columns are found by their header text, so people can reorder columns in the
 * spreadsheet without breaking the CRM. Headers starting with "_" are system
 * columns (hidden in the template).
 */

export type Cell = string | number | boolean | null;

export type HistEntry = {
  t: number;
  k: string;
  from?: string;
  to?: string;
  txt?: string;
  by?: string;
};

export type Lead = {
  id: string;
  num: number;
  empresa: string;
  contato: string;
  whats: string;
  e164: string;
  foneAviso: string;
  email: string;
  insta: string;
  cidade: string;
  nicho: string;
  canal: string;
  origem: string;
  servicos: string[];
  demanda: string;
  stage: StageKey;
  order: number;
  fee: number;
  setup: number;
  verba: number;
  temp: TempKey;
  resp: string;
  prox: string;
  obs: string;
  perda: string;
  criado: string;
  createdAt: number;
  updatedAt: number;
  stageAt: number;
  wonAt: number;
  exemplo: boolean;
  hist: HistEntry[];
};

export const LEADS_SHEET = "Leads";
export const LISTS_SHEET = "Listas do CRM";

export const STAGES = [
  ["novo", "Novo lead"],
  ["contato", "Primeiro contato"],
  ["aguardando", "Aguardando retorno"],
  ["reuniao", "Reunião agendada"],
  ["diagnostico", "Reunião realizada"],
  ["proposta", "Proposta enviada"],
  ["negociacao", "Negociação"],
  ["fechado", "Fechado"],
  ["perdido", "Perdido"],
] as const;
export type StageKey = (typeof STAGES)[number][0];
const STAGE_LABEL = Object.fromEntries(STAGES) as Record<StageKey, string>;

const TEMPS = { frio: "Frio", morno: "Morno", quente: "Quente" } as const;
export type TempKey = keyof typeof TEMPS;

type Kind = "text" | "num" | "date" | "list" | "stage" | "temp" | "bool" | "json" | "converted";

/** Column order used when the CRM has to create a header that is missing. */
export const FIELDS: { header: string; key: keyof Lead | null; kind: Kind }[] = [
  { header: "ID", key: "num", kind: "num" },
  { header: "Data de Cadastro", key: "criado", kind: "date" },
  { header: "Empresa", key: "empresa", kind: "text" },
  { header: "Nome do Contato", key: "contato", kind: "text" },
  { header: "WhatsApp", key: "whats", kind: "text" },
  { header: "Telefone (E.164)", key: "e164", kind: "text" },
  { header: "E-mail", key: "email", kind: "text" },
  { header: "Instagram ou Site", key: "insta", kind: "text" },
  { header: "Cidade", key: "cidade", kind: "text" },
  { header: "Nicho", key: "nicho", kind: "text" },
  { header: "Canal de Entrada", key: "canal", kind: "text" },
  { header: "Origem Detalhada", key: "origem", kind: "text" },
  { header: "Serviços", key: "servicos", kind: "list" },
  { header: "Demanda", key: "demanda", kind: "text" },
  { header: "Status", key: "stage", kind: "stage" },
  { header: "Converteu?", key: null, kind: "converted" },
  { header: "Fee Mensal", key: "fee", kind: "num" },
  { header: "Setup", key: "setup", kind: "num" },
  { header: "Verba de Mídia", key: "verba", kind: "num" },
  { header: "Temperatura", key: "temp", kind: "temp" },
  { header: "Próximo Retorno", key: "prox", kind: "date" },
  { header: "Responsável", key: "resp", kind: "text" },
  { header: "Motivo de Perda", key: "perda", kind: "text" },
  { header: "Observações", key: "obs", kind: "text" },
  { header: "Aviso Telefone", key: "foneAviso", kind: "text" },
  { header: "_id", key: "id", kind: "text" },
  { header: "_ordem", key: "order", kind: "num" },
  { header: "_criado_em", key: "createdAt", kind: "num" },
  { header: "_atualizado_em", key: "updatedAt", kind: "num" },
  { header: "_etapa_em", key: "stageAt", kind: "num" },
  { header: "_fechado_em", key: "wonAt", kind: "num" },
  { header: "_exemplo", key: "exemplo", kind: "bool" },
  { header: "_historico", key: "hist", kind: "json" },
];
const FIELD_BY_KEY = new Map(FIELDS.filter((f) => f.key).map((f) => [f.key as keyof Lead, f]));

export type Cfg = {
  servicos: string[];
  canais: string[];
  origens: string[];
  nichos: string[];
  resps: string[];
  perdas: string[];
};
export const LIST_HEADERS: Record<keyof Cfg, string> = {
  servicos: "Serviços",
  canais: "Canais de entrada",
  origens: "Origem detalhada",
  nichos: "Nichos",
  resps: "Responsáveis",
  perdas: "Motivos de perda",
};

/* ---------------- primitives ---------------- */

const norm = (v: unknown) =>
  String(v ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const pad = (n: number) => String(n).padStart(2, "0");
const SERIAL_EPOCH = Date.UTC(1899, 11, 30);

/** "2026-10-14" → spreadsheet serial day number (dates stay timezone-free). */
export function ymdToSerial(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - SERIAL_EPOCH) / 864e5);
}

function cellToYmd(v: Cell): string {
  if (v == null || v === "") return "";
  if (typeof v === "number" && v > 20000 && v < 80000) {
    const d = new Date(SERIAL_EPOCH + Math.round(v) * 864e5);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }
  const s = String(v).trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/.exec(s);
  if (m) return `${m[3].length === 2 ? "20" + m[3] : m[3]}-${pad(+m[2])}-${pad(+m[1])}`;
  return "";
}

function cellToNum(v: Cell): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  let s = String(v ?? "").replace(/[R$\s]/g, "");
  if (!s) return 0;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

const cellToText = (v: Cell) => (v == null ? "" : String(v)).trim();

export function stageFromLabel(label: Cell, converted?: Cell): StageKey {
  const s = norm(label);
  const exact = STAGES.find(([, n]) => norm(n) === s);
  let k: StageKey = exact ? exact[0] : "novo";
  if (!exact) {
    if (/perdid/.test(s)) k = "perdido";
    else if (/convert|fechad|ganh|cliente/.test(s)) k = "fechado";
    else if (/negocia/.test(s)) k = "negociacao";
    else if (/proposta/.test(s)) k = "proposta";
    else if (/(atendimento|reuniao) realizad|diagnostic/.test(s)) k = "diagnostico";
    else if (/agendad/.test(s)) k = "reuniao";
    else if (/aguardando|acompanhamento/.test(s)) k = "aguardando";
    else if (/contato/.test(s)) k = "contato";
  }
  if (!s && norm(converted) === "sim") k = "fechado";
  return k;
}

/** Same rules as the CRM screen: E.164 with the Brazilian 9th digit rebuilt. */
export function phoneInfo(raw: string): { e164: string; warn: string } {
  const s = String(raw ?? "").trim();
  let d = s.replace(/\D/g, "");
  if (!d) return { e164: "", warn: "" };
  if (s.startsWith("+") && !d.startsWith("55")) {
    return d.length >= 8 && d.length <= 15 ? { e164: "+" + d, warn: "" } : { e164: "", warn: "Número internacional incompleto" };
  }
  d = d.replace(/^0+/, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  let warn = "";
  if (d.length === 10 && "6789".includes(d[2])) {
    d = d.slice(0, 2) + "9" + d.slice(2);
    warn = "9º dígito incluído automaticamente. Confirme no WhatsApp.";
  }
  if (d.length === 11 || d.length === 10) return { e164: "+55" + d, warn };
  return { e164: "", warn: "Número incompleto: confira o DDD e os dígitos" };
}

/* ---------------- rows ⇄ leads ---------------- */

export type HeaderMap = Map<string, number>;

export function headerMap(row: Cell[] | undefined): HeaderMap {
  const m: HeaderMap = new Map();
  (row ?? []).forEach((h, i) => {
    const name = cellToText(h);
    if (name && !m.has(name)) m.set(name, i);
  });
  return m;
}

function parseHist(v: Cell): HistEntry[] {
  if (typeof v !== "string" || !v.trim()) return [];
  try {
    const h = JSON.parse(v);
    return Array.isArray(h) ? h.filter((e) => e && typeof e === "object" && typeof e.t === "number") : [];
  } catch {
    return [];
  }
}

/** Returns null for rows without any lead data (blank or formatting-only rows). */
export function rowToLead(row: Cell[], hm: HeaderMap): Lead | null {
  const get = (header: string): Cell => {
    const i = hm.get(header);
    return i == null ? null : (row[i] ?? null);
  };
  const empresa = cellToText(get("Empresa"));
  const contato = cellToText(get("Nome do Contato"));
  const whats = cellToText(get("WhatsApp"));
  if (!empresa && !contato && !whats) return null;

  const stage = stageFromLabel(get("Status"), get("Converteu?"));
  let e164 = cellToText(get("Telefone (E.164)"));
  let foneAviso = cellToText(get("Aviso Telefone"));
  if (!e164 && whats) ({ e164, warn: foneAviso } = phoneInfo(whats));
  const criado = cellToYmd(get("Data de Cadastro"));
  const createdAt = cellToNum(get("_criado_em")) || (criado ? Date.parse(criado + "T12:00:00Z") : 0);
  const tempLabel = norm(get("Temperatura"));
  const temp = (Object.keys(TEMPS) as TempKey[]).find((k) => norm(TEMPS[k]) === tempLabel) ?? "morno";
  const ex = get("_exemplo");

  return {
    id: cellToText(get("_id")),
    num: cellToNum(get("ID")),
    empresa,
    contato,
    whats,
    e164,
    foneAviso,
    email: cellToText(get("E-mail")),
    insta: cellToText(get("Instagram ou Site")),
    cidade: cellToText(get("Cidade")),
    nicho: cellToText(get("Nicho")),
    canal: cellToText(get("Canal de Entrada")),
    origem: cellToText(get("Origem Detalhada")),
    servicos: cellToText(get("Serviços"))
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean),
    demanda: cellToText(get("Demanda")),
    stage,
    order: hm.has("_ordem") && get("_ordem") !== "" && get("_ordem") != null ? cellToNum(get("_ordem")) : -createdAt,
    fee: cellToNum(get("Fee Mensal")),
    setup: cellToNum(get("Setup")),
    verba: cellToNum(get("Verba de Mídia")),
    temp,
    resp: cellToText(get("Responsável")),
    prox: cellToYmd(get("Próximo Retorno")),
    obs: cellToText(get("Observações")),
    perda: cellToText(get("Motivo de Perda")),
    criado,
    createdAt,
    updatedAt: cellToNum(get("_atualizado_em")) || createdAt,
    stageAt: cellToNum(get("_etapa_em")) || createdAt,
    wonAt: cellToNum(get("_fechado_em")) || 0,
    exemplo: ex === true || /^(true|verdadeiro|sim|1)$/i.test(String(ex ?? "")),
    hist: parseHist(get("_historico")),
  };
}

const MAX_CELL = 45_000; // Google Sheets refuses cells above 50,000 characters.

function histToCell(hist: HistEntry[]): string {
  let h = hist.slice(-200);
  let s = JSON.stringify(h);
  while (s.length > MAX_CELL && h.length > 1) {
    h = h.slice(Math.ceil(h.length / 4));
    s = JSON.stringify(h);
  }
  return s.length > MAX_CELL ? "[]" : s;
}

function valueToCell(kind: Kind, v: unknown): Cell {
  switch (kind) {
    case "num":
      return typeof v === "number" && Number.isFinite(v) ? v : 0;
    case "date":
      return typeof v === "string" && v ? ymdToSerial(v) ?? "" : "";
    case "list":
      return Array.isArray(v) ? v.join(", ") : "";
    case "stage":
      return STAGE_LABEL[v as StageKey] ?? STAGE_LABEL.novo;
    case "temp":
      return TEMPS[v as TempKey] ?? TEMPS.morno;
    case "bool":
      return v === true;
    case "json":
      return histToCell(Array.isArray(v) ? (v as HistEntry[]) : []);
    default:
      return typeof v === "string" ? v.slice(0, MAX_CELL) : v == null ? "" : String(v).slice(0, MAX_CELL);
  }
}

/** Cells to write for a set of lead fields, keyed by header. */
export function fieldsToCells(fields: Partial<Lead>): Map<string, Cell> {
  const out = new Map<string, Cell>();
  for (const [key, value] of Object.entries(fields) as [keyof Lead, unknown][]) {
    const f = FIELD_BY_KEY.get(key);
    if (!f) continue;
    out.set(f.header, valueToCell(f.kind, value));
    if (key === "stage") out.set("Converteu?", value === "fechado" ? "Sim" : "Não");
  }
  return out;
}

/* ---------------- lists ---------------- */

export const DEFAULT_CFG: Cfg = {
  servicos: ["Tráfego Pago", "Social Media", "Landing Page", "Site", "Identidade Visual", "Produção de Vídeo", "Gestão 360", "Consultoria", "SEO", "Automação / CRM"],
  canais: ["Tráfego pago", "Site", "Orgânico", "Indicação", "WhatsApp", "Prospecção ativa", "Outro", "Não informado"],
  origens: ["Google Ads", "Meta Ads - Facebook", "Meta Ads - Instagram", "Site", "Instagram orgânico", "Indicação", "WhatsApp", "Prospecção ativa", "Evento", "Outro", "Não informado"],
  nichos: ["Advocacia", "Saúde", "Estética e beleza", "Alimentação", "Varejo", "Imobiliário", "Educação", "Energia solar", "Serviços locais", "Outro"],
  resps: ["Vinicius"],
  perdas: ["Sem orçamento", "Fechou com outra agência", "Sem resposta", "Desqualificado", "Adiou a decisão", "Vai fazer por conta própria", "Outro"],
};

export function listsFromRows(rows: Cell[][]): Cfg {
  const hm = headerMap(rows[0]);
  const cfg = { ...DEFAULT_CFG };
  for (const key of Object.keys(LIST_HEADERS) as (keyof Cfg)[]) {
    const col = hm.get(LIST_HEADERS[key]);
    if (col == null) continue;
    const items = [...new Set(rows.slice(1).map((r) => cellToText(r[col] ?? null)).filter(Boolean))];
    if (items.length) cfg[key] = items;
  }
  return cfg;
}

/* ---------------- input sanitizing ---------------- */

const STAGE_KEYS = new Set<string>(STAGES.map(([k]) => k));
const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.slice(0, max) : v == null ? "" : String(v).slice(0, max));
const numOr0 = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const ymdOrEmpty = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

/** Keeps only known lead fields with the right types. Unknown keys are dropped. */
export function sanitizeFields(input: unknown): Partial<Lead> {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: Partial<Lead> = {};
  for (const [k, v] of Object.entries(src)) {
    switch (k) {
      case "empresa": case "contato": case "whats": case "e164": case "foneAviso": case "email": case "insta":
      case "cidade": case "nicho": case "canal": case "origem": case "resp": case "perda":
        out[k] = str(v, 500).trim();
        break;
      case "demanda": case "obs":
        out[k] = str(v, 10_000);
        break;
      case "id":
        if (typeof v === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(v)) out.id = v;
        break;
      case "num": case "order": case "fee": case "setup": case "verba":
      case "createdAt": case "updatedAt": case "stageAt": case "wonAt":
        out[k] = numOr0(v);
        break;
      case "criado": case "prox":
        out[k] = ymdOrEmpty(v);
        break;
      case "stage":
        if (typeof v === "string" && STAGE_KEYS.has(v)) out.stage = v as StageKey;
        break;
      case "temp":
        if (typeof v === "string" && v in TEMPS) out.temp = v as TempKey;
        break;
      case "exemplo":
        out.exemplo = v === true;
        break;
      case "servicos":
        if (Array.isArray(v)) out.servicos = v.filter((x) => typeof x === "string").map((x) => x.slice(0, 120)).slice(0, 40);
        break;
      case "hist":
        if (Array.isArray(v)) {
          out.hist = v
            .filter((e): e is Record<string, unknown> => !!e && typeof e === "object" && typeof (e as HistEntry).t === "number")
            .slice(-200)
            .map((e) => {
              const h: HistEntry = { t: e.t as number, k: str(e.k, 20) };
              for (const key of ["from", "to", "txt", "by"] as const) if (typeof e[key] === "string") h[key] = str(e[key], 2000);
              return h;
            });
        }
        break;
    }
  }
  return out;
}

export function sanitizeCfg(input: unknown): Cfg | null {
  if (!input || typeof input !== "object") return null;
  const src = input as Record<string, unknown>;
  const out = { ...DEFAULT_CFG };
  for (const key of Object.keys(LIST_HEADERS) as (keyof Cfg)[]) {
    const v = src[key];
    if (!Array.isArray(v)) continue;
    const items = [...new Set(v.filter((x) => typeof x === "string").map((x) => x.trim().slice(0, 80)).filter(Boolean))].slice(0, 200);
    if (items.length) out[key] = items;
  }
  return out;
}
