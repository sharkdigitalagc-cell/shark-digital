import { createHash, randomBytes } from "node:crypto";
import {
  type Cell,
  type Cfg,
  type HeaderMap,
  type Lead,
  FIELDS,
  LIST_HEADERS,
  fieldsToCells,
  headerMap,
  listsFromRows,
  rowToLead,
} from "./fields";

/**
 * Storage the CRM runs on: two tabs ("Leads" and "Listas do CRM") as 2D arrays
 * of cells. The Google Sheets implementation lives in sheets.ts; dev-io.ts keeps
 * the same shape in a local file for development.
 *
 * Rows and columns below are 0-based; row 0 is the header row.
 */
export interface SheetIO {
  read(): Promise<{ leads: Cell[][]; lists: Cell[][] }>;
  /** Writes single cells in the Leads tab. */
  writeLeadCells(cells: { row: number; col: number; value: Cell }[]): Promise<void>;
  /** Appends rows after the last row with data in the Leads tab. */
  appendLeadRows(rows: Cell[][]): Promise<void>;
  /** Deletes whole rows in the Leads tab. */
  deleteLeadRows(rows: number[]): Promise<void>;
  /** Rewrites list columns in the lists tab: header in row 0, items below, blanks up to `rows` items. */
  writeLists(cols: { col: number; header: string; items: string[]; rows: number }[]): Promise<void>;
  /** Writes header cells in the Leads tab (used to add missing system columns). */
  writeLeadHeaders(cells: { col: number; value: string }[]): Promise<void>;
}

export type Snapshot = { leads: Lead[]; cfg: Cfg; version: string };

const newId = () => "l" + Date.now().toString(36) + randomBytes(4).toString("hex");

export class CrmStore {
  constructor(private io: SheetIO) {}

  /** Adds any header the CRM needs that the Leads tab does not have yet. */
  private async ensureHeaders(rows: Cell[][]): Promise<HeaderMap> {
    const hm = headerMap(rows[0]);
    const missing = FIELDS.filter((f) => !hm.has(f.header));
    if (missing.length) {
      let next = Math.max(rows[0]?.length ?? 0, ...[...hm.values()].map((i) => i + 1));
      const cells = missing.map((f) => ({ col: next++, value: f.header }));
      await this.io.writeLeadHeaders(cells);
      for (const c of cells) hm.set(c.value, c.col);
    }
    return hm;
  }

  async load(): Promise<Snapshot> {
    const data = await this.io.read();
    const hm = await this.ensureHeaders(data.leads);
    const leads: Lead[] = [];
    const fixes: { row: number; col: number; value: Cell }[] = [];
    let maxNum = 0;
    const rowsMissingNum: { lead: Lead; row: number }[] = [];
    const seen = new Set<string>();

    data.leads.slice(1).forEach((row, i) => {
      const r = i + 1;
      const lead = rowToLead(row, hm);
      if (!lead) return;
      // Rows typed straight into the sheet have no system id yet: give them one.
      if (!lead.id || seen.has(lead.id)) {
        lead.id = newId();
        fixes.push({ row: r, col: hm.get("_id")!, value: lead.id });
        if (!lead.createdAt) {
          lead.createdAt = Date.now();
          lead.updatedAt = lead.createdAt;
          lead.stageAt = lead.createdAt;
          lead.order = -lead.createdAt;
          fixes.push({ row: r, col: hm.get("_criado_em")!, value: lead.createdAt });
          fixes.push({ row: r, col: hm.get("_ordem")!, value: lead.order });
        }
      }
      seen.add(lead.id);
      if (lead.num) maxNum = Math.max(maxNum, lead.num);
      else rowsMissingNum.push({ lead, row: r });
      leads.push(lead);
    });
    for (const { lead, row } of rowsMissingNum) {
      lead.num = ++maxNum;
      fixes.push({ row, col: hm.get("ID")!, value: lead.num });
    }
    if (fixes.length) await this.io.writeLeadCells(fixes);

    const cfg = listsFromRows(data.lists);
    const version = createHash("sha1")
      .update(JSON.stringify([data.leads, data.lists]))
      .update(String(fixes.length))
      .digest("hex")
      .slice(0, 16);
    return { leads, cfg, version };
  }

  private async rowsById(): Promise<{ hm: HeaderMap; index: Map<string, number>; width: number }> {
    const { leads } = await this.io.read();
    const hm = await this.ensureHeaders(leads);
    const idCol = hm.get("_id")!;
    const index = new Map<string, number>();
    leads.forEach((row, r) => {
      if (r === 0) return;
      const id = row[idCol];
      if (typeof id === "string" && id && !index.has(id)) index.set(id, r);
    });
    const width = Math.max(...[...hm.values()].map((i) => i + 1));
    return { hm, index, width };
  }

  async create(items: Partial<Lead>[]): Promise<{ created: number; skipped: number }> {
    const { hm, index, width } = await this.rowsById();
    const rows: Cell[][] = [];
    let skipped = 0;
    for (const lead of items) {
      if (!lead.id || index.has(lead.id)) {
        skipped++;
        continue;
      }
      const row: Cell[] = new Array(width).fill("");
      for (const [header, value] of fieldsToCells({ servicos: [], hist: [], stage: "novo", temp: "morno", ...lead })) {
        const col = hm.get(header);
        if (col != null) row[col] = value;
      }
      rows.push(row);
      index.set(lead.id, -1);
    }
    if (rows.length) await this.io.appendLeadRows(rows);
    return { created: rows.length, skipped };
  }

  async patch(id: string, fields: Partial<Lead>): Promise<boolean> {
    const { hm, index } = await this.rowsById();
    const row = index.get(id);
    if (row == null) return false;
    const cells: { row: number; col: number; value: Cell }[] = [];
    delete fields.id;
    for (const [header, value] of fieldsToCells(fields)) {
      const col = hm.get(header);
      if (col != null) cells.push({ row, col, value });
    }
    if (cells.length) await this.io.writeLeadCells(cells);
    return true;
  }

  async remove(ids: string[]): Promise<number> {
    const { index } = await this.rowsById();
    const rows = ids.map((id) => index.get(id)).filter((r): r is number => r != null && r > 0);
    if (rows.length) await this.io.deleteLeadRows(rows);
    return rows.length;
  }

  async saveCfg(cfg: Cfg): Promise<void> {
    const { lists } = await this.io.read();
    const hm = headerMap(lists[0]);
    let next = lists[0]?.length ?? 0;
    const cols = (Object.keys(LIST_HEADERS) as (keyof Cfg)[]).map((key) => {
      const header = LIST_HEADERS[key];
      let col = hm.get(header);
      if (col == null) {
        col = next++;
        hm.set(header, col);
      }
      const c = col;
      const used = lists.slice(1).reduce((n, r, i) => (r[c] != null && r[c] !== "" ? i + 1 : n), 0);
      return { col: c, header, items: cfg[key], rows: Math.max(used, cfg[key].length) };
    });
    await this.io.writeLists(cols);
  }
}
