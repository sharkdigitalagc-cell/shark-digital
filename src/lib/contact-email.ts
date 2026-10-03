import type { ContactPayload } from "@/lib/contact";

/**
 * Inbox that receives the contact form, through FormSubmit (formsubmit.co).
 * FormSubmit only accepts submissions sent from a visitor's browser, so this
 * runs on the client. The first submission makes FormSubmit email an
 * activation link to this inbox; until it is clicked, nothing is delivered
 * and the form reports that the data was NOT sent.
 * Empty string: fall back to POST /api/contact (CONTACT_FORM_ENDPOINT).
 */
export const CONTACT_EMAIL = "sharkdigital.agc@gmail.com";

/** Returns true only when FormSubmit confirms the email was sent. */
export async function sendContactEmail(
  data: ContactPayload,
  honeypot: string,
): Promise<boolean> {
  const res = await fetch(
    `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        Nome: data.nome,
        Empresa: data.empresa,
        "E-mail": data.email,
        WhatsApp: data.whatsapp,
        "Principal desafio": data.desafio,
        _replyto: data.email,
        _subject: `Novo contato pelo site: ${data.empresa}`,
        _template: "table",
        _captcha: "false",
        _honey: honeypot,
      }),
    },
  );
  // FormSubmit answers 200 with { success: "false" } while the inbox is not
  // activated, so a 2xx alone does not prove delivery.
  const result = (await res.json().catch(() => null)) as { success?: unknown } | null;
  return res.ok && String(result?.success) === "true";
}
