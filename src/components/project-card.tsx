import Link from "next/link";
import type { Project } from "@/content/projects";

export function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group border border-line rounded-lg bg-bg-raised p-6 transition-colors hover:border-accent">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">
          <Link href={`/work/${project.slug}`} className="hover:text-accent">
            <span className="absolute inset-0 sr-only" />
            {project.title}
          </Link>
        </h3>
        <span className="font-mono text-xs text-fg-faint shrink-0">
          {project.year}
        </span>
      </div>

      <p className="mt-3 text-sm text-fg-muted">{project.blurb}</p>

      {project.metrics && (
        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                {m.label}
              </dt>
              <dd className="font-mono text-base text-accent">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[11px] text-fg-faint">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 text-sm">
        <Link
          href={`/work/${project.slug}`}
          className="text-accent hover:underline underline-offset-4"
        >
          Read the case study →
        </Link>
        {project.demo && Boolean(process.env.OCR_API_BASE) && (
          <span className="font-mono text-[11px] rounded-full border border-accent px-2 py-0.5 text-accent">
            live demo
          </span>
        )}
      </div>
    </article>
  );
}

export function SecondaryRow({ project }: { project: Project }) {
  const href = project.repo ?? `/work/${project.slug}`;
  const external = Boolean(project.repo);

  return (
    <li className="border-b border-line py-4 last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="text-sm font-medium hover:text-accent transition-colors"
        >
          {project.title}
        </a>
        <span className="font-mono text-xs text-fg-faint shrink-0">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-sm text-fg-muted">{project.blurb}</p>
    </li>
  );
}
