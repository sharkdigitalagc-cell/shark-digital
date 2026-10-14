import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sameOrigin } from "@/lib/crm/auth";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false, code: "forbidden" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.delete({ name: SESSION_COOKIE, path: "/" });
  return res;
}
