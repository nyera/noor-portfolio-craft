import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/site";

const ratios: Record<Project["ratio"], string> = {
  portrait: "4 / 5",
  landscape: "3 / 2",
  square: "1 / 1",
};

export function ProjectCard({
  project,
  ratio,
  priority = false,
}: {
  project: Project;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <article className="group">
      <Link
        to="/portfolio/$slug"
        params={{ slug: project.slug }}
        className="block focus-visible:outline-offset-6"
      >
        <div className="img-zoom relative bg-muted">
          <img
            src={project.image}
            alt={`${project.title} — تصوير ${project.categoryAr} في ${project.location}`}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
            style={{ aspectRatio: ratio ?? ratios[project.ratio] }}
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
          <span className="pointer-events-none absolute bottom-5 right-5 translate-y-3 border border-white/70 px-4 py-2 text-[0.7rem] tracking-[0.2em] text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            عرض المشروع
          </span>
          {project.hasVideo ? (
            <span className="absolute top-5 right-5 border border-white/70 px-3 py-1 text-[0.65rem] tracking-[0.2em] text-white">
              فيديو
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="t-caption shrink-0">
            {project.categoryAr} · {project.year}
          </p>
        </div>
        <p className="t-caption mt-1.5 line-clamp-1">{project.excerpt}</p>
      </Link>
    </article>
  );
}
