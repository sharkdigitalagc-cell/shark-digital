import { createSign } from "node:crypto";
import { type Cell, LEADS_SHEET, LISTS_SHEET } from "./fields";
import type { SheetIO } from "./store";

/**
 * Google Sheets access with a service account (server side only).
 * The spreadsheet must be shared as Editor with the service account e-mail.
 *
 * All writes use valueInputOption=RAW, so text typed in the CRM is never
 * interpreted as a spreadsheet formula.
 */

type ServiceAccount = { client_email: string; private_key: string };

const API = "https://sheets.googleapis.com/v4/spreadsheets";
const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

let cachedToken: { value: string; exp: number; email: string } | null = null;

async function accessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.email === sa.client_email && cachedToken.exp - 60 > now) return cachedToken.value;
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(sa.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !json.access_token) throw new SheetsError("auth", `Google recusou a conta de serviço (${json.error ?? res.status})`);
  cachedToken = { value: json.access_token, exp: now + (json.expires_in ?? 3600), email: sa.client_email };
  return json.access_token;
}

export class SheetsError extends Error {
  constructor(
    public code: "auth" | "not_found" | "forbidden" | "missing_tab" | "rate_limited" | "upstream",
    message: string,
  ) {
    super(message);
  }
}

/** "A", "B", ... "AA" for a 0-based column index. */
export function colLetter(i: number): string {
  let s = "";
  for (let n = i + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}
const quote = (tab: string) => `'${tab.replace(/'/g, "''")}'`;

export class GoogleSheetIO implements SheetIO {
  private sheetIds: Map<string, number> | null = null;

  constructor(
    private spreadsheetId: string,
    private sa: ServiceAccount,
  ) {}

  private async call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await accessToken(this.sa);
    const res = await fetch(`${API}/${encodeURIComponent(this.spreadsheetId)}${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return (await res.json()) as T;
    const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    const msg = body.error?.message ?? `HTTP ${res.status}`;
    if (res.status === 404) throw new SheetsError("not_found", "Planilha não encontrada. Confira o CRM_SHEET_ID.");
    if (res.status === 403) throw new SheetsError("forbidden", "A conta de serviço não tem acesso à planilha. Compartilhe a planilha com ela como Editor.");
    if (res.status === 429) throw new SheetsError("rate_limited", "Muitas chamadas ao Google Sheets. Tente de novo em instantes.");
    if (res.status === 400 && /Unable to parse range/i.test(msg)) throw new SheetsError("missing_tab", `A planilha precisa das abas "${LEADS_SHEET}" e "${LISTS_SHEET}".`);
    throw new SheetsError("upstream", `Google Sheets: ${msg}`);
  }

  private async sheetId(tab: string): Promise<number> {
    if (!this.sheetIds) {
      const meta = await this.call<{ sheets: { properties: { sheetId: number; title: string } }[] }>("?fields=sheets.properties(sheetId,title)");
      this.sheetIds = new Map(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));
    }
    const id = this.sheetIds.get(tab);
    if (id == null) throw new SheetsError("missing_tab", `A planilha precisa da aba "${tab}".`);
    return id;
  }

  async read() {
    const params = new URLSearchParams({ valueRenderOption: "UNFORMATTED_VALUE", dateTimeRenderOption: "SERIAL_NUMBER", majorDimension: "ROWS" });
    params.append("ranges", `${quote(LEADS_SHEET)}!A1:ZZ`);
    params.append("ranges", `${quote(LISTS_SHEET)}!A1:Z`);
    const res = await this.call<{ valueRanges: { values?: Cell[][] }[] }>(`/values:batchGet?${params}`);
    return { leads: res.valueRanges[0]?.values ?? [[]], lists: res.valueRanges[1]?.values ?? [[]] };
  }

  async writeLeadCells(cells: { row: number; col: number; value: Cell }[]) {
    if (!cells.length) return;
    await this.call("/values:batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: cells.map((c) => ({ range: `${quote(LEADS_SHEET)}!${colLetter(c.col)}${c.row + 1}`, values: [[c.value ?? ""]] })),
      }),
    });
  }

  async writeLeadHeaders(cells: { col: number; value: string }[]) {
    await this.writeLeadCells(cells.map((c) => ({ row: 0, col: c.col, value: c.value })));
  }

  async appendLeadRows(rows: Cell[][]) {
    // OVERWRITE fills the blank, pre-formatted rows of the template instead of
    // inserting unformatted ones; the sheet still grows when it runs out.
    const params = new URLSearchParams({ valueInputOption: "RAW", insertDataOption: "OVERWRITE" });
    await this.call(`/values/${encodeURIComponent(`${quote(LEADS_SHEET)}!A1`)}:append?${params}`, {
      method: "POST",
      body: JSON.stringify({ majorDimension: "ROWS", values: rows.map((r) => r.map((v) => v ?? "")) }),
    });
  }

  async deleteLeadRows(rows: number[]) {
    const sheetId = await this.sheetId(LEADS_SHEET);
    const sorted = [...new Set(rows)].sort((a, b) => b - a); // bottom-up keeps indexes valid
    await this.call(":batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        requests: sorted.map((r) => ({ deleteDimension: { range: { sheetId, dimension: "ROWS", startIndex: r, endIndex: r + 1 } } })),
      }),
    });
  }

  async writeLists(cols: { col: number; header: string; items: string[]; rows: number }[]) {
    await this.call("/values:batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: cols.map((c) => {
          const values = [[c.header], ...c.items.map((i) => [i])];
          while (values.length < c.rows + 1) values.push([""]);
          const L = colLetter(c.col);
          return { range: `${quote(LISTS_SHEET)}!${L}1:${L}${values.length}`, values };
        }),
      }),
    });
  }
}

/** Reads the service account from CRM_SERVICE_ACCOUNT_JSON (the whole key file). */
export function serviceAccountFromEnv(): ServiceAccount | null {
  const raw = process.env.CRM_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) return null;
    return { client_email: parsed.client_email, private_key: parsed.private_key.replace(/\\n/g, "\n") };
  } catch {
    return null;
  }
}
