import { type NextRequest, NextResponse } from "next/server";
import { OAUTH_COOKIE, finishGoogleLogin, sessionCookie } from "@/lib/crm/auth";

/** Google sends the user back here after "Entrar com Google". */
export async function GET(request: NextRequest) {
  const back = new URL("/crm", request.nextUrl.origin);
  let result: Awaited<ReturnType<typeof finishGoogleLogin>>;
  try {
    result = await finishGoogleLogin(request);
  } catch (error) {
    console.error("[crm] google login failed", error);
    result = "error";
  }

  if (result === "denied" || result === "error") {
    back.searchParams.set("erro", result === "denied" ? "acesso" : "login");
    const res = NextResponse.redirect(back);
    res.cookies.delete({ name: OAUTH_COOKIE, path: "/api/crm/auth" });
    return res;
  }

  const res = NextResponse.redirect(back);
  const c = sessionCookie(result);
  res.cookies.set(c.name, c.value, c.options);
  res.cookies.delete({ name: OAUTH_COOKIE, path: "/api/crm/auth" });
  return res;
}
