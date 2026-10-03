/** Contact form schema and validation, shared by the form and the API route. */

export type ContactChannel = "whatsapp" | "email";

export type ContactPayload = {
  nome: string;
  empresa: string;
  /** Preferred channel; only the matching contact field is required. */
  canal: ContactChannel;
  email: string;
  whatsapp: string;
  /** Optional. */
  desafio: string;
};

export type ContactField = Exclude<keyof ContactPayload, "canal">;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_LIMITS = {
  nome: 120,
  empresa: 160,
  email: 254,
  whatsapp: 32,
  desafio: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContact(input: Record<string, unknown>): ContactPayload {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const canal: ContactChannel = input.canal === "email" ? "email" : "whatsapp";
  return {
    nome: str(input.nome),
    empresa: str(input.empresa),
    canal,
    // The field for the channel not chosen is dropped, so it is never sent.
    email: canal === "email" ? str(input.email).toLowerCase() : "",
    whatsapp: canal === "whatsapp" ? str(input.whatsapp) : "",
    desafio: str(input.desafio),
  };
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (data.nome.length < 2) errors.nome = "Informe seu nome.";
  if (data.empresa.length < 2) errors.empresa = "Informe o nome da empresa.";

  if (data.canal === "email") {
    if (!data.email) errors.email = "Informe seu e-mail.";
    else if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido.";
  } else {
    const digits = data.whatsapp.replace(/\D/g, "");
    if (!digits) errors.whatsapp = "Informe seu WhatsApp.";
    else if (digits.length < 10 || digits.length > 13)
      errors.whatsapp = "Informe o número com DDD, ex.: (11) 91234-5678.";
  }

  for (const key of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    if (!errors[key] && data[key].length > CONTACT_LIMITS[key]) {
      errors[key] = `Use no máximo ${CONTACT_LIMITS[key]} caracteres.`;
    }
  }

  return errors;
}

/** Error codes returned by POST /api/contact. */
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; code: "not_configured" | "invalid" | "upstream_error"; errors?: ContactErrors };
