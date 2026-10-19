import { NextResponse } from "next/server";
import { supabaseStore } from "@/lib/crm/auth";
import { normalizeContact, validateContact } from "@/lib/contact";

/**
 * Saves a contact form submission in Supabase (`contatos_site`) and opens a lead
 * in "Novo lead" in the CRM. Called by the form right after the e-mail is sent,
 * so a contact is kept even if the e-mail service fails.
 *
 * Only accepted from this site's own pages (Origin check) and with the honeypot empty.
 */
export async function POST(request: Request) {
  const store = supabaseStore();
  if (!store) return json({ ok: false, code: "not_configured" }, 503);

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, code: "forbidden" }, 403);

  const raw = await request.text();
  if (raw.length > 10_000) return json({ ok: false, code: "invalid" }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "invalid" }, 400);
  }
  if (typeof body.site === "string" && body.site.trim() !== "") return json({ ok: false, code: "invalid" }, 400);

  const data = normalizeContact(body);
  if (Object.keys(validateContact(data)).length) return json({ ok: false, code: "invalid" }, 422);

  try {
    const emailEnviado = typeof body.emailEnviado === "boolean" ? body.emailEnviado : null;
    await store.createFromContact({ ...data, emailEnviado });
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] registro no Supabase falhou", error);
    return json({ ok: false, code: "upstream_error" }, 502);
  }
}

function json(payload: object, status: number) {
  return NextResponse.json(payload, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
