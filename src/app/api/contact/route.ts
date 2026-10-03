import { NextResponse } from "next/server";
import {
  normalizeContact,
  validateContact,
  type ContactApiResponse,
} from "@/lib/contact";

/**
 * Forwards contact submissions to the real destination configured in
 * CONTACT_FORM_ENDPOINT (CRM, automation webhook, form service...).
 *
 * There is no fallback: if the endpoint is not configured, or the destination
 * does not confirm receipt, the visitor is told the data was NOT sent.
 *
 * TODO(contato): definir o destino real em CONTACT_FORM_ENDPOINT (e, se
 *   necessário, CONTACT_FORM_TOKEN) e ajustar o formato do corpo ao que ele espera.
 * TODO(contato): reforçar a validação no servidor (ex.: schema com zod) conforme
 *   as regras do CRM de destino.
 * TODO(contato): proteção contra abuso — rate limit por IP (ex.: Upstash/Vercel KV)
 *   e verificação anti-bot (ex.: Cloudflare Turnstile). Hoje há apenas um honeypot.
 */
export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
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
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...data,
        origem: "site-shark-digital",
        enviadoEm: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error("[contact] upstream responded", upstream.status);
      return json({ ok: false, code: "upstream_error" }, 502);
    }
  } catch (error) {
    console.error("[contact] upstream request failed", error);
    return json({ ok: false, code: "upstream_error" }, 502);
  }

  return json({ ok: true }, 200);
}

function json(payload: ContactApiResponse, status: number) {
  return NextResponse.json(payload, { status });
}
