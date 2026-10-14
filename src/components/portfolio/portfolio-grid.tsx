"use client";

import { useState } from "react";
import { ProjectCard, type ProjectCardData } from "@/components/portfolio/project-card";
import { cn } from "@/components/ui";
import type { Category } from "@/lib/portfolio-categories";

type Filter = Category | "todos";

/** Category filter + project grid for /portfolio. */
export function PortfolioGrid({
  projects,
  categories,
}: {
  projects: ProjectCardData[];
  categories: { id: Category; label: string; count: number }[];
}) {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible = filter === "todos" ? projects : projects.filter((p) => p.categories.includes(filter));
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "todos", label: "Todos", count: projects.length },
    ...categories,
  ];

  return (
    <div className="mt-12 md:mt-14">
      <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                active
                  ? "border-brand bg-brand text-on-brand"
                  : "border-line-strong text-fg/80 hover:border-white/30 hover:text-fg",
              )}
            >
              {o.label}
              <span className={cn("font-mono text-[0.7rem]", active ? "text-on-brand/70" : "text-muted")}>
                {o.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "projeto" : "projetos"}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} priority={i < 3} />
          </li>
        ))}
      </ul>
    </div>
  );
}
