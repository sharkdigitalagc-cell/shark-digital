import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { type Cell, DEFAULT_CFG, FIELDS, LIST_HEADERS } from "./fields";
import type { SheetIO } from "./store";

/**
 * Development-only stand-in for the Google Sheet: the same two tabs as 2D
 * arrays, kept in `.crm-dev.json` at the project root. Never used in production.
 */
type DevData = { leads: Cell[][]; lists: Cell[][] };

const FILE = path.join(process.cwd(), ".crm-dev.json");

function blank(): DevData {
  const keys = Object.keys(LIST_HEADERS) as (keyof typeof LIST_HEADERS)[];
  const height = Math.max(...keys.map((k) => DEFAULT_CFG[k].length));
  const lists: Cell[][] = [keys.map((k) => LIST_HEADERS[k])];
  for (let r = 0; r < height; r++) lists.push(keys.map((k) => DEFAULT_CFG[k][r] ?? ""));
  return { leads: [FIELDS.map((f) => f.header)], lists };
}

export class DevSheetIO implements SheetIO {
  private async load(): Promise<DevData> {
    try {
      return JSON.parse(await readFile(FILE, "utf8")) as DevData;
    } catch {
      return blank();
    }
  }
  private async save(d: DevData) {
    await writeFile(FILE, JSON.stringify(d));
  }

  async read() {
    const d = await this.load();
    // Mirror the Sheets API: trailing blank rows are not returned.
    const trim = (rows: Cell[][]) => {
      let end = rows.length;
      while (end > 1 && rows[end - 1].every((v) => v === "" || v == null)) end--;
      return rows.slice(0, end);
    };
    return { leads: trim(d.leads), lists: trim(d.lists) };
  }

  async writeLeadCells(cells: { row: number; col: number; value: Cell }[]) {
    const d = await this.load();
    for (const c of cells) {
      while (d.leads.length <= c.row) d.leads.push([]);
      d.leads[c.row][c.col] = c.value;
    }
    await this.save(d);
  }

  async writeLeadHeaders(cells: { col: number; value: string }[]) {
    await this.writeLeadCells(cells.map((c) => ({ row: 0, col: c.col, value: c.value })));
  }

  async appendLeadRows(rows: Cell[][]) {
    const d = await this.load();
    let end = d.leads.length;
    while (end > 1 && d.leads[end - 1].every((v) => v === "" || v == null)) end--;
    d.leads.splice(end, 0, ...rows);
    await this.save(d);
  }

  async deleteLeadRows(rows: number[]) {
    const d = await this.load();
    for (const r of [...new Set(rows)].sort((a, b) => b - a)) d.leads.splice(r, 1);
    await this.save(d);
  }

  async writeLists(cols: { col: number; header: string; items: string[]; rows: number }[]) {
    const d = await this.load();
    for (const c of cols) {
      const values = [c.header, ...c.items];
      while (values.length < c.rows + 1) values.push("");
      values.forEach((v, r) => {
        while (d.lists.length <= r) d.lists.push([]);
        d.lists[r][c.col] = v;
      });
    }
    await this.save(d);
  }
}
