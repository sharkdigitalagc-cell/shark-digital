import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";
import { CLIENTS } from "@/lib/clients";

export function Cases() {
  return (
    <Section id="clientes" labelledBy="clientes-title" tone="raised">
      <SectionHeader
        id="clientes-title"
        eyebrow="Clientes"
        lines={["Veja para quem", "já trabalhamos."]}
        text="Coworking, advocacia, beleza e mais. Descubra o que fazemos em cada cliente."
      />

      <Reveal delay={0.08}>
        <Link
          href="/clientes"
          className="group mt-12 block rounded-3xl border border-brand/40 bg-card p-6 transition-colors duration-200 hover:border-brand md:mt-14 md:p-8"
        >
          <ul className="flex flex-wrap gap-3">
            {CLIENTS.map((client) => (
              <li
                key={client.name}
                className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-fg md:text-base"
              >
                {client.name}
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-[0.95rem] font-medium text-on-brand transition-colors duration-200 group-hover:bg-brand-hover">
            Ver clientes e trabalhos
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
