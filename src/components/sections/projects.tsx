import { ProjectCard, toCardData } from "@/components/portfolio/project-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { FEATURED_PROJECTS } from "@/lib/portfolio";

export function Projects() {
  const projects = FEATURED_PROJECTS.map(toCardData);
  return (
    <Section id="projetos" labelledBy="projetos-title" tone="raised">
      {/* Older links pointed to #cases and #clientes. */}
      <span id="cases" aria-hidden className="absolute top-0" />
      <span id="clientes" aria-hidden className="absolute top-0" />

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          tone="brand"
          id="projetos-title"
          eyebrow="Portfólio"
          lines={["O que fazemos", "em cada cliente."]}
        />
        <Reveal className="shrink-0">
          <ButtonLink href="/portfolio" variant="secondary" arrow>
            Ver portfólio completo
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
          <ProjectList projects={projects} />
          <ProjectList projects={projects} copy />
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectList({ projects, copy = false }: { projects: ReturnType<typeof toCardData>[]; copy?: boolean }) {
  return (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 gap-4 pr-4">
      {projects.map((project) => (
        <li key={project.slug} className="w-[18.5rem] shrink-0 sm:w-[23rem]">
          <ProjectCard project={project} as="h3" copy={copy} sizes="(min-width: 640px) 368px, 296px" />
        </li>
      ))}
    </ul>
  );
}
