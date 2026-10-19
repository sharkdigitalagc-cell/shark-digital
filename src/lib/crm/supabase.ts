/**
 * Minimal client for the Supabase REST API (PostgREST), used only on the server.
 *
 * The key is the project's secret key (service_role or sb_secret_...), kept in
 * the Vercel variable SUPABASE_SERVICE_ROLE_KEY and never sent to the browser.
 * The tables keep RLS on with no policies, so the public key cannot read them.
 */

export class SupabaseError extends Error {
  constructor(
    public code: "upstream" | "not_configured",
    message: string,
  ) {
    super(message);
    this.name = "SupabaseError";
  }
}

export type SupabaseConfig = { url: string; key: string };

export function supabaseFromEnv(): SupabaseConfig | null {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY ?? "").trim();
  if (!url || !key) return null;
  return { url, key };
}

type Query = Record<string, string | number | undefined>;

export class Supabase {
  constructor(private cfg: SupabaseConfig) {}

  private headers(extra: Record<string, string> = {}): Record<string, string> {
    const h: Record<string, string> = { apikey: this.cfg.key, "Content-Type": "application/json", ...extra };
    // Legacy keys are JWTs and go in Authorization too; the new sb_secret_ keys only in apikey.
    if (!this.cfg.key.startsWith("sb_")) h.Authorization = `Bearer ${this.cfg.key}`;
    return h;
  }

  private async req<T>(method: string, table: string, query: Query = {}, body?: unknown, prefer?: string): Promise<T> {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) if (v !== undefined) qs.set(k, String(v));
    const url = `${this.cfg.url}/rest/v1/${table}${qs.size ? `?${qs}` : ""}`;
    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers: this.headers(prefer ? { Prefer: prefer } : {}),
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw new SupabaseError("upstream", "Não consegui falar com o Supabase.");
    }
    const text = await res.text();
    if (!res.ok) {
      let msg = text.slice(0, 300);
      try {
        const j = JSON.parse(text) as { message?: string; hint?: string };
        if (j.message) msg = j.message + (j.hint ? ` (${j.hint})` : "");
      } catch {
        /* texto puro */
      }
      throw new SupabaseError("upstream", `Supabase ${res.status}: ${msg}`);
    }
    return (text ? JSON.parse(text) : null) as T;
  }

  /** Reads every row, 1000 at a time (the API's default page limit). */
  async selectAll<T>(table: string, query: Query = {}): Promise<T[]> {
    const out: T[] = [];
    for (let offset = 0; ; offset += 1000) {
      const page = await this.req<T[]>("GET", table, { select: "*", ...query, limit: 1000, offset });
      out.push(...page);
      if (page.length < 1000) return out;
    }
  }

  select<T>(table: string, query: Query): Promise<T[]> {
    return this.req<T[]>("GET", table, query);
  }

  /** Inserts rows. `onConflict` + `merge` upserts; `onConflict` alone skips duplicates. Returns the rows written. */
  insert<T>(table: string, rows: object[], opts: { onConflict?: string; merge?: boolean; returning?: string } = {}): Promise<T[]> {
    if (!rows.length) return Promise.resolve([]);
    const prefer = [opts.returning ? "return=representation" : "return=minimal"];
    if (opts.onConflict) prefer.push(opts.merge ? "resolution=merge-duplicates" : "resolution=ignore-duplicates");
    return this.req<T[]>("POST", table, { on_conflict: opts.onConflict, select: opts.returning }, rows, prefer.join(",")).then((r) => r ?? []);
  }

  update<T>(table: string, filter: Query, values: object, returning = "id"): Promise<T[]> {
    return this.req<T[]>("PATCH", table, { ...filter, select: returning }, values, "return=representation");
  }

  delete<T>(table: string, filter: Query, returning = "id"): Promise<T[]> {
    return this.req<T[]>("DELETE", table, { ...filter, select: returning }, undefined, "return=representation");
  }
}

/** PostgREST `in.(...)` filter with every value quoted. */
export const inList = (values: string[]) => `in.(${values.map((v) => `"${v.replace(/["\\]/g, "")}"`).join(",")})`;
