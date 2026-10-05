import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/contact-email";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const HOME_TITLE = "Shark Digital | Assessoria e agência de marketing";
export const HOME_DESCRIPTION =
  "Assessoria e agência de marketing: estratégia, conteúdo, Google Ads e Instagram Ads organizados em atração, engajamento e venda, alinhados ao atendimento comercial da sua empresa.";

/** Logo card used when a page has no image of its own (1200×630). */
export const DEFAULT_OG_IMAGE = {
  url: "/og-shark-digital.png",
  width: 1200,
  height: 630,
  alt: "Shark Digital — excelência & resultado",
};

/**
 * Title, description, canonical and sharing tags for a page.
 * Next.js replaces `openGraph` and `twitter` as a whole when a page sets
 * them, so every page builds the complete set here instead of relying on
 * the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/*
 * Only facts the site itself shows: name, logo, the contact e-mail and the
 * WhatsApp in the footer. No address, area served or social profiles until
 * the Shark confirms them.
 */
export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organizacao"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo-shark-digital.png") },
    description: "Assessoria e agência de marketing: estratégia, conteúdo, Google Ads e Instagram Ads.",
    ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
    ...(WHATSAPP_NUMBER || CONTACT_EMAIL
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            availableLanguage: "pt-BR",
            ...(WHATSAPP_NUMBER ? { telephone: `+${WHATSAPP_NUMBER}` } : {}),
            ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
          },
        }
      : {}),
  };
}

/** Props for a JSON-LD <script>; escapes "<" so it cannot break out of the tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
