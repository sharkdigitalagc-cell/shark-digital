import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";

const FOOTER_LINKS = [
  { href: "#metodo", label: "Método" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#cases", label: "Cases" },
  { href: "#contato", label: "Contato" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#inicio" aria-label="Shark Digital — voltar ao início" className="inline-block">
              <Logo variant="stacked" />
            </a>
            <p className="mt-6 text-sm text-muted">Estratégia de marketing, conteúdo e tráfego pago.</p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-line pt-8 text-xs text-muted">
          © {year} Shark Digital.
        </p>
      </Container>
    </footer>
  );
}
