import type { ContactPayload } from "@/lib/contact";

/**
 * Shark Digital WhatsApp, digits only with country code (e.g. "5511912345678").
 * While empty, the form does not offer the WhatsApp hand-off.
 */
export const WHATSAPP_NUMBER = "5545998052763";

/** wa.me link that opens a chat with the visitor's details already written. */
export function whatsappLink(data: ContactPayload): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const text = [
    "Olá, Shark! Vim pelo site e quero estruturar meu marketing.",
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `E-mail: ${data.email}`,
    `Principal desafio: ${data.desafio}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
