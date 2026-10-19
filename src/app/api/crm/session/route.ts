import { type NextRequest, NextResponse } from "next/server";
import { crmDatabase, devMode, missingConfig, readUser, sheetUrl } from "@/lib/crm/auth";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

/** Who is signed in to the CRM. 401 shows the "Entrar com Google" screen. */
export async function GET(request: NextRequest) {
  const missing = missingConfig();
  if (missing.length) {
    return NextResponse.json({ ok: false, code: "not_configured", missing }, { status: 503, headers: NO_STORE });
  }
  const user = readUser(request);
  if (!user) return NextResponse.json({ ok: false, code: "unauthenticated" }, { status: 401, headers: NO_STORE });
  return NextResponse.json({ ok: true, user, db: crmDatabase(), sheetUrl: crmDatabase() === "supabase" ? null : sheetUrl(), dev: devMode }, { headers: NO_STORE });
}
