import type { ContactPayload } from "@/lib/contact";

/**
 * Shark Digital WhatsApp, digits only with country code (e.g. "5511912345678").
 * While empty, the form does not offer the WhatsApp hand-off.
 */
export const WHATSAPP_NUMBER = "554599096511";

/** Display format for a Brazilian number with country code, e.g. (45) 99805-2763. */
export function formatWhatsapp(digits: string): string {
  const m = digits.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : digits;
}

/** wa.me link that opens a chat with the visitor's details already written. */
export function whatsappLink(data: ContactPayload): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const text = [
    "Olá, Shark! Vim pelo site e quero conversar sobre meu marketing.",
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    data.email ? `E-mail: ${data.email}` : null,
    data.desafio ? `Principal desafio: ${data.desafio}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
