import type { Cell } from "./fields";
import { SheetsError } from "./sheets";
import type { SheetIO } from "./store";

/**
 * Talks to the Apps Script bound to the spreadsheet (docs/crm/apps-script.gs),
 * deployed as a web app that runs as the sheet owner. Requests carry a shared
 * secret that only this server knows (CRM_APPS_SCRIPT_SECRET).
 *
 * Used instead of a service account when the Google Cloud organization blocks
 * service account keys.
 */
export class AppsScriptSheetIO implements SheetIO {
  constructor(
    private url: string,
    private secret: string,
  ) {}

  private async call<T extends object>(op: string, payload: object = {}): Promise<T> {
    let res: Response;
    try {
      res = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, op, secret: this.secret }),
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(25_000),
      });
    } catch {
      throw new SheetsError("upstream", "Não consegui falar com o Apps Script da planilha.");
    }
    const text = await res.text();
    let body: { ok?: boolean; code?: string; error?: string } & T;
    try {
      body = JSON.parse(text);
    } catch {
      throw new SheetsError(
        "upstream",
        'O Apps Script não respondeu como esperado. Confira se a implantação é "App da Web" com acesso "Qualquer pessoa" e se a URL termina em /exec.',
      );
    }
    if (!body.ok) {
      if (body.code === "forbidden") throw new SheetsError("forbidden", "A chave do Apps Script não confere com CRM_APPS_SCRIPT_SECRET.");
      if (body.code === "missing_tab") throw new SheetsError("missing_tab", body.error ?? "Aba da planilha não encontrada.");
      throw new SheetsError("upstream", `Apps Script: ${body.error ?? "erro desconhecido"}`);
    }
    return body;
  }

  async read() {
    const r = await this.call<{ leads: Cell[][]; lists: Cell[][] }>("read");
    return { leads: r.leads?.length ? r.leads : [[]], lists: r.lists?.length ? r.lists : [[]] };
  }

  async writeLeadCells(cells: { row: number; col: number; value: Cell }[]) {
    if (cells.length) await this.call("writeCells", { cells });
  }

  async writeLeadHeaders(cells: { col: number; value: string }[]) {
    await this.writeLeadCells(cells.map((c) => ({ row: 0, col: c.col, value: c.value })));
  }

  async appendLeadRows(rows: Cell[][]) {
    if (rows.length) await this.call("appendRows", { rows });
  }

  async deleteLeadRows(rows: number[]) {
    if (rows.length) await this.call("deleteRows", { rows });
  }

  async writeLists(cols: { col: number; header: string; items: string[]; rows: number }[]) {
    await this.call("writeLists", { cols });
  }
}
