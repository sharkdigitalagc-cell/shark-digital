import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/components/ui";
import type { Project } from "@/lib/portfolio";
import { FULL_SERVICE_LABEL, type Category } from "@/lib/portfolio-categories";

/** What a card needs; kept small because the grid is a client component. */
export type ProjectCardData = {
  slug: string;
  name: string;
  segment: string;
  summary: string;
  challenge: string;
  categories: Category[];
  cover: StaticImageData;
  /** Badge over the cover: the project's own badge or the full-service one. */
  badge: string | null;
};

export function toCardData(p: Project): ProjectCardData {
  return {
    slug: p.slug,
    name: p.name,
    segment: p.segment,
    summary: p.summary,
    challenge: p.challenge,
    categories: p.categories,
    cover: p.cover.image,
    badge: p.badge ?? (p.fullService ? FULL_SERVICE_LABEL : null),
  };
}

export function ProjectCard({
  project,
  as: Heading = "h2",
  copy = false,
  sizes = "(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: {
  project: ProjectCardData;
  as?: "h2" | "h3";
  /** Decorative duplicate (marquee loop): hidden from keyboard, no heading. */
  copy?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const Title = copy ? "p" : Heading;
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      tabIndex={copy ? -1 : undefined}
      className={cn("lift group flex h-full flex-col rounded-3xl border border-line bg-card p-3", className)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-2">
        {/* The card's text names the project, so the cover is decorative here. */}
        <Image
          src={project.cover}
          alt=""
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className="h-auto w-full transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
        />
        {project.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-semibold text-on-brand shadow-lg shadow-black/40">
            {project.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{project.segment}</p>
        <Title className="mt-2 flex items-start justify-between gap-3 text-xl font-semibold tracking-tight text-fg">
          {project.name}
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 shrink-0 text-muted transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </Title>
        <dl className="mt-4 space-y-3 text-[0.93rem] leading-relaxed">
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-brand/90">Desafio</dt>
            <dd className="mt-1 text-fg/85">{project.challenge}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted">Atuação da Shark</dt>
            <dd className="mt-1 text-muted">{project.summary}</dd>
          </div>
        </dl>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-fg">
          Ver estudo de caso
          <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
