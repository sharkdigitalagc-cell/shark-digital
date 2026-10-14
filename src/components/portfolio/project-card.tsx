import { ArrowUpRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/components/ui";
import type { Project } from "@/lib/portfolio";
import { categoryLabel, type Category } from "@/lib/portfolio-categories";

/** What a card needs; kept small because the grid is a client component. */
export type ProjectCardData = {
  slug: string;
  name: string;
  segment: string;
  summary: string;
  categories: Category[];
  cover: StaticImageData;
};

export function toCardData(p: Project): ProjectCardData {
  return {
    slug: p.slug,
    name: p.name,
    segment: p.segment,
    summary: p.summary,
    categories: p.categories,
    cover: p.cover.image,
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
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
        <ul aria-label="Categorias" className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.categories.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-fg/70"
            >
              {categoryLabel(c)}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
