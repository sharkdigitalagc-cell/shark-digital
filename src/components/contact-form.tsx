"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  CONTACT_LIMITS,
  normalizeContact,
  validateContact,
  type ContactApiResponse,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { cn } from "@/components/ui";
import { CONTACT_EMAIL, sendContactEmail } from "@/lib/contact-email";
import { whatsappLink } from "@/lib/whatsapp";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; whatsapp: string | null }
  | { kind: "error"; message: string; whatsapp?: string | null };

const NOT_CONFIGURED =
  "O envio ainda não está disponível. Seus dados não foram enviados.";
const GENERIC_ERROR =
  "Não foi possível enviar agora. Seus dados não foram enviados. Tente novamente em instantes.";

const FIELDS: Array<{
  name: ContactField;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  placeholder?: string;
  multiline?: boolean;
  span?: boolean;
}> = [
  { name: "nome", label: "Nome", autoComplete: "name" },
  { name: "empresa", label: "Empresa", autoComplete: "organization" },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    placeholder: "(00) 00000-0000",
  },
  {
    name: "desafio",
    label: "Qual é o principal desafio de marketing hoje?",
    multiline: true,
    span: true,
  },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const readForm = () => {
    const fd = new FormData(formRef.current!);
    return Object.fromEntries(fd.entries()) as Record<string, unknown>;
  };

  const onBlur = (field: ContactField) => {
    // Only re-check fields that already show an error, to avoid nagging.
    if (!errors[field]) return;
    const next = validateContact(normalizeContact(readForm()));
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const raw = readForm();
    const data = normalizeContact(raw);
    const found = validateContact(data);
    setErrors(found);

    const firstInvalid = FIELDS.find((f) => found[f.name]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)
        ?.focus();
      setStatus({ kind: "idle" });
      return;
    }

    const whatsapp = whatsappLink(data);
    setStatus({ kind: "submitting" });
    try {
      if (CONTACT_EMAIL) {
        const sent = await sendContactEmail(data, String(raw.site ?? ""));
        if (sent) {
          setStatus({ kind: "success", whatsapp });
          formRef.current?.reset();
          if (whatsapp) window.open(whatsapp, "_blank", "noopener");
        } else {
          setStatus({ kind: "error", message: GENERIC_ERROR, whatsapp });
        }
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, site: raw.site ?? "" }),
      });
      const payload = (await res.json().catch(() => null)) as ContactApiResponse | null;

      if (res.ok && payload?.ok) {
        setStatus({ kind: "success", whatsapp });
        formRef.current?.reset();
        // Continue the conversation on WhatsApp; the button below covers
        // browsers that block opening a tab after the request.
        if (whatsapp) window.open(whatsapp, "_blank", "noopener");
        return;
      }

      // No API route behind this host (static-only deploy): nothing was sent.
      const noEndpoint = !payload && [404, 405, 501].includes(res.status);
      if (noEndpoint || (payload && !payload.ok && payload.code === "not_configured")) {
        setStatus({ kind: "error", message: NOT_CONFIGURED, whatsapp });
      } else if (payload && !payload.ok && payload.errors) {
        setErrors(payload.errors);
        setStatus({ kind: "error", message: "Revise os campos destacados." });
      } else {
        setStatus({ kind: "error", message: GENERIC_ERROR, whatsapp });
      }
    } catch {
      setStatus({ kind: "error", message: GENERIC_ERROR, whatsapp });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="contato-status"
      className="relative rounded-3xl border border-line bg-card p-6 sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = `contato-${field.name}`;
          const error = errors[field.name];
          const errorId = `${id}-erro`;
          const common = {
            id,
            name: field.name,
            required: true,
            maxLength: CONTACT_LIMITS[field.name],
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            onBlur: () => onBlur(field.name),
            disabled: submitting,
            className: cn(
              "w-full rounded-xl border bg-bg-2 px-4 text-[0.95rem] text-fg placeholder:text-white/30 transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60",
              error ? "border-red-400/70" : "border-line-strong hover:border-white/25",
              field.multiline ? "min-h-36 resize-y py-3" : "h-12",
            ),
          };

          return (
            <div key={field.name} className={cn(field.span && "sm:col-span-2")}>
              <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea rows={5} {...common} />
              ) : (
                <input
                  type={field.type ?? "text"}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  {...common}
                />
              )}
              {error ? (
                <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
                  <AlertCircle aria-hidden className="size-3.5 shrink-0" />
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot (anti-spam): hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contato-site">Não preencha este campo</label>
        <input id="contato-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[0.95rem] font-medium text-on-brand transition-colors duration-200 hover:bg-brand-hover disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Conversar sobre meu marketing
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
          Todos os campos são obrigatórios.
        </p>
      </div>

      <div id="contato-status" role="status" aria-live="polite" className="empty:hidden">
        {status.kind === "success" ? (
          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/[0.06] p-4 text-sm leading-relaxed text-fg">
            <p className="flex items-start gap-3">
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              {status.whatsapp
                ? "Recebemos suas informações. Para agilizar, continue a conversa com a gente no WhatsApp."
                : "Recebemos suas informações. Entraremos em contato pelo e-mail ou WhatsApp informado."}
            </p>
            {status.whatsapp ? <WhatsappButton href={status.whatsapp} /> : null}
          </div>
        ) : null}
        {status.kind === "error" ? (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm leading-relaxed text-fg">
            <p className="flex items-start gap-3">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-red-300" />
              {status.message}
            </p>
            {status.whatsapp ? (
              <>
                <p className="mt-3 pl-7 text-muted">
                  Se preferir, fale com a gente agora pelo WhatsApp.
                </p>
                <WhatsappButton href={status.whatsapp} />
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

function WhatsappButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-7 mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-medium text-on-brand transition-colors duration-200 hover:bg-brand-hover"
    >
      <MessageCircle aria-hidden className="size-4" />
      Continuar no WhatsApp
    </a>
  );
}
