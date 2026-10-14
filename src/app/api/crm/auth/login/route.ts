import { type NextRequest, NextResponse } from "next/server";
import { adminEmails, devMode, missingConfig, sessionCookie, startGoogleLogin } from "@/lib/crm/auth";

/** Starts "Entrar com Google". In local development (CRM_DEV_LOGIN=1) it signs in the first admin directly. */
export async function GET(request: NextRequest) {
  const back = new URL("/crm", request.nextUrl.origin);
  if (missingConfig().length) {
    back.searchParams.set("erro", "config");
    return NextResponse.redirect(back);
  }

  if (devMode) {
    const email = adminEmails()[0];
    const res = NextResponse.redirect(back);
    const c = sessionCookie({ email, name: email.split("@")[0] });
    res.cookies.set(c.name, c.value, c.options);
    return res;
  }

  const { url, cookie } = startGoogleLogin(request.nextUrl.origin);
  const res = NextResponse.redirect(url);
  res.cookies.set(cookie.name, cookie.value, cookie.options);
  return res;
}
