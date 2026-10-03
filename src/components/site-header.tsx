"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ButtonLink, cn } from "@/components/ui";

export const NAV_LINKS = [
  { href: "/#metodo", label: "Método" },
  { href: "/#solucoes", label: "Soluções" },
  { href: "/clientes", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    // Close the panel if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && close();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        solid
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#conteudo"
        className="sr-only rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10"
      >
        Pular para o conteúdo
      </a>

      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/#inicio" aria-label="Shark Digital — início" className="shrink-0">
          <Logo eager />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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

        <div className="hidden lg:block">
          <ButtonLink href="/#contato" className="h-10 px-5 text-sm">
            Falar com a Shark
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden className="size-5" />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
      >
        <nav aria-label="Menu mobile" className="px-5 pb-10 pt-4 sm:px-8">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => close()}
                  className="flex items-center py-5 text-xl font-medium tracking-tight text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            href="/#contato"
            arrow
            className="mt-8 w-full"
            onClick={() => close()}
          >
            Falar com a Shark
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
