import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { CLIENTS, type Client } from "@/lib/clients";

export function Projects() {
  return (
    <Section id="projetos" labelledBy="projetos-title" tone="raised">
      {/* Older links pointed to #cases and #clientes. */}
      <span id="cases" aria-hidden className="absolute top-0" />
      <span id="clientes" aria-hidden className="absolute top-0" />

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          tone="brand"
          id="projetos-title"
          eyebrow="Projetos e entregas"
          lines={["O que fazemos", "em cada cliente."]}
        />
        <Reveal className="shrink-0">
          <ButtonLink href="/clientes" variant="secondary" arrow>
            Ver todos os projetos
          </ButtonLink>
        </Reveal>
      </div>

      {/*
       * Marquee: the projects scroll from right to left. The list is
       * rendered twice so the loop is seamless; the copy is hidden from
       * assistive tech and keyboard. Hovering or focusing pauses it, and
       * under prefers-reduced-motion it becomes a scrollable row.
       */}
      <Reveal className="marquee mt-12 md:mt-14">
        <div className="marquee-track">
          <ProjectList />
          <ProjectList copy />
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectList({ copy = false }: { copy?: boolean }) {
  return (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 gap-4 pr-4">
      {CLIENTS.map((client) => (
        <li key={client.slug} className="w-[18.5rem] shrink-0 sm:w-[22rem]">
          <ProjectCard client={client} copy={copy} />
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ client, copy }: { client: Client; copy: boolean }) {
  return (
    <Link
      href={`/clientes#${client.slug}`}
      tabIndex={copy ? -1 : undefined}
      className="lift group flex h-full flex-col rounded-3xl border border-line bg-card p-3"
    >
      <ProjectCover
        name={client.name}
        segment={client.segment}
        services={client.services}
        className="min-h-56"
      />
      <div className="flex flex-1 flex-col p-4 pt-5">
        <p className="leading-relaxed text-muted">{client.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
          Detalhes das entregas
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
