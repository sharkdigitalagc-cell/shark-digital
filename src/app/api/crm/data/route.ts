import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { crmStore, readUser, sameOrigin } from "@/lib/crm/auth";
import { type Lead, sanitizeCfg, sanitizeFields } from "@/lib/crm/fields";
import { SheetsError } from "@/lib/crm/sheets";
import { SupabaseError } from "@/lib/crm/supabase";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

function fail(error: unknown) {
  if (error instanceof SheetsError) {
    console.error("[crm] sheets", error.code, error.message);
    const status = error.code === "rate_limited" ? 429 : 502;
    return json({ ok: false, code: error.code, message: error.message }, status);
  }
  if (error instanceof SupabaseError) {
    console.error("[crm] supabase", error.message);
    return json({ ok: false, code: error.code, message: error.message }, 502);
  }
  console.error("[crm] unexpected", error);
  return json({ ok: false, code: "error", message: "Erro inesperado no servidor do CRM." }, 500);
}

/** All leads and lists. `?v=<version>` answers `unchanged` when nothing moved. */
export async function GET(request: NextRequest) {
  if (!readUser(request)) return json({ ok: false, code: "unauthenticated" }, 401);
  const store = crmStore();
  if (!store) return json({ ok: false, code: "not_configured" }, 503);
  try {
    const snap = await store.load();
    if (request.nextUrl.searchParams.get("v") === snap.version) return json({ ok: true, unchanged: true, version: snap.version });
    return json({ ok: true, ...snap });
  } catch (error) {
    return fail(error);
  }
}

type Body = { action?: string; id?: unknown; ids?: unknown; fields?: unknown; leads?: unknown; cfg?: unknown };

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ ok: false, code: "forbidden" }, 403);
  const user = readUser(request);
  if (!user) return json({ ok: false, code: "unauthenticated" }, 401);
  const store = crmStore();
  if (!store) return json({ ok: false, code: "not_configured" }, 503);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ ok: false, code: "invalid" }, 400);
  }

  try {
    switch (body.action) {
      case "create": {
        if (!Array.isArray(body.leads) || body.leads.length > 2000) return json({ ok: false, code: "invalid" }, 400);
        const leads = body.leads.map((l) => {
          const lead: Partial<Lead> = sanitizeFields(l);
          if (!lead.id) lead.id = "l" + Date.now().toString(36) + randomBytes(4).toString("hex");
          return lead;
        });
        return json({ ok: true, ...(await store.create(leads, user.email)) });
      }
      case "patch": {
        if (typeof body.id !== "string") return json({ ok: false, code: "invalid" }, 400);
        const found = await store.patch(body.id, sanitizeFields(body.fields), user.email);
        return found ? json({ ok: true }) : json({ ok: false, code: "not_found", message: "Esse lead não existe mais no banco do CRM." }, 404);
      }
      case "delete": {
        if (!Array.isArray(body.ids)) return json({ ok: false, code: "invalid" }, 400);
        const ids = body.ids.filter((i): i is string => typeof i === "string").slice(0, 2000);
        return json({ ok: true, deleted: await store.remove(ids, user.email) });
      }
      case "saveCfg": {
        const cfg = sanitizeCfg(body.cfg);
        if (!cfg) return json({ ok: false, code: "invalid" }, 400);
        await store.saveCfg(cfg, user.email);
        return json({ ok: true });
      }
      default:
        return json({ ok: false, code: "invalid" }, 400);
    }
  } catch (error) {
    return fail(error);
  }
}
