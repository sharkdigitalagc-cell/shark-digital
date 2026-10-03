"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  CONTACT_LIMITS,
  type ContactChannel,
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
  | { kind: "success"; whatsapp: string | null; canal: ContactChannel }
  | { kind: "error"; message: string; whatsapp?: string | null };

const NOT_CONFIGURED =
  "O envio ainda não está disponível. Seus dados não foram enviados.";
const GENERIC_ERROR =
  "Não foi possível enviar agora. Seus dados não foram enviados. Tente novamente em instantes.";

type FieldDef = {
  name: ContactField;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  placeholder?: string;
  multiline?: boolean;
  optional?: boolean;
};

const NAME_FIELDS: FieldDef[] = [
  { name: "nome", label: "Nome", autoComplete: "name" },
  { name: "empresa", label: "Empresa", autoComplete: "organization" },
];

const CHANNEL_FIELDS: Record<ContactChannel, FieldDef> = {
  whatsapp: {
    name: "whatsapp",
    label: "Seu WhatsApp",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    placeholder: "(00) 00000-0000",
  },
  email: {
    name: "email",
    label: "Seu e-mail",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
  },
};

const CHALLENGE_FIELD: FieldDef = {
  name: "desafio",
  label: "Qual é o principal desafio de marketing hoje?",
  multiline: true,
  optional: true,
};

const CHANNELS: Array<{ value: ContactChannel; label: string }> = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [canal, setCanal] = useState<ContactChannel>("whatsapp");
  const fields = [...NAME_FIELDS, CHANNEL_FIELDS[canal], CHALLENGE_FIELD];

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

    const firstInvalid = fields.find((f) => found[f.name]);
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
          setStatus({ kind: "success", whatsapp, canal: data.canal });
          formRef.current?.reset();
          setCanal("whatsapp");
          if (whatsapp && data.canal === "whatsapp") window.open(whatsapp, "_blank", "noopener");
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
        setStatus({ kind: "success", whatsapp, canal: data.canal });
        formRef.current?.reset();
        // Continue the conversation on WhatsApp; the button below covers
        // browsers that block opening a tab after the request.
        if (whatsapp && data.canal === "whatsapp") window.open(whatsapp, "_blank", "noopener");
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

  function renderField(field: FieldDef) {
    const id = `contato-${field.name}`;
    const error = errors[field.name];
    const errorId = `${id}-erro`;
    const common = {
      id,
      name: field.name,
      required: !field.optional,
      maxLength: CONTACT_LIMITS[field.name],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
      onBlur: () => onBlur(field.name),
      disabled: submitting,
      className: cn(
        "w-full rounded-xl border bg-bg-2 px-4 text-[0.95rem] text-fg placeholder:text-white/30 transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60",
        error ? "border-red-400/70" : "border-line-strong hover:border-white/25",
        field.multiline ? "min-h-32 resize-y py-3" : "h-12",
      ),
    };

    return (
      <div key={field.name}>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
          {field.label}
          {field.optional ? <span className="ml-1.5 font-normal text-muted">(opcional)</span> : null}
        </label>
        {field.multiline ? (
          <textarea rows={4} {...common} />
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
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="contato-status"
      className="relative rounded-3xl border border-line bg-card p-6 sm:p-8 md:p-10"
    >
      {/* After a confirmed send the fields give way to the confirmation. */}
      {status.kind !== "success" ? (
        <>
      <div className="grid gap-5 sm:grid-cols-2">
        {NAME_FIELDS.map((field) => renderField(field))}

        <fieldset className="sm:col-span-2">
          <legend className="mb-2 block text-sm font-medium text-fg">
            Como prefere ser contatado?
          </legend>
          <div className="inline-flex rounded-full border border-line-strong bg-bg-2 p-1">
            {CHANNELS.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  canal === option.value ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                <input
                  type="radio"
                  name="canal"
                  value={option.value}
                  checked={canal === option.value}
                  onChange={() => {
                    setCanal(option.value);
                    setErrors((prev) => ({ ...prev, email: undefined, whatsapp: undefined }));
                  }}
                  disabled={submitting}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">{renderField(CHANNEL_FIELDS[canal])}</div>
        <div className="sm:col-span-2">{renderField(CHALLENGE_FIELD)}</div>
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
          Só pedimos o contato do canal escolhido.
        </p>
      </div>

        </>
      ) : null}

      {/* Honeypot (anti-spam): hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contato-site">Não preencha este campo</label>
        <input id="contato-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div id="contato-status" role="status" aria-live="polite" className="empty:hidden">
        {status.kind === "success" ? (
          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/[0.06] p-4 text-sm leading-relaxed text-fg">
            <p className="flex items-start gap-3">
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              {status.canal === "email"
                ? "Recebemos suas informações. Vamos responder pelo e-mail informado."
                : status.whatsapp
                  ? "Recebemos suas informações. Para agilizar, continue a conversa com a gente no WhatsApp."
                  : "Recebemos suas informações. Vamos responder pelo WhatsApp informado."}
            </p>
            <div className="ml-7 mt-4 flex flex-wrap items-center gap-4">
              {status.whatsapp ? <WhatsappButton href={status.whatsapp} /> : null}
              <button
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
                className="rounded-sm text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-fg"
              >
                Enviar outra mensagem
              </button>
            </div>
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
                <div className="ml-7 mt-4">
                  <WhatsappButton href={status.whatsapp} />
                </div>
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
      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-medium text-on-brand transition-colors duration-200 hover:bg-brand-hover"
    >
      <MessageCircle aria-hidden className="size-4" />
      Continuar no WhatsApp
    </a>
  );
}
