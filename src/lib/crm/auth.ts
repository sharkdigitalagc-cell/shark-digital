import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { DevSheetIO } from "./dev-io";
import { GoogleSheetIO, serviceAccountFromEnv } from "./sheets";
import { CrmStore } from "./store";

/**
 * CRM access: Google sign-in limited to the e-mails in CRM_ADMIN_EMAILS, and a
 * signed, httpOnly session cookie. Every CRM API call checks the session and
 * the allowlist again, so removing an e-mail locks that person out at once.
 */

export const SESSION_COOKIE = "crm_session";
export const OAUTH_COOKIE = "crm_oauth";
const SESSION_DAYS = 7;

export type CrmUser = { email: string; name: string };

const isProd = process.env.NODE_ENV === "production";

/** Local development without Google: CRM_DEV_LOGIN=1 and no production build. */
export const devMode = !isProd && process.env.CRM_DEV_LOGIN === "1";

export function adminEmails(): string[] {
  return (process.env.CRM_ADMIN_EMAILS ?? "")
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** Names of the environment variables still missing (names only, never values). */
export function missingConfig(): string[] {
  const missing: string[] = [];
  if (!adminEmails().length) missing.push("CRM_ADMIN_EMAILS");
  if (!secret()) missing.push("CRM_SESSION_SECRET");
  if (devMode) return missing;
  if (!process.env.CRM_GOOGLE_CLIENT_ID) missing.push("CRM_GOOGLE_CLIENT_ID");
  if (!process.env.CRM_GOOGLE_CLIENT_SECRET) missing.push("CRM_GOOGLE_CLIENT_SECRET");
  if (!process.env.CRM_SHEET_ID) missing.push("CRM_SHEET_ID");
  if (!serviceAccountFromEnv()) missing.push("CRM_SERVICE_ACCOUNT_JSON");
  return missing;
}

function secret(): string | null {
  const s = process.env.CRM_SESSION_SECRET ?? (devMode ? "dev-only-secret-not-for-production-use" : "");
  return s.length >= 32 ? s : null;
}

/* ---------------- signed tokens ---------------- */

function sign(payload: object, maxAgeSec: number): string {
  const key = secret();
  if (!key) throw new Error("CRM_SESSION_SECRET ausente ou curta (mínimo 32 caracteres)");
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + maxAgeSec * 1000 })).toString("base64url");
  const mac = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${mac}`;
}

function verify<T>(token: string | undefined): T | null {
  const key = secret();
  if (!token || !key) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = createHmac("sha256", key).update(body).digest();
  const given = Buffer.from(mac, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T & { exp: number };
    return typeof data.exp === "number" && data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export function sessionCookie(user: CrmUser) {
  return {
    name: SESSION_COOKIE,
    value: sign({ e: user.email, n: user.name }, SESSION_DAYS * 86400),
    options: { httpOnly: true, secure: isProd, sameSite: "lax" as const, path: "/", maxAge: SESSION_DAYS * 86400 },
  };
}

export function readUser(request: NextRequest): CrmUser | null {
  const data = verify<{ e: string; n: string }>(request.cookies.get(SESSION_COOKIE)?.value);
  if (!data) return null;
  const email = data.e.toLowerCase();
  return adminEmails().includes(email) ? { email, name: data.n || email } : null;
}

/**
 * Write requests must come from the CRM page itself: a custom header (which a
 * cross-site form cannot send without a CORS preflight we never allow) and, when
 * the browser sends it, an Origin matching this host.
 */
export function sameOrigin(request: NextRequest): boolean {
  if (request.headers.get("x-crm-request") !== "1") return false;
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

/* ---------------- Google OAuth (authorization code + PKCE) ---------------- */

export function startGoogleLogin(origin: string) {
  const state = randomBytes(16).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const params = new URLSearchParams({
    client_id: process.env.CRM_GOOGLE_CLIENT_ID ?? "",
    redirect_uri: `${origin}/api/crm/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  });
  return {
    url: `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    cookie: {
      name: OAUTH_COOKIE,
      value: sign({ s: state, v: verifier }, 600),
      options: { httpOnly: true, secure: isProd, sameSite: "lax" as const, path: "/api/crm/auth", maxAge: 600 },
    },
  };
}

export async function finishGoogleLogin(request: NextRequest): Promise<CrmUser | "denied" | "error"> {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const saved = verify<{ s: string; v: string }>(request.cookies.get(OAUTH_COOKIE)?.value);
  if (!code || !state || !saved || saved.s !== state) return "error";

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.CRM_GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.CRM_GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: `${request.nextUrl.origin}/api/crm/auth/callback`,
      grant_type: "authorization_code",
      code_verifier: saved.v,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await res.json().catch(() => ({}))) as { id_token?: string };
  if (!res.ok || !json.id_token) return "error";

  // The ID token comes straight from Google's token endpoint over TLS, so its
  // claims can be trusted without a signature check (OpenID Connect Core 3.1.3.7).
  let claims: { iss?: string; aud?: string; exp?: number; email?: string; email_verified?: boolean; name?: string };
  try {
    claims = JSON.parse(Buffer.from(json.id_token.split(".")[1], "base64url").toString("utf8"));
  } catch {
    return "error";
  }
  const issOk = claims.iss === "https://accounts.google.com" || claims.iss === "accounts.google.com";
  if (!issOk || claims.aud !== process.env.CRM_GOOGLE_CLIENT_ID || !claims.exp || claims.exp * 1000 < Date.now()) return "error";
  const email = (claims.email ?? "").toLowerCase();
  if (!email || claims.email_verified !== true || !adminEmails().includes(email)) return "denied";
  return { email, name: claims.name || email.split("@")[0] };
}

/* ---------------- data store ---------------- */

export function crmStore(): CrmStore | null {
  const sheetId = process.env.CRM_SHEET_ID;
  const sa = serviceAccountFromEnv();
  if (sheetId && sa) return new CrmStore(new GoogleSheetIO(sheetId, sa));
  if (devMode) return new CrmStore(new DevSheetIO());
  return null;
}

export function sheetUrl(): string | null {
  const id = process.env.CRM_SHEET_ID;
  return id ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(id)}/edit` : null;
}
