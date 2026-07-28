import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { Prose } from "@/components/prose";
import { ProjectJsonLd } from "@/components/json-ld";
import { OcrDemo } from "@/components/ocr-demo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
    openGraph: { title: project.title, description: project.blurb },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16">
      <ProjectJsonLd project={project} />

      <Link
        href="/#work"
        className="font-mono text-xs text-fg-faint hover:text-fg transition-colors"
      >
        ← work
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-fg-muted text-pretty">
          {project.blurb}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="font-mono text-xs text-fg-faint">
            {project.year}
          </span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              Source on GitHub ↗
            </a>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[11px] rounded border border-line px-2 py-0.5 text-fg-faint"
            >
              {s}
            </span>
          ))}
        </div>
      </header>

      {project.metrics && (
        <section className="mt-10 border-y border-line py-6">
          <h2 className="sr-only">Measured results</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                  {m.label}
                </dt>
                <dd className="mt-1 font-mono text-2xl text-accent">
                  {m.value}
                </dd>
                {m.note && (
                  <dd className="mt-1 text-xs text-fg-muted leading-snug">
                    {m.note}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Only render the demo when there is an API behind it. A widget that
          answers "not configured" is worse than no widget at all. */}
      {project.demo && Boolean(process.env.OCR_API_BASE) && (
        <section className="mt-12">
          <OcrDemo />
        </section>
      )}

      <div className="mt-12 space-y-10">
        {project.sections?.map((s) => (
          <section key={s.heading}>
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-fg-faint">
              {s.heading}
            </h2>
            <div className="mt-4">
              <Prose paragraphs={s.body} />
            </div>
          </section>
        ))}
      </div>

      {!project.sections && (
        <p className="mt-12 text-fg-muted">
          Write-up pending. The source is linked above.
        </p>
      )}
    </article>
  );
}
