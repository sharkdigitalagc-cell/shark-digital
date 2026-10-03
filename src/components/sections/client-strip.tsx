import Link from "next/link";
import { Container } from "@/components/ui";
import { CLIENTS } from "@/lib/clients";

/** Names of the companies served, right after the hero. */
export function ClientStrip() {
  return (
    <section aria-labelledby="atendidas-title" className="border-t border-line bg-bg-2 py-10 md:py-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <h2
          id="atendidas-title"
          className="shrink-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted"
        >
          Empresas atendidas
        </h2>
        <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          {CLIENTS.map((client) => (
            <li key={client.slug}>
              <Link
                href={`/clientes#${client.slug}`}
                className="rounded-sm text-lg font-semibold tracking-tight text-fg/60 transition-colors duration-200 hover:text-fg md:text-xl"
              >
                {client.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
