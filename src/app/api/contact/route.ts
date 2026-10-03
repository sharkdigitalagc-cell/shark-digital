import { NextResponse } from "next/server";
import {
  normalizeContact,
  validateContact,
  type ContactApiResponse,
} from "@/lib/contact";

/**
 * Delivers contact submissions to the real destination:
 * - CONTACT_FORM_ENDPOINT: any URL that accepts a JSON POST (CRM, automation
 *   webhook...). Takes precedence.
 * - CONTACT_EMAIL (default: the Shark inbox below): sends to this inbox through FormSubmit (formsubmit.co). The
 *   first submission makes FormSubmit email an activation link to that inbox;
 *   until it is clicked, submissions are reported as NOT sent.
 *
 * There is no fallback: if nothing is configured, or the destination does not
 * confirm receipt, the visitor is told the data was NOT sent.
 *
 * TODO(contato): reforçar a validação no servidor (ex.: schema com zod) conforme
 *   as regras do CRM de destino.
 * TODO(contato): proteção contra abuso — rate limit por IP (ex.: Upstash/Vercel KV)
 *   e verificação anti-bot (ex.: Cloudflare Turnstile). Hoje há apenas um honeypot.
 */
export async function POST(request: Request) {
  const destination = resolveDestination();
  if (!destination) {
    return json({ ok: false, code: "not_configured" }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "invalid" }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Reject it as
  // invalid rather than pretending it was delivered.
  if (typeof body.site === "string" && body.site.trim() !== "") {
    return json({ ok: false, code: "invalid" }, 400);
  }

  const data = normalizeContact(body);
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "invalid", errors }, 422);
  }

  try {
    const token = process.env.CONTACT_FORM_TOKEN;
    const payload =
      destination.kind === "email"
        ? {
            Nome: data.nome,
            Empresa: data.empresa,
            "E-mail": data.email,
            WhatsApp: data.whatsapp,
            "Principal desafio": data.desafio,
            _replyto: data.email,
            _subject: `Novo contato pelo site: ${data.empresa}`,
            _template: "table",
            _captcha: "false",
          }
        : {
            ...data,
            origem: "site-shark-digital",
            enviadoEm: new Date().toISOString(),
          };

    const upstream = await fetch(destination.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit only accepts submissions that come from a website.
        Origin: siteUrl(),
        Referer: `${siteUrl()}/`,
        ...(token && destination.kind === "webhook"
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error("[contact] upstream responded", upstream.status);
      return json({ ok: false, code: "upstream_error" }, 502);
    }

    // FormSubmit answers 200 with { success: "false" } while the inbox is not
    // activated, so a 2xx alone does not prove delivery.
    if (destination.kind === "email") {
      const result = (await upstream.json().catch(() => null)) as {
        success?: unknown;
        message?: unknown;
      } | null;
      if (!result || String(result.success) !== "true") {
        console.error("[contact] email not delivered", result?.message);
        return json({ ok: false, code: "upstream_error" }, 502);
      }
    }
  } catch (error) {
    console.error("[contact] upstream request failed", error);
    return json({ ok: false, code: "upstream_error" }, 502);
  }

  return json({ ok: true }, 200);
}

// Shark Digital inbox; CONTACT_EMAIL overrides it, an empty value disables it.
const DEFAULT_CONTACT_EMAIL = "sharkdigital.agc@gmail.com";

type Destination = { kind: "webhook" | "email"; url: string };

function resolveDestination(): Destination | null {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (endpoint) return { kind: "webhook", url: endpoint };

  const email = (process.env.CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL).trim();
  if (email) {
    return {
      kind: "email",
      url: `https://formsubmit.co/ajax/${encodeURIComponent(email)}`,
    };
  }
  return null;
}

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

function json(payload: ContactApiResponse, status: number) {
  return NextResponse.json(payload, { status });
}
