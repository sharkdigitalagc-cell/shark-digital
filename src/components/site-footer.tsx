import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/contact-email";
import { WHATSAPP_NUMBER, formatWhatsapp } from "@/lib/whatsapp";

const FOOTER_LINKS = [
  { href: "/#metodo", label: "Método" },
  { href: "/#solucoes", label: "Soluções" },
  { href: "/clientes", label: "Projetos" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/#inicio" aria-label="Shark Digital — voltar ao início" className="inline-block">
              <Logo variant="stacked" />
            </Link>
            <p className="mt-6 text-sm text-muted">Assessoria e agência de marketing.</p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-sm text-sm text-fg/80 transition-colors duration-200 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted">Contato</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {WHATSAPP_NUMBER ? (
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm text-fg/80 transition-colors duration-200 hover:text-fg"
                  >
                    <MessageCircle aria-hidden className="size-4 text-accent" />
                    WhatsApp {formatWhatsapp(WHATSAPP_NUMBER)}
                  </a>
                </li>
              ) : null}
              {CONTACT_EMAIL ? (
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 break-all rounded-sm text-fg/80 transition-colors duration-200 hover:text-fg"
                  >
                    <Mail aria-hidden className="size-4 shrink-0 text-accent" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-8 text-xs text-muted">
          © {year} Shark Digital.
        </p>
      </Container>
    </footer>
  );
}
